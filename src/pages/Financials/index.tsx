import { Typography, Grid, Box, Card, CircularProgress } from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import txnJson from '../../data/debank/data/treasuryTxHistory.json'
import { TransactionHistory } from '../../data/debank/debankTypes';
import { BalancerChartDataItem } from '../../data/balancer/balancerTypes';
import { extractTransactionsByTokenAndType, getChartDataByMonth, getChartDataByQuarter, getCumulativeSumTrace, getDailyChartDataByDateRange, getMonthlyChartDataByDateRange } from './helpers';
import { useGetTransactions } from '../../data/debank/useGetTransactions';
import { FEE_STREAMER, getTreasuryConfig, KARPATKEY_SAFE } from '../../constants/wallets';
import GenericAreaChart from '../../components/Echarts/GenericAreaChart';
import TreasuryTransactionTable from '../../components/Tables/TreasuryTransactionTable';
import { useGetTotalBalances } from '../../data/debank/useGetTotalBalances';
import { useGetPortfolio } from '../../data/debank/useGetPortfolio';
import { Stack } from '@mui/system';
import MetricsCard from '../../components/Cards/MetricsCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WalletIcon from '@mui/icons-material/Wallet';
import spJson from '../ServiceProviders/serviceProviderConfig.json'
import { ServiceProvidersConfig } from '../../types';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import { getTotalsBySp, useGetQuarterlyTotalSpendData, useGetSPTableEntry } from '../ServiceProviders/helpers';
import GenericLineChart from '../../components/Echarts/GenericLineChart';
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import IncomeVsSpendingMultiBarChart from '../../components/Echarts/FinancialCharts/IncomeVsSpendingsMultiBarChart';
import GenericPieChartWithVerticalLegend from '../../components/Echarts/GenericPieChartWithVerticalLegend';
import SimpleRunwayGauge from '../../components/Echarts/RunwayGauge/SimpleRunwayGauge';

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

    //Load Txs and history
    const txnHistory: TransactionHistory = JSON.parse(JSON.stringify(txnJson));
    const { transactions } = useGetTransactions(TREASURY_CONFIG.treasury, Math.floor(Date.now() / 1000))
    const karpatkeyBalances = useGetTotalBalances(KARPATKEY_SAFE);
    console.log("transactions", transactions)

    //Merge last 20 tx's with historical data
    const latestTimestamp = Math.max.apply(Math, txnHistory.history_list.map(function (o) { return o.time_at; }))
    //console.log("latestTimestamp", latestTimestamp)
    const txAdditions = transactions?.history_list.filter(tx => tx.time_at > latestTimestamp);
    if (txAdditions && txAdditions.length > 0) {
        txAdditions.forEach(element => {
            txnHistory.history_list.push(element)
        });
    }

    const { totalBalances } = useGetTotalBalances(TREASURY_CONFIG.treasury);
    const { portfolio } = useGetPortfolio(TREASURY_CONFIG.treasury);

    //Obtain wallet total worth and USDC
    const walletTokenNetworth = totalBalances ? totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    let netWorth = portfolio ? portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0;
    netWorth += walletTokenNetworth;
    const usdcReserves = totalBalances && karpatkeyBalances.totalBalances ? totalBalances.find(el => {
        if (el.symbol === 'USDC') {
            return el
        }
    })?.amount : 0;

    const karpatkeyusdcReserves = karpatkeyBalances.totalBalances ? karpatkeyBalances.totalBalances.find(el => {
        if (el.symbol === 'USDC') {
            return el
        }
    })?.amount : 0;

    const totalUSDCReserves = usdcReserves && karpatkeyusdcReserves ? usdcReserves + karpatkeyusdcReserves : 0;



    const balReserves = totalBalances ? totalBalances.find(el => {
        if (el.symbol === 'BAL') {
            return el
        }
    })?.amount : 0;


    //---USDC: SEND and RECEIVE---
    const usdcReceived = extractTransactionsByTokenAndType(txnHistory, usdc.toLowerCase(), 'receive', FEE_STREAMER);
    const quarterlyUSDC = getChartDataByQuarter(usdcReceived);
    const monthlyUSDC = getChartDataByMonth(usdcReceived)
    //USDC Send
    const usdcSend = extractTransactionsByTokenAndType(txnHistory, usdc.toLowerCase(), 'send');
    //temporary fix: exclude tribe tx:
    usdcSend[1].value = 0
    //console.log("usdcSend", usdcSend)
    //const monthlyUSDCSend = getChartDataByMonth(usdcSend)

    //---BAL---
    const balReceive = extractTransactionsByTokenAndType(txnHistory, bal.toLowerCase(), 'receive');
    //console.log("balReceive", balReceive)
    const balSend = extractTransactionsByTokenAndType(txnHistory, bal.toLowerCase(), 'send');

    //---USDC: Cumulative in- and outflows---
    //FIX: receive and send start and end dates need to be considered!
    const startDates: Date[] = [
        new Date(usdcReceived[0].time),
        new Date(usdcSend[0].time),
        new Date(balReceive[0].time),
        new Date(balSend[0].time)
    ];

    startDates.sort((a, b) => a.getTime() - b.getTime())
    //console.log("startDates", startDates)
    let endDates: Date[] = [
        new Date(usdcReceived[usdcReceived.length - 1].time),
        new Date(usdcSend[usdcSend.length - 1].time),
        new Date(balReceive[balReceive.length - 1].time),
        new Date(balSend[balSend.length - 1].time),
    ];
    endDates.sort((a, b) => a.getTime() - b.getTime())
    //console.log("endDates", endDates)

    const startDate = startDates[0];
    const endDate = endDates[endDates.length - 1]
    //console.log("endDate", endDate)


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

    //Create a consistent monthly chart set for a given time range:
    const monthlyUSDCReceived = getMonthlyChartDataByDateRange(usdcReceived, startDate, endDate);
    const monthlyUSDCSend = getMonthlyChartDataByDateRange(usdcSend, startDate, endDate);
    const monthlyBALReceived = getMonthlyChartDataByDateRange(balReceive, startDate, endDate);
    //console.log("montlyBALReceive", monthlyBALReceived)
    const monthlyBALSend = getMonthlyChartDataByDateRange(balSend, startDate, endDate);

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

    //---Historical Treasury wallet chart---
    //Take current balances and do a revert sum based on tx data we already have (net in outflow and smooth, done)
    const dailyUSDCIn = getDailyChartDataByDateRange(usdcReceived, startDate, endDate);
    const dailyUSDCOut = getDailyChartDataByDateRange(usdcSend, startDate, endDate);
    const historicalData: BalancerChartDataItem[] = [];
    if (totalUSDCReserves) {
        let runningAmount = totalUSDCReserves
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


    //Calculate yearly spend based on current quarter spendings:
    //States
    dayjs.extend(quarterOfYear);
    const currentQuarter = dayjs().quarter();
    const sps: ServiceProvidersConfig = JSON.parse(JSON.stringify(spJson));
    const balPriceData = useCoinGeckoSimpleTokenPrices([activeNetwork.balAddress]);


    //SP Data
    const [quarterlyPie, quarterlyTotalBudget] = useGetQuarterlyTotalSpendData(sps, dayjs().year(), currentQuarter, balPriceData)
    const spRows = useGetSPTableEntry(sps, dayjs().year(), currentQuarter, balPriceData);
    const totalsBySpsPie = getTotalsBySp(spRows);
    let monthlyUSDCBurn = 0;
    if (quarterlyPie && quarterlyPie.find(el => el.name === 'USDC')) {
        const el = quarterlyPie.find(el => el.name === 'USDC');
        monthlyUSDCBurn = el ? el.value / 3 : 0;
    }

    //TODO: project based on last 3 month income excluding running month
    const avgIncome = monthlyUSDCReceived.reduce((a, b) => a + b.value, 0) / monthlyUSDCReceived.length;
    const burnRunWay = totalUSDCReserves ? totalUSDCReserves / (monthlyUSDCBurn - avgIncome) : 0;


    //---WETH---
    const wethReceived = extractTransactionsByTokenAndType(txnHistory, weth.toLowerCase(), 'receive');
    const quarterlyWETH = getChartDataByQuarter(wethReceived);



    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={11}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={'DAO Financials'} />
                    </Box>

                </Grid>
                <Grid item xs={11}>
                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography variant={"h5"}>DAO Real-Time Financial Report Dashboard</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={11}
                >
                    <Grid
                        container
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ justifyContent: { md: 'flex-start', xs: 'center' }, alignContent: 'center' }}
                    >
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={walletTokenNetworth ? walletTokenNetworth : 0}
                                mainMetricInUSD={true}
                                metricName='Total Liquid Reserves'
                                mainMetricChange={0}
                                MetricIcon={AccountBalanceIcon}
                            />
                        </Box>
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={totalUSDCReserves ? totalUSDCReserves : 0}
                                mainMetricInUSD={true}
                                metricName='Liquid USDC'
                                mainMetricChange={0}
                                MetricIcon={CurrencyExchangeIcon}
                            />
                        </Box>
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={balReserves ? balReserves : 0}
                                mainMetricInUSD={false}
                                mainMetricUnit={" BAL"}
                                metricName='BAL Reserves'
                                mainMetricChange={0}
                                MetricIcon={WalletIcon}
                            />
                        </Box>

                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{ direction: { xs: 'column', sm: 'row' } }}
                    justifyContent="center"
                    alignItems="left"
                    alignContent="left"
                    spacing={2}
                >
                    <Grid
                        item
                        mt={2}
                        xs={11}
                        md={5.5}
                    >
                        <Card sx={{ boxShadow: 3 }}>
                            <Box p={1} display="flex" alignItems='center'>
                                <Typography variant="h6">Projected Spendings by Currency: Q{currentQuarter} {dayjs().year()}</Typography>
                            </Box>
                            <GenericPieChartWithVerticalLegend data={quarterlyPie} height={'200px'} />

                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        md={5.5}
                        mt={2}
                    >
                        <Card sx={{ boxShadow: 3 }}>
                            <Box p={1} display="flex" alignItems='center'>
                                <Typography variant="h6">Projected Spendings by Service Provider : Q{currentQuarter} {dayjs().year()}</Typography>
                            </Box>
                            <GenericPieChart data={totalsBySpsPie} height={'200px'} />

                        </Card>
                    </Grid>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">USDC Expenditures</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    container
                    sx={{ direction: { xs: 'column', sm: 'row' } }}
                    justifyContent="center"
                    alignItems="left"
                    alignContent="left"
                    spacing={2}
                >
                    <Grid
                        item
                        mt={2}
                        xs={11}
                        md={5.5}
                    >
                        <Card sx={{ boxShadow: 3 }}>
                            <Box p={1}>
                                <Typography variant="h6">Monthly Protocol Fee Income vs. Spendings (USDC)</Typography>
                            </Box>
                            <IncomeVsSpendingMultiBarChart
                                data1={monthlyUSDCReceived}
                                data2={monthlyUSDCSend}
                                dataTitle1='Income'
                                dataTitle2='Spendings'
                                height='300px'
                            />
                        </Card>
                    </Grid>
                    <Grid
                        item
                        mt={2}
                        xs={11}
                        md={5.5}
                    >
                        <Card sx={{ boxShadow: 3 }}>
                            <Box p={1} >
                                <Typography variant="h6">Cumulative USDC Burn (Inflow vs Outflow)</Typography>
                            </Box>
                            <GenericLineChart
                                chartData={netCumulativeUSDCFlow}
                                dataTitle='USDC Burn'
                                height='300px' />
                        </Card>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{ direction: { xs: 'column', sm: 'row' } }}
                    justifyContent="center"
                    alignItems="left"
                    alignContent="left"
                    spacing={2}
                    mt={1}
                >
                    <Grid
                        item
                        xs={11}
                        md={5.5}
                    >
                        <Card sx={{ boxShadow: 3 }}>
                            <Box p={1}>
                                <Typography variant="h6">Funding Runway Projection (Liquid USDC)</Typography>
                            </Box>
                            {totalUSDCReserves ?
                                <SimpleRunwayGauge runwayInMonths={burnRunWay} dataTitle='Funding Reserves' height='300px' /> : <CircularProgress />}
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        md={5.5}
                    >
                        <Card sx={{ boxShadow: 3 }}>
                            <Box p={1}>
                                <Typography variant="h6">Historical USDC Reserves</Typography>
                            </Box>
                            <GenericLineChart chartData={historicalData} dataTitle='USDC Burn' height='300px' />
                        </Card>
                    </Grid>
                </Grid>
                <Grid
                    item
                    mt={1}
                    xs={11}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">BAL Expenditures</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    container
                    sx={{ direction: { xs: 'column', sm: 'row' } }}
                    justifyContent="center"
                    alignItems="left"
                    alignContent="left"
                    spacing={2}
                >
                    <Grid
                        item
                        xs={11}
                        md={5.5}
                    >
                        <Card sx={{ boxShadow: 3 }}>
                            <Box p={1}>
                                <Typography variant="h6">Monthly BAL Inflow vs. Spendings</Typography>
                            </Box>
                            <IncomeVsSpendingMultiBarChart
                                data1={monthlyBALReceived}
                                data2={monthlyBALSend}
                                dataTitle1='Income'
                                dataTitle2='Spendings'
                                height='300px'
                                unit='BAL'
                            />
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        md={5.5}
                    >
                        <Card sx={{ boxShadow: 3 }}>
                            <Box p={1}>
                                <Typography variant="h6">Cumulative BAL Burn (Reserves vs. Outflow)</Typography>
                            </Box>
                            <GenericAreaChart chartData={netCumulativeBALFlow} format='amount' dataTitle='BAL Burn' height='300px' />
                        </Card>
                    </Grid>
                </Grid>
                <Grid
                    item
                    mt={1}
                    xs={11}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Treasury Transaction History</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={1}
                    xs={11}
                >
                    {transactions && transactions.history_list.length > 0 ?
                        <TreasuryTransactionTable txnHistory={txnHistory} />
                        : <CircularProgress />}
                </Grid>
            </Grid>
        </Box>
    );
}