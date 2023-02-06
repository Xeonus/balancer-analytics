import Box from '@mui/material/Box';
import { Card, Grid, Typography, Stack } from '@mui/material';
import MetricsCard from '../../components/Cards/MetricsCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useBalancerChainProtocolData } from '../../data/balancer/useProtocolDataWithClientOverride';
import PoolChart from '../../components/PoolChart';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import PoolTableCompact from "../../components/Tables/PoolTableCompact";
import { useBalancerPools } from "../../data/balancer/usePools";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import SwapsTable from '../../components/Tables/SwapsTable';
import ExploreCard from '../../components/Cards/ExploreCard';
import TokenIcon from '@mui/icons-material/Token';
import WavesIcon from '@mui/icons-material/Waves';
import { networkPrefix } from '../../utils/networkPrefix';



export default function Chain() {

    const [activeNetwork] = useActiveNetworkVersion()
    const protocolData = useBalancerChainProtocolData(activeNetwork.clientUri, activeNetwork.startTimeStamp);
    const poolData = useBalancerPools(20);


    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const poolNav: NavElement = {
        name: 'Chain',
        link: 'chain'
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)
    navCrumbs.push(poolNav);

    return (
        <Box sx={{ flexGrow: 2, width: '100%' }}>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={11}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name} />
                    </Box>

                </Grid>
                <Grid item xs={11}>
                    <Box display="flex" alignItems="center">
                        <Box mb={1}>
                            <Typography variant={"h5"}>Chain Metrics ({activeNetwork.name})</Typography>
                        </Box>
                    </Box>
                </Grid>


                <Grid
                    item
                    xs={11}
                >
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="flex-start">
                        <MetricsCard
                            mainMetric={protocolData.volume24 ? protocolData.volume24 : 0}
                            mainMetricInUSD={true}
                            metricName='Volume'
                            mainMetricChange={protocolData.volumeChange ? protocolData.volumeChange * 100 : 0}
                            MetricIcon={EqualizerIcon}
                        />
                        <MetricsCard
                            mainMetric={protocolData.tvl ? protocolData.tvl : 0}
                            mainMetricInUSD={true}
                            metricName='TVL'
                            mainMetricChange={protocolData.tvlChange ? protocolData.tvlChange * 100 : 0}
                            MetricIcon={MonetizationOnIcon}
                        />
                        <MetricsCard
                            mainMetric={protocolData.fees24 ? protocolData.fees24 : 0}
                            mainMetricInUSD={true}
                            metricName='Fees'
                            mainMetricChange={protocolData.feesChange ? protocolData.feesChange * 100 : 0}
                            MetricIcon={CurrencyExchangeIcon}
                        />
                    </Stack>
                </Grid>
                <Grid item mt={1} xs={11}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                    >
                        <Box mb={1}>
                            <ExploreCard linkName='Pools' linkTarget={networkPrefix(activeNetwork) + 'pools'} MetricIcon={WavesIcon} />
                        </Box>
                        <Box mb={1}>
                            <ExploreCard linkName='Tokens' linkTarget={networkPrefix(activeNetwork) + 'tokens'} MetricIcon={TokenIcon} />
                        </Box>
                    </Stack>

                </Grid>
                <Grid
                    item
                    mt={1}
                    xs={11}
                >
                    <Box mt={2}>
                        <Typography variant='h5'>Historical Performance</Typography>
                    </Box>
                    <Box>
                        <Card>
                            <PoolChart tvlData={protocolData.tvlData} volumeData={protocolData.volumeData} feesData={protocolData.feeData} />
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box mt={2}>
                        <Typography variant="h5" mb={1}> Top 10 Liquidity Pools by TVL</Typography>
                    </Box>
                </Grid>
                {poolData.length >= 1 ?
                    <Grid item xs={11}>
                            <PoolTableCompact poolDatas={poolData} />
                    </Grid>
                    :
                    <Grid
                        container
                        spacing={2}
                        mt={5}
                        sx={{ justifyContent: 'center' }}
                    >
                        <CustomLinearProgress />
                    </Grid>}
                <Grid
                    item
                    mt={1}
                    xs={10}
                >
                    <Grid item xs={11} >
                        <Box mt={2}>
                            <Typography variant='h5'>Large Swaps</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={11}>
                    <SwapsTable swaps={protocolData.whaleSwaps} />
                </Grid>
            </Grid>
        </Box>
    );
}