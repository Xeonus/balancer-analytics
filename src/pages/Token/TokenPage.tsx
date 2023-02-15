import { useParams } from 'react-router-dom';
import { Typography, Box, Card, Grid, Stack } from "@mui/material";
import { useBalancerTransactionData } from "../../data/balancer/useTransactions";
import MetricsCard from '../../components/Cards/MetricsCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import NavCrumbs, { NavElement } from '../../components/NavCrumbs';
import StyledExternalLink from '../../components/StyledExternalLink';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useBalancerTokenSingleData } from '../../data/balancer/useTokens';
import { useBalancerPoolsForToken } from '../../data/balancer/usePools';
import { useBalancerTokenPageData } from '../../data/balancer/useTokens';
import CurrencyLogo from '../../components/CurrencyLogo';
import PoolTable from '../../components/Tables/PoolTable';
import TokenChart from '../../components/TokenChart';
import SwapsTable from '../../components/Tables/SwapsTable';
import JoinExitsTable from '../../components/Tables/JoinExitsTable';



export default function TokenPage() {
    const params = useParams();
    const [activeNetwork] = useActiveNetworkVersion();
    const address = params.address ? params.address : '';
    const tokenData = useBalancerTokenSingleData(address);
    const poolData = useBalancerPoolsForToken(address);
    const { swaps, joinExits } = useBalancerTransactionData(
        [address],
        poolData.map((pool) => pool.id),
    );
    const { tvlData, volumeData, priceData } = useBalancerTokenPageData(address);

    console.log("tokenData", tokenData)
    console.log("tvlData", tvlData)
    console.log("volumeData", volumeData)
    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const tokenNav: NavElement = {
        name: 'Tokens',
        link: 'tokens'
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)
    navCrumbs.push(tokenNav);

    console.log("tokenData", tokenData)


    //Ideas to show richer data:
    // Biggest swaps token, bigges fees token? Show Pool routes from swap data?
    return (
        tokenData ?
            <Box sx={{ flexGrow: 2 }}>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'center' }}
                >
                    <Grid item xs={11}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <NavCrumbs crumbSet={navCrumbs} destination={tokenData.symbol} />
                            <StyledExternalLink address={address} type={'address'} activeNetwork={activeNetwork} />
                        </Box>

                    </Grid>
                    <Grid item xs={11}>
                        <Box display="flex" alignItems="center">
                            <Box mr={1}>
                                <CurrencyLogo address={tokenData.address} size={'25px'} />
                            </Box>
                            <Box mr={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>{tokenData.symbol}</Typography>
                            </Box>
                            <Typography >({tokenData.name})</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                        <Grid
                            container
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{ justifyContent: { md: 'flex-start', xs: 'center' }, alignContent: 'center' }}
                        >
                            <Box m={1}>
                                <MetricsCard
                                    mainMetric={tokenData ? tokenData.volumeUSD : 0}
                                    mainMetricInUSD={true}
                                    metricName='Token Volume'
                                    mainMetricChange={tokenData.volumeUSDChange}
                                    MetricIcon={EqualizerIcon}
                                />
                            </Box>
                            <Box m={1}>
                                <MetricsCard
                                    mainMetric={tokenData.tvlUSD}
                                    mainMetricInUSD={true}
                                    metricName='Token TVL'
                                    mainMetricChange={tokenData.tvlUSDChange * 100}
                                    MetricIcon={MonetizationOnIcon}
                                />
                            </Box>
                            <Box m={1}>
                                <MetricsCard
                                    mainMetric={tokenData.txCount}
                                    mainMetricInUSD={false}
                                    metricName='Token Swaps'
                                    mainMetricChange={0}
                                    MetricIcon={SwapHorizontalCircleIcon}

                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={11}>
                        <Box mt={2}>
                            <Typography variant="h5">{tokenData.symbol} - Historical Data </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                        <Box>
                            <Card >
                                <TokenChart tvlData={tvlData} volumeData={volumeData} priceData={priceData} />
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={11}>
                        <Box mt={2}>
                            <Typography variant="h5">{tokenData.symbol} - Deployed Liquidity Pools </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                        <PoolTable poolDatas={poolData} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={11}>
                        <Box mt={2} mb={1}>
                            <Typography variant="h5">Historical Swaps </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={11} >
                        <SwapsTable swaps={swaps} />
                    </Grid>
                    <Grid item xs={11}>
                        <Box mt={2} mb={1}>
                            <Typography variant="h5">Liquidity Provisions </Typography>
                        </Box>
                        <JoinExitsTable joinExits={joinExits} />
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