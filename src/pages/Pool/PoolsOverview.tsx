
import { useEffect, useState } from 'react';
import { Typography, Grid, Stack, Card } from "@mui/material";
import PoolTable from "../../components/Tables/PoolTable";
import { useBalancerPools } from "../../data/balancer/usePools";
import { useActiveNetworkVersion } from "../../state/application/hooks";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import { Box } from "@mui/system";
import PoolMetricsCard from "../../components/Cards/PoolMetricsCard";
import { POOL_HIDE } from "../../constants";
import { BalancerChartDataItem, BalancerPieChartDataItem, PoolData } from "../../data/balancer/balancerTypes";
import { getShortPoolName } from '../../utils/getShortPoolName';
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import MixedLineBarChart from '../../components/Echarts/MixedLineBarChart';
import NavCrumbs from '../../components/NavCrumbs';
import { NavElement } from '../../components/NavCrumbs';

export default function PoolsOverview() {


    const [activeNetwork] = useActiveNetworkVersion();

    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const poolNav: NavElement = {
        name: 'Chain',
        link: 'chain'
    }
    const tokenNav: NavElement = {
        name: 'Pools',
        link: 'pools'
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)
    navCrumbs.push(poolNav);
    navCrumbs.push(tokenNav)


    //Load pools
    const poolData = useBalancerPools();
    const filteredPoolDatas = poolData.filter((x) => !!x && !POOL_HIDE.includes(x.id) && x.tvlUSD > 1);

    //Create bar chart data for pool distribution
    const poolBarChartData: BalancerChartDataItem[] = [];
    filteredPoolDatas.map((pool) =>
        poolBarChartData.push(
            {
                value: pool.tvlUSD,
                time: getShortPoolName(pool),
            }
        )
    )
    const poolLineChartData: BalancerChartDataItem[] = [];
    filteredPoolDatas.map((pool) =>
        poolLineChartData.push(
            {
                value: pool.feesUSD,
                time: getShortPoolName(pool),
            }
        )
    )
    //Only get top 20 pools
    const filteredPoolBarChartData = poolBarChartData.slice(0, 19);
    const filteredPieChartData: BalancerPieChartDataItem[] = filteredPoolBarChartData.map(({ value, time }) => ({
        value: value,
        name: time,
    }))

    const [topTVLPool, setTopTVLPool] = useState({} as PoolData)
    const [topFeePool, setTopFeePool] = useState({} as PoolData)
    const [topVolumePool, setTopVolumePool] = useState({} as PoolData)
    useEffect(() => {
        if (filteredPoolDatas && filteredPoolDatas.length > 10) {
            const topTVL = filteredPoolDatas.reduce(function (prev, current) {
                return (prev.tvlUSD > current.tvlUSD) ? prev : current
            })
            const topFees = filteredPoolDatas.reduce(function (prev, current) {
                return (prev.feesUSD > current.feesUSD) ? prev : current
            })
            const topVolume = filteredPoolDatas.reduce(function (prev, current) {
                return (prev.volumeUSD > current.volumeUSD) ? prev : current
            })
            if (topTVL) {
                setTopTVLPool(topTVL)
            }
            if (topFees) {
                setTopFeePool(topFees)
            }
            if (topVolume) {
                setTopVolumePool(topVolume)
            }
        }
    }, [JSON.stringify(filteredPoolDatas)]);

    //Ideas: show Top Pools: TVL, Fees, Swaps etc?
    //show bar graph top 50 pools per TVL! -> beets dashboard inspiration

    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                spacing={2}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={11} mb={2}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name} />
                    </Box>

                </Grid>
                {topTVLPool.address && topFeePool.address ?
                    <Grid item xs={11}>
                        <Grid
                            container
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{ justifyContent: { md: 'flex-start', xs: 'center' }, alignContent: 'center' }}
                        >
                            <Box m={1}>
                                <PoolMetricsCard
                                    mainMetric={topVolumePool.volumeUSD}
                                    mainMetricInUSD={true}
                                    mainMetricChange={topVolumePool.volumeUSDChange}
                                    metricName={'Top Volume'}
                                    poolTokenData={topVolumePool.tokens}
                                />
                            </Box>
                            <Box m={1}>
                                <PoolMetricsCard
                                    mainMetric={topTVLPool.tvlUSD}
                                    mainMetricInUSD={true}
                                    mainMetricChange={topTVLPool.tvlUSDChange}
                                    metricName={'Top TVL'}
                                    poolTokenData={topTVLPool.tokens}
                                />
                            </Box>
                            <Box m={1}>
                                <PoolMetricsCard
                                    mainMetric={topFeePool.feesUSD}
                                    mainMetricInUSD={true}
                                    metricName={'Top Fees'}
                                    poolTokenData={topFeePool.tokens}
                                />
                            </Box>
                        </Grid>
                    </Grid> : null}
                {filteredPoolBarChartData.length > 1 ?
                    <Grid
                        item
                        ml={1}
                        mt={1}
                        xs={11}
                    >
                        <Typography variant='h5'>Top 20 Pools by TVL</Typography>
                    </Grid> : null}
                {filteredPoolBarChartData.length > 1 ?
                    <Grid
                        container
                        sx={{
                            direction: { xs: 'column', sm: 'row' }
                        }}
                        justifyContent="center"
                        alignItems="left"
                        alignContent="left"
                        spacing={2}
                    >

                        {filteredPoolBarChartData.length > 1 ?
                            <Grid
                                item
                                xs={10}
                                md={5}
                            >
                                <Card
                                    sx={{ boxShadow: 3 }}
                                >
                                    < MixedLineBarChart
                                        barChartData={filteredPoolBarChartData}
                                        barChartName={'TVL'}
                                        lineChartData={poolLineChartData}
                                        lineChartName={'Trading Fees 24h'}
                                        rotateAxis={true} />
                                </Card>
                            </Grid> : null}
                        <Grid
                            item
                            xs={10}
                            md={5}
                        >
                            <Card
                                sx={{ boxShadow: 3 }}
                            >
                                <GenericPieChart data={filteredPieChartData} height='350px' />
                            </Card>

                        </Grid>
                    </Grid> : null}
                <Grid
                    item
                    xs={11}
                    mt={1}
                    mb={1}>
                    <Typography variant="h5" mb={1}>
                        Deployed Liquidity on {activeNetwork.name}
                    </Typography>
                    {poolData.length > 10 ?
                        <PoolTable poolDatas={poolData} /> :
                        <Grid
                            container
                            spacing={2}
                            mt='25%'
                            sx={{ justifyContent: 'center' }}
                        >
                            <CustomLinearProgress />
                        </Grid>}
                </Grid>
            </Grid>
        </Box>
    );
}