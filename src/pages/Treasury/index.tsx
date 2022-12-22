import { Typography, Grid, Box, Card, Stack, CircularProgress } from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { FEE_COLLECTOR_ADDRESS, getTreasuryConfig } from "../../constants/wallets";
import { useGetTotalBalances } from "../../data/debank/useGetTotalBalances";
import { useGetPortfolio } from '../../data/debank/useGetPortfolio';
import StyledExternalLink from '../../components/StyledExternalLink';
import MetricsCard from '../../components/Cards/MetricsCard';
import FeeCollectorTokenTable from "../../components/Tables/FeeCollectorTokenTable";
import LiquidityPosition from '../../components/LiquidityPosition';
import { BalancerChartDataItem, BalancerPieChartDataItem } from '../../data/balancer/balancerTypes';
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import { useGetTransactions } from "../../data/debank/useGetTransactions";
import { unixToDate } from "../../utils/date";
import GenericAreaChart from "../../components/Echarts/GenericAreaChart";

export default function Treasury() {

    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const chainNav: NavElement = {
        name: 'Chain',
        link: 'chain'
    }
    const feesNav: NavElement = {
        name: 'Treasury',
        link: 'treasury'
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)
    navCrumbs.push(chainNav);
    navCrumbs.push(feesNav);


    const [activeNetwork] = useActiveNetworkVersion()
    //Fetch debank data
    const TREASURY_CONFIG = getTreasuryConfig(activeNetwork.chainId);
    const { portfolio } = useGetPortfolio(TREASURY_CONFIG.treasury);
    const { totalBalances } = useGetTotalBalances(TREASURY_CONFIG.treasury);
    const { transactions } = useGetTransactions(TREASURY_CONFIG.treasury, 1649388375)
    console.log("allTransactions", transactions)

    //TEST
    const usdcChartData = transactions?.history_list.map((el) => {
        if (el.receives && el.receives.length > 0 && el.receives[0].token_id === '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' ) {
            return {
                value: Number(el.receives[0].amount),
                time: unixToDate(el.time_at)
            } 
        }
    }).filter(el => el !== undefined);
    console.log("usdcChartData", usdcChartData)
    const totalsIn = usdcChartData?.reduce((acc, el) => acc + (el?.value ? el.value : 0), 0)
    console.log("totals in", totalsIn)
    const usdcSendChartData = transactions?.history_list.map((el) => {
        if (el.receives && el.sends.length > 0 && el.sends[0].token_id === '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48') {
            return {
                value: Number(el.sends[0].amount),
                time: unixToDate(el.time_at)
            } 
        }
    }).filter(el => el !== undefined);
    console.log("usdcChartData", usdcSendChartData)
    const totals = usdcSendChartData?.reduce((acc, el) => acc + (el?.value ? el.value : 0), 0)
    console.log("totals out", totals)
    //const { transactions } = useGetRawTransactionData(TREASURY_CONFIG.treasury)

    //Obtain wallet total worth and USDC
    const walletTokenNetworth = totalBalances ? totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    let netWorth = portfolio ? portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0;
    netWorth += walletTokenNetworth;
    const usdcReserves = totalBalances ? totalBalances.find(el => {
        if (el.symbol === 'USDC') {
            return el
        }
    })?.amount : 0;

    //Token Balances Pie Chart
    const tokenPieChartData: BalancerPieChartDataItem[] | null = totalBalances ? totalBalances.filter(
        x => x.chain === activeNetwork.debankId &&
            x.amount * x.price > 10).map((balance) => {
                return {
                    value: balance.amount * balance.price,
                    name: balance.symbol
                }
            }
            ) : null;

    const ratioPieChartData: BalancerPieChartDataItem[] = []
    ratioPieChartData.push(
        {
            value: walletTokenNetworth,
            name: 'Tokens'
        }
    )
    ratioPieChartData.push(
        {
            value: netWorth - walletTokenNetworth,
            name: 'Liquidity provisions'
        }
    )

    return (
        totalBalances && portfolio ?
            <Box sx={{ flexGrow: 1, justifyContent: "center" }}>
                
                <Grid
                    container
                    sx={{ justifyContent: 'center' }}
                >
                    <Grid item xs={10}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name} />
                        </Box>

                    </Grid>
                    <Grid mt={2} item xs={10}>
                        <Box display="flex" alignItems="center">
                            <Box>
                                <Typography variant={"h5"}>Treasury Metrics on {activeNetwork.name}</Typography>
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
                                    mainMetric={netWorth}
                                    mainMetricInUSD={true}
                                    metricName='Net Worth'
                                    mainMetricChange={0}
                                    MetricIcon={AccountBalanceIcon}
                                />
                                <MetricsCard
                                    mainMetric={walletTokenNetworth}
                                    mainMetricInUSD={true}
                                    metricName='Tokens in Wallet'
                                    mainMetricChange={0}
                                    MetricIcon={WalletIcon}
                                />
                                <MetricsCard
                                    mainMetric={usdcReserves ? usdcReserves : 0}
                                    mainMetricInUSD={true}
                                    metricName='USDC Reserves'
                                    mainMetricChange={0}
                                    MetricIcon={CurrencyExchangeIcon}
                                />

                            </Stack>
                            {ratioPieChartData ?
                                <Box ml={1}>
                                    <Card sx={{ minWidth: '500px' }}>
                                        <Box p={1}>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="h6"
                                            >
                                                Asset Distribution
                                            </Typography>
                                        </Box>
                                        <GenericPieChart data={ratioPieChartData} height='295px' />
                                    </Card> </Box> : <CircularProgress />}
                            {tokenPieChartData && tokenPieChartData.length > 0 ?
                                <Box ml={1}>
                                    <Card sx={{ minWidth: '500px' }}>
                                        <Box p={1}>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="h6"
                                            >
                                                Token distribution
                                            </Typography>
                                        </Box>
                                        <GenericPieChart data={tokenPieChartData} height='295px' />
                                    </Card> </Box> : <CircularProgress />}
                        </Box>
                    </Grid>

                    <Grid
                        item
                        mt={1}
                        xs={10}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="row">
                            <Box display="flex" alignItems='center'>
                                <Typography variant="h5">Tokens in Treasury Wallet</Typography>
                                <Box ml={1}>
                                    <StyledExternalLink address={TREASURY_CONFIG.treasury} type={'address'} activeNetwork={activeNetwork} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {totalBalances && totalBalances.length > 0 ?
                        <Grid item xs={10}>
                            <FeeCollectorTokenTable tokenBalances={totalBalances} />
                            <Grid mt={2} item xs={10}>
                                <Typography variant="h5">Liquidity Provisions</Typography>
                            </Grid>
                        </Grid> : null}
                    <Grid item xs={10}>

                        {portfolio ?
                            portfolio.map(pos =>
                                pos.chain === activeNetwork.debankId ?
                                <Box key={pos.id + "box"} mb={1}>
                                        <LiquidityPosition key={pos.id + pos.name} position={pos} />
                                </Box> : undefined
                            )
                            : undefined}
                    </Grid>
                </Grid>
            </Box> :
            <Grid
                container
                spacing={2}
                mt='25%'
                sx={{ justifyContent: 'center' }}
            >
                <CustomLinearProgress />
            </Grid>

    );
}