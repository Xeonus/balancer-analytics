import { useDeltaTimestamps } from '../../utils/queries';
import { useBlocksFromTimestamps } from '../../hooks/useBlocksFromTimestamps';
import { BalancerSwapFragment, useGetProtocolDataLazyQuery } from '../../apollo/generated/graphql-codegen-generated';
import { useEffect } from 'react';
import { unixToDate } from '../../utils/date';
import { BalancerChartDataItem } from '../balancer/balancerTypes';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { GetAddressHistoricalTokenData, WalletHistoryData } from '../../utils/getAddressHistoricalTokenData';
import { COVALENT_TOKEN_BLACKLIST } from './tokenBlackList';

export interface WalletHistoricalData {
    totalValueData: BalancerChartDataItem[];
    tokenDatas: any[],
    tvl?: number;
}

export interface BalancerDateChartItem {
    value: number;
    time: Date;
}

export function useHistoricalWalletData(address: string, tokenFilterList?: string[]): WalletHistoricalData {

    function getWalletBalancerChartData(walletData: WalletHistoryData) {
        const chartData: BalancerDateChartItem[] = [];
        const tokenDatas: any[] = [];
        if (walletData) {
            //Iterate through each timepoint, then obtain total value from all positions (no restrictions on position size)
            for (let holdingsIndex = 0; holdingsIndex <= 30; holdingsIndex++) {
                //obtain timestamp from first element
                const chartItem = {} as BalancerDateChartItem;
                const tokenData = {} as any;
                chartItem.value = 0;
                chartItem.time = new Date(walletData.data.items[0].holdings[holdingsIndex].timestamp);
                tokenData.time = chartItem.time ;
                //Sum up all token holdings
                walletData.data.items.forEach((item) => {
                    if (!COVALENT_TOKEN_BLACKLIST.includes(item.contract_address) && !tokenFilterList?.includes(item.contract_address)) {
                    if (item.holdings[holdingsIndex].close.quote && typeof item.holdings[holdingsIndex].close.quote === 'number') {
                            chartItem.value += Number(item.holdings[holdingsIndex].close.quote);
                            tokenData[item.contract_ticker_symbol] = Number(item.holdings[holdingsIndex].close.quote);
                            
                    }
                }

                })
                chartData.push(chartItem);
                //console.log(holdingsIndex.toString() + " " + tokenData.time);
                tokenDatas.push(tokenData);
            }
        }
        return [chartData, tokenDatas];
    }

    const walletHistoricalData = GetAddressHistoricalTokenData(address)

    if (!walletHistoricalData || walletHistoricalData.error === true) {
        return { 
            totalValueData: [],
            tokenDatas: [], 
        };
    }
    //console.log("walletHistoricalData", walletHistoricalData)

    const [walletChartData, walletTokenChartDatas] = getWalletBalancerChartData(walletHistoricalData);
    //console.log("walletChartData", walletChartData)
    //console.log("walletTokenChartDatas", walletTokenChartDatas)

    //Sort data
    const sortedAsc = walletChartData.sort(
        (objA, objB) => objA.time.getTime() - objB.time.getTime(),
    );

    const sortedWalletTokenChartDatas = walletTokenChartDatas.sort(
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
        tokenDatas: sortedWalletTokenChartDatas,
        tvl: sortedWalletChartData[sortedWalletChartData.length - 1].value,
    };
}
