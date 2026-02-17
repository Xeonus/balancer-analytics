import Box from '@mui/material/Box';
import {AlertProps, Card, CircularProgress, Divider, Grid, IconButton, Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CoinCard from '../../components/Cards/CoinCard';
import MetricsCard from '../../components/Cards/MetricsCard';
import useAggregatedProtocolData from '../../data/balancer/useAggregatedProtocolData';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PieChartIcon from '@mui/icons-material/PieChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import {useBalancerChainProtocolData} from '../../data/balancer/useProtocolDataWithClientOverride';
import {
    ArbitrumNetworkInfo,
    AvalancheNetworkInfo,
    BaseNetworkInfo,
    EthereumNetworkInfo, FraxtalNetworkInfo,
    GnosisNetworkInfo,
    PolygonNetworkInfo,
    PolygonZkEVMNetworkInfo
} from '../../constants/networks';
import {
    arbitrumBlockClient,
    arbitrumClient,
    avalancheBlockClient,
    avalancheClient,
    baseBlockClient,
    baseClient, fraxtalBlockClient, fraxtalClient,
    gnosisBlockClient,
    gnosisClient,
    polygonBlockClient,
    polygonClient,
    polygonZKEVMBlockClient,
    polygonZKEVMClient
} from '../../apollo/client';

import ProtocolMultipleBarChart from '../../components/Echarts/ProtocolCharts/ProtocolMultiBarChart';
import ProtocolMultiAreaChart from '../../components/Echarts/ProtocolCharts/ProtocolMultiAreaChart';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import ExploreCard from '../../components/Cards/ExploreCard';
import ArbitrumLogo from '../../assets/svg/arbitrum.svg'
import EtherLogo from '../../assets/svg/ethereum.svg'
import PolygonLogo from '../../assets/svg/polygon.svg'
import PolygonZkEVMLogo from '../../assets/svg/zkevm.svg'
import GnosisLogo from '../../assets/svg/gnosis.svg'
import AvalancheLogo from '../../assets/svg/avalancheLogo.svg'
import BaseLogo from '../../assets/svg/base.svg'
import FraxtalLogo from '../../assets/svg/fraxtal.svg'
import {smoothData} from "../../utils/data";
import useGetCurrentTokenPrices from "../../data/balancer-api-v3/useGetCurrentTokenPrices";
import useGetTokenPriceWithChange from "../../data/balancer-api-v3/useGetTokenPriceWithChange";
import {getUnixTimestamp1000DaysAgo, unixToDate} from "../../utils/date";
import CloseIcon from '@mui/icons-material/Close';
import * as React from "react";
import Button from "@mui/material/Button";
import {DateTime} from 'luxon';
import GenericAreaChart from "../../components/Echarts/GenericAreaChart";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import GenericBarChart from "../../components/Echarts/GenericBarChart";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        {...props} />;
});


