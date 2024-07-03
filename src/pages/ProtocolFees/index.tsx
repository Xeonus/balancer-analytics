import * as React from "react";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import {useActiveNetworkVersion} from "../../state/application/hooks";
import {DateTime} from "luxon";
import {getSnapshotFees, useBalancerPoolFeeSnapshotData} from "../../data/balancer/useBalancerPoolFeeSnapshotData";
import NavCrumbs, {NavElement} from '../../components/NavCrumbs';
import {EthereumNetworkInfo, PolygonNetworkInfo} from "../../constants/networks";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {Alert, Box, Divider, Grid, IconButton, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {dateToUnix, parseDateString, unixToDate} from "../../utils/date";
import TextField from "@mui/material/TextField";
import {PoolFeeSnapshotData} from "../../data/balancer/balancerTypes";
import ProtocolFeeTable from "../../components/Tables/ProtocolFeeTable";
import useGetCorePoolCurrentFees from "../../data/maxis/useGetCorePoolCurrentFees";
import BalancerLogoWhite from '../../assets/svg/logo-light.svg'
import BalancerLogoBlack from '../../assets/svg/logo-dark.svg'
import CloseIcon from "@mui/icons-material/Close";
import {CustomThrobber} from "../../components/CustomThrobber";
import {useTheme} from "@mui/material/styles";
import MetricsCard from "../../components/Cards/MetricsCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PieChartIcon from '@mui/icons-material/PieChart';
import SavingsIcon from '@mui/icons-material/Savings';
import TollIcon from '@mui/icons-material/Toll';
import {getLastThursdayOddWeek} from "../../data/maxis/static/dataHelpers";
import useGetCollectedFees from "../../data/maxis/useGetTotalFeesCollected";


interface PoolsMapping {
    [key: string]: string[];
}

function formatDate(date: Date) {
    return date.toISOString().split('T')[0];
}

export default function ProtocolFees() {

    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)

    //States
    dayjs.extend(quarterOfYear);
    const currentQuarter = dayjs().quarter();
    const [activeNetwork] = useActiveNetworkVersion()
    const theme = useTheme();
    //const corePools = POOLS[activeNetwork.v3NetworkID]
    //const balPriceData = useCoinGeckoSimpleTokenPrices([activeNetwork.balAddress]);
    const [timeRange, setTimeRange] = React.useState('14');
    const [showDate, setShowDate] = React.useState(false);
    const [showFeeEpochs, setFeeEpochs] = React.useState(false);
    const [feesAlert, setFeesAlert] = React.useState(true);
    const feesAlertMessage = 'This view is using the Balancer subgraph as data source. User discretion is advised when consulting TVL metrics. Earned fee metrics are based on pool snapshots without calculating BPT TWAP.'

    //Poolsnapshots are taken OO:OO UTC.
    const [startTimestamp, setStartTimestamp] = React.useState(Math.floor(DateTime.utc().minus({minutes: 30}).toMillis() / 1000));
    const [endTimeStamp, setEndTimeStamp] = React.useState(Math.floor(DateTime.utc().minus({days: 14}).startOf('day').toMillis() / 1000));
    //console.log("startTimestamp", startTimestamp)
    //Date States
    const [startDate, setStartDate] = React.useState(startTimestamp);
    const [endDate, setEndDate] = React.useState(endTimeStamp);
    //const poolsData = useBalancerPools(250, startDate, endDate).filter(pool => pool.poolType !== 'LiquidityBootstrapping');
    //const aggregatedProtocolData = useAggregatedProtocolData();
    //const collectedFees = useGetCollectedFeesSummary()

    //----Fee data---
    const [feeDelta, setFeeDelta] = React.useState<PoolFeeSnapshotData | undefined>();
    const corePools = useGetCorePoolCurrentFees();
    const historicalNetworkFees = useGetCollectedFees(unixToDate(startDate))
    console.log("historicalNetworkFees", historicalNetworkFees)
    const currentFeeSnapshot = useBalancerPoolFeeSnapshotData(activeNetwork.clientUri, startTimestamp)
    console.log("currentFeeSnapshot", currentFeeSnapshot)
    const pastFeeSnapshot = useBalancerPoolFeeSnapshotData(activeNetwork.clientUri, endTimeStamp)
    console.log("pastFeeSnapshot", pastFeeSnapshot)

    //Mimic fee settings
    let networkFees = 0
    let sweepThreshold = 100
    if (historicalNetworkFees && historicalNetworkFees.mainnet) {
        if (activeNetwork.v3NetworkID.toLowerCase() === 'mainnet') {
            networkFees = historicalNetworkFees.mainnet
            sweepThreshold = 1000
        } else if (activeNetwork.v3NetworkID.toLowerCase() === 'arbitrum') {
            networkFees = historicalNetworkFees.arbitrum
        } else if (activeNetwork.v3NetworkID.toLowerCase() === 'polygon') {
            networkFees = historicalNetworkFees.polygon
        } else if (activeNetwork.v3NetworkID.toLowerCase() === 'avalanche') {
            networkFees = historicalNetworkFees.avalanche
        } else if (activeNetwork.v3NetworkID.toLowerCase() === 'base') {
            networkFees = historicalNetworkFees.base
        } else if (activeNetwork.v3NetworkID.toLowerCase() === 'gnosis') {
            networkFees = historicalNetworkFees.gnosis
        } else {
            networkFees = historicalNetworkFees.mainnet
            sweepThreshold = 1000
        }
    }


    // Handler
    const handleFeesAlert = () => {
        setFeesAlert(false);
    };

    useEffect(() => {
        if (currentFeeSnapshot && pastFeeSnapshot) {
            const newFeeDelta = getSnapshotFees(currentFeeSnapshot, pastFeeSnapshot, endTimeStamp);
            setFeeDelta(newFeeDelta); // Update feeDelta state to trigger a re-render
        }
    }, [startTimestamp, endTimeStamp, currentFeeSnapshot?.pools.length, pastFeeSnapshot?.pools.length]);


    // Total fees earned non-core pools
    let totalFeesNonCore = 0
    if (feeDelta && feeDelta.pools && corePools && corePools.length) {
        totalFeesNonCore = feeDelta?.pools.filter(pool => {
            const corePoolRecord = corePools.find(c => c.poolId === pool.id && pool.protocolFee >= sweepThreshold);
            return corePoolRecord === undefined
        }).reduce((acc, curr) => acc + curr.totalProtocolFee, 0);
    }
    console.log("totalFeesNonCore", totalFeesNonCore)

    // Total fees earned core pools
    let totalFeesCore = 0
    if (feeDelta && feeDelta.pools && corePools && corePools.length) {
        totalFeesCore = feeDelta?.pools.filter(pool => {
            const corePoolRecord = corePools.find(c => c.poolId === pool.id && pool.protocolFee >= sweepThreshold);
            return corePoolRecord !== undefined
        }).reduce((acc, curr) => acc + curr.totalProtocolFee, 0);
    }
    console.log("totalFeesCore", totalFeesCore)

    //Ratio core vs non-core
    const ratioCoreNonCore = totalFeesCore / totalFeesNonCore;

    //Total fees
    const totalFees = totalFeesCore + totalFeesNonCore;


    //Change management
    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);

        if (event.target.value === '1000') {
            setShowDate(true);
        } else if (event.target.value === '-1') {
            setFeeEpochs(true)
        } else if (event.target.value === '0') {
            setEndDate(EthereumNetworkInfo.startTimeStamp);

            const newEndDate = DateTime.utc().startOf('day');
            setStartDate(newEndDate.toSeconds());
            setShowDate(false);
            setFeeEpochs(false)
        } else {
            const startTimestamp = DateTime.utc().startOf('day').toSeconds();
            setStartDate(startTimestamp);
            setShowDate(false);
            setFeeEpochs(false)
            setStartTimestamp(startTimestamp)

            const daysToSubtract = Number(event.target.value);
            const newEndDate = DateTime.utc().minus({days: daysToSubtract}).startOf('day');
            setEndDate(newEndDate.toSeconds());
            setEndTimeStamp(newEndDate.toMillis() / 1000)
        }
    };

    const handleStartDateChange = (value: number | null, keyboardInputValue?: string) => {
        if (value) {
            const newStartTimestamp = Math.floor(new Date(value).getTime() / 1000);
            setStartDate(newStartTimestamp);
            setStartTimestamp(newStartTimestamp);
        } else if (keyboardInputValue) {
            const timestamp = parseDateString(keyboardInputValue);
            if (timestamp) {
                setStartDate(timestamp);
                setStartTimestamp(timestamp);
            }
        }
    };

    const handleEndDateChange = (value: number | null, keyboardInputValue?: string) => {
        if (value) {
            const newEndTimeStamp = Math.floor(new Date(value).getTime() / 1000);
            setEndDate(newEndTimeStamp);
            setEndTimeStamp(newEndTimeStamp);
        } else if (keyboardInputValue) {
            const timestamp = parseDateString(keyboardInputValue);
            if (timestamp) {
                setEndDate(timestamp);
                setEndTimeStamp(timestamp);
            }
        }
    };

    // Fee epoch mgmt
    const [selectedPeriod, setSelectedPeriod] = useState<string>("Current Fee Epoch");
    const [periods, setPeriods] = useState<string[]>([]);
    const lastOddWeekThu = getLastThursdayOddWeek();
    const lastOddWeekThuString = formatDate(lastOddWeekThu)

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
        if (showFeeEpochs) {
            if (selectedPeriod !== "Current Fee Epoch") {
                const periodParts = selectedPeriod.split(" to ").map(part => part.trim());

                const timestamp = dateToUnix(periodParts[0]);
                const timestampEnd = timestamp - 60 * 60 * 24 * 14
                console.log("timestamp", timestamp)
                console.log("timestampEnd", timestampEnd)
                if (timestamp) {
                    setStartDate(timestamp);
                    setStartTimestamp(timestamp);
                }
                if (timestampEnd) {
                    setEndDate(timestampEnd);
                    setEndTimeStamp(timestampEnd);
                }
            } else {
                setStartDate(Math.floor(DateTime.utc().minus({minutes: 30}).toMillis() / 1000))
                setStartTimestamp(Math.floor(DateTime.utc().minus({minutes: 30}).toMillis() / 1000))
                setEndTimeStamp(dateToUnix(lastOddWeekThuString))
                setEndDate(dateToUnix(lastOddWeekThuString)); // No historical data needed for "Current Fee Epoch"
            }
        }
    }, [selectedPeriod, showFeeEpochs]);

    const handlePeriodChange = (event: SelectChangeEvent) => {
        setSelectedPeriod(event.target.value as string);
    };


    return (
        <Box>
            <Box mb={1} sx={{flexGrow: 2, justifyContent: "center"}}>
                {feesAlert && (
                    <Alert
                        severity="info"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleFeesAlert}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    >
                        {feesAlertMessage}
                    </Alert>
                )}
            </Box>
            <Grid
                container
                spacing={1}
                sx={{justifyContent: 'center'}}
            >
                <Grid item xs={11}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={'Reports'}/>
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={1}
                    mb={1}
                    xs={11}
                >
                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography variant={"h5"}>Protocol Fees (Beta) for {activeNetwork.name}</Typography>
                        </Box>

                    </Box>
                    <Box>
                        <Typography variant={"body2"}>Create aggregated views of protocol fees by specifying a
                            time-range.
                            Metrics combine net fees earned unless stated otherwise</Typography>
                    </Box>
                </Grid>


                <Grid
                    item
                    mt={1}
                    mb={1}
                    xs={11}
                >

                    <Box display="flex" alignItems="center" mb={1}>
                        <Box>
                            <Typography>Choose Time Range:</Typography>
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
                                    <MenuItem value={'-1'}>Fee Epochs </MenuItem>
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
                        {showFeeEpochs ?
                            <Box p={0.5} display="flex" justifyContent="left" sx={{alignSelf: 'flex-end'}}>
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
                            </Box> : null}
                    </Box>
                    <Divider/>
                </Grid>
            </Grid>
            {currentFeeSnapshot && currentFeeSnapshot.pools && pastFeeSnapshot && pastFeeSnapshot.pools && feeDelta && feeDelta.pools ?
                <Grid
                    container
                    spacing={1}
                    sx={{justifyContent: 'center'}}
                >

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
                                    metricName={'Total Fees'}
                                    MetricIcon={MonetizationOnIcon}
                                    toolTipText={'Overall fees streamed to the fee collector over the given time period based on the first 250 pools fetched.'}
                                />
                            </Box>
                            <Box mr={1} mb={1}>
                                <MetricsCard
                                    mainMetric={totalFeesCore ? totalFeesCore : 0}
                                    mainMetricInUSD={true}
                                    metricName={'Core Pool Fees'}
                                    MetricIcon={MonetizationOnIcon}
                                    toolTipText={'Total amount of fees collected from core pools. This includes swap fees and the protocol fee cut of 50% on yield-bearing assets.'}
                                />
                            </Box>
                            <Box mr={1} mb={1}>
                                <MetricsCard
                                    mainMetric={totalFeesNonCore ? totalFeesNonCore : 0}
                                    mainMetricInUSD={true}
                                    metricName={'Non-Core Pool Fees'}
                                    MetricIcon={MonetizationOnIcon}
                                    toolTipText={'Protocol fees collected by non-core pools. These fees will be recycled and distributed to veBAL holders and voting incentives for core pools.'}
                                />
                            </Box>
                            <Box mr={1} mb={1}>
                                <MetricsCard
                                    mainMetric={ratioCoreNonCore ? ratioCoreNonCore : 0}
                                    mainMetricInUSD={false}
                                    metricName={'Core / Non-Core Fee Ratio'}
                                    MetricIcon={PieChartIcon}
                                    toolTipText={'Ratio of core vs. non-core fees earned.'}
                                />
                            </Box>
                            {showFeeEpochs && selectedPeriod !== "Current Fee Epoch" ?
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={networkFees ? networkFees : 0}
                                        mainMetricInUSD={true}
                                        metricName={'Mimic Swept Fees'}
                                        MetricIcon={SavingsIcon}
                                        toolTipText={'Effectively swept fees by the Mimic smart vault for that network'}
                                    />
                                </Box> : null}
                            {showFeeEpochs && selectedPeriod !== "Current Fee Epoch" ?
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={networkFees && totalFees ? (totalFees - networkFees) : 0}
                                        mainMetricInUSD={true}
                                        metricName={'Earned vs. Swept Fees'}
                                        MetricIcon={TollIcon}
                                        toolTipText={'Earned fees for that epoch vs. effectively swept and processed fees from the Mimic Smart vaults after a fee cut.'}
                                    />
                                </Box> : null}
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        mt={2}
                        xs={11}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="row">
                            <Box display="flex" alignItems='center'>
                                <Typography variant="h5">Fees Earned Metrics</Typography>
                            </Box>

                        </Box>
                        <Box mb={1} display="flex" alignItems='center'>
                            <Typography variant="body2">Aggregated Fees earned for {activeNetwork.name}</Typography>
                        </Box>
                        <Grid
                            item
                            mt={2}
                            xs={11}
                        >
                            <ProtocolFeeTable poolDatas={feeDelta?.pools || []} corePools={corePools}/>

                        </Grid>
                    </Grid>
                </Grid> :
                <Grid
                    container
                    spacing={2}
                    mt='25%'
                    sx={{justifyContent: 'center'}}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CustomThrobber icon={theme.palette.mode === 'dark' ? BalancerLogoBlack : BalancerLogoWhite}/>
                        <Box mt={1}>
                            <Typography variant={'caption'}>Please stay patient friend. Subgraph goblins are indexing
                                fees.</Typography>
                        </Box>
                    </Box>


                </Grid>
            }
        </Box>
    );
}
