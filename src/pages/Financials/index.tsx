import * as React from 'react';
import { Typography, Grid, Box, Card, Divider, CircularProgress } from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import txnJson from '../../data/debank/data/treasuryTxHistory.json'
import { TransactionHistory } from '../../data/debank/debankTypes';
import { BalancerChartDataItem, BalancerPieChartDataItem } from '../../data/balancer/balancerTypes';
import { extractTransactionsByTokenAndType, getChartDataByMonth, getChartDataByQuarter, getCumulativeSumTrace, getDailyChartDataByDateRange } from './helpers';
import GenericBarChart from '../../components/Echarts/GenericBarChart';
import { useGetTransactions } from '../../data/debank/useGetTransactions';
import { FEE_STREAMER, getTreasuryConfig } from '../../constants/wallets';
import GenericAreaChart from '../../components/Echarts/GenericAreaChart';
import TreasuryTransactionTable from '../../components/Tables/TreasuryTransactionTable';
import { useGetTotalBalances } from '../../data/debank/useGetTotalBalances';
import { useGetPortfolio } from '../../data/debank/useGetPortfolio';
import { Stack } from '@mui/system';
import MetricsCard from '../../components/Cards/MetricsCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import WalletIcon from '@mui/icons-material/Wallet';
import RunwayGauge from '../../components/Echarts/RunwayGauge/RunwayGauge';
import spJson from '../ServiceProviders/serviceProviderConfig.json'
import { ServiceProvidersConfig } from '../../types';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import { useGetQuarterlyTotalSpendData } from '../ServiceProviders/helpers';
import GenericLineChart from '../../components/Echarts/GenericLineChart';
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import { formatDollarAmount } from '../../utils/numbers';

