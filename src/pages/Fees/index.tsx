import * as React from 'react';
import { Typography, Grid, Box, Card, Divider } from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { useBalancerProtocolData } from "../../data/balancer/useProtocolData";
import ChainFeeChart from "../../components/ChainFeeChart";
import { useBalancerPools } from "../../data/balancer/usePools";
import { FEE_COLLECTOR_ADDRESS } from "../../constants/wallets";
import { useGetTotalBalances } from "../../data/debank/useGetTotalBalances";
import FeeCollectorTokenTable from "../../components/Tables/FeeCollectorTokenTable";
import { formatDollarAmount } from "../../utils/numbers";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import StyledExternalLink from '../../components/StyledExternalLink';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useDecoratePools from '../../data/balancer-sdk/useDecoratePools';
import AggregatedPoolFeeTable from '../../components/Tables/AggregatedPoolFeeTable';
import ProtocolFeeSankeyChart from '../../components/Echarts/ProtocolCharts/ProtocolFeeSankeyChart';
import PoolFeeTable from '../../components/Tables/PoolFeeTable';

export default function Fees() {

    //Time range selector States
    const [showDate, setShowDate] = React.useState(false);
    const [timeRange, setTimeRange] = React.useState('7');

    const [activeNetwork] = useActiveNetworkVersion()
    const protocolData = useBalancerProtocolData()

    //Poolsnapshots are taken OO:OO UTC. Generate previous snapshot date and previous Thu. Used to calculate weekly sweep fee generators
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

    //Load pools and balances
    const pools = useBalancerPools(250, startDate, endDate).filter(pool => pool.poolType !== 'LiquidityBootstrapping');
    const yieldPools = useBalancerPools(250, startTimestamp, endTimeStamp).filter(pool => pool.poolType !== 'LiquidityBootstrapping');
    const { totalBalances } = useGetTotalBalances(FEE_COLLECTOR_ADDRESS);
    const decoratedPools = useDecoratePools(yieldPools.length > 10 ? yieldPools : undefined)

    //Problem statement: We should distinguish between views of real realized fees -> make a swap fee analysis view that shows the "real" swap fees earned
    //Create an additional aggregated table that ESTIMATES / Makes a forecast on potential fees and its distributions from TODAYS fees!
    //Therefore load pools 2 times, once with custom time range and once for 24h range to make 2 views!

    //Clean up data and retrieve total amounts
    const balancesAboveThreshold = totalBalances ? totalBalances.filter(balance =>
        balance.amount * balance.price >= activeNetwork.feeCollectorThreshold &&
        balance.chain === activeNetwork.debankId) : null;
    const totalAmountAboveThreshold = balancesAboveThreshold ? balancesAboveThreshold.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;

    const balancesBelowThreshold = totalBalances ? totalBalances.filter(balance =>
        balance.amount * balance.price < activeNetwork.feeCollectorThreshold &&
        balance.chain === activeNetwork.debankId) : null;
    const totalAmountBelowThreshold = balancesBelowThreshold ? balancesBelowThreshold.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;

    //Extract data above 5k and print it to console for DAO fee sweeping
    // const balancesToSweep = totalBalances ? totalBalances.filter(balance =>
    //     balance.amount * balance.price >= 5000 &&
    //     balance.chain === activeNetwork.debankId) : null;
    // console.log("FEE COLLECTOR: Tokens above $5k on " + activeNetwork.name + " :", balancesToSweep);



    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const chainNav: NavElement = {
        name: 'Chain',
        link: 'chain'
    }
    const feesNav: NavElement = {
        name: 'Revenue',
        link: 'fees'
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)
    navCrumbs.push(chainNav);
    navCrumbs.push(feesNav);

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

    const handleStartDateChange = (value: number | null, keyboardInputValue?: string | undefined) => {
        if (value) {
            setStartDate(value);
        }
    };

    const handleEndDateChange = (value: number | null, keyboardInputValue?: string | undefined) => {
        if (value) {
            setEndDate(value);
            //Find index of selected date and slice accordingly
        }
    };


    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={11}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name} />
                    </Box>

                </Grid>
                <Grid mt={2} item xs={11}>
                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography variant={"h5"}>Historical Swap Fee Revenue on ({activeNetwork.name})</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Card
                        sx={{ boxShadow: 3 }}
                    >
                        <ChainFeeChart feesData={protocolData.feeData} />
                    </Card>
                </Grid>
                <Grid mt={2} item xs={11}>
                    <Typography variant="h5">Historical Pool Contributions to Protocol Revenue</Typography>
                </Grid>
                <Grid item xs={11} >
                    <Box display="flex" alignItems="center" justifyContent="space-between" >
                        <Typography variant="caption">Historical contributions from earned swap fees based on the chosen time range</Typography>
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
                        {showDate ?
                            <Box p={0.5} display="flex" justifyContent="left" >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Start Date"
                                        maxDate={Date.now()}
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        renderInput={(params) => <TextField size='small' sx={{ maxWidth: '150px' }} {...params} />}
                                    />
                                </LocalizationProvider>
                                <Box p={1}>
                                    <Typography>to</Typography>
                                </Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="End Date"
                                        maxDate={Date.now()}
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        renderInput={(params) => <TextField size='small' sx={{ maxWidth: '150px' }} {...params} />}
                                    />
                                </LocalizationProvider>
                            </Box> : null}
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <PoolFeeTable poolDatas={pools} timeRange={Number(timeRange)} />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={11}>
                    <Box alignItems='left'>
                        <Typography variant="h5">Projected Revenue Streams ({timeRange === '1' ? '24h' : timeRange + ' days'})</Typography>
                        <Typography variant="caption">Estimations are based on current token yield and 24h swap fee data</Typography>
                    </Box>
                </Grid>
            </Grid>
            {decoratedPools ?
                <Grid
                    container
                    spacing={1}
                    sx={{ justifyContent: 'center' }}
                >
                    <Grid item xs={11}>
                        <Card
                            sx={{ boxShadow: 3 }}
                        >
                            <ProtocolFeeSankeyChart poolDatas={decoratedPools} timeRange={Number(timeRange)} />
                        </Card>
                    </Grid>
                    <Grid mt={2} item xs={11}>
                        <Typography variant="h6">Projected Pool Revenue Performance to the DAO</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <AggregatedPoolFeeTable poolDatas={decoratedPools} timeRange={Number(timeRange)} />
                    </Grid>
                </Grid> : (<Grid
                    container
                    spacing={2}
                    mt={3}
                    sx={{ justifyContent: 'center' }}
                >
                    <Box display="flex" justifyContent="center" alignItems="center" alignContent="center" flexDirection="column">
                        <CustomLinearProgress />
                        <Typography variant="caption">Calculating token yield...</Typography>
                    </Box>
                </Grid>)}
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid mt={2} item xs={11}>
                    <Box display="flex" alignItems='center'>
                        <Typography variant="h5">Tokens in Fee Collector Contract</Typography>
                        <Box ml={1}>
                            <StyledExternalLink address={FEE_COLLECTOR_ADDRESS} type={'address'} activeNetwork={activeNetwork} />
                        </Box>
                    </Box>
                    <Typography variant="caption">Collected tokens will be distributed to veBAL holders, bribes and the DAO</Typography>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="subtitle1">Tokens to be distributed: {formatDollarAmount(totalAmountAboveThreshold)}</Typography>
                </Grid>
            </Grid>
            {totalBalances && totalBalances.length > 0 ?
                <Grid
                    container
                    spacing={1}
                    sx={{ justifyContent: 'center' }}
                >
                    {balancesAboveThreshold && balancesAboveThreshold.length > 0 ?
                        <Grid item xs={11}>
                            <FeeCollectorTokenTable tokenBalances={balancesAboveThreshold} />
                        </Grid> :
                        <Grid item xs={11}>
                            <Box ml={1}>
                                <Typography color='error'>No tokens to be collected</Typography>
                            </Box>
                        </Grid>
                    }
                    <Grid item xs={11}>

                        <Typography variant="subtitle1">
                            Tokens below threshold ( &lt; {formatDollarAmount(activeNetwork.feeCollectorThreshold)}) : {formatDollarAmount(totalAmountBelowThreshold)}
                        </Typography>
                    </Grid>
                    {balancesBelowThreshold && balancesBelowThreshold.length > 0 ?
                        <Grid item xs={11}>
                            <FeeCollectorTokenTable tokenBalances={balancesBelowThreshold} />
                        </Grid> : <Grid item xs={11}>
                            <Box ml={1}>
                                <Typography color='error'>No tokens below threshold</Typography>
                            </Box>
                        </Grid>}
                </Grid> : (<Grid
                    container
                    spacing={2}
                    mt={3}
                    sx={{ justifyContent: 'center' }}
                >
                    <CustomLinearProgress />
                </Grid>)}
        </Box>
    );
}