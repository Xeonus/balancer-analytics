import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import { Card, Grid, CircularProgress, Typography, Stack } from '@mui/material';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import EchartsArea from '../../components/Echarts/ProtocolEchartsArea';
import CoinCard from '../../components/Cards/CoinCard';
import MetricsCard from '../../components/Cards/MetricsCard';
import useAggregatedProtocolData from '../../data/balancer/useAggregatedProtocolData';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useBalancerChainProtocolData } from '../../data/balancer/useProtocolDataWithClientOverride';
import { ArbitrumNetworkInfo, EthereumNetworkInfo, PolygonNetworkInfo } from '../../constants/networks';
import { arbitrumClient, arbitrumBlockClient, polygonClient, polygonBlockClient } from '../../apollo/client';
import ProtocolMultipleBarCharts from '../../components/Echarts/ProtocolMultipleBarCharts';



export default function Protocol() {

    const theme = useTheme();
    //TODO: obtain form contants
    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    //Data
    const aggregatedProtocolData = useAggregatedProtocolData();
    const coinData = useCoinGeckoSimpleTokenPrices([balAddress]);

    const protocolData = useBalancerChainProtocolData(EthereumNetworkInfo.clientUri, EthereumNetworkInfo.startTimeStamp);
    const arbitrumProtocolData = useBalancerChainProtocolData(ArbitrumNetworkInfo.clientUri, ArbitrumNetworkInfo.startTimeStamp, arbitrumBlockClient, arbitrumClient);
    const polygonProtocolData = useBalancerChainProtocolData(PolygonNetworkInfo.clientUri, PolygonNetworkInfo.startTimeStamp, polygonBlockClient, polygonClient);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        {coinData && coinData[balAddress] ?
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
                    </Stack>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={1}
            >
                <Grid
                    item
                    mt={1}
                    xs={6}
                >
                    <Typography variant='h6'>Historical TVL</Typography>
                    <Box>
                    <Card>
                        <EchartsArea />
                    </Card>
                    </Box>
                </Grid>
                <Grid
                    item
                    mt={1}
                    xs={6}
                >
                    <Typography variant='h6'>Historical Fees</Typography>
                    <Box>
                    <Card>
                        <ProtocolMultipleBarCharts 
                            mainnetProtocolData={protocolData} 
                            arbitrumProtocolData={arbitrumProtocolData} 
                            polygonProtocolData={polygonProtocolData}
                        />
                    </Card>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}