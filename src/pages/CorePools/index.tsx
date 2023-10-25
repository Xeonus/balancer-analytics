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

export default function CorePools() {


    const [activeNetwork] = useActiveNetworkVersion();
    let globalPools = useGetAllPools(['MAINNET', 'POLYGON', 'ARBITRUM', 'ZKEVM', 'AVALANCHE', 'BASE']);
    //console.log("globalPools", globalPools)
    const corePools = useGetCorePoolCurrentFees();
    //console.log("corePools", corePools)

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

    console.log("poolLineChartData", poolLineChartData)




    //Only get top 20 core pools
    const filteredPoolBarChartTVLData = poolBarChartData.slice(0, 19);
    const filteredPoolBarChartData = poolLineChartData.slice(0, 19);

    const filteredPieChartData: BalancerPieChartDataItem[] = filteredPoolBarChartData.map(({value, time}) => ({
        value: value,
        name: time,
    }))

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
                {filteredPoolBarChartData.length > 1 ?
                    <Grid
                        item
                        ml={1}
                        mt={1}
                        xs={11}
                    >
                        <Typography variant='h5'>
                            Top 20 Core Pools by Fees Earned on all Deployments
                        </Typography>
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
                                md={5}
                            >
                                <Card
                                    sx={{boxShadow: 3}}
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
                            md={5}
                        >
                            <Card
                                sx={{boxShadow: 3}}
                            >
                                <GenericPieChart data={filteredPieChartData} height='350px'/>
                            </Card>

                        </Grid>
                    </Grid> : null}
                <Grid item xs={11}>
                    <Typography variant={'h5'}>
                        Core Pools: Earned Fees Statistics
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant={'body1'}>
                        {'This table provides an overview of currently collected fees that are distributed according to the '}
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
                            mt='25%'
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