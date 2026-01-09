import {BalancerSDK, balEmissions} from '@balancer-labs/sdk';
import {Card, CircularProgress, Grid, Typography} from "@mui/material";
import {useBalancerPools} from "../../data/balancer/usePools";
import {useActiveNetworkVersion} from "../../state/application/hooks";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import {Box} from "@mui/system";
import {POOL_HIDE} from "../../constants";
import {BalancerChartDataItem, BalancerPieChartDataItem, PoolData} from "../../data/balancer/balancerTypes";
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import MixedLineBarChart from '../../components/Echarts/MixedLineBarChart';
import NavCrumbs, {NavElement} from '../../components/NavCrumbs';
import useDecoratePools from '../../data/balancer-sdk/useDecoratePools';
import MetricsCard from '../../components/Cards/MetricsCard';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmissionsTable from '../../components/Tables/EmissionsTable';
import {useCoinGeckoSimpleTokenPrices} from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import CoinCard from '../../components/Cards/CoinCard';
import {EthereumNetworkInfo} from '../../constants/networks';
import useGetAllPools from "../../data/balancer-api-v3/useGetAllPools";
import {GqlChain} from "../../apollo/generated/graphql-codegen-generated";
import useGetBalancerV3StakingGauges from "../../data/balancer-api-v3/useGetBalancerV3StakingGauges";
import useGetCurrentTokenPrices from "../../data/balancer-api-v3/useGetCurrentTokenPrices";

