
import { useEffect, useState } from 'react';
import { BalancerSDK, balEmissions } from '@balancer-labs/sdk';
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
import { FEE_COLLECTOR_ADDRESS } from '../../constants/wallets';
import useDecoratePools from '../../data/balancer-sdk/useDecoratePools';
import MetricsCard from '../../components/Cards/MetricsCard';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmissionsTable from '../../components/Tables/EmissionsTable';

export default function Emissions() {


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
        name: 'Emissions',
        link: 'emissions'
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)
    navCrumbs.push(poolNav);
    navCrumbs.push(tokenNav)


     //Init SDK
     const sdk = new BalancerSDK({
        network: Number(activeNetwork.chainId),
        rpcUrl: activeNetwork.alchemyRPCUrl,
    });

    //Obtain weekly and yearly BAL emissions
    const { data } = sdk;
    const now = Math.round(new Date().getTime() / 1000)
    const totalBalEmissions = balEmissions.between(now, now + 365 * 86400)
    const weeklyEmissions = balEmissions.weekly(now)

    //Load pools and balances
    const yieldPools = useBalancerPools(250).filter(pool => pool.poolType !== 'LiquidityBootstrapping');
    const filteredPoolDatas = yieldPools.filter((x) => !!x && !POOL_HIDE.includes(x.id) && x.tvlUSD > 1);
    const decoratedPools = useDecoratePools(filteredPoolDatas.length > 10 ? filteredPoolDatas : undefined)

    //Create bar chart data for pool distribution
    const poolBarChartData: BalancerChartDataItem[] = [];
    if (decoratedPools) {
    decoratedPools.map((pool) =>
        poolBarChartData.push(
            {
                value: pool.balEmissions ? pool.balEmissions : 0,
                time: getShortPoolName(pool),
            }
        )
    )
        }
    const poolLineChartData: BalancerChartDataItem[] = [];
    if (decoratedPools) {
    decoratedPools.map((pool) =>
        poolLineChartData.push(
            {
                value: pool.feesUSD,
                time: getShortPoolName(pool),
            }
        )
    )
        }
    //Only get top 20 pools
    const filteredPoolBarChartData = poolBarChartData.sort(function (a, b) {
        return b.value - a.value;
    }).slice(0, 19);
    const filteredPieChartData: BalancerPieChartDataItem[] = filteredPoolBarChartData.map(({ value, time }) => ({
        value: value,
        name: time,
    }))

    

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
                {totalBalEmissions && weeklyEmissions ?
                    <Grid item xs={11}>
                        <Grid
                            container
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{ justifyContent: { md: 'flex-start', xs: 'center' }, alignContent: 'center' }}
                        >
                            <Box m={1}>
                                <MetricsCard
                                mainMetric={totalBalEmissions}
                                mainMetricInUSD={false}
                                mainMetricUnit={' BAL/year'}
                                metricName={'Yearly BAL Emisson'}
                                MetricIcon={AutoAwesomeIcon}

                                />
                                </Box>
                                <Box m={1}>
                                <MetricsCard
                                    mainMetric={weeklyEmissions}
                                    mainMetricInUSD={false}
                                    mainMetricUnit={' BAL/week'}
                                    metricName={'Weekly BAL Emisson'}
                                    MetricIcon={AutoAwesomeIcon}

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
                        <Typography variant='h5'>Top 20 Pools by Emissions</Typography>
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
                                        barChartName={'BAL Emissions'}
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
                                <GenericPieChart data={filteredPieChartData} height='350px' isNotUSD={true} />
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
                    {decoratedPools && decoratedPools.length > 10 ?
                    <EmissionsTable poolDatas={decoratedPools} />:
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