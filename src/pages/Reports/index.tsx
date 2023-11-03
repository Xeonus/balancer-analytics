import {Box, Card, CircularProgress, Divider, Grid, Typography} from "@mui/material";
import NavCrumbs, {NavElement} from '../../components/NavCrumbs';
import {useCoinGeckoSimpleTokenPrices} from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import {useActiveNetworkVersion} from "../../state/application/hooks";
import * as React from "react";
import {CORE_POOLS_ARBITRUM, CORE_POOLS_MAINNET, CORE_POOLS_POLYGON} from "../../constants";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import useAggregatedProtocolData from "../../data/balancer/useAggregatedProtocolData";
import {BalancerChartDataItem} from "../../data/balancer/balancerTypes";
import GenericAreaChart from "../../components/Echarts/GenericAreaChart";
import {unixToDate} from "../../utils/date";
import MixedLineBarChart from "../../components/Echarts/MixedLineBarChart";
import MetricsCard from "../../components/Cards/MetricsCard";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LandscapeIcon from '@mui/icons-material/Landscape';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import {EthereumNetworkInfo} from "../../constants/networks";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import PoolTable from "../../components/Tables/PoolTable";
import {useBalancerPools} from "../../data/balancer/usePools";
import PoolReportsTable from "../../components/Tables/PoolReportsTable";


interface PoolsMapping {
    [key: string]: string[];
}

