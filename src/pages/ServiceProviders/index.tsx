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
        <Box sx={{ flexGrow: 2, justifyContent: "center" }}>
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={11}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={'Service Providers'} />
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
                            <Typography variant={"h5"}>Service Provider Dashboard</Typography>
                        </Box>
                    </Box>
                    <Box mt={1}>
                        <Typography variant="body2">Data in this dashboard represents approved snapshot
                            votes only. Any potential savings or adjustments after snapshot approval are not
                            considered in this dataset
                        </Typography>
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
                    container
                    sx={{ direction: { xs: 'column', sm: 'row' } }}
                    justifyContent="center"
                    alignItems="left"
                    alignContent="left"
                    spacing={2}
                >
                    <Grid
                        item
                        mt={2}
                        xs={11}
                        md={5.5}
                    >
                        {quarterlyPie ?
                            <Box >
                                <Card sx={{ boxShadow: 3 }}>
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
                    </Grid>
                    <Grid
                        item
                        mt={2}
                        xs={11}
                        md={5.5}
                    >
                        {totalsBySpsPie ?
                            <Box >
                                <Card sx={{ boxShadow: 3 }}>
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

                    </Grid>

                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    {balPriceData ?
                        <ServiceProviderSpendingTable spRows={spRows} year={dayjs().year()} quarter={currentQuarter} balPriceData={balPriceData} />
                        : null}
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
                <Grid
                    container
                    sx={{ direction: { xs: 'column', sm: 'row' } }}
                    justifyContent="center"
                    alignItems="left"
                    alignContent="left"
                    spacing={2}
                >
                     <Grid
                        item
                        mt={2}
                        xs={11}
                        md={5.5}
                    >
                        {nextQuarterPie ?
                            <Box >
                                <Card >
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
                    </Grid>
                    <Grid
                        item
                        mt={2}
                        xs={11}
                        md={5.5}
                    >
                        {totalsBySpsForecast ?
                            <Box >
                                <Card>
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
                    </Grid>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    {balPriceData ?
                        <ServiceProviderSpendingTable spRows={spRowsForecast} year={nextYearEntry} quarter={nextQuarter} balPriceData={balPriceData} />
                        : null}
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={11}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="row">
                        <Box display="flex" alignItems='center' mb={1}>
                            <Typography variant="h6">Service Provider Overview</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={11}
                >
                    <Grid
                        container
                        spacing={{ xs: 2, md: 2 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ justifyContent: 'center', alignContent: 'center', mb: 2 }}
                    >
                        {
                            sps.service_provider.map((sp, index) =>
                                <Grid
                                    item
                                    xs={11}
                                    sm={4}
                                    md={4}
                                    key={index}>
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