export default function Protocol() {


    //States
    const [protocolAlert, setProtocolAlert] = React.useState(false);
    const [showMultiAreaChart, setShowMultiAreaChart] = React.useState(false);
    const [showMultiAreaVolumeChart, setShowMultiAreaVolumeChart] = React.useState(false);
    const [showMultiAreaProtocolFeeChart, setShowMultiAreaProtocolFeeChart] = React.useState(false);
    const [showMultiAreaFeeChart, setShowMultiAreaFeeChart] = React.useState(false);
    const [showMultiAreaSwapChart, setShowMultiSwapChart] = React.useState(false);
    const protocolAlertMessage = 'Polygon zkEVM Subgraph issues - Protocol TVL stats affected!'

    //Data
    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    //Data
    const aggregatedProtocolData = useAggregatedProtocolData();
    const { data: currentPrices } = useGetCurrentTokenPrices(["MAINNET"]);
    const balPriceData = useGetTokenPriceWithChange(balAddress);

    const protocolData = useBalancerChainProtocolData(EthereumNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo());
    console.log("protocolData", protocolData)
    const arbitrumProtocolData = useBalancerChainProtocolData(ArbitrumNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), arbitrumBlockClient, arbitrumClient);
    const polygonProtocolData = useBalancerChainProtocolData(PolygonNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), polygonBlockClient, polygonClient);
    const polygonZkEVMProtocolData = useBalancerChainProtocolData(PolygonZkEVMNetworkInfo.decentralicedClientUri, getUnixTimestamp1000DaysAgo(), polygonZKEVMBlockClient, polygonZKEVMClient);
    const gnosisProtocolData = useBalancerChainProtocolData(GnosisNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), gnosisBlockClient, gnosisClient);
    const avalancheProtocolData = useBalancerChainProtocolData(AvalancheNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), avalancheBlockClient, avalancheClient);
    const baseProtocolData = useBalancerChainProtocolData(BaseNetworkInfo.decentralicedClientUri, 1706015447, baseBlockClient, baseClient);
    const fraxtalProtocolData = useBalancerChainProtocolData(FraxtalNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), fraxtalBlockClient, fraxtalClient);
    //Mainnet dominance
    const mainnetTVL = protocolData.tvl ? protocolData.tvl : 0
    const mainnetTVLChange = protocolData.tvlChange ? protocolData.tvlChange : 0
    const swapsChange = aggregatedProtocolData.swapsChange ? aggregatedProtocolData.swapsChange * 100 : 0
    const mainnetPercentage = 100 / aggregatedProtocolData.tvl * mainnetTVL

    //Aggregate states
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
    //const [aggregationInterval, setAggregationInterval] = React.useState('daily');

    //Aggregated TVL data
    const filteredTvlData = React.useMemo(() => {
        if (!aggregatedProtocolData.overallTvlData) {
            return [];
        }
        return aggregatedProtocolData.overallTvlData.filter((dataItem) => {
            const dataDate = dataItem.time; // assuming unixToDate converts timestamp to a JS Date object
            return Date.parse(dataDate) / 1000 >= endDate && Date.parse(dataDate) / 1000 <= startDate;
        });
    }, [aggregatedProtocolData.overallTvlData, startDate, endDate]);

    const filteredVolumeMetrics = React.useMemo(() => {
        if (!aggregatedProtocolData.overallVolumeChartData) {
            return [];
        }
        return aggregatedProtocolData.overallVolumeChartData.filter((dataItem) => {
            const dataDate = dataItem.time; // assuming unixToDate converts timestamp to a JS Date object
            return Date.parse(dataDate) / 1000 >= endDate && Date.parse(dataDate) / 1000 <= startDate;
        });
    }, [aggregatedProtocolData.overallVolumeChartData, startDate, endDate]);

    const filteredProtocolFeeMetrics = React.useMemo(() => {
        if (!aggregatedProtocolData.overallProtocolFeeData) {
            return [];
        }
        return aggregatedProtocolData.overallProtocolFeeData.filter((dataItem) => {
            const dataDate = dataItem.time; // assuming unixToDate converts timestamp to a JS Date object
            return Date.parse(dataDate) / 1000 >= endDate && Date.parse(dataDate) / 1000 <= startDate;
        });
    }, [aggregatedProtocolData.overallProtocolFeeData, startDate, endDate]);

    const filteredFeeMetrics = React.useMemo(() => {
        if (!aggregatedProtocolData.overallFeeChartData) {
            return [];
        }
        return aggregatedProtocolData.overallFeeChartData.filter((dataItem) => {
            const dataDate = dataItem.time; // assuming unixToDate converts timestamp to a JS Date object
            return Date.parse(dataDate) / 1000 >= endDate && Date.parse(dataDate) / 1000 <= startDate;
        });
    }, [aggregatedProtocolData.overallFeeChartData, startDate, endDate]);

    const filteredSwapsMetrics = React.useMemo(() => {
        if (!aggregatedProtocolData.overallSwapsChartData) {
            return [];
        }
        return aggregatedProtocolData.overallSwapsChartData.filter((dataItem) => {
            const dataDate = dataItem.time; // assuming unixToDate converts timestamp to a JS Date object
            return Date.parse(dataDate) / 1000 >= endDate && Date.parse(dataDate) / 1000 <= startDate;
        });
    }, [aggregatedProtocolData.overallSwapsChartData, startDate, endDate]);


    //Handlers
    const handleProtocolAlert = () => {
        setProtocolAlert(false);
    };

    const toggleTVLChart = () => {
        setShowMultiAreaChart(!showMultiAreaChart);
    };

    const toggleVolumeChart = () => {
        setShowMultiAreaVolumeChart(!showMultiAreaVolumeChart);
    }

    const toggleProtocolFeeChart = () => {
        setShowMultiAreaProtocolFeeChart(!showMultiAreaProtocolFeeChart);
    }

    const toggleFeeChart = () => {
        setShowMultiAreaFeeChart(!showMultiAreaFeeChart);
    }

    const toggleSwapChart = () => {
        setShowMultiSwapChart(!showMultiAreaSwapChart);
    }

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

    const networkExplorers = [
        {name: 'Ethereum', linkTarget: 'chain', svgPath: EtherLogo},
        {name: 'Arbitrum', linkTarget: 'arbitrum/chain', svgPath: ArbitrumLogo},
        {name: 'Polygon', linkTarget: 'polygon/chain', svgPath: PolygonLogo},
        {name: 'zkEVM', linkTarget: 'zkevm/chain', svgPath: PolygonZkEVMLogo},
        {name: 'Gnosis', linkTarget: 'gnosis/chain', svgPath: GnosisLogo},
        {name: 'Avalanche', linkTarget: 'avalanche/chain', svgPath: AvalancheLogo},
        {name: 'Base', linkTarget: 'base/chain', svgPath: BaseLogo},
        {name: 'Fraxtal', linkTarget: 'fraxtal/chain', svgPath: FraxtalLogo},

    ];


    return (
        <Box sx={{flexGrow: 2}}>
            <Box mb={1} sx={{flexGrow: 2, justifyContent: "center"}}>
                {protocolAlert && (
                    <Alert
                        severity="warning"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleProtocolAlert}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    >
                        {protocolAlertMessage}
                    </Alert>
                )}
            </Box>
            <Grid
                container
                spacing={2}
                sx={{justifyContent: 'center'}}
            >
                <Grid
                    item
                    xs={11}
                >
                    <Grid
                        container
                        spacing={{xs: 2, md: 2}}
                        columns={{xs: 4, sm: 2, md: 10}}
                    >
                        <Grid item mt={1} xs={11}>
                            <Grid container spacing={2} justifyContent="center">
                                {networkExplorers.map((network, index) => (
                                    <Grid item xs={3} sm={4} md={3} lg={1} key={index}>
                                        <ExploreCard
                                            linkName={network.name}
                                            linkTarget={network.linkTarget}
                                            svgPath={network.svgPath}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
            {protocolData.feeData.length > 10
                && arbitrumProtocolData.feeData.length > 10
                && polygonProtocolData.feeData.length > 10
                && baseProtocolData.feeData.length > 10
                && avalancheProtocolData.feeData.length > 10
                && fraxtalProtocolData.feeData.length > 10
                && gnosisProtocolData.feeData.length > 10 ?
                <Grid
                    container
                    spacing={1}
                    sx={{justifyContent: 'center'}}
                >
                    <Grid item xs={11}>
                        <Typography sx={{fontSize: '24px'}} mb={1}>Balancer v2: Global Stats</Typography>
                    </Grid>

                    <Grid item xs={11}>
                        <Grid
                            container
                            columns={{xs: 4, sm: 8, md: 12}}
                            sx={{justifyContent: {md: 'space-between', xs: 'center'}, alignContent: 'center'}}
                        >
                            <Box m={{xs: 0, sm: 1}}>
                                {balPriceData && balPriceData.price ?
                                    <CoinCard
                                        tokenAddress={balAddress}
                                        tokenName='BAL'
                                        tokenPrice={balPriceData.price}
                                        tokenPriceChange={balPriceData.priceChange24h}
                                    />
                                    : <CircularProgress/>}
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.tvl}
                                    mainMetricInUSD={true}
                                    metricName='Protocol TVL'
                                    mainMetricChange={aggregatedProtocolData.tvlChange * 100}
                                    MetricIcon={MonetizationOnIcon}
                                />
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                <MetricsCard
                                    mainMetric={mainnetPercentage}
                                    mainMetricInUSD={false}
                                    mainMetricUnit={' %'}
                                    metricName='Mainnet Dominance'
                                    mainMetricChange={mainnetTVLChange * 100}
                                    MetricIcon={PieChartIcon}
                                />
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.volume ? aggregatedProtocolData.volume : 0}
                                    mainMetricInUSD={true}
                                    metricName='Protocol Volume'
                                    mainMetricChange={aggregatedProtocolData.volumeChange}
                                    MetricIcon={EqualizerIcon}
                                />
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.protocolFees24 ? aggregatedProtocolData.protocolFees24 : 0}
                                    mainMetricInUSD={true}
                                    metricName='Protocol Fees'
                                    mainMetricChange={aggregatedProtocolData.protocolFeesChange}
                                    MetricIcon={RequestQuoteIcon}
                                />
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.fees24}
                                    mainMetricInUSD={true}
                                    metricName='Trading Fees'
                                    mainMetricChange={aggregatedProtocolData.feesChange}
                                    MetricIcon={CurrencyExchangeIcon}
                                />
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.swaps24 ? aggregatedProtocolData.swaps24 : 0}
                                    mainMetricInUSD={false}
                                    metricName='Swaps'
                                    mainMetricChange={swapsChange}
                                    MetricIcon={SwapHorizIcon}
                                />
                            </Box>
                        </Grid>
                    </Grid>


                    <Grid item mt={1} xs={11}>
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical TVL (v2)</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Button
                            variant="outlined"
                            onClick={toggleTVLChart}
                            sx={{backgroundColor: "background.paper", boxShadow: 2, borderRadius: 2, borderColor: 0}}

                        >
                            {showMultiAreaChart ? 'Aggregated TVL' : 'TVL per Chain'}
                        </Button>
                    </Grid>
                    {showMultiAreaChart ? (
                        <Grid item mt={1} xs={11}>
                            <ProtocolMultiAreaChart
                                mainnetProtocolData={protocolData}
                                arbitrumProtocolData={arbitrumProtocolData}
                                polygonProtocolData={polygonProtocolData}
                                polygonZkEVMProtocolData={polygonZkEVMProtocolData}
                                gnosisProtocolData={gnosisProtocolData}
                                avalancheProtocolData={avalancheProtocolData}
                                baseProtocolData={baseProtocolData}
                                fraxtalProtocolData={fraxtalProtocolData}
                            />
                        </Grid>
                    ) : (
                        <Grid item mt={1} xs={11}>
                            <Card>
                                <Box display="flex" alignItems="center" m={1}>
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
                                {filteredTvlData && filteredTvlData.length > 1 ? (
                                    <Box m={1}>
                                        <GenericAreaChart chartData={filteredTvlData} dataTitle={"Protocol TVL"}
                                                          height={'350px'}/>
                                    </Box>
                                ) : null}
                            </Card>
                        </Grid>
                    )}




                    <Grid item mt={1} xs={11}>
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical Volume (v2)</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Button
                            variant="outlined"
                            onClick={toggleVolumeChart}
                            sx={{backgroundColor: "background.paper", boxShadow: 2, borderRadius: 2, borderColor: 0}}

                        >
                            {showMultiAreaVolumeChart ? 'Aggregated Volume' : 'Volume per Chain'}
                        </Button>
                    </Grid>
                    {showMultiAreaVolumeChart ? (
                        <Grid item mt={1} xs={11}>
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={smoothData(protocolData.volumeData, 100000000)}
                            arbitrumProtocolData={smoothData(arbitrumProtocolData.volumeData, 100000000)}
                            polygonProtocolData={smoothData(polygonProtocolData.volumeData, 100000000)}
                            polygonZkEVMProtocolData={smoothData(polygonZkEVMProtocolData.volumeData, 100000000)}
                            gnosisProtocolData={smoothData(gnosisProtocolData.volumeData, 100000000)}
                            avalancheProtocolData={smoothData(avalancheProtocolData.volumeData, 100000000)}
                            baseProtocolData={smoothData(baseProtocolData.volumeData, 100000000)}
                            fraxtalProtocolData={smoothData(fraxtalProtocolData.volumeData, 100000000)}
                            isUSD={true}
                        />
                        </Grid>
                    ) : (
                        <Grid item mt={1} xs={11}>
                            <Card>
                                <Box display="flex" alignItems="center" m={1}>
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
                                {filteredTvlData && filteredTvlData.length > 1 ? (
                                    <Box m={1}>
                                        <GenericBarChart data={filteredVolumeMetrics} />
                                    </Box>
                                ) : null}
                            </Card>
                        </Grid>
                    )}
                    <Grid item mt={1} xs={11}>
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical Collected Protocol Fees (v2)</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Button
                            variant="outlined"
                            onClick={toggleProtocolFeeChart}
                            sx={{backgroundColor: "background.paper", boxShadow: 2, borderRadius: 2, borderColor: 0}}

                        >
                            {showMultiAreaProtocolFeeChart ? 'Aggregated Protocol Fees' : 'Protocol Fees per Chain'}
                        </Button>
                    </Grid>
                    {showMultiAreaProtocolFeeChart ? (
                    <Grid item mt={1} xs={11}>
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={smoothData(protocolData.protocolFeeData, 100000000)}
                            arbitrumProtocolData={smoothData(arbitrumProtocolData.protocolFeeData, 100000000)}
                            polygonProtocolData={smoothData(polygonProtocolData.protocolFeeData, 100000000)}
                            polygonZkEVMProtocolData={smoothData(polygonZkEVMProtocolData.protocolFeeData, 100000000)}
                            gnosisProtocolData={smoothData(gnosisProtocolData.protocolFeeData, 100000000)}
                            avalancheProtocolData={smoothData(avalancheProtocolData.protocolFeeData, 100000000)}
                            baseProtocolData={smoothData(baseProtocolData.protocolFeeData, 100000000)}
                            fraxtalProtocolData={smoothData(fraxtalProtocolData.protocolFeeData, 100000000)}
                            isUSD={true}
                        />
                    </Grid>) : (
                        <Grid item mt={1} xs={11}>
                            <Card>
                                <Box display="flex" alignItems="center" m={1}>
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
                                {filteredTvlData && filteredTvlData.length > 1 ? (
                                    <Box m={1}>
                                        <GenericBarChart data={filteredProtocolFeeMetrics} />
                                    </Box>
                                ) : null}
                            </Card>
                        </Grid>
                        )}

                    <Grid item mt={1} xs={11}>
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical Trading Fees (v2)</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Button
                            variant="outlined"
                            onClick={toggleFeeChart}
                            sx={{backgroundColor: "background.paper", boxShadow: 2, borderRadius: 2, borderColor: 0}}

                        >
                            {showMultiAreaFeeChart ? 'Aggregated Swap Fees' : 'Swap Fees per Chain'}
                        </Button>
                    </Grid>
                    {showMultiAreaFeeChart ? (
                    <Grid item mt={1} xs={11}>
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={smoothData(protocolData.feeData, 100000000)}
                            arbitrumProtocolData={smoothData(arbitrumProtocolData.feeData, 100000000)}
                            polygonProtocolData={smoothData(polygonProtocolData.feeData, 100000000)}
                            polygonZkEVMProtocolData={smoothData(polygonZkEVMProtocolData.feeData, 100000000)}
                            gnosisProtocolData={smoothData(gnosisProtocolData.feeData, 100000000)}
                            avalancheProtocolData={smoothData(avalancheProtocolData.feeData, 100000000)}
                            baseProtocolData={smoothData(baseProtocolData.feeData, 100000000)}
                            fraxtalProtocolData={smoothData(fraxtalProtocolData.feeData, 100000000)}
                            isUSD={true}
                        />
                    </Grid> ) : (
                        <Grid item mt={1} xs={11}>
                            <Card>
                                <Box display="flex" alignItems="center" m={1}>
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
                                {filteredTvlData && filteredTvlData.length > 1 ? (
                                    <Box m={1}>
                                        <GenericBarChart data={filteredFeeMetrics} />
                                    </Box>
                                ) : null}
                            </Card>
                        </Grid>
                    )}
                    <Grid item mt={1} xs={11}>
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical Swaps (v2)</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Button
                            variant="outlined"
                            onClick={toggleSwapChart}
                            sx={{backgroundColor: "background.paper", boxShadow: 2, borderRadius: 2, borderColor: 0}}

                        >
                            {showMultiAreaSwapChart ? 'Aggregated Swaps' : 'Swaps per Chain'}
                        </Button>
                    </Grid>
                    {showMultiAreaSwapChart ? (
                    <Grid item mt={1} xs={11}>
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={protocolData.swapData}
                            arbitrumProtocolData={arbitrumProtocolData.swapData}
                            polygonProtocolData={polygonProtocolData.swapData}
                            polygonZkEVMProtocolData={polygonZkEVMProtocolData.swapData}
                            gnosisProtocolData={gnosisProtocolData.swapData}
                            avalancheProtocolData={avalancheProtocolData.swapData}
                            baseProtocolData={baseProtocolData.swapData}
                            fraxtalProtocolData={fraxtalProtocolData.swapData}
                            isUSD={false}
                        />
                    </Grid> ) : (
                        <Grid item mt={1} xs={11}>
                            <Card>
                                <Box display="flex" alignItems="center" m={1}>
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
                                {filteredSwapsMetrics && filteredSwapsMetrics.length > 1 ? (
                                    <Box m={1}>
                                        <GenericBarChart data={filteredSwapsMetrics} />
                                    </Box>
                                ) : null}
                            </Card>
                        </Grid>
                    )}

                </Grid> : <Grid
                    container
                    spacing={2}
                    mt='10%'
                    mb='10%'
                    sx={{justifyContent: 'center'}}
                >
                    <CustomLinearProgress/>
                </Grid>}
        </Box>
    );
}
