import NavCrumbs, {NavElement} from "../../components/NavCrumbs";
import {Card, Divider, Grid, Typography} from "@mui/material";
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
import useGetCollectedFeesSummary from "../../data/maxis/useGetCollectedFeesSummary";
import {unixToDate} from "../../utils/date";
import * as React from "react";
import {DateTime} from "luxon";
import {EthereumNetworkInfo} from "../../constants/networks";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import useGetCombinedIncentives from "../../data/maxis/useGetCombinedIncentives";

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


    //STATES
    const currentUTCTime = DateTime.utc();
    const startTimestamp = Math.floor(currentUTCTime.startOf('day').toMillis() / 1000);
    // Get the UTC time for a week ago
    const yearAgoUTCTime = currentUTCTime.minus({days: 365});
    const endTimeStamp = Math.floor(yearAgoUTCTime.startOf('day').toMillis() / 1000);
    //Date States
    const [startDate, setStartDate] = React.useState(startTimestamp);
    const [endDate, setEndDate] = React.useState(endTimeStamp);
    const [timeRange, setTimeRange] = React.useState('365');
    const [showDate, setShowDate] = React.useState(false);


    //DATA

    const currentData = useGetCorePoolCurrentFees();
    const lastOddWeekThu = getLastThursdayOddWeek();
    const lastOddWeekThuString = formatDate(lastOddWeekThu)
    const [selectedEndDate, setSelectedEndDate] = useState<string>(lastOddWeekThuString);
    const historicalData = useGetCorePoolHistoricalFees(selectedEndDate);
    const historicalCollectedNetworkFees = useGetCollectedFees(selectedEndDate)
    const collectedFeesSummary = useGetCollectedFeesSummary();
    const corePoolIDs : string[] = currentData.map(item => item.poolId)
    const globalPools = useGetAllPools(['MAINNET', 'POLYGON', 'ARBITRUM', 'ZKEVM', 'AVALANCHE', 'BASE', 'GNOSIS'], corePoolIDs);


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

            while (startDate < endDate) {
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


    const filteredFeesData = React.useMemo(() => {
        if (collectedFeesSummary.loading) {
            return [];
        }
        return collectedFeesSummary.feeData.filter((dataItem) => {
            const dataDate = dataItem.periodEnd;
            return dataDate >= endDate && dataDate <= startDate;
        });
    }, [collectedFeesSummary.feeData, startDate, endDate]);

    //Historical fees to DAO chart
    const feesToDaoChartData: BalancerChartDataItem[] = filteredFeesData.map(item => ({
        value: item.feesToDao,
        time: unixToDate(item.periodEnd)
    }));

    let cumulativeValue = 0
    const cumulativeToDaoData: BalancerChartDataItem[] = filteredFeesData.map((el) => {
        cumulativeValue += el.feesToDao; // Accumulate the value
        return {
            value: cumulativeValue,
            time: unixToDate(el.periodEnd)
        };
    });

    //Historical fees to veBAL chart data
    const feesToveBALChartData: BalancerChartDataItem[] = filteredFeesData.map(item => ({
        value: item.feesToVebal,
        time: unixToDate(item.periodEnd)
    }));

    cumulativeValue = 0
    const cumulativeToveBALData: BalancerChartDataItem[] = filteredFeesData.map((el) => {
        cumulativeValue += el.feesToVebal; // Accumulate the value
        return {
            value: cumulativeValue,
            time: unixToDate(el.periodEnd)
        };
    });


    //Historical balIncentives chart
    const balIncentivesChartData: BalancerChartDataItem[] = filteredFeesData.map(item => ({
        value: item.balIncentives,
        time: unixToDate(item.periodEnd)
    }));

    cumulativeValue = 0
    const cumulativeBalIncentivesData: BalancerChartDataItem[] = filteredFeesData.map((el) => {
        cumulativeValue += el.balIncentives; // Accumulate the value
        return {
            value: cumulativeValue,
            time: unixToDate(el.periodEnd)
        };
    });

    //Historical Aura incentives chart
    const auraIncentivesChartData: BalancerChartDataItem[] = filteredFeesData.map(item => ({
        value: item.auraIncentives,
        time: unixToDate(item.periodEnd)
    }));

    cumulativeValue = 0
    const cumulativeAuraIncentivesData: BalancerChartDataItem[] = filteredFeesData.map((el) => {
        cumulativeValue += el.auraIncentives; // Accumulate the value
        return {
            value: cumulativeValue,
            time: unixToDate(el.periodEnd)
        };
    });



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
                time: pool.name.replace(/^Balancer\s*/, ''), // Using the pool name for the time axis as a unique identifier
            });

            // For the line chart, we want to match the earned fees with the correct pool.
            const earnedFees = feesByPoolId.get(pool.poolId) || 0; // Default to 0 if no matching pool is found
            // Prepare data for the line chart (earned fees)
            poolLineChartData.push({
                value: earnedFees,
                time: pool.name.replace(/^Balancer\s*/, ''), // The time values (pool names) must match with the bar chart data
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


    //State mgmt
    //Change management
    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);

        if (event.target.value === '1000') {
            setShowDate(true);
        } else if (event.target.value === '0') {
            setEndDate(EthereumNetworkInfo.startTimeStamp);

            const newEndDate = DateTime.utc().startOf('day');
            setStartDate(newEndDate.toSeconds());
            setShowDate(false);
        } else {
            const startTimestamp = DateTime.utc().startOf('day').toSeconds();
            setStartDate(startTimestamp);
            setShowDate(false);

            const daysToSubtract = Number(event.target.value);
            const newEndDate = DateTime.utc().minus({days: daysToSubtract}).startOf('day');
            setEndDate(newEndDate.toSeconds());
        }
    };


    const parseDateString = (dateString: string): number | null => {
        // Expected format "DD.MM.YYYY"
        const parts = dateString.split('.');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // JS months start from 0
            const year = parseInt(parts[2], 10);

            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month, day).getTime() / 1000; // Convert to UNIX timestamp
            }
        }
        return null; // Return null if the format is incorrect
    };

    const handleStartDateChange = (value: number | null, keyboardInputValue?: string) => {
        if (value) {
            setStartDate(Math.floor(new Date(value).getTime() / 1000));
        } else if (keyboardInputValue) {
            const timestamp = parseDateString(keyboardInputValue);
            if (timestamp) {
                setStartDate(timestamp);
            }
        }
    };

    const handleEndDateChange = (value: number | null, keyboardInputValue?: string) => {
        if (value) {
            setEndDate(Math.floor(new Date(value).getTime() / 1000));
        } else if (keyboardInputValue) {
            const timestamp = parseDateString(keyboardInputValue);
            if (timestamp) {
                setEndDate(timestamp);
            }
        }
    };

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

                <Grid item xs={11} mb={1}>
                    <Typography sx={{fontSize: '24px'}}>Core Pool Revenue Metrics</Typography>

                </Grid>
                <Grid item xs={11} mb={1}>
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
                <Grid mb={1} item xs={11}>
                    <Grid
                        container
                        columns={{xs: 4, sm: 8, md: 12}}
                        sx={{justifyContent: {md: 'space-between', xs: 'center'}, alignContent: 'center'}}
                    >
                        <Box mr={1} mb={1}>
                            <MetricsCard
                                mainMetric={totalFees ? totalFees : 0}
                                mainMetricInUSD={true}
                                metricName={'Total Core Fees Collected'}
                                MetricIcon={MonetizationOnIcon}
                                toolTipText={'Total amount of fees collected from core pools. This includes swap fees and the protocol fee cut of 50% on yield-bearing assets.'}
                            />
                        </Box>
                        <Box mr={1} mb={1}>
                            <MetricsCard
                                mainMetric={totalFees ? totalFees * 0.5 : 0}
                                mainMetricInUSD={true}
                                metricName={'Voting Incentives'}
                                MetricIcon={HowToVoteIcon}
                                toolTipText={'Minimum amount of voting incentives being placed in total. Fees earned from non-core pools are not included.'}
                            />
                        </Box>
                        <Box mr={1} mb={1}>
                            <MetricsCard
                                mainMetric={totalFees ? totalFees * 0.325 : 0}
                                mainMetricInUSD={true}
                                metricName={'veBAL Revenue Share'}
                                MetricIcon={AccountBalanceWalletIcon}
                                toolTipText={'Out of all core pool fees earned, 32.5% of revenue is shared with veBAL holders.'}
                            />
                        </Box>
                        <Box mr={1} mb={1}>
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
                    <Typography variant={'h6'}>
                        Core Pools: Earned Fees Statistics
                    </Typography>
                    <Box mt={1}>
                        <Typography variant={'body1'}>
                            {'This table provides an overview of currently (or historical) fees collected by core pools as per '}
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
                    </Box>
                </Grid>


                {selectedPeriod === "Current Fee Epoch" ?
                    <Grid item xs={11}>
                        {corePools && globalPools && globalPools.length > 10 ?
                            <CorePoolTable poolDatas={globalPools} corePools={corePools}/> :
                            <Grid
                                container
                                spacing={2}
                                mt='5%'
                                mb={6}
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
                                mb={6}
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
                <Grid
                    container
                    spacing={2}
                    sx={{justifyContent: 'center'}}
                >
                    <Grid item xs={11}>
                        <Typography variant={'h5'}>
                            Historical Fee Distribution Metrics
                        </Typography>
                        <Box mt={1}>
                            <Typography variant={'body1'}>Overview of Core Pool and Fee share Performance over time. Note that these metrics include totals for all fees collected and distributed for a given time-range.</Typography>
                        </Box>
                    </Grid>
                </Grid>
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
                        mb={1}
                        xs={11}
                    >

                        <Box display="flex" alignItems="center" mb={1}>
                            <Box>
                                <Typography>Time range:</Typography>
                            </Box>
                            <Box ml={1}>
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
                                        onChange={handleChange}
                                        value={timeRange}
                                        inputProps={{
                                            name: 'timeRange',
                                            id: 'timeRangeId-native-simple',
                                        }}
                                    >
                                        <MenuItem disabled={true} dense={true}>Time range:</MenuItem>
                                        <Divider/>
                                        <MenuItem value={'7'}>Last 7 days</MenuItem>
                                        <MenuItem value={'14'}>Last 14 days</MenuItem>
                                        <MenuItem value={'30'}>Last 30 days</MenuItem>
                                        <MenuItem value={'90'}>Last 90 days</MenuItem>
                                        <MenuItem value={'180'}>Last 180 days</MenuItem>
                                        <MenuItem value={'365'}>Last 365 days</MenuItem>
                                        <MenuItem value={'0'}>All time</MenuItem>
                                        <MenuItem value={'1000'}>Custom </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            {showDate ?
                                <Box p={0.5} display="flex" justifyContent="left" sx={{alignSelf: 'flex-end'}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Start Date"
                                            maxDate={Date.now()}
                                            minDate={EthereumNetworkInfo.startTimeStamp}
                                            value={unixToDate(endDate)}
                                            onChange={handleEndDateChange}
                                            renderInput={(params) => <TextField size='small'
                                                                                sx={{maxWidth: '150px'}} {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Box p={1}>
                                        <Typography>to</Typography>
                                    </Box>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="End Date"
                                            maxDate={Date.now()}
                                            minDate={EthereumNetworkInfo.startTimeStamp}
                                            value={unixToDate(startDate)}
                                            onChange={handleStartDateChange}
                                            renderInput={(params) => <TextField size='small'
                                                                                sx={{maxWidth: '150px'}} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box> : null}
                        </Box>
                        <Divider/>
                    </Grid>
                    <Grid
                        item
                        mt={1}
                        xs={11}
                        md={5}
                    >
                        {collectedFeesSummary && balIncentivesChartData.length > 1 && cumulativeBalIncentivesData && cumulativeBalIncentivesData.length > 0 ?

                        <Card>
                            <Box m={1}>
                                <Typography>Incentives to veBAL Marketplaces</Typography>
                            </Box>
                            <MixedLineBarChart
                                    barChartData={balIncentivesChartData}
                                    barChartName={'Incentives to veBAL markets'}
                                    lineChartData={cumulativeBalIncentivesData}
                                    lineChartName={'Cumulative Incentives'}
                                    noRainbowColors={true}
                                />

                        </Card> : null}
                    </Grid>
                    <Grid
                        item
                        mt={1}
                        xs={11}
                        md={5}
                    >
                        {collectedFeesSummary && auraIncentivesChartData.length > 1 && cumulativeAuraIncentivesData && cumulativeAuraIncentivesData.length > 0 ?
                        <Card>
                            <Box m={1}>
                                <Typography>Incentives to vlAura Marketplaces</Typography>
                            </Box>
                                <MixedLineBarChart
                                    barChartData={auraIncentivesChartData}
                                    barChartName={'Incentives to vlAURA markets'}
                                    lineChartData={cumulativeAuraIncentivesData}
                                    lineChartName={'Cumulative Incentives'}
                                    noRainbowColors={true}
                                />

                        </Card> : null}
                    </Grid>
                    <Grid
                        item
                        mt={1}
                        xs={11}
                        md={5}
                    >
                        {collectedFeesSummary && feesToDaoChartData.length > 1 && cumulativeToDaoData && cumulativeToDaoData.length > 0 ?
                        <Card>
                            <Box m={1}>
                                <Typography>Fee share to the DAO</Typography>
                            </Box>

                                <MixedLineBarChart
                                    barChartData={feesToDaoChartData}
                                    barChartName={'DAO Income'}
                                    lineChartData={cumulativeToDaoData}
                                    lineChartName={'Cumulative DAO Income'}
                                    noRainbowColors={true}
                                />

                        </Card> : null}
                    </Grid>
                    <Grid
                        item
                        mt={1}
                        xs={11}
                        md={5}
                    >
                        {collectedFeesSummary && feesToveBALChartData.length > 1 && cumulativeToveBALData && cumulativeToveBALData.length > 0 ?
                        <Card>
                            <Box m={1}>
                                <Typography>Fee share to veBAL holders</Typography>
                            </Box>

                                <MixedLineBarChart
                                    barChartData={feesToveBALChartData}
                                    barChartName={'veBAL Income'}
                                    lineChartData={cumulativeToveBALData}
                                    lineChartName={'Cumulative veBAL Income'}
                                    noRainbowColors={true}
                                />

                        </Card> : null}
                    </Grid>

                </Grid>

            </Grid>
            <Grid mb={2}></Grid>
        </Box>
    );
}