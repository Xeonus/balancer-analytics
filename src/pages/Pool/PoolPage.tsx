import { useParams } from 'react-router-dom';
import { Typography, Box, Card, Grid, CircularProgress, LinearProgress, Stack } from "@mui/material";
import PoolChart from '../../components/PoolChart';
import { useBalancerPoolData } from "../../data/balancer/usePools";
import { useBalancerPoolPageData, useBalancerPoolSingleData } from "../../data/balancer/usePools";
import { useBalancerTransactionData } from "../../data/balancer/useTransactions";
import { getShortPoolName } from '../../utils/getShortPoolName';
import PoolCurrencyLogo from '../../components/PoolCurrencyLogo';
import PoolComposition from '../../components/PoolComposition';
import PoolCompositionWithLogos from '../../components/PoolCompositionWithLogos';
import SwapFee from '../../components/SwapFee';
import MetricsCard from '../../components/Cards/MetricsCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import PoolTokenChart from '../../components/PoolTokenChart';
import NavCrumbs, { NavElement } from '../../components/NavCrumbs';
import StyledExternalLink from '../../components/StyledExternalLink';
import { useActiveNetworkVersion } from '../../state/application/hooks';



export default function PoolPage() {
    const params = useParams();
    const [activeNetwork] = useActiveNetworkVersion();
    const poolId = params.poolId ? params.poolId : '';
    const poolData = useBalancerPoolSingleData(poolId);
    const { tvlData, volumeData, feesData, tokenDatas } = useBalancerPoolPageData(poolId);
    const { swaps, joinExits, swapPairVolumes } = useBalancerTransactionData(
        (poolData?.tokens || []).map((token) => token.address),
        poolData ? [poolData.id] : [],
    );
    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const poolNav: NavElement = {
        name: 'Pools',
        link: 'pools'
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)
    navCrumbs.push(poolNav);


    //Swaps
    let swaps24h = 0;
    let swaps24hChange = 0;
    if (swaps.length > 10) {
        swaps24h = swaps.filter(swap => swap.timestamp >= (Date.now() - 24 * 3600000) / 1000).length;
        const swaps48hTo24h = swaps.filter(swap => swap.timestamp >= (Date.now() - 48 * 3600000) / 1000 && swap.timestamp <= (Date.now() - 24 * 3600000) / 1000).length;
        swaps24hChange = swaps24h * 100 / swaps48hTo24h - 100;
    }

    //Fees
    let feesUSD = 0;
    let feesUSDChange = 0;
    if (feesData.length > 10) {
        feesUSD = feesData[feesData.length - 1].value;
        if (feesData[feesData.length - 2]) {
            feesUSDChange = 100 / feesData[feesData.length - 2].value * feesData[feesData.length - 1].value - 100
            //feesUSDChange = (feesUSD - feesData[feesData.length - 2].value) / feesData[feesData.length - 2].value
        }
    }

    //Ideas to show richer data:
    //24h swaps / biggest swap / 24h joins / show token price data stacked / poolinfo?
    return (
        poolData ?
            <Box sx={{ flexGrow: 1 }}>

                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <NavCrumbs crumbSet={navCrumbs} destination={getShortPoolName(poolData)} />
                            <StyledExternalLink address={poolData.address} activeNetwork={activeNetwork} />
                        </Box>
                       
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <Box mr={1}>
                                <Typography variant={"h5"}>{poolData.poolType} Pool - </Typography>
                            </Box>
                            <PoolCompositionWithLogos poolData={poolData} size={35} />

                            <Box ml={1}>
                                <SwapFee swapFee={poolData.swapFee} size={30} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            <MetricsCard
                                mainMetric={volumeData ? poolData.volumeUSD : 0}
                                mainMetricInUSD={true}
                                metricName='Pool Volume'
                                mainMetricChange={poolData.volumeUSDChange}
                                MetricIcon={EqualizerIcon}
                            />
                            <MetricsCard
                                mainMetric={poolData.tvlUSD}
                                mainMetricInUSD={true}
                                metricName='Pool TVL'
                                mainMetricChange={poolData.tvlUSDChange * 100}
                                MetricIcon={MonetizationOnIcon}
                            />
                            <MetricsCard
                                mainMetric={swaps24h}
                                mainMetricInUSD={false}
                                metricName='Pool Swaps'
                                mainMetricChange={swaps24hChange}
                                MetricIcon={SwapHorizontalCircleIcon}

                            />
                            <MetricsCard
                                mainMetric={feesUSD}
                                mainMetricInUSD={true}
                                metricName='Pool Fees'
                                mainMetricChange={feesUSDChange}
                                MetricIcon={CurrencyExchangeIcon}

                            />
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <Box mt={2}>
                            <Typography variant="h5">Historical Data </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <PoolChart tvlData={tvlData} volumeData={volumeData} feesData={feesData} />
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        {tokenDatas.length === poolData.tokens.length ? <PoolTokenChart poolData={poolData} tokenDatas={tokenDatas} /> : 
                        <Box display="flex" alignItems="center" flexDirection="column">
                            <CircularProgress />
                            <Typography variant="caption">Loading historical token data</Typography>
                        </Box>}
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                        <Box mt={2}>
                            <Typography variant="h5">Pool Information </Typography>
                        </Box>
                    </Grid>
                
            </Box> :
            <Grid
                container
                spacing={2}
                mt='25%'
                sx={{ justifyContent: 'center' }}
            >
                <CustomLinearProgress /></Grid>
            

    );
}