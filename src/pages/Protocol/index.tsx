import Box from '@mui/material/Box';
import { Grid, CircularProgress, Typography, Stack } from '@mui/material';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import CoinCard from '../../components/Cards/CoinCard';
import MetricsCard from '../../components/Cards/MetricsCard';
import useAggregatedProtocolData from '../../data/balancer/useAggregatedProtocolData';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PieChartIcon from '@mui/icons-material/PieChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useBalancerChainProtocolData } from '../../data/balancer/useProtocolDataWithClientOverride';
import { ArbitrumNetworkInfo, EthereumNetworkInfo, PolygonNetworkInfo } from '../../constants/networks';
import { arbitrumClient, arbitrumBlockClient, polygonClient, polygonBlockClient } from '../../apollo/client';
import ProtocolMultipleBarChart from '../../components/Echarts/ProtocolCharts/ProtocolMultiBarChart';
import ProtocolMultiAreaChart from '../../components/Echarts/ProtocolCharts/ProtocolMultiAreaChart';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';



export default function Protocol() {

    //TODO: obtain form contants
    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    //Data
    const aggregatedProtocolData = useAggregatedProtocolData();
    const coinData = useCoinGeckoSimpleTokenPrices([balAddress]);

    const protocolData = useBalancerChainProtocolData(EthereumNetworkInfo.clientUri, EthereumNetworkInfo.startTimeStamp);
    const arbitrumProtocolData = useBalancerChainProtocolData(ArbitrumNetworkInfo.clientUri, ArbitrumNetworkInfo.startTimeStamp, arbitrumBlockClient, arbitrumClient);
    const polygonProtocolData = useBalancerChainProtocolData(PolygonNetworkInfo.clientUri, PolygonNetworkInfo.startTimeStamp, polygonBlockClient, polygonClient);

    //Mainnet dominance
    const mainnetTVL = protocolData.tvl ? protocolData.tvl : 0
    const mainnetTVLChange = protocolData.tvlChange ? protocolData.tvlChange : 0
    const mainnetPercentage = 100 / aggregatedProtocolData.tvl * mainnetTVL

    return (
        <Box sx={{ flexGrow: 2 }}>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'center' }}
                >
                <Grid
                    item
                    xs={10}
                >
                    <Stack direction="row" spacing={2} justifyContent="flex-start">
                        {coinData && coinData[balAddress] && coinData[balAddress].usd ?
                            <CoinCard
                                tokenAddress={balAddress}
                                tokenName='BAL'
                                tokenPrice={coinData[balAddress].usd}
                                tokenPriceChange={coinData[balAddress].usd_24h_change}

                            />
                            : <CircularProgress />}
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.volume ? aggregatedProtocolData.volume : 0}
                            mainMetricInUSD={true}
                            metricName='Protocol Volume'
                            mainMetricChange={aggregatedProtocolData.volumeChange}
                            MetricIcon={EqualizerIcon}
                        />
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.tvl}
                            mainMetricInUSD={true}
                            metricName='Protocol TVL'
                            mainMetricChange={aggregatedProtocolData.tvlChange}
                            MetricIcon={MonetizationOnIcon}
                        />
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.fees24}
                            mainMetricInUSD={true}
                            metricName='Protocol Fees'
                            mainMetricChange={aggregatedProtocolData.feesChange}
                            MetricIcon={CurrencyExchangeIcon}
                        />
                         <MetricsCard
                            mainMetric={mainnetPercentage}
                            mainMetricInUSD={false}
                            mainMetricUnit={' %'}
                            metricName='Mainnet Dominance'
                            mainMetricChange={mainnetTVLChange}
                            MetricIcon={PieChartIcon}
                        />
                    </Stack>
                </Grid>
            </Grid>
            { protocolData.feeData.length > 10 && arbitrumProtocolData.feeData.length > 10 && polygonProtocolData.feeData.length > 10 ?
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item mt={1} xs={10}>
                        <Typography variant='h5'>Historical TVL</Typography>
                    </Grid>
                    <Grid item mt={1} xs={10}>
                            <ProtocolMultiAreaChart
                                mainnetProtocolData={protocolData}
                                arbitrumProtocolData={arbitrumProtocolData}
                                polygonProtocolData={polygonProtocolData}
                            />
                            </Grid>
                
                <Grid item mt={1} xs={10} >
                    <Typography variant='h5'>Historical Volume</Typography>
                    </Grid>
                    <Grid item mt={1} xs={10} >
                            <ProtocolMultipleBarChart
                                mainnetProtocolData={protocolData.volumeData}
                                arbitrumProtocolData={arbitrumProtocolData.volumeData}
                                polygonProtocolData={polygonProtocolData.volumeData}
                            />
                            </Grid>
                
                <Grid item mt={1} xs={10} >
                    <Typography variant='h5'>Historical Fees</Typography>
                    </Grid>
                    <Grid item mt={1} xs={10} >
                            <ProtocolMultipleBarChart
                                mainnetProtocolData={protocolData.feeData}
                                arbitrumProtocolData={arbitrumProtocolData.feeData}
                                polygonProtocolData={polygonProtocolData.feeData}
                            />
                            </Grid>
                
                <Grid item mt={1} xs={10} >
                    <Typography variant='h5'>Historical Swaps</Typography>
                    </Grid>
                    <Grid item mt={1} xs={10} >
                            <ProtocolMultipleBarChart
                                mainnetProtocolData={protocolData.swapData}
                                arbitrumProtocolData={arbitrumProtocolData.swapData}
                                polygonProtocolData={polygonProtocolData.swapData}
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
        </Grid> }
        </Box>
    );
}