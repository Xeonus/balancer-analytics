import useGetCombinedIncentives from "../../data/maxis/useGetCombinedIncentives";
import NavCrumbs, {NavElement} from "../../components/NavCrumbs";
import {Card, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import * as React from "react";
import {useParams} from "react-router-dom";
import {useActiveNetworkVersion} from "../../state/application/hooks";
import {useBalancerPoolPageData, useBalancerPoolSingleData} from "../../data/balancer/usePools";
import {useBalancerTransactionData} from "../../data/balancer/useTransactions";
import {getShortPoolName} from "../../utils/getShortPoolName";
import StyledExternalLink from "../../components/StyledExternalLink";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import {Balancer} from "../../apollo/generated/graphql-codegen-generated";
import {BalancerChartDataItem} from "../../data/balancer/balancerTypes";
import MetricsCard from "../../components/Cards/MetricsCard";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import GenericBarChart from "../../components/Echarts/GenericBarChart";
import MixedLineBarChart from "../../components/Echarts/MixedLineBarChart";


export default function CorePool() {

    const params = useParams();
    const [activeNetwork] = useActiveNetworkVersion();
    const poolId = params.poolId ? params.poolId : '';


    //Fetch pool and fee data
    const poolData = useBalancerPoolSingleData(poolId);
    const { tvlData, volumeData, feesData, tokenDatas, protocolFeesData} = useBalancerPoolPageData(poolId);
    const { swaps, joinExits, swapPairVolumes } = useBalancerTransactionData(
        (poolData?.tokens || []).map((token) => token.address),
        poolData ? [poolData.id] : [],
    );
    const combinedFees = useGetCombinedIncentives();
    console.log("combinedFees", combinedFees)

    //Aggregate data for given pool

    //Lifetime earned fees
    const lifeTimeFees = combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.earned_fees), 0);

    const lifeTimeFeesToDAO = combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.fees_to_dao), 0);

    const lifeTimeFeesToveBAL= combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.fees_to_vebal), 0);

    const lifeTimeRedirects= combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.redirected_incentives), 0);

    const lifeTimeIncentives= combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.total_incentives), 0);

    let balIncentiveChartData: BalancerChartDataItem[] = [];
    balIncentiveChartData = combinedFees.filter(record => record.poolId === poolId && record.date_string != null)
        .map(record => {
            const lastDate = record.date_string!.split('_').pop() || ''; // Safely extract the last date
            return {
                value: parseFloat(record.bal_incentives),
                time: lastDate
            };
        }).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    let cumulativeBalIncentives: BalancerChartDataItem[] = [];
    let cumulativeBalValue = 0
    cumulativeBalIncentives = balIncentiveChartData.map(el => {
        cumulativeBalValue = cumulativeBalValue + el.value;
        return {
            value: cumulativeBalValue,
            time: el.time
        };
    })

    let auraIncentiveChartData: BalancerChartDataItem[] = [];
    auraIncentiveChartData = combinedFees.filter(record => record.poolId === poolId && record.date_string != null)
        .map(record => {
            const lastDate = record.date_string!.split('_').pop() || ''; // Safely extract the last date
            return {
                value: parseFloat(record.aura_incentives),
                time: lastDate
            };
        }).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    let cumulativeAuraIncentives: BalancerChartDataItem[] = [];
    let cumulativeAuraValue = 0
    cumulativeAuraIncentives = auraIncentiveChartData.map(el => {
        cumulativeAuraValue = cumulativeAuraValue + el.value;
        return {
            value: cumulativeAuraValue,
            time: el.time
        };
    })

    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)

    return (
        poolData ?
        <Box sx={{flexGrow: 2}}>
            <Grid
                container
                spacing={2}
                sx={{justifyContent: 'center'}}
            >

                <Grid item xs={11}>
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{ justifyContent: { xs: 'flex-start', md: 'space-between' } }}
                    >
                        <NavCrumbs crumbSet={navCrumbs} destination={getShortPoolName(poolData)} />
                        <StyledExternalLink address={poolData.address} type={'address'} activeNetwork={activeNetwork} />
                    </Box>
                </Grid>
                <Grid>
                    <Typography>Lifetime Stats</Typography>
                </Grid>
            <Grid item xs={11} mb={1}>
                <Grid
                    container
                    columns={{xs: 4, sm: 8, md: 12}}
                    sx={{justifyContent: {md: 'space-between', xs: 'center'}, alignContent: 'center'}}
                >
                    <Box
                        m={1}
                    >
                        <MetricsCard
                            mainMetric={lifeTimeFees ? lifeTimeFees : 0}
                            mainMetricInUSD={true}
                            metricName='Lifetime Fees'
                            MetricIcon={EqualizerIcon}
                        />
                    </Box>
                    <Box
                        m={1}
                    >
                        <MetricsCard
                            mainMetric={lifeTimeIncentives ? lifeTimeIncentives : 0}
                            mainMetricInUSD={true}
                            metricName='Lifetime Voting Incentives'
                            MetricIcon={EqualizerIcon}
                        />
                    </Box>
                    <Box
                        m={1}
                    >
                        <MetricsCard
                            mainMetric={lifeTimeFeesToDAO ? lifeTimeFeesToDAO : 0}
                            mainMetricInUSD={true}
                            metricName='Lifetime Fees to DAO'
                            MetricIcon={MonetizationOnIcon}
                        />
                    </Box>
                    <Box
                        m={1}
                    >
                        <MetricsCard
                            mainMetric={lifeTimeFeesToveBAL ? lifeTimeFeesToveBAL : 0}
                            mainMetricInUSD={true}
                            metricName='Lifetime Fees to veBAL'
                            MetricIcon={CurrencyExchangeIcon}

                        />
                    </Box>
                    <Box
                        m={1}
                    >
                        <MetricsCard
                            mainMetric={lifeTimeRedirects ? lifeTimeRedirects : 0}
                            mainMetricInUSD={true}
                            metricName='Lifetime Redirects'
                            MetricIcon={SwapHorizontalCircleIcon}

                        />
                    </Box>
                </Grid>
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
                xs={11}
                md={5}
            >
                <Card>
                    <Box m={1}>
                        <Typography>Incentives to veBAL Voting Incentive Marketplace</Typography>
                    </Box>
                    <MixedLineBarChart
                        barChartData={balIncentiveChartData}
                        barChartName={'Per Round Balancer Incentives'}
                        lineChartData={cumulativeBalIncentives}
                        lineChartName={'Cumulative Balancer Incentives'}

                    />
                </Card>
            </Grid>
            <Grid
                item
                mt={1}
                xs={11}
                md={5}
            >
                <Card>
                        <Box m={1}>
                            <Typography>Incentives to veBAL Voting Incentive Marketplace </Typography>
                        </Box>

                    <MixedLineBarChart
                        barChartData={auraIncentiveChartData}
                        barChartName={'Per Round AURA Incentives'}
                        lineChartData={cumulativeAuraIncentives}
                        lineChartName={'Cumulative AURA Incentives'}

                    />
                </Card>
            </Grid>
            </Grid>
            <Grid mb={2}></Grid>
        </Box>
            :
            (<Grid
                container
                spacing={2}
                mt='25%'
                sx={{ justifyContent: 'center' }}
            >
                <CustomLinearProgress />
            </Grid>)
    );
}