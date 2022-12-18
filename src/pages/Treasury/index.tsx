import { Typography, Grid, Box, Card, Stack, CircularProgress } from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { getTreasuryConfig } from "../../constants/wallets";
import { useGetTotalBalances } from "../../data/debank/useGetTotalBalances";
import { useGetPortfolio } from '../../data/debank/useGetPortfolio';
import StyledExternalLink from '../../components/StyledExternalLink';
import MetricsCard from '../../components/Cards/MetricsCard';
import FeeCollectorTokenTable from "../../components/Tables/FeeCollectorTokenTable";
import LiquidityPosition from '../../components/LiquidityPosition';
import { BalancerPieChartDataItem } from '../../data/balancer/balancerTypes';
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';

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
    const TREASURY_CONFIG = getTreasuryConfig(activeNetwork.chainId);
    const { portfolio } = useGetPortfolio(TREASURY_CONFIG.treasury);
    const { totalBalances } = useGetTotalBalances(TREASURY_CONFIG.treasury);

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
            name: 'Deployed liquidity'
        }
    )

    return (
        totalBalances && portfolio ?
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                spacing={1}
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
                    <Box display="flex" justifyContent="space-around" alignItems="row">
                        <Stack direction="column" spacing={1} justifyContent="flex-start">
                            <MetricsCard
                            mainMetric={netWorth}
                            mainMetricInUSD={true}
                            metricName='Net Worth'
                            mainMetricChange={0}
                            MetricIcon={WalletIcon}
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
                        {tokenPieChartData ?
                        <Box ml={1}>
                            <Card sx={{ minWidth: '400px' }}>
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
                    spacing={1}
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

                {totalBalances ?
                    <Grid item xs={10}>
                        <FeeCollectorTokenTable tokenBalances={totalBalances} />
                        <Grid mt={2} item xs={10}>
                            <Typography variant="h5">Liquidity Provisions</Typography>
                        </Grid>
                    </Grid> : null}
                    <Grid item xs={10}>
                <Card> 
                    <Box p={1}>
                    {portfolio ?
                    portfolio.map(pos =>
                            <LiquidityPosition position={pos} />
                    )
                    : undefined }
                    </Box>
                    </Card>
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