export default function Financials() {

    const [activeNetwork] = useActiveNetworkVersion()
    const TREASURY_CONFIG = getTreasuryConfig(activeNetwork.chainId);
    const usdc = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    const weth = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    const bal = '0xba100000625a3754423978a60c9317c58a424e3D';
    const startingUSDCValue = 0 //1164169.82;
    const startingBAL = 4412176.4
    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)

    //Load history
    const txnHistory: TransactionHistory = JSON.parse(JSON.stringify(txnJson));
    console.log("txnHistory", txnHistory)

    //complement with actual data
    const { transactions } = useGetTransactions(TREASURY_CONFIG.treasury, Math.floor(Date.now() / 1000))
    console.log("transactions", transactions)

    //Load BAL and USDC Reserves
    const { totalBalances } = useGetTotalBalances(TREASURY_CONFIG.treasury);
    const { portfolio } = useGetPortfolio(TREASURY_CONFIG.treasury);

    //Obtain wallet total worth and USDC
    const walletTokenNetworth = totalBalances ? totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    let netWorth = portfolio ? portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0;
    netWorth += walletTokenNetworth;
    const usdcReserves = totalBalances ? totalBalances.find(el => {
        if (el.symbol === 'USDC') {
            return el
        }
    })?.amount : 0;
    const balReserves = totalBalances ? totalBalances.find(el => {
        if (el.symbol === 'BAL') {
            return el
        }
    })?.amount : 0;
    //Obtain total Liquid USD value




    //TODOs: 
    //1. show quarterly graph of historical USDC income per source. 
    //sources: fjord / copper, protocol fees / paybacks / ribbon margin calls / taxations like liquidations
    //2. show quarterly spendings (past and future for SPs -> use same data as SP page)
    //3. show forecast gauge in months (based on average spendings how far we can go with reserves)
    //4. Show sankey chart of in- and outflows? Breakdown of BAL and USDC

    //Obtain quarterly data:
    //1. obtain whitelist token data
    //2. aggregate by Quarter
    //3. Feed into multi-bar-chart



    //---USDC: SEND and RECEIVE---
    const usdcReceived = extractTransactionsByTokenAndType(txnHistory, usdc.toLowerCase(), 'receive', FEE_STREAMER);
    const quarterlyUSDC = getChartDataByQuarter(usdcReceived);
    const monthlyUSDC = getChartDataByMonth(usdcReceived)
    //USDC Send
    const usdcSend = extractTransactionsByTokenAndType(txnHistory, usdc.toLowerCase(), 'send');
    //temporary fix: exclude tribe tx:
    usdcSend[1].value = 0
    console.log("usdcSend", usdcSend)
    const monthlyUSDCSend = getChartDataByMonth(usdcSend)

    //---USDC: Cumulative in- and outflows---
    let startDate = new Date(usdcReceived[0].time);
    let endDate = new Date(usdcReceived[usdcReceived.length - 1].time);
    if (startDate > new Date(usdcSend[0].time)) {
        startDate = new Date(usdcSend[0].time)
    }
    if (endDate < new Date(usdcSend[usdcSend.length - 1].time)) {
        endDate = new Date(usdcSend[usdcSend.length - 1].time)
    }
    const cumulativeIncomeChartData = getCumulativeSumTrace(usdcReceived, startDate, endDate);
    cumulativeIncomeChartData.forEach(item => item.value += startingUSDCValue)
    const cumulativeSpendChartData = getCumulativeSumTrace(usdcSend, startDate, endDate);
    const netCumulativeUSDCFlow: BalancerChartDataItem[] = [];
    cumulativeIncomeChartData.forEach(item => {
        const index = cumulativeSpendChartData.findIndex(obj => obj.time === item.time);
        let outflow = cumulativeSpendChartData[index] ? cumulativeSpendChartData[index].value : 0
        netCumulativeUSDCFlow.push(
            {
                time: item.time,
                value: item.value + outflow
            }
        )
    })

    //---BAL---
    const balReceive = extractTransactionsByTokenAndType(txnHistory, bal.toLowerCase(), 'receive');
    const balSend = extractTransactionsByTokenAndType(txnHistory, bal.toLowerCase(), 'send');

    const cumulativeBALIncomeChartData = getCumulativeSumTrace(balReceive, startDate, endDate);
    cumulativeBALIncomeChartData.forEach(item => item.value += startingBAL)
    const cumulativeBALSpendChartData = getCumulativeSumTrace(balSend, startDate, endDate);
    const netCumulativeBALFlow: BalancerChartDataItem[] = [];
    cumulativeBALIncomeChartData.forEach(item => {
        const index = cumulativeBALSpendChartData.findIndex(obj => obj.time === item.time);
        let outflow = cumulativeBALSpendChartData[index] ? cumulativeBALSpendChartData[index].value : 0
        netCumulativeBALFlow.push(
            {
                time: item.time,
                value: item.value + outflow
            }
        )
    })

    //Calculate yearly spend based on current quarter spendings:
    //States
    dayjs.extend(quarterOfYear);
    const currentQuarter = dayjs().quarter();
    const sps: ServiceProvidersConfig = JSON.parse(JSON.stringify(spJson));
    const balPriceData = useCoinGeckoSimpleTokenPrices([activeNetwork.balAddress]);


    //Data
    const [quarterlyPie, quarterlyTotalBudget] = useGetQuarterlyTotalSpendData(sps, dayjs().year(), currentQuarter, balPriceData)
    let monthlyUSDCBurn = 0;
    if (quarterlyPie && quarterlyPie.find(el => el.name === 'USDC')) {
        const el = quarterlyPie.find(el => el.name === 'USDC');
        monthlyUSDCBurn = el ? el.value / 3 : 0;
    }

    //TODO: project based on last 3 month income excluding running month
    const avgIncome = monthlyUSDC.reduce((a, b) => a + b.value, 0) / monthlyUSDC.length;
    console.log("monthly USDC burn", monthlyUSDCBurn)
    const burnRunWay = usdcReserves ? usdcReserves / (monthlyUSDCBurn - avgIncome) : 0;
    console.log("burnRunway", burnRunWay)




    //---WETH---
    const wethReceived = extractTransactionsByTokenAndType(txnHistory, weth.toLowerCase(), 'receive');
    const quarterlyWETH = getChartDataByQuarter(wethReceived);


    //---Historical Treasury wallet chart---
    //Take current balances and do a revert sum based on tx data we already have (net in outflow and smooth, done)
    const dailyUSDCIn = getDailyChartDataByDateRange(usdcReceived, startDate, endDate);
    const dailyUSDCOut = getDailyChartDataByDateRange(usdcSend, startDate, endDate);
    console.log("dailyUSDCIn", dailyUSDCIn)
    console.log("dailyUSDCOut", dailyUSDCOut)
    const historicalData: BalancerChartDataItem[] = [];
    if (usdcReserves) {
        let runningAmount = usdcReserves
    for (let i = dailyUSDCIn.length - 1; i >= 0; i--) {
        if (i !== dailyUSDCIn.length - 1) {
            runningAmount = runningAmount - dailyUSDCIn[i].value - dailyUSDCOut[i].value
        }
        historicalData.push(
            {
                value: runningAmount,
                time: dailyUSDCIn[i].time
            }
        ) 
    }
    }
    historicalData.sort(function (a, b) {
        const date1 = new Date(a.time)
        const date2 = new Date(b.time)
        return date1.getTime() - date2.getTime();
    })


    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={10}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={'DAO Financials'} />
                    </Box>

                </Grid>
                <Grid item xs={10}>
                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography variant={"h5"}>DAO Real-Time Financial Report Dashboard</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={10}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Stack direction="column" spacing={1} justifyContent="flex-start">
                            <MetricsCard
                                mainMetric={usdcReserves ? usdcReserves : 0}
                                mainMetricInUSD={true}
                                metricName='USDC Reserves'
                                mainMetricChange={0}
                                MetricIcon={CurrencyExchangeIcon}
                            />
                            <MetricsCard
                                mainMetric={balReserves ? balReserves : 0}
                                mainMetricInUSD={false}
                                mainMetricUnit={" BAL"}
                                metricName='BAL Reserves'
                                mainMetricChange={0}
                                MetricIcon={WalletIcon}
                            />
                            <MetricsCard
                                mainMetric={walletTokenNetworth ? walletTokenNetworth : 0}
                                mainMetricInUSD={true}
                                metricName='Total Liquid Reserves'
                                mainMetricChange={0}
                                MetricIcon={WalletIcon}
                            />
                        </Stack>

                    </Box>
                </Grid>

                <Grid
                    item
                    mt={2}
                    xs={10}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">USDC Flows</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={10}>
                    <Card>
                        <Box p={1}>
                            <Typography variant="h6">Monthly Protocol Fee Income (USDC)</Typography>
                        </Box>
                        <GenericBarChart data={monthlyUSDC} />
                    </Card>
                </Grid>
                <Grid
                    item
                    xs={10}>
                    <Card>
                        <Box p={1}>
                            <Typography variant="h6">Monthly Protocol Fee Income (USDC)</Typography>
                        </Box>
                        <GenericBarChart data={monthlyUSDCSend} />
                    </Card>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    mt={1}
                >
                    <Grid item xs={4}> 
                    <Card>
                        <Typography>Quarterly Budget: </Typography>
                        <Typography variant='h5' fontWeight={"bold"}>{formatDollarAmount(quarterlyTotalBudget)}</Typography>
                            <GenericPieChart data={quarterlyPie} height={'250px'}/>
                        </Card>
                    </Grid>
                    <Grid item xs={6}> 
                        
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    mt={1}
                >
                    <Grid item xs={4}>
                        <Card >
                            <Box p={1}>
                                <Typography variant="h6">USDC Funding Runway Projection</Typography>
                            </Box>
                            
                                {usdcReserves ?
                                    <RunwayGauge runwayInMonths={burnRunWay} dataTitle='Funding Reserves' height='300px' /> : <CircularProgress />}
                           
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <Box p={1} >
                                <Typography variant="h6">Cumulative USDC Burn (Inflow vs Outflow)</Typography>
                            </Box>
                                <GenericLineChart chartData={netCumulativeUSDCFlow} dataTitle='USDC Burn' height='300px' />
                                <GenericLineChart chartData={historicalData} dataTitle='USDC Burn' height='300px' />
                            
                        </Card>
                    </Grid>
                </Grid>


                <Grid
                    item
                    mt={1}
                    xs={10}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">BAL Flows</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    mt={1}
                    item
                    xs={10}>
                    <Card>
                        <Box p={1}>
                            <Typography variant="h6">Cumulative BAL Burn (Reserves vs. Outflow)</Typography>
                        </Box>
                        <GenericAreaChart chartData={netCumulativeBALFlow} format='amount' dataTitle='USDC Burn' />
                    </Card>
                </Grid>
                <Grid
                    item
                    mt={1}
                    xs={10}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Transaction History</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={10}
                >
                    {transactions && transactions.history_list.length > 0 ?
                        <TreasuryTransactionTable txnHistory={transactions} />
                        : <CircularProgress />}
                </Grid>
            </Grid>
        </Box>
    );
}