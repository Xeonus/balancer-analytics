
import { BalancerChartDataItem } from '../balancer/balancerTypes';
import { BalancerDateChartItem } from './useHistoricalWalletData';
import { GetAddressTransactionData } from '../../utils/getAddressTransactionData';
import { WalletTransactiondata } from '../../utils/getAddressTransactionData';
import {  DAO_FEE_MULTISIG } from '../../constants/wallets';
import dayjs from 'dayjs';

export interface AddressTransactionData {
    totalValueData: BalancerChartDataItem[];
    tokenDatas: any[],
    cumulativeTokenDatas: any[];
    tvl?: number;
}

export function useAddressTransactionData(address: string, copperProxy: string, usdcAddress: string): AddressTransactionData {

    function getWalletBalancerChartData(walletData: WalletTransactiondata) {
        const chartData: BalancerDateChartItem[] = [];
        const tokenDatas: any[] = [];
        let sortedTokenDatas: any[] = [];
        const cumulativeTokenDatas : any[] = [];
        let runningCopperValue = 0;
        let runningFeeValue = 0;
        if (walletData) {
            //Iterate through each timepoint, then obtain total value from all positions (no restrictions on position size)
            walletData.data.items.forEach((tx) => {
                //Only filter USDC txs for now
                tx.log_events.forEach((logEvent) => {
                    if (logEvent.sender_contract_ticker_symbol === 'USDC') {
                        const chartItem = {} as BalancerDateChartItem;
                        const param = logEvent.decoded.params.find((p) => p.name === 'value');
                        const receiver = logEvent.decoded.params.find((r) => r.name === 'to');
                        if (param && receiver?.value === address) {
                            chartItem.value = param.value / 10 ** logEvent.sender_contract_decimals;
                            chartItem.time = new Date(logEvent.block_signed_at);
                            chartData.push(chartItem);
                        }
                    }
                    if (logEvent.decoded && logEvent.decoded.params) {
                    //Filter Copper launch data - always a param pair of from to and value (alsways in USDC)
                    if (logEvent.sender_address === copperProxy || tx.from_address === DAO_FEE_MULTISIG) {
                        const tokenData = {} as any;
                        const cumulativeTokenData = {} as any;
                        tokenData.time = new Date(logEvent.block_signed_at);
                        tokenData.copper = 0;
                        tokenData.feeCollector = 0;
                        cumulativeTokenData.time = tokenData.time;
                        cumulativeTokenData.copper = runningCopperValue;
                        cumulativeTokenData.feeCollector = runningFeeValue;
                        const receiver = logEvent.decoded.params.find((r) => r.name === 'feeRecipient' && r.type === 'address');
                        const value = logEvent.decoded.params.find((r) => r.name === 'feeAmount');
                        const token = logEvent.decoded.params.find((t) => t.name === 'token');
                       if( receiver?.value === address && token?.value === usdcAddress.toLowerCase()) {
                            tokenData.copper = Number(value?.value) / (10 ** 6) * 0.25;
                            runningCopperValue += tokenData.copper;
                            cumulativeTokenData.copper = runningCopperValue;
                            
                        }
                        //Fee collector
                        if (tx.from_address === DAO_FEE_MULTISIG && logEvent.sender_contract_ticker_symbol === 'USDC') {
                            const feeReceiver = logEvent.decoded.params.find((r) => r.name === 'to');
                            const value = logEvent.decoded.params.find((r) => r.name === 'value');
                            tokenData.feeCollector = Number(value?.value) / (10 ** 6);
                            runningFeeValue += tokenData.feeCollector;
                            cumulativeTokenData.feeCollector = runningFeeValue;
                        }
                        //Only push if we have any value > 0 !=== NaN
                        if (tokenData.copper > 0 || tokenData.feeCollector > 0) {
                            tokenDatas.push(tokenData)
                        }
                        
                        
                    }
                }
                })
            })

            //Create cumulative view
            //1. Sort
            sortedTokenDatas = tokenDatas.sort(
                (objA, objB) => objA.time.getTime() - objB.time.getTime(),
            );
            //2. create view
                sortedTokenDatas.forEach((el) => {
                    const cumulativeTokenData = {} as any;
                    
                    runningCopperValue += el.copper;
                    runningFeeValue += el.feeCollector
                    const existingDateEntry = cumulativeTokenDatas.find((c) => dayjs(c.time).format('DD/MM/YYYY') == dayjs(el.time).format('DD/MM/YYYY'));
                    if (existingDateEntry) {
                        cumulativeTokenDatas[cumulativeTokenDatas.indexOf(existingDateEntry)].copper = runningCopperValue;
                        cumulativeTokenDatas[cumulativeTokenDatas.indexOf(existingDateEntry)].feeCollector = runningFeeValue;
                    } else {
                        cumulativeTokenData.time = el.time;
                        cumulativeTokenData.copper = runningCopperValue;
                        cumulativeTokenData.feeCollector = runningFeeValue;
                        cumulativeTokenDatas.push(cumulativeTokenData);
                    }
                })

        }
        return [chartData, sortedTokenDatas, cumulativeTokenDatas];
    }

    const walletHistoricalData = GetAddressTransactionData(address)

    if (!walletHistoricalData || walletHistoricalData.error === true) {
        return { 
            totalValueData: [],
            tokenDatas: [], 
            cumulativeTokenDatas: [],
        };
    }

    const [walletChartData, walletTokenChartDatas, walletCumulativeTokenChartDatas] = getWalletBalancerChartData(walletHistoricalData);

    //Sort data
    const sortedAsc = walletChartData.sort(
        (objA, objB) => objA.time.getTime() - objB.time.getTime(),
    );

    //Map back to BalancerChartDataItem
    const sortedWalletChartData = sortedAsc.map(item => {
        return <BalancerChartDataItem>{
            value: item.value,
            time: item.time.toString(),
        }
    }
    );

    return {
        totalValueData: sortedWalletChartData,
        tokenDatas: walletTokenChartDatas,
        cumulativeTokenDatas: walletCumulativeTokenChartDatas,
        tvl: sortedWalletChartData[sortedWalletChartData.length - 1].value,
    };
}
