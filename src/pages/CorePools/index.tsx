import {useActiveNetworkVersion} from "../../state/application/hooks";
import NavCrumbs, {NavElement} from "../../components/NavCrumbs";
import {Card, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import useGetAllPools from "../../data/balancer-api-v3/useGetAllPools";
import {GqlChain} from "../../apollo/generated/graphql-codegen-generated";
import useGetCorePoolCurrentFees from "../../data/maxis/useGetCorePoolCurrentFees";
import CorePoolTable from "../../components/Tables/CorePoolTable";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import LinkIcon from '@mui/icons-material/Link';
import {BalancerChartDataItem, BalancerPieChartDataItem} from "../../data/balancer/balancerTypes";
import MixedLineBarChart from "../../components/Echarts/MixedLineBarChart";
import GenericPieChart from "../../components/Echarts/GenericPieChart";
import MetricsCard from "../../components/Cards/MetricsCard";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PoolMetricsCard from "../../components/Cards/PoolMetricsCard";

export default function CorePools() {


    const [activeNetwork] = useActiveNetworkVersion();
    let globalPools = useGetAllPools(['MAINNET', 'POLYGON', 'ARBITRUM', 'ZKEVM', 'AVALANCHE', 'BASE']);
    const corePools = useGetCorePoolCurrentFees();

    const totalFees = corePools.reduce((acc, pool) => acc + parseFloat(pool.earned_fees), 0)
    const corePoolIds = new Set(corePools.map(pool => pool.poolId));
    const coreGlobalPools = globalPools?.filter(pool => corePoolIds.has(pool.poolId));


    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)

    // Step 1: Sort the coreGlobalPools by TVL (totalLiquidity)
    const poolBarChartData: BalancerChartDataItem[] = [];
    const poolLineChartData: BalancerChartDataItem[] = []
    // Check if coreGlobalPools is defined and corePools is not empty before proceeding.
    if (coreGlobalPools && corePools.length > 0) {
        // Sort the coreGlobalPools by TVL (totalLiquidity)
        const sortedCoreGlobalPools = [...coreGlobalPools].sort((a, b) => b.totalLiquidity - a.totalLiquidity);

        // Create a mapping for quick access to earned_fees from corePools using poolId
        const feesByPoolId = new Map(corePools.map(pool => [pool.poolId, parseFloat(pool.earned_fees)]));

        // Construct the data for the charts, ensuring alignment in pool ordering between the bar and line chart data.
        sortedCoreGlobalPools.forEach(pool => {
            // Prepare data for the bar chart (TVL)
            poolBarChartData.push({
                value: pool.totalLiquidity,
                time: pool.name, // Using the pool name for the time axis as a unique identifier
            });

            // For the line chart, we want to match the earned fees with the correct pool.
            const earnedFees = feesByPoolId.get(pool.poolId) || 0; // Default to 0 if no matching pool is found
            // Prepare data for the line chart (earned fees)
            poolLineChartData.push({
                value: earnedFees,
                time: pool.name, // The time values (pool names) must match with the bar chart data
            });
        });
    }




    //Only get top 20 core pools
    const filteredPoolBarChartTVLData = poolBarChartData.slice(0, 19);
    const filteredPoolBarChartData = poolLineChartData.slice(0, 19);

    //Top 20 core pools
    const filteredPieChartData: BalancerPieChartDataItem[] = filteredPoolBarChartData.map(({value, time}) => ({
        value: value,
        name: time,
    }))

    //Core pools by chain
    const activeChains = ['MAINNET', 'POLYGON', 'ARBITRUM', 'ZKEVM', 'AVALANCHE', 'BASE'];
    const chainPieChartData: BalancerPieChartDataItem[] = activeChains.map(chain => ({
        name: chain,
        value: corePools.reduce((sum, pool) => {
            return pool.chain === chain.toLowerCase() ? sum + parseFloat(pool.earned_fees) : sum;
        }, 0),
    }));

    //Fee distribution
    const feeDistroPieChartData: BalancerPieChartDataItem[] = [
        {
            name: 'Revenue to DAO',
            value: totalFees * 0.175
        },
        {
            name: 'Revenue to veBAL',
            value: totalFees * 0.325
        },
        {
            name: 'Voting incentives',
            value: totalFees * 0.5
        },
    ]

    return (
        <Box sx={{flexGrow: 2}}>
            <Grid
                container
                spacing={2}
                sx={{justifyContent: 'center'}}
            >
                <Grid item xs={11} mb={2}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={'Core Pools'}/>
                    </Box>

                </Grid>
                <Grid item xs={11}>
                    <Typography variant={'h5'}>Core Pool Revenue Metrics</Typography>

                </Grid>
                <Grid mb={2} item xs={11}>
                    <MetricsCard
                        mainMetric={totalFees}
                        mainMetricInUSD={true}
                        metricName={'Total Core Fees'}
                        MetricIcon={MonetizationOnIcon}
                    />
                </Grid>
                <Grid
                    container
                    sx={{
                        direction: {xs: 'column', sm: 'row'}
                    }}
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
                        <Card >
                            <Box m={1}>
                                <Typography variant={'h6'}>Revenue distribution</Typography>
                            </Box>
                            <GenericPieChart data={feeDistroPieChartData} height='250px'/>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        md={5.5}
                    >
                        <Card >
                            <Box m={1}>
                                <Typography variant={'h6'}>Revenue per Chain</Typography>
                            </Box>
                            <GenericPieChart data={chainPieChartData} height='250px'/>
                        </Card>
                    </Grid>
                {filteredPoolBarChartData.length > 1 ?
                    <Grid
                        item
                        ml={1}
                        mt={1}
                        xs={11}
                    >
                        <Box mb={1}>
                        <Typography variant='h5'>
                            Top 20 Core Pools by Fees Earned on all Deployments
                        </Typography>
                        </Box>
                    </Grid> : null}
                {filteredPoolBarChartData.length > 1 ?
                    <Grid
                        container
                        sx={{
                            direction: {xs: 'column', sm: 'row'}
                        }}
                        justifyContent="center"
                        alignItems="left"
                        alignContent="left"
                        spacing={2}
                    >

                        {filteredPoolBarChartData.length > 1 ?
                            <Grid
                                item
                                xs={11}
                                md={5.5}
                            >
                                <Card

                                >
                                    < MixedLineBarChart
                                        barChartData={filteredPoolBarChartTVLData}
                                        barChartName={'TVL'}
                                        lineChartData={filteredPoolBarChartData}
                                        lineChartName={'Earned Protocol Fees'}
                                        rotateAxis={true}/>
                                </Card>
                            </Grid> : null}
                        <Grid
                            item
                            xs={11}
                            md={5.5}
                        >
                            <Card
                            >
                                <GenericPieChart data={filteredPieChartData} height='350px'/>
                            </Card>

                        </Grid>
                    </Grid> : null}
                <Grid mb={1} item xs={11}>
                    <Typography variant={'h5'}>
                        Core Pools: Earned Fees Statistics
                    </Typography>
                </Grid>

                </Grid>
                <Grid item xs={11}>
                    <Typography variant={'body1'}>
                        {'This table provides an overview of currently collected fees from core pools as per the core pool framework '}
                        <a
                            href="https://forum.balancer.fi/t/bip-457-core-pool-incentive-program-automation/5254"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }} // Adjust styles as needed
                        >
                            core-pool framework
                            <LinkIcon style={{ verticalAlign: 'bottom', marginLeft: '0.25rem' }} />
                        </a>
                        {'.'}
                    </Typography>
                </Grid>

                <Grid item xs={11}>
                    {globalPools && globalPools.length > 10 ?
                    <CorePoolTable poolDatas={globalPools} corePools={corePools} /> :
                        <Grid
                            container
                            spacing={2}
                            mt='10%'
                            sx={{justifyContent: 'center'}}
                        >
                            <CustomLinearProgress/>
                        </Grid>}

                </Grid>
                <Grid>
                </Grid>
            </Grid>
        </Box>
    );
}