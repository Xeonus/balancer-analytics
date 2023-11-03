import {Typography, Grid, Box, Card, CircularProgress, Divider} from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { useActiveNetworkVersion } from "../../state/application/hooks";
import * as React from "react";
import {useBalancerPools} from "../../data/balancer/usePools";
import {CORE_POOLS_ARBITRUM, CORE_POOLS_MAINNET, CORE_POOLS_POLYGON} from "../../constants";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import useAggregatedProtocolData from "../../data/balancer/useAggregatedProtocolData";
import {BalancerChartDataItem} from "../../data/balancer/balancerTypes";
import GenericAreaChart from "../../components/Echarts/GenericAreaChart";


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
    //const pools = useBalancerPools(250, startDate, endDate).filter(pool => pool.poolType !== 'LiquidityBootstrapping' && corePools.includes(pool.id));
    //console.log("pools", pools)
    const aggregatedProtocolData = useAggregatedProtocolData();
    console.log("aggregatedProtocolData", aggregatedProtocolData);

    //---Data preparation---
    // For a given time-range obtain omnichain stats
    const tvlChartData: BalancerChartDataItem[] = [];




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
        } else {
            setShowDate(false);
            const newEndDate = new Date()
            newEndDate.setDate(today.getDate() - Number(event.target.value));
            newEndDate.setUTCHours(0, 0, 0, 0);
            setEndDate(Math.floor(newEndDate.getTime() / 1000));
        }
    };

    return (
        <Box sx={{ flexGrow: 2, justifyContent: "center" }}>
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={11}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={'Reports'} />
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
                </Grid>
                <Grid
                    item
                    mt={1}
                    mb={1}
                    xs={11}
                >
                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography >Report Time range:</Typography>
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
                                <Divider />
                                <MenuItem value={'1'}> 24 hours</MenuItem>
                                <MenuItem value={'7'}> 7 days</MenuItem>
                                <MenuItem value={'14'}> 14 days</MenuItem>
                                <MenuItem value={'30'}> 30 days</MenuItem>
                                <MenuItem value={'90'}>90 days</MenuItem>
                                <MenuItem value={'180'}>180 days</MenuItem>
                                <MenuItem value={'365'}>365 days</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">TVL Metrics</Typography>
                        </Box>
                    </Box>
                    <Card>
                        {aggregatedProtocolData && aggregatedProtocolData.overallTvlData && aggregatedProtocolData.overallTvlData.length > 1 ?
                        <GenericAreaChart chartData={aggregatedProtocolData.overallTvlData} dataTitle={"Protocol TVL"} /> : null }
                    </Card>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Core Pool Performance</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Estimated Expenditure in Q{currentQuarter} {dayjs().year()}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Forecast</Typography>
                        </Box>
                    </Box>
                </Grid>
                </Grid>

        </Box>
    );
}
