import { Typography, Grid, Box, Card, CircularProgress } from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import spJson from './serviceProviderConfig.json'
import { ServiceProvidersConfig } from '../../types';
import ServiceProviderCard from '../../components/Cards/ServiceProviderCard';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import { formatDollarAmount } from '../../utils/numbers';
import { getTotalsBySp, useGetQuarterlyTotalSpendData, useGetSPTableEntry } from './helpers';
import ServiceProviderSpendingTable from '../../components/Tables/ServiceProviderSpendingTable';
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import { useActiveNetworkVersion } from "../../state/application/hooks";



export default function ServiceProviders() {


    //States
    dayjs.extend(quarterOfYear);
    const currentQuarter = dayjs().quarter();
    const [activeNetwork] = useActiveNetworkVersion()
    const sps: ServiceProvidersConfig = JSON.parse(JSON.stringify(spJson));
    const balPriceData = useCoinGeckoSimpleTokenPrices([activeNetwork.balAddress]);


    //Data
    const [quarterlyPie, quarterlyTotalBudget] = useGetQuarterlyTotalSpendData(sps, dayjs().year(), currentQuarter, balPriceData)
    const nextQuarter = currentQuarter < 4 ? currentQuarter + 1 : 1;
    const nextYearEntry = currentQuarter < 4 ? dayjs().year() : dayjs().year() + 1;
    const [nextQuarterPie, netQuarterTotal] = useGetQuarterlyTotalSpendData(sps, nextYearEntry, nextQuarter, balPriceData);
    const spRows = useGetSPTableEntry(sps, dayjs().year(), currentQuarter, balPriceData);
    const totalsBySpsPie = getTotalsBySp(spRows);
    const spRowsForecast = useGetSPTableEntry(sps, nextYearEntry, nextQuarter, balPriceData);
    const totalsBySpsForecast = getTotalsBySp(spRowsForecast);




    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)

    return (
        <Box sx={{ flexGrow: 1, justifyContent: "center" }}>
            <Grid
                container
                spacing={2}
                mt={3}
                sx={{ justifyContent: 'center' }}
            >
            </Grid>
            <Grid
                container
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={10}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={'Service Providers'} />
                    </Box>
                </Grid>
                <Grid item mt={1} mb={1} xs={10} >
                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography variant={"h5"}>Service Provider Dashboard</Typography>
                        </Box>

                    </Box>
                    <Box mt={1}>
                        <Typography variant="body2">Data presented in this dashboard represents approved snapshot
                            votes only. Any potential savings or adjustments after approal are not
                            represented in this dataset
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={10}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Estimated Expenditure in Q{currentQuarter} {dayjs().year()}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={10}
                >
                </Grid>
                <Grid
                    item
                    xs={10}
                >
                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="row">
                        <Box mb={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="row">
                            {quarterlyPie ?
                                <Box >
                                    <Card sx={{ minWidth: '500px' }}>
                                        <Box p={1}>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="h6"
                                            >
                                                Total expenditure for Q{currentQuarter} {dayjs().year()} : {formatDollarAmount(quarterlyTotalBudget)}*
                                            </Typography>

                                        </Box>
                                        <GenericPieChart data={quarterlyPie} height='200px' />
                                        <Box p={1}>
                                            <Typography variant="caption">* Based on approved snapshot proposal specifications</Typography>
                                        </Box>
                                    </Card>
                                </Box> : <CircularProgress />}
                            {totalsBySpsPie ?
                                <Box ml={1} >
                                    <Card sx={{ minWidth: '500px' }}>
                                        <Box p={1}>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="h6"
                                            >
                                                Breakdown by SP for Q{currentQuarter} {dayjs().year()}*
                                            </Typography>
                                        </Box>
                                        <GenericPieChart data={totalsBySpsPie} height='200px' />
                                        <Box p={1}>
                                            <Typography variant="caption">* Based on approved snapshot proposal specifications</Typography>
                                        </Box>
                                    </Card>
                                </Box> : <CircularProgress />}
                        </Box>
                    </Box>
                    {balPriceData ?
                        <ServiceProviderSpendingTable spRows={spRows} year={dayjs().year()} quarter={currentQuarter} balPriceData={balPriceData} />
                        : null}
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={10}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center'>
                            <Typography variant="h6">Forecast</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={1}
                    xs={10}
                >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                            {nextQuarterPie ?
                                <Box >
                                    <Card sx={{ minWidth: '500px' }}>
                                        <Box p={1}>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="h6"
                                            >
                                                Upcoming spending for Q{nextQuarter} {nextYearEntry} : {formatDollarAmount(netQuarterTotal)}*
                                            </Typography>
                                        </Box>
                                        <GenericPieChart data={nextQuarterPie} height='200px' />
                                        <Box p={1}>
                                            <Typography variant="caption">* Based on approved snapshot proposal specifications</Typography>
                                        </Box>
                                    </Card>
                                </Box> : <CircularProgress />}

                        </Box>
                        {totalsBySpsForecast ?
                            <Box ml={1} >
                                <Card sx={{ minWidth: '500px' }}>
                                    <Box p={1}>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                            variant="h6"
                                        >
                                            Breakdown by SP for Q{nextQuarter} {nextYearEntry}*
                                        </Typography>
                                    </Box>
                                    <GenericPieChart data={totalsBySpsForecast} height='200px' />
                                    <Box p={1}>
                                        <Typography variant="caption">* Based on approved snapshot proposal specifications</Typography>
                                    </Box>
                                </Card>
                            </Box> : <CircularProgress />}
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={10}
                >
                    {balPriceData ?
                        <ServiceProviderSpendingTable spRows={spRowsForecast} year={nextYearEntry} quarter={nextQuarter} balPriceData={balPriceData} />
                        : null}
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={10}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center' mb={1}>
                            <Typography variant="h6">Service Provider Overview</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={10}
                >
                    <Grid
                        container
                        spacing={{ xs: 2, md: 2 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ justifyContent: 'center', alignContent: 'center' }}
                    >
                        {
                            sps.service_provider.map((sp, index) =>
                                <Grid item xs={10} sm={4} md={4} key={index}>
                                    <ServiceProviderCard sp={sp} />
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}