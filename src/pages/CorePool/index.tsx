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
import {BalancerChartDataItem} from "../../data/balancer/balancerTypes";
import MetricsCard from "../../components/Cards/MetricsCard";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import MixedLineBarChart from "../../components/Echarts/MixedLineBarChart";


export default function CorePool() {

    const params = useParams();
    const [activeNetwork] = useActiveNetworkVersion();
    const poolId = params.poolId ? params.poolId : '';


    //Fetch pool and fee data
    const poolData = useBalancerPoolSingleData(poolId);
    const {tvlData, volumeData, feesData, tokenDatas, protocolFeesData} = useBalancerPoolPageData(poolId);
    const {swaps, joinExits, swapPairVolumes} = useBalancerTransactionData(
        (poolData?.tokens || []).map((token) => token.address),
        poolData ? [poolData.id] : [],
    );
    const combinedFees = useGetCombinedIncentives();
    console.log("combinedFees", combinedFees)

    //Aggregate data for given pool

    //Lifetime earned fees - DATA SOURCE: Fee allocator
    const lifeTimeFees = combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.earned_fees), 0);

    const lifeTimeFeesToDAO = combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.fees_to_dao), 0);

    const lifeTimeFeesToveBAL = combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.fees_to_vebal), 0);

    const lifeTimeRedirects = combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.redirected_incentives), 0);

    const lifeTimeIncentives = combinedFees.filter(record => record.poolId === poolId)
        .reduce((acc, record) => acc + parseFloat(record.total_incentives), 0);

    //Lifetime fees - DATA SOURCE: subgraph pool data
    const lifetimeTradingFees = feesData.reduce((acc, record) => acc + record.value, 0);
    let cumulativeTradingFeesValue = 0
    const cumulativeTradingFees = feesData.map(el => {
        cumulativeTradingFeesValue = cumulativeTradingFeesValue + el.value;
        return {
            value: cumulativeTradingFeesValue,
            time: el.time
        };
    })

    //Lifetime protocol fees - DATA SOURCE: subgraph pool data
    const lifetimeProtocolFees = protocolFeesData.reduce((acc, record) => acc + record.value, 0);
    let cumulativeProtocolFeesValue = 0
    const cumulativeProtocolFees = protocolFeesData.map(el => {
        cumulativeProtocolFeesValue = cumulativeProtocolFeesValue + el.value;
        return {
            value: cumulativeProtocolFeesValue,
            time: el.time
        };
    })

    const lifeTimeVolume = volumeData.reduce((acc, record) => acc + record.value, 0);

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

    //Change metrics
    let incentiveDelta = 0
    if (balIncentiveChartData && balIncentiveChartData.length > 0 && auraIncentiveChartData && auraIncentiveChartData.length > 0) {
        incentiveDelta = (balIncentiveChartData[balIncentiveChartData.length - 1].value + auraIncentiveChartData[auraIncentiveChartData.length - 1].value) /
            (balIncentiveChartData[balIncentiveChartData.length - 2].value + auraIncentiveChartData[auraIncentiveChartData.length - 2].value) - 1
    }


    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)

    return (
        poolData &&
        combinedFees && combinedFees.length > 0 &&
            feesData && feesData.length > 0 &&
            volumeData && volumeData.length > 0 ?
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
                            sx={{justifyContent: {xs: 'flex-start', md: 'space-between'}}}
                        >
                            <NavCrumbs crumbSet={navCrumbs} destination={getShortPoolName(poolData)}/>
                            <StyledExternalLink address={poolData.address} type={'address'}
                                                activeNetwork={activeNetwork}/>
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography sx={{fontSize: '24px'}}>Lifetime Fee-Collector Metrics</Typography>
                        <Typography sx={{fontSize: '12px'}}>Aggregated metrics are only available from February 2024 onwards. Fee processing before was done manually.</Typography>
                    </Grid>

                    <Grid item xs={11} mb={1}>
                        <Grid
                            container
                            columns={{xs: 4, sm: 8, md: 12}}
                            sx={{justifyContent: {md: 'flex-start', xs: 'center'}, alignContent: 'center'}}
                        >
                            <Box
                                m={1}
                            >
                                <MetricsCard
                                    mainMetric={lifeTimeFees ? lifeTimeFees : 0}
                                    mainMetricInUSD={true}
                                    metricName='Protocol Fees'
                                    MetricIcon={EqualizerIcon}
                                    toolTipText={'Amount of core pool fees collected as USDC after token swaps. That amount was effectively distributed to the DAO, veBAL holders and voting incentive markets'}
                                />
                            </Box>
                            <Box
                                m={1}
                            >
                                <MetricsCard
                                    mainMetric={lifeTimeIncentives ? lifeTimeIncentives : 0}
                                    mainMetricInUSD={true}
                                    metricName='Voting Incentives'
                                    mainMetricChange={incentiveDelta * 100}
                                    mainMetricChangeRange={'(vs. prev. round)'}
                                    MetricIcon={EqualizerIcon}
                                />
                            </Box>
                            <Box
                                m={1}
                            >
                                <MetricsCard
                                    mainMetric={lifeTimeFeesToDAO ? lifeTimeFeesToDAO : 0}
                                    mainMetricInUSD={true}
                                    metricName='DAO Rev Share'
                                    MetricIcon={MonetizationOnIcon}
                                />
                            </Box>
                            <Box
                                m={1}
                            >
                                <MetricsCard
                                    mainMetric={lifeTimeFeesToveBAL ? lifeTimeFeesToveBAL : 0}
                                    mainMetricInUSD={true}
                                    metricName='veBAL Rev Share'
                                    MetricIcon={CurrencyExchangeIcon}

                                />
                            </Box>
                            <Box
                                m={1}
                            >
                                <MetricsCard
                                    mainMetric={lifeTimeRedirects ? lifeTimeRedirects : 0}
                                    mainMetricInUSD={true}
                                    metricName='Fee Redirects'
                                    MetricIcon={SwapHorizontalCircleIcon}
                                    toolTipText={'Total amount of collected protocol fees that have been redirected to other core pools. This can happen if the threshold falls below the minimum voting incentive (e.g. $500 or $1000)'}

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
                    mt={1}
                >
                    <Grid item xs={11}>
                        <Typography sx={{fontSize: '20px'}}>Per-Round Distribution to Voting Markets</Typography>

                    </Grid>
                    <Grid
                        item
                        xs={10}
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
                <Grid
                    container
                    sx={{direction: {xs: 'column', sm: 'row'}}}
                    justifyContent="space-around"
                    alignItems="left"
                    alignContent="left"
                    spacing={2}
                    mt={1}
                >
                    <Grid item xs={11}>
                        <Typography sx={{fontSize: '24px'}}>Lifetime Pool Performance Metrics</Typography>

                    </Grid>
                    <Grid item xs={11} mb={1}>
                        <Grid
                            container
                            columns={{xs: 4, sm: 8, md: 12}}
                            sx={{justifyContent: {md: 'flex-start', xs: 'center'}, alignContent: 'center'}}
                        >
                            <Box
                                m={1}
                            >
                                <MetricsCard
                                    mainMetric={lifetimeTradingFees ? lifetimeTradingFees : 0}
                                    mainMetricInUSD={true}
                                    metricName='Trading Fees'
                                    MetricIcon={EqualizerIcon}
                                    toolTipText={'Total Amount of trading fees distributed (50% to LPs, 50% to fee collector)'}
                                />
                            </Box>
                            <Box
                                m={1}
                            >
                                <MetricsCard
                                    mainMetric={lifeTimeVolume ? lifeTimeVolume : 0}
                                    mainMetricInUSD={true}
                                    metricName='Trading Volume'
                                    MetricIcon={EqualizerIcon}
                                    toolTipText={'Lifetime amount of tradnig volume on the pool since inception.'}
                                />
                            </Box>
                            <Box
                                m={1}
                            >
                                <MetricsCard
                                    mainMetric={lifetimeProtocolFees ? lifetimeProtocolFees : 0}
                                    mainMetricInUSD={true}
                                    metricName='Protocol Fees'
                                    MetricIcon={EqualizerIcon}
                                    toolTipText={'Total Amount of protocol fees collected as BPTs (Balancer pool tokens)'}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={10}
                        md={5}
                    >
                        <Card>
                            <Box m={1}>
                                <Typography>Lifetime Trading Fees Collected</Typography>
                            </Box>
                            <MixedLineBarChart
                                barChartData={feesData}
                                barChartName={'Trading Fees'}
                                lineChartData={cumulativeTradingFees}
                                lineChartName={'Cumulative Trading Fees'}
                                noRainbowColors={true}

                            />
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        md={5}
                    >
                        <Card>
                            <Box m={1}>
                                <Typography>Lifetime Protocol Fees Collected </Typography>
                            </Box>
                            <MixedLineBarChart
                                barChartData={protocolFeesData}
                                barChartName={'Protocol Fees'}
                                lineChartData={cumulativeProtocolFees}
                                lineChartName={'Cumulative Protocol Fees'}
                                noRainbowColors={true}

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
                sx={{justifyContent: 'center'}}
            >
                <CustomLinearProgress/>
            </Grid>)
    );
}