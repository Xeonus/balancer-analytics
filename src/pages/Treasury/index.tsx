import { Typography, Grid, Box, Card, Stack } from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { getTreasuryConfig, KARPATKEY_SAFE } from "../../constants/wallets";
import { useGetTotalBalances } from "../../data/debank/useGetTotalBalances";
import { useGetPortfolio } from '../../data/debank/useGetPortfolio';
import StyledExternalLink from '../../components/StyledExternalLink';
import MetricsCard from '../../components/Cards/MetricsCard';
import FeeCollectorTokenTable from "../../components/Tables/FeeCollectorTokenTable";
import LiquidityPosition from '../../components/LiquidityPosition';
import { BalancerPieChartDataItem } from '../../data/balancer/balancerTypes';
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import { mergeArrays } from "./helpers";
import { EthereumNetworkInfo } from "../../constants/networks";

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
    //console.log("treasury balances", totalBalances);
    const karpatkeyBalances = useGetTotalBalances(KARPATKEY_SAFE);
    //console.log("karpatkeyBalances", karpatkeyBalances.totalBalances)
    const karpatkeyPortfolio = useGetPortfolio(KARPATKEY_SAFE);

    //Obtain wallet total worth and USDC
    const walletTokenNetworth = totalBalances && karpatkeyBalances.totalBalances ?
        totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0)
        + karpatkeyBalances.totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    //const karpatkeyTokenNetworth = karpatkeyBalances.totalBalances ? karpatkeyBalances.totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    let netWorth = portfolio && karpatkeyPortfolio.portfolio ?
        portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0)
        + karpatkeyPortfolio.portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0)
        : 0;
    let karpatkeyNetworth = karpatkeyPortfolio.portfolio ?
        karpatkeyPortfolio.portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0
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

    //BAL insurance fund
    const BALinsuranceAmount = 12500000;
    const balPrice = totalBalances ? totalBalances.find(el => {
        if (el.symbol === 'BAL') {
            return el
        }
    })?.price : 0;
    const BALInsuranceWorth = BALinsuranceAmount * (balPrice ? balPrice : 0);


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

    //Token balances Karpatkey
    const tokenPieChartDataKarpatkey: BalancerPieChartDataItem[] | null = karpatkeyBalances.totalBalances ? karpatkeyBalances.totalBalances.filter(
        x => x.chain === activeNetwork.debankId &&
            x.amount * x.price > 10).map((balance) => {
                return {
                    value: balance.amount * balance.price,
                    name: balance.symbol
                }
            }
            ) : null;

    const ratioPieChartData: BalancerPieChartDataItem[] = []
    if (walletTokenNetworth - BALinsuranceAmount > 0) {
        ratioPieChartData.push(
            {
                value: walletTokenNetworth - BALinsuranceAmount,
                name: 'Tokens'
            }
        )
    }
    if (netWorth - walletTokenNetworth > 0) {
        ratioPieChartData.push(
            {
                value: netWorth - walletTokenNetworth,
                name: 'Treasury Liquidity provisions'
            }
        )
    }
    if (karpatkeyNetworth > 0) {
        ratioPieChartData.push(
            {
                value: karpatkeyNetworth,
                name: 'Karpatkey Liquidity provisions'
            }
        )
    }
    if (activeNetwork === EthereumNetworkInfo) {
        ratioPieChartData.push(
            {
                value: BALinsuranceAmount,
                name: 'Foundation BAL Insurance'
            }
        )
    }
    console.log("ratioPieChartData", ratioPieChartData)

    return (
        <Box sx={{ flexGrow: 2 }}>
            {totalBalances && portfolio ?
                <Grid
                    container
                    spacing={1}
                    sx={{ justifyContent: 'center' }}
                >
                    <Grid item xs={11}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name} />
                        </Box>

                    </Grid>
                    <Grid mt={2} item xs={11}>
                        <Box display="flex" alignItems="center">
                            <Box>
                                <Typography variant={"h5"}>Treasury Metrics on {activeNetwork.name}</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {totalBalances && portfolio ?
                        <Grid item xs={11}>
                            <Grid
                                container
                                columns={{ xs: 4, sm: 8, md: 12 }}
                                sx={{ justifyContent: { md: 'flex-start', xs: 'center' }, alignContent: 'center' }}
                            >
                                <Box m={1}>
                                    <MetricsCard
                                        mainMetric={netWorth}
                                        mainMetricInUSD={true}
                                        metricName='Net Worth'
                                        mainMetricChange={0}
                                        MetricIcon={AccountBalanceIcon}
                                    />
                                </Box>
                                <Box m={1}>
                                    <MetricsCard
                                        mainMetric={walletTokenNetworth}
                                        mainMetricInUSD={true}
                                        metricName='Tokens in Wallet'
                                        mainMetricChange={0}
                                        MetricIcon={WalletIcon}
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
                            </Grid>
                        </Grid> : null}
                    {ratioPieChartData && ratioPieChartData.length > 0 ?
                        <Grid
                            container
                            sx={{ direction: { xs: 'column', sm: 'row' } }}
                            justifyContent="center"
                            alignItems="left"
                            alignContent="left"
                            spacing={1}
                        >
                            <Grid
                                item
                                mt={2}
                                xs={11}
                                md={5.5}
                            >
                                <Box mb={1}>
                                    <Card
                                        sx={{ boxShadow: 3 }}>
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
                                    </Card>
                                </Box>

                            </Grid>
                            {tokenPieChartData && tokenPieChartData.length > 0 && tokenPieChartDataKarpatkey && tokenPieChartDataKarpatkey.length > 0 ?
                                <Grid
                                    item
                                    xs={11}
                                    mt={2}
                                    md={5.5}
                                >
                                    <Card sx={{ boxShadow: 3 }}>
                                        <Box p={1}>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="h6"
                                            >
                                                Token distribution
                                            </Typography>
                                        </Box>
                                        <GenericPieChart data={mergeArrays(tokenPieChartData, tokenPieChartDataKarpatkey)} height='295px' />
                                    </Card>
                                </Grid> : null}
                        </Grid>
                        : null}
                    <Grid
                        item
                        mt={1}
                        xs={11}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="row">
                            <Box display="flex" alignItems='center'>
                                <Typography variant="h6">Tokens in Treasury Wallet</Typography>
                                <Box ml={1}>
                                    <StyledExternalLink address={TREASURY_CONFIG.treasury} type={'address'} activeNetwork={activeNetwork} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {totalBalances && totalBalances.length > 0 ?
                        <Grid item xs={11}>
                            <FeeCollectorTokenTable tokenBalances={totalBalances} />
                            <Grid
                                mt={2}
                                item
                                xs={11}
                            >
                                <Typography variant="h6">Liquidity Provisions</Typography>
                            </Grid>
                        </Grid> : null}
                    <Grid
                        item
                        xs={11}
                    >
                        <Card
                            sx={{ boxShadow: 3 }}
                        >
                            <Box p={2}>
                                {portfolio && portfolio.length > 0 ?
                                    portfolio.map(pos =>
                                        pos.chain === activeNetwork.debankId ?
                                            <Box key={pos.id + "box"} mb={1}>
                                                <LiquidityPosition key={pos.id + pos.name} position={pos} />
                                            </Box> : undefined
                                    )
                                    : <Typography>none</Typography>}
                            </Box>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        mt={2}
                        xs={11}>
                        <Typography variant="h5">Assets Managed by Karpatkey</Typography>
                    </Grid>
                    <Grid
                        item
                        mt={1}
                        xs={11}
                    >

                        <Box display="flex" justifyContent="space-between" alignItems="row">
                            <Box display="flex" alignItems='center'>
                                <Typography variant="h6">Managed Tokens</Typography>
                                <Box ml={1}>
                                    <StyledExternalLink address={KARPATKEY_SAFE} type={'address'} activeNetwork={activeNetwork} />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    {karpatkeyBalances.totalBalances && karpatkeyBalances.totalBalances.length > 0 ?
                        <Grid item xs={11}>
                            <FeeCollectorTokenTable tokenBalances={karpatkeyBalances.totalBalances} />
                        </Grid> : null}
                    <Grid
                        item
                        mt={2}
                        xs={11}>
                        <Typography variant="h6">Managed Liquidity Provisions</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={11}
                    >
                        <Card
                            sx={{ boxShadow: 3 }}
                        >
                            <Box p={2}>
                                {karpatkeyPortfolio.portfolio && karpatkeyPortfolio.portfolio.length > 0 ?
                                    karpatkeyPortfolio.portfolio.map(pos =>
                                        pos.chain === activeNetwork.debankId ?
                                            <Box key={pos.id + "box"} mb={1}>
                                                <LiquidityPosition key={pos.id + pos.name} position={pos} />
                                            </Box> : <Typography>none</Typography>
                                    )
                                    : <Typography>none</Typography>}
                            </Box>
                        </Card>
                    </Grid>

                </Grid>
                :
                <Grid
                    container
                    spacing={2}
                    mt='25%'
                    sx={{ justifyContent: 'center' }}
                >
                    <CustomLinearProgress />
                </Grid>}
        </Box>
    );
}