export default function Emissions() {


    const [activeNetwork] = useActiveNetworkVersion();

    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const poolNav: NavElement = {
        name: 'Chain',
        link: 'chain'
    }
    const tokenNav: NavElement = {
        name: 'Emissions',
        link: 'emissions'
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)
    navCrumbs.push(poolNav);
    navCrumbs.push(tokenNav)

    //TODO: obtain form contants
    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    //Data
    const { data: currentPrices } = useGetCurrentTokenPrices(["MAINNET"]);
    const balPriceData = currentPrices?.find(token => token.address.toLowerCase() === balAddress.toLowerCase());
    const balPrice = balPriceData?.price ?? 0;

    //Init SDK - static for Mainnet
    const sdk = new BalancerSDK({
        network: Number(EthereumNetworkInfo.chainId),
        rpcUrl: EthereumNetworkInfo.rpcUrl,
    });

    //Obtain weekly and yearly BAL emissions
    const {data} = sdk;
    const now = Math.round(new Date().getTime() / 1000)
    const totalBalEmissions = balEmissions.between(now, now + 365 * 86400)
    const weeklyEmissions = balEmissions.weekly(now)
    let globalPools = useGetAllPools([activeNetwork.v3NetworkID as GqlChain], [""]);
    const gaugeData = useGetBalancerV3StakingGauges();

    if (globalPools && gaugeData) {
        globalPools = globalPools.filter(pool =>
            gaugeData.some(gauge => gauge.pool.address === pool.address)
        );
    }

    //Create bar chart data for pool distribution
    const poolBarChartData: BalancerChartDataItem[] = [];
    if (globalPools && balPrice) {
        globalPools.map((pool) =>
            poolBarChartData.push(
                {
                    value: pool.globalAPRStats && balPrice ? pool.globalAPRStats.nativeRewardAPRs.min * pool.totalLiquidity / 365 * 7 * balPrice : 0,
                    time: pool.name,
                }
            )
        )
    }
    const poolLineChartData: BalancerChartDataItem[] = [];
    if (globalPools && balPrice) {
        globalPools.map((pool) =>
            poolLineChartData.push(
                {
                    value: pool.fees24h,
                    time: pool.name,
                }
            )
        )
    }
    //Only get top 20 pools
    const filteredPoolBarChartData = poolBarChartData.sort(function (a, b) {
        return b.value - a.value;
    }).slice(0, 19);
    const filteredPieChartData: BalancerPieChartDataItem[] = filteredPoolBarChartData.map(({value, time}) => ({
        value: value,
        name: time,
    }))


    return (
        <Box sx={{flexGrow: 2}}>
            <Grid
                container
                spacing={2}
                sx={{justifyContent: 'center'}}
            >
                <Grid item xs={11} mb={2}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name}/>
                    </Box>

                </Grid>
                {totalBalEmissions && weeklyEmissions ?
                    <Grid item xs={11}>
                        <Grid
                            container
                            columns={{xs: 4, sm: 8, md: 12}}
                            sx={{justifyContent: {md: 'flex-start', xs: 'center'}, alignContent: 'center'}}
                        >
                            <Box m={1}>
                                {balPriceData && balPriceData.price ?
                                    <CoinCard
                                        tokenAddress={balAddress}
                                        tokenName='BAL'
                                        tokenPrice={balPriceData.price}
                                        tokenPriceChange={0}
                                    />
                                    : <CircularProgress/>}
                            </Box>
                            <Box m={1}>
                                <MetricsCard
                                    mainMetric={weeklyEmissions}
                                    mainMetricInUSD={false}
                                    mainMetricUnit={' BAL/week'}
                                    metricName={'Weekly BAL Emisson'}
                                    MetricIcon={AutoAwesomeIcon}

                                />
                            </Box>
                            <Box m={1}>
                                <MetricsCard
                                    mainMetric={totalBalEmissions}
                                    mainMetricInUSD={false}
                                    mainMetricUnit={' BAL/year'}
                                    metricName={'Yearly BAL Emisson'}
                                    MetricIcon={AutoAwesomeIcon}

                                />
                            </Box>
                        </Grid>
                    </Grid> : null}
                {filteredPoolBarChartData.length > 1 ?
                    <Grid
                        item
                        ml={1}
                        mt={1}
                        xs={11}
                    >
                        <Typography variant='h5'>
                            Top 20 Pools by Weekly Emissions on {activeNetwork.name}
                        </Typography>
                    </Grid> : null}
                {filteredPoolBarChartData.length > 1 ?
                    <Grid
                        container
                        sx={{
                            direction: {xs: 'column', sm: 'row'}
                        }}
                        justifyContent="center"
                        alignItems="left"
                        alignContent="left"
                        spacing={2}
                    >

                        {filteredPoolBarChartData.length > 1 ?
                            <Grid
                                item
                                xs={11}
                                md={5}
                            >
                                <Card
                                    sx={{boxShadow: 3}}
                                >
                                    < MixedLineBarChart
                                        barChartData={filteredPoolBarChartData}
                                        barChartName={'BAL Emissions'}
                                        lineChartData={poolLineChartData}
                                        lineChartName={'Trading Fees 7d'}
                                        rotateAxis={true}/>
                                </Card>
                            </Grid> : null}
                        <Grid
                            item
                            xs={11}
                            md={5}
                        >
                            <Card
                                sx={{boxShadow: 3}}
                            >
                                <GenericPieChart data={filteredPieChartData} height='350px'/>
                            </Card>

                        </Grid>
                    </Grid> : null}
                <Grid
                    item
                    xs={11}
                    mt={1}
                    mb={1}>
                    <Typography variant="h5" mb={1}>
                        Weekly Emission Efficiency on {activeNetwork.name}

                    </Typography>
                    <Typography variant="caption">Estimations are projected for weekly emissions and revenue to the Fee
                        Collector</Typography>
                    {globalPools && globalPools.length > 10 && balPrice > 0 ?
                        <EmissionsTable poolDatas={globalPools} timeRange={7} balPrice={balPrice}/> :
                        <Grid
                            container
                            spacing={2}
                            mt='25%'
                            sx={{justifyContent: 'center'}}
                        >
                            <CustomLinearProgress/>
                        </Grid>}
                </Grid>
            </Grid>
        </Box>
    );
}