export default function Reports() {

    const POOLS: PoolsMapping = {
        MAINNET: CORE_POOLS_MAINNET,
        ARBITRUM: CORE_POOLS_ARBITRUM,
        POLYGON: CORE_POOLS_POLYGON,
    };


    //States
    dayjs.extend(quarterOfYear);
    const currentQuarter = dayjs().quarter();
    const [activeNetwork] = useActiveNetworkVersion()
    const corePools = POOLS[activeNetwork.v3NetworkID]
    const balPriceData = useCoinGeckoSimpleTokenPrices([activeNetwork.balAddress]);
    const [timeRange, setTimeRange] = React.useState('7');
    const [showDate, setShowDate] = React.useState(false);
    const today = new Date();
    //Set timestamps if none is given:
    today.setUTCHours(0, 0, 0, 0);
    const startTimestamp = Math.floor(today.getTime() / 1000)
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    weekAgo.setUTCHours(0, 0, 0, 0);
    const endTimeStamp = Math.floor(weekAgo.getTime() / 1000)
    //Date States
    const [startDate, setStartDate] = React.useState(startTimestamp);
    const [endDate, setEndDate] = React.useState(endTimeStamp);
    const poolsData = useBalancerPools(250, startDate, endDate).filter(pool => pool.poolType !== 'LiquidityBootstrapping');
    //console.log("pools", pools)
    const aggregatedProtocolData = useAggregatedProtocolData();

    //Prepare pools data
    const pools = React.useMemo(() => {
        return (poolsData ?? []).filter(pool => pool.poolType !== 'LiquidityBootstrapping');
    }, [poolsData]);

    //---Data preparation---
    // Prepare Data for given time-range
    const filteredTvlData = React.useMemo(() => {
        if (!aggregatedProtocolData.overallTvlData) {
            return [];
        }
        return aggregatedProtocolData.overallTvlData.filter((dataItem) => {
            const dataDate = dataItem.time; // assuming unixToDate converts timestamp to a JS Date object
            return Date.parse(dataDate) / 1000 >= endDate && Date.parse(dataDate) / 1000 <= startDate;
        });
    }, [aggregatedProtocolData.overallTvlData, startDate, endDate]);

    // Prepare volume data
    const filteredVolumeMetrics = React.useMemo(() => {
        if (!aggregatedProtocolData.overallVolumeChartData) {
            return [];
        }
        return aggregatedProtocolData.overallVolumeChartData.filter((dataItem) => {
            const dataDate = dataItem.time; // assuming unixToDate converts timestamp to a JS Date object
            return Date.parse(dataDate) / 1000 >= endDate && Date.parse(dataDate) / 1000 <= startDate;
        });
    }, [aggregatedProtocolData.overallVolumeChartData, startDate, endDate]);

    let cumulativeValue = 0;
    const cumulativeVolumeData: BalancerChartDataItem[] = filteredVolumeMetrics.map((el) => {
        cumulativeValue += el.value; // Accumulate the value
        return {
            value: cumulativeValue,
            time: el.time // Use the time as it is if no conversion is needed
        };
    });

    // Prepare protocol fee metrics
    const filteredProtocolFeeMetrics = React.useMemo(() => {
        if (!aggregatedProtocolData.overallProtocolFeeData) {
            return [];
        }
        return aggregatedProtocolData.overallProtocolFeeData.filter((dataItem) => {
            const dataDate = dataItem.time; // assuming unixToDate converts timestamp to a JS Date object
            return Date.parse(dataDate) / 1000 >= endDate && Date.parse(dataDate) / 1000 <= startDate;
        });
    }, [aggregatedProtocolData.overallProtocolFeeData, startDate, endDate]);

    cumulativeValue = 0;
    const cumulativeProtocolFeeData: BalancerChartDataItem[] = filteredProtocolFeeMetrics.map((el) => {
        cumulativeValue += el.value; // Accumulate the value
        return {
            value: cumulativeValue,
            time: el.time // Use the time as it is if no conversion is needed
        };
    });


    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)

    //Change management
    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);
        if (event.target.value === '1000') {
            setShowDate(true);
        } else if (event.target.value === '0') {
            setEndDate(EthereumNetworkInfo.startTimeStamp);
            const newEndDate = new Date()
            newEndDate.setDate(today.getDate());
            newEndDate.setUTCHours(0, 0, 0, 0);
            setStartDate(Math.floor(newEndDate.getTime() / 1000));
            setShowDate(false);
        } else {
            const today = new Date();
            //Set timestamps if none is given:
            today.setUTCHours(0, 0, 0, 0);
            const startTimestamp = Math.floor(today.getTime() / 1000)
            setStartDate(startTimestamp)
            setShowDate(false);
            const newEndDate = new Date()
            newEndDate.setDate(today.getDate() - Number(event.target.value));
            newEndDate.setUTCHours(0, 0, 0, 0);
            setEndDate(Math.floor(newEndDate.getTime() / 1000));
        }
    };
    console.log("startDate", startDate);
    console.log("endDate", endDate);

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
            console.log("value startdatechange", value)
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
        <Box sx={{flexGrow: 2, justifyContent: "center"}}>
            {aggregatedProtocolData && aggregatedProtocolData.overallTvlData && aggregatedProtocolData.overallTvlData.length > 1 ?
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
                            <Typography variant={"h5"}>Reports Dashboard</Typography>
                        </Box>

                    </Box>
                    <Box>
                        <Typography variant={"body2"}>Create reports of key protocol metrics by specifying a time-range.
                            Metrics aggregate data from all Balancer deployments</Typography>
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
                            <Typography>Report Time range:</Typography>
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
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box mb={1} display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Protocol TVL Metrics</Typography>
                        </Box>
                    </Box>
                    <Grid
                        container
                        columns={{xs: 4, sm: 8, md: 12}}
                        sx={{justifyContent: {md: 'flex-start', xs: 'center'}, alignContent: 'center'}}
                    >
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={Math.max(...filteredTvlData.map(item => item.value))}
                                mainMetricInUSD={true}
                                metricName={'Max TVL'}
                                MetricIcon={LandscapeIcon}/>
                        </Box>
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={Math.min(...filteredTvlData.map(item => item.value))}
                                mainMetricInUSD={true}
                                metricName={'Min TVL'}
                                MetricIcon={LandscapeIcon}/>
                        </Box>
                    </Grid>
                    <Card>
                        {filteredTvlData && filteredTvlData.length > 1 ?
                            <Box m={1}>
                                <GenericAreaChart chartData={filteredTvlData} dataTitle={"Protocol TVL"} height={'350px'}/>
                            </Box> : null}
                    </Card>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box mb={1} display="flex" alignItems='center'>
                            <Typography variant="h6">Protocol Volume Metrics</Typography>
                        </Box>
                    </Box>
                    <Grid
                        container
                        columns={{xs: 4, sm: 8, md: 12}}
                        sx={{justifyContent: {md: 'flex-start', xs: 'center'}, alignContent: 'center'}}
                    >
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={cumulativeVolumeData[cumulativeVolumeData.length - 1].value}
                                mainMetricInUSD={true}
                                metricName={'Cumulative Volume'}
                                MetricIcon={EqualizerIcon}/>
                        </Box>
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={Math.max(...filteredVolumeMetrics.map(item => item.value))}
                                mainMetricInUSD={true}
                                metricName={'Max Volume'}
                                MetricIcon={LandscapeIcon}/>
                        </Box>
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={Math.min(...filteredVolumeMetrics.map(item => item.value))}
                                mainMetricInUSD={true}
                                metricName={'Min Volume'}
                                MetricIcon={LandscapeIcon}/>
                        </Box>
                    </Grid>
                    <Card>
                        {filteredVolumeMetrics && filteredVolumeMetrics.length > 1 && cumulativeVolumeData && cumulativeVolumeData.length > 1 ?
                            <MixedLineBarChart
                                barChartData={filteredVolumeMetrics}
                                barChartName={'Protocol Volume'}
                                lineChartData={cumulativeVolumeData}
                                lineChartName={'Cumulative Volume'}/>
                            : null}
                    </Card>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box mb={1} display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Protocol Fee Metrics</Typography>
                        </Box>
                    </Box>
                    <Grid
                        container
                        columns={{xs: 4, sm: 8, md: 12}}
                        sx={{justifyContent: {md: 'flex-start', xs: 'center'}, alignContent: 'center'}}
                    >
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={cumulativeProtocolFeeData[cumulativeProtocolFeeData.length - 1].value}
                                mainMetricInUSD={true}
                                metricName={'Cumulative Fees'}
                                MetricIcon={EqualizerIcon}/>
                        </Box>
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={Math.max(...filteredProtocolFeeMetrics.map(item => item.value))}
                                mainMetricInUSD={true}
                                metricName={'Max Protocol Fees'}
                                MetricIcon={LandscapeIcon}/>
                        </Box>
                        <Box m={1}>
                            <MetricsCard
                                mainMetric={Math.min(...filteredProtocolFeeMetrics.map(item => item.value))}
                                mainMetricInUSD={true}
                                metricName={'Min Protocol Fees'}
                                MetricIcon={LandscapeIcon}/>
                        </Box>
                    </Grid>
                    <Card>
                        {filteredProtocolFeeMetrics && filteredProtocolFeeMetrics.length > 1 && cumulativeProtocolFeeData && cumulativeProtocolFeeData.length > 1 ?
                            <MixedLineBarChart
                                barChartData={filteredProtocolFeeMetrics}
                                barChartName={'Protocol Fees'}
                                lineChartData={cumulativeProtocolFeeData}
                                lineChartName={'Cumulative Protocol Fees'}/>
                            : null}
                    </Card>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box mb={1} display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Pool Performance on {activeNetwork.name}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        {pools && pools.length > 1 ?
                        <PoolReportsTable poolDatas={pools} /> : <CircularProgress /> }
                    </Box>
                </Grid>

            </Grid> :
                <Grid
                    container
                    spacing={2}
                    mt='25%'
                    sx={{justifyContent: 'center'}}
                >
                    <CustomLinearProgress/>
                </Grid> }
        </Box>
    );
}
