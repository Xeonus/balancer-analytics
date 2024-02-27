import NavCrumbs, {NavElement} from "../../components/NavCrumbs";
import {Card, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import useGetAllPools from "../../data/balancer-api-v3/useGetAllPools";
import useGetCorePoolCurrentFees from "../../data/maxis/useGetCorePoolCurrentFees";
import CorePoolTable from "../../components/Tables/CorePoolTable";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import LinkIcon from '@mui/icons-material/Link';
import {BalancerChartDataItem, BalancerPieChartDataItem} from "../../data/balancer/balancerTypes";
import MixedLineBarChart from "../../components/Echarts/MixedLineBarChart";
import GenericPieChart from "../../components/Echarts/GenericPieChart";
import MetricsCard from "../../components/Cards/MetricsCard";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {useEffect, useState} from "react";
import useGetCorePoolHistoricalFees from "../../data/maxis/useGetCorePoolHistoricalFees";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {getLastThursdayOddWeek} from "../../data/maxis/static/dataHelpers";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import CorePoolHistoricalTable from "../../components/Tables/CorePoolHistoricalTable";
import useGetCollectedFees from "../../data/maxis/useGetTotalFeesCollected";
import CorePoolEarnedVsSweptTable from "../../components/Tables/CorePoolEarnedVsSweptTable";
import {NetworkFees, PoolFeeRecord} from "../../data/maxis/maxiStaticTypes";

function formatDate(date: Date) {
    return date.toISOString().split('T')[0];
}

function calculateDelta(historicalFees: NetworkFees, poolFeeRecords: PoolFeeRecord[]): number {
    // Calculate total amount from historicalCollectedNetworkFees
    const totalSwept = Object.values(historicalFees).reduce((acc, current) => acc + current, 0);

    // Sum up fees_to_vebal, fees_to_dao, and total_incentives from historicalData
    const totalHistoricalSum = poolFeeRecords.reduce((acc, record) => {
        const feesToVebal = parseFloat(record.fees_to_vebal);
        const feesToDao = parseFloat(record.fees_to_dao);
        const totalIncentives = parseFloat(record.total_incentives);
        return acc + feesToVebal + feesToDao + totalIncentives;
    }, 0);

    // Calculate the delta
    return totalSwept - totalHistoricalSum;
}

export default function CorePools() {

    const globalPools = useGetAllPools(['MAINNET', 'POLYGON', 'ARBITRUM', 'ZKEVM', 'AVALANCHE', 'BASE', 'GNOSIS']);
    const currentData = useGetCorePoolCurrentFees();

    const lastOddWeekThu = getLastThursdayOddWeek();
    const lastOddWeekThuString = formatDate(lastOddWeekThu)
    const [selectedEndDate, setSelectedEndDate] = useState<string>(lastOddWeekThuString);
    const historicalData = useGetCorePoolHistoricalFees(selectedEndDate);
    const historicalCollectedNetworkFees = useGetCollectedFees(selectedEndDate)
    let delta = 0
    let totalSwept = 0
    let totalHistoricalSum = 0
    if (historicalCollectedNetworkFees && historicalData) {
        totalSwept = Object.values(historicalCollectedNetworkFees).reduce((acc, current) => acc + current, 0);
        // Sum up fees_to_vebal, fees_to_dao, and total_incentives from historicalData
        totalHistoricalSum = historicalData.reduce((acc, record) => {
            const feesToVebal = parseFloat(record.fees_to_vebal);
            const feesToDao = parseFloat(record.fees_to_dao);
            const totalIncentives = parseFloat(record.total_incentives);
            return acc + feesToVebal + feesToDao + totalIncentives;
        }, 0);

        delta = totalSwept - totalHistoricalSum;
    }

    const [selectedPeriod, setSelectedPeriod] = useState<string>("Current Fee Epoch");
    const [periods, setPeriods] = useState<string[]>([]);

    useEffect(() => {
        const generatePeriods = (firstDataOccurrence: string, lastOddThursday: Date): string[] => {
            let tempPeriods: string[] = ["Current Fee Epoch"]; // Temporarily holds the periods, starting with the current epoch
            let endDate = new Date(lastOddThursday);
            let startDate = new Date(firstDataOccurrence);

            while (startDate <= endDate) {
                let periodStart = new Date(startDate);
                let periodEnd = new Date(periodStart);
                periodEnd.setDate(periodEnd.getDate() + 14); // Adjust to include the correct period span

                if (periodEnd > endDate) {
                    periodEnd = endDate;
                }

                // Constructing the period string
                tempPeriods.push(`${formatDate(periodStart)} to ${formatDate(periodEnd)}`);

                startDate.setDate(startDate.getDate() + 14); // Moving to the next period
            }

            // Reverse the order of periods to have them from most recent to oldest, excluding the "Current Fee Epoch"
            return ["Current Fee Epoch", ...tempPeriods.slice(1).reverse()];
        };

        const lastOddThursday = getLastThursdayOddWeek();
        const firstDataOccurrence = "2023-09-28"; // Assuming this is the correct start date
        setPeriods(generatePeriods(firstDataOccurrence, lastOddThursday));
    }, []);

    useEffect(() => {
        // Update selectedEndDate based on selectedPeriod
        if (selectedPeriod !== "Current Fee Epoch") {
            const periodParts = selectedPeriod.split(" to ");
            console.log("periodParts", periodParts)
            setSelectedEndDate(periodParts[0]); // Assuming format "YYYY-MM-DD to YYYY-MM-DD"
        } else {
            setSelectedEndDate(lastOddWeekThuString); // No historical data needed for "Current Fee Epoch"
        }
    }, [selectedPeriod]);

    const handlePeriodChange = (event: SelectChangeEvent) => {
        setSelectedPeriod(event.target.value as string);
    };

    // Decide which data set to display based on selected period
    let corePools = selectedPeriod === "Current Fee Epoch" ? currentData : historicalData;


    const totalFees = corePools?.reduce((acc, pool) => acc + parseFloat(pool.earned_fees), 0)
    const corePoolIds = new Set(corePools?.map(pool => pool.poolId));
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
    if (coreGlobalPools && corePools && corePools.length > 0) {
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
    const activeChains = ['MAINNET', 'POLYGON', 'ARBITRUM', 'ZKEVM', 'AVALANCHE', 'BASE', 'GNOSIS'];
    const chainPieChartData: BalancerPieChartDataItem[] = activeChains.map(chain => ({
        name: chain,
        value: corePools ? corePools.reduce((sum, pool) => {
            return pool.chain === chain.toLowerCase() ? sum + parseFloat(pool.earned_fees) : sum;
        }, 0) : 0,
    }));

    //Fee distribution
    const feeDistroPieChartData: BalancerPieChartDataItem[] = [
        {
            name: 'Core Pool Revenue to DAO',
            value: totalFees ? totalFees * 0.175 : 0
        },
        {
            name: 'Core Pool Revenue to veBAL',
            value: totalFees ? totalFees * 0.325 : 0
        },
        {
            name: 'Core Pool Voting incentives',
            value: totalFees ? totalFees * 0.5 : 0
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
                <Grid item xs={11} mb={2}>
                    <FormControl size="small">
                        <Select
                            sx={{
                                backgroundColor: "background.paper",
                                boxShadow: 2,
                                borderRadius: 2,
                                borderColor: 0,
                            }}
                            color="primary"
                            labelId="timeRangeSelectLabel"
                            id="timeRangeSelect"
                            onChange={handlePeriodChange}
                            value={selectedPeriod}
                            inputProps={{
                                name: 'timeRange',
                                id: 'timeRangeId-native-simple',
                            }}
                        >
                            {periods.map((period, index) => (
                                <MenuItem

                                    key={index}
                                    value={period === "Current Fee Epoch" ? period : period.split(" to ")[1]}>
                                    {period}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={11}>
                    <Typography sx={{fontSize: '24px'}}>Core Pool Revenue Metrics</Typography>

                </Grid>
                <Grid mb={1} item xs={11}>
                    <Grid
                        container
                        columns={{xs: 4, sm: 8, md: 12}}
                        sx={{justifyContent: {md: 'space-between', xs: 'center'}, alignContent: 'center'}}
                    >
                        <Box m={{xs: 0, sm: 1}}>
                            <MetricsCard
                                mainMetric={totalFees ? totalFees : 0}
                                mainMetricInUSD={true}
                                metricName={'Total Core Fees Collected'}
                                MetricIcon={MonetizationOnIcon}
                                toolTipText={'Total amount of fees collected from core pools. This includes swap fees and the protocol fee cut of 50% on yield-bearing assets.'}
                            />
                        </Box>
                        <Box m={{xs: 0, sm: 1}}>
                            <MetricsCard
                                mainMetric={totalFees ? totalFees * 0.5 : 0}
                                mainMetricInUSD={true}
                                metricName={'Voting Incentives'}
                                MetricIcon={HowToVoteIcon}
                                toolTipText={'Minimum amount of voting incentives being placed in total. Fees earned from non-core pools are not included.'}
                            />
                        </Box>
                        <Box m={{xs: 0, sm: 1}}>
                            <MetricsCard
                                mainMetric={totalFees ? totalFees * 0.325 : 0}
                                mainMetricInUSD={true}
                                metricName={'veBAL Revenue Share'}
                                MetricIcon={AccountBalanceWalletIcon}
                                toolTipText={'Out of all core pool fees earned, 32.5% of revenue is shared with veBAL holders.'}
                            />
                        </Box>
                        <Box m={{xs: 0, sm: 1}}>
                            <MetricsCard
                                mainMetric={totalFees ? totalFees * 0.175 : 0}
                                mainMetricInUSD={true}
                                metricName={'DAO Revenue Share'}
                                MetricIcon={AccountBalanceIcon}
                                toolTipText={'Out of all core pool fees earned, 17.5% of revenue is streamed to the DAO treasury.'}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

                {/*<Grid
                        item
                        xs={11}
                        md={5.5}
                    >
                        <Card sx={{
                            minHeight: '125px',
                            maxWidth: '700px',
                            boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",
                        }}>
                            <Box m={1}>
                                <Typography variant={'h6'}>Core Pool Revenue distribution</Typography>
                            </Box>
                            <GenericPieChart data={feeDistroPieChartData} height='250px'/>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        md={5.5}
                    >
                        <Card sx={{
                            minHeight: '125px',
                            maxWidth: '700px',
                            boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",
                        }}>
                            <Box m={1}>
                                <Typography variant={'h6'}>Core Pool Revenue per Chain</Typography>
                            </Box>
                            <GenericPieChart data={chainPieChartData} height='250px'/>
                        </Card>
                    </Grid>*/}

                    {filteredPoolBarChartData.length > 1 && (
                        <Grid
                            container
                            sx={{direction: {xs: 'column', sm: 'row'}}}
                            justifyContent="space-around"
                            alignItems="left"
                            alignContent="left"
                            spacing={2}
                        >
                            <Grid
                                item
                                mt={1}
                                xs={11}
                                md={5}
                            >
                                <Box m={1}>
                                    <Card
                                        sx={{minHeight: '150px', maxWidth: '700px', boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px"}}>
                                        <Box m={1}>
                                            <Typography sx={{fontSize: '20px'}}>
                                                Top 20 Core Pools by Core Pool Fees Earned on all Deployments
                                            </Typography>
                                        </Box>
                                        <MixedLineBarChart
                                            barChartData={filteredPoolBarChartTVLData}
                                            barChartName={'TVL'}
                                            lineChartData={filteredPoolBarChartData}
                                            lineChartName={'Earned Protocol Fees'}
                                            rotateAxis={true}
                                        />
                                    </Card>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                mt={2}
                                xs={11}
                                md={5}
                            >
                                <Box m={1}>
                                <Card
                                    sx={{minHeight: '150px', maxWidth: '700px', boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px"}}>
                                    <Box m={1}>
                                        <Typography sx={{fontSize: '20px'}}>Core Pool Revenue per Chain</Typography>
                                    </Box>
                                    <GenericPieChart data={chainPieChartData} height='250px'/>
                                </Card>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
            <Grid
                container
                spacing={2}
                sx={{justifyContent: 'center'}}
            >
                <Grid item xs={11}>
                    <Typography variant={'h5'}>
                        Core Pools: Earned Fees Statistics
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant={'body1'}>
                        {'This table provides an overview of currently collected fees by core pools as per '}
                        <a
                            href="https://forum.balancer.fi/t/bip-457-core-pool-incentive-program-automation/5254"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{textDecoration: 'none', color: 'inherit'}} // Adjust styles as needed
                        >
                            core-pool framework
                            <LinkIcon style={{verticalAlign: 'bottom', marginLeft: '0.25rem'}}/>
                        </a>
                        {'.'}
                    </Typography>
                </Grid>

                {selectedPeriod === "Current Fee Epoch" ?
                    <Grid item xs={11}>
                        {corePools && globalPools && globalPools.length > 10 ?
                            <CorePoolTable poolDatas={globalPools} corePools={corePools}/> :
                            <Grid
                                container
                                spacing={2}
                                mt='5%'
                                mb={2}
                                sx={{justifyContent: 'center'}}
                            >
                                <CustomLinearProgress/>
                            </Grid>}

                    </Grid> :
                    <Grid item xs={11}>
                        {corePools && globalPools && globalPools.length > 10 ?
                            <CorePoolHistoricalTable poolDatas={globalPools} corePools={corePools}/> :
                            <Grid
                                container
                                spacing={2}
                                mt='5%'
                                mb={2}
                                sx={{justifyContent: 'center'}}
                            >
                                <CustomLinearProgress/>
                            </Grid>}

                    </Grid>}
                {selectedPeriod !== "Current Fee Epoch" ?
                    <Grid item xs={11}>
                        <Typography sx={{fontSize: '24px'}}>Fee Collector Performance</Typography>

                    </Grid> : null}
                {selectedPeriod !== "Current Fee Epoch" ?
                    <Grid mb={1} item xs={11}>
                        <Grid
                            container
                            columns={{xs: 4, sm: 8, md: 12}}
                            sx={{justifyContent: {md: 'flex-start', xs: 'center'}, alignContent: 'center'}}
                        >
                            <Box mr={1} mb={1}>
                                <MetricsCard
                                    mainMetric={totalSwept ? totalSwept : 0}
                                    mainMetricInUSD={true}
                                    metricName={'Overall Fees Swept'}
                                    MetricIcon={MonetizationOnIcon}
                                    toolTipText={'Total Fees streamed to the fee collector and being processed across all networks'}
                                />
                            </Box>
                            <Box mr={1} mb={1}>
                                <MetricsCard
                                    mainMetric={delta ? delta : 0}
                                    mainMetricInUSD={true}
                                    metricName={'Swept vs Distributed'}
                                    MetricIcon={MonetizationOnIcon}
                                    toolTipText={'Fee allocator precision in $. Provides a metric of how much the fee allocator distributes vs how much was effectively collected and processed by Mimic.'}
                                />
                            </Box>
                        </Grid>
                        <Box mb={1}>
                            <Typography variant={'body1'}>Statistics visualizing total fees swept (incl. swap fees and
                                non-core pool fees) vs. earned core pool fees. A difference ratio greater than 1
                                indicates that non-core pool fees were distributed to core pools</Typography>
                        </Box>
                        {chainPieChartData && historicalCollectedNetworkFees ?
                            <CorePoolEarnedVsSweptTable networkData={chainPieChartData}
                                                        historicalCollectedNetworkFees={historicalCollectedNetworkFees}/> :
                            <Grid
                                container
                                spacing={2}
                                mt='5%'
                                mb={2}
                                sx={{justifyContent: 'center'}}
                            >
                                <CustomLinearProgress/>
                            </Grid>}

                    </Grid> : null}
                <Grid>
                </Grid>
            </Grid>
        </Box>
    );
}