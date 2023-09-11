import Box from '@mui/material/Box';
import { Grid, CircularProgress, Typography, Stack, Skeleton } from '@mui/material';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import CoinCard from '../../components/Cards/CoinCard';
import MetricsCard from '../../components/Cards/MetricsCard';
import useAggregatedProtocolData from '../../data/balancer/useAggregatedProtocolData';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PieChartIcon from '@mui/icons-material/PieChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useBalancerChainProtocolData } from '../../data/balancer/useProtocolDataWithClientOverride';
import {
    ArbitrumNetworkInfo, AvalancheNetworkInfo, BaseNetworkInfo,
    EthereumNetworkInfo,
    GnosisNetworkInfo,
    PolygonNetworkInfo,
    PolygonZkEVMNetworkInfo
} from '../../constants/networks';
import {
    arbitrumClient,
    arbitrumBlockClient,
    polygonClient,
    polygonBlockClient,
    gnosisBlockClient,
    gnosisClient,
    polygonZKEVMBlockClient, polygonZKEVMClient, avalancheBlockClient, avalancheClient, baseBlockClient, baseClient
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



export default function Protocol() {

    //TODO: obtain form contants
    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    //Data
    const aggregatedProtocolData = useAggregatedProtocolData();
    const coinData = useCoinGeckoSimpleTokenPrices([balAddress]);

    const protocolData = useBalancerChainProtocolData(EthereumNetworkInfo.clientUri, EthereumNetworkInfo.startTimeStamp);
    const arbitrumProtocolData = useBalancerChainProtocolData(ArbitrumNetworkInfo.clientUri, ArbitrumNetworkInfo.startTimeStamp, arbitrumBlockClient, arbitrumClient);
    const polygonProtocolData = useBalancerChainProtocolData(PolygonNetworkInfo.clientUri, PolygonNetworkInfo.startTimeStamp, polygonBlockClient, polygonClient);
    const polygonZkEVMProtocolData = useBalancerChainProtocolData(PolygonZkEVMNetworkInfo.clientUri, PolygonZkEVMNetworkInfo.startTimeStamp, polygonZKEVMBlockClient, polygonZKEVMClient);
    const gnosisProtocolData = useBalancerChainProtocolData(GnosisNetworkInfo.clientUri, GnosisNetworkInfo.startTimeStamp, gnosisBlockClient, gnosisClient);
    const avalancheProtocolData = useBalancerChainProtocolData(AvalancheNetworkInfo.clientUri, AvalancheNetworkInfo.startTimeStamp, avalancheBlockClient, avalancheClient);
    const baseProtocolData = useBalancerChainProtocolData(BaseNetworkInfo.clientUri, BaseNetworkInfo.startTimeStamp, baseBlockClient, baseClient);

    //Mainnet dominance
    const mainnetTVL = protocolData.tvl ? protocolData.tvl : 0
    const mainnetTVLChange = protocolData.tvlChange ? protocolData.tvlChange : 0
    const swapsChange = aggregatedProtocolData.swapsChange ? aggregatedProtocolData.swapsChange * 100 : 0
    const mainnetPercentage = 100 / aggregatedProtocolData.tvl * mainnetTVL

    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                spacing={2}
                sx={{ justifyContent: 'center' }}
            >

                <Grid
                    item
                    xs={11}
                >
                    <Grid
                        container
                        spacing={{ xs: 2, md: 2 }}
                        columns={{ xs: 4, sm: 2, md: 10 }}
                    >
                        <Grid item mt={1} xs={11}>
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                justifyContent="space-between"
                            >
                                <Box mb={1}>
                                    <ExploreCard linkName='Ethereum' linkTarget={'chain'} svgPath={EtherLogo} />
                                </Box>
                                <Box mb={1}>
                                    <ExploreCard linkName='Polygon' linkTarget={'polygon/chain'} svgPath={PolygonLogo} />
                                </Box>
                                <Box mb={1}>
                                    <ExploreCard linkName='Polygon zkEVM' linkTarget={'zkevm/chain'} svgPath={PolygonZkEVMLogo} />
                                </Box>
                                <Box mb={1}>
                                    <ExploreCard linkName='Arbitrum' linkTarget={'arbitrum/chain'} svgPath={ArbitrumLogo} />
                                </Box>
                                <Box mb={1}>
                                    <ExploreCard linkName='Gnosis' linkTarget={'gnosis/chain'} svgPath={GnosisLogo} />
                                </Box>
                                <Box mb={1}>
                                    <ExploreCard linkName='Avalanche' linkTarget={'avalanche/chain'} svgPath={AvalancheLogo} />
                                </Box>
                                <Box mb={1}>
                                    <ExploreCard linkName='Base' linkTarget={'base/chain'} svgPath={BaseLogo} />
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={11} sm={4} md={4} mb={2}>
                            {coinData && coinData[balAddress] && coinData[balAddress].usd ?
                                <CoinCard
                                    tokenAddress={balAddress}
                                    tokenName='BAL'
                                    tokenPrice={coinData[balAddress].usd}
                                    tokenPriceChange={coinData[balAddress].usd_24h_change}

                                />
                                : <CircularProgress />}

                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
            {protocolData.feeData.length > 10 && arbitrumProtocolData.feeData.length > 10 && polygonProtocolData.feeData.length > 10 ?
                <Grid
                    container
                    spacing={1}
                    sx={{ justifyContent: 'center' }}
                >

                    <Grid item mt={1} xs={11}>
                        <Typography variant='h5'>Historical TVL</Typography>
                    </Grid>
                    <Grid item mt={1} xs={11}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                        >
                            <Box mr={3} mb={1}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.tvl}
                                    mainMetricInUSD={true}
                                    metricName='Protocol TVL'
                                    mainMetricChange={aggregatedProtocolData.tvlChange * 100}
                                    MetricIcon={MonetizationOnIcon}
                                />
                            </Box>

                            <Box mr={1} mb={1}>
                                <MetricsCard
                                    mainMetric={mainnetPercentage}
                                    mainMetricInUSD={false}
                                    mainMetricUnit={' %'}
                                    metricName='Mainnet Dominance'
                                    mainMetricChange={mainnetTVLChange * 100}
                                    MetricIcon={PieChartIcon}
                                />
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item mt={1} xs={11}>
                        <ProtocolMultiAreaChart
                            mainnetProtocolData={protocolData}
                            arbitrumProtocolData={arbitrumProtocolData}
                            polygonProtocolData={polygonProtocolData}
                            polygonZkEVMProtocolData={polygonZkEVMProtocolData}
                            gnosisProtocolData={gnosisProtocolData}
                            avalancheProtocolData={avalancheProtocolData}
                            baseProtocolData={baseProtocolData}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <Typography variant='h5'>Historical Volume</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.volume ? aggregatedProtocolData.volume : 0}
                            mainMetricInUSD={true}
                            metricName='Protocol Volume'
                            mainMetricChange={aggregatedProtocolData.volumeChange}
                            MetricIcon={EqualizerIcon}
                        />

                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={protocolData.volumeData}
                            arbitrumProtocolData={arbitrumProtocolData.volumeData}
                            polygonProtocolData={polygonProtocolData.volumeData}
                            polygonZkEVMProtocolData={polygonZkEVMProtocolData.volumeData}
                            gnosisProtocolData={gnosisProtocolData.volumeData}
                            avalancheProtocolData={avalancheProtocolData.volumeData}
                            baseProtocolData={baseProtocolData.volumeData}
                            isUSD={true}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <Typography variant='h5'>Historical Fees</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.fees24}
                            mainMetricInUSD={true}
                            metricName='Protocol Fees'
                            mainMetricChange={aggregatedProtocolData.feesChange}
                            MetricIcon={CurrencyExchangeIcon}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={protocolData.feeData}
                            arbitrumProtocolData={arbitrumProtocolData.feeData}
                            polygonProtocolData={polygonProtocolData.feeData}
                            polygonZkEVMProtocolData={polygonZkEVMProtocolData.feeData}
                            gnosisProtocolData={gnosisProtocolData.feeData}
                            avalancheProtocolData={avalancheProtocolData.feeData}
                            baseProtocolData={baseProtocolData.feeData}
                            isUSD={true}
                        />
                    </Grid>

                    <Grid item mt={1} xs={11} >
                        <Typography variant='h5'>Historical Swaps</Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.swaps24 ? aggregatedProtocolData.swaps24 : 0}
                            mainMetricInUSD={false}
                            metricName='Swaps'
                            mainMetricChange={swapsChange}
                            MetricIcon={SwapHorizIcon}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={protocolData.swapData}
                            arbitrumProtocolData={arbitrumProtocolData.swapData}
                            polygonProtocolData={polygonProtocolData.swapData}
                            polygonZkEVMProtocolData={polygonZkEVMProtocolData.swapData}
                            gnosisProtocolData={gnosisProtocolData.swapData}
                            avalancheProtocolData={avalancheProtocolData.swapData}
                            baseProtocolData={baseProtocolData.swapData}
                            isUSD={false}
                        />
                    </Grid>

                </Grid> : <Grid
                    container
                    spacing={2}
                    mt='10%'
                    mb='10%'
                    sx={{ justifyContent: 'center' }}
                >
                    <CustomLinearProgress />
                </Grid>}
        </Box>
    );
}
