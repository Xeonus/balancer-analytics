import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Card, Grid, CircularProgress, Typography } from '@mui/material';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import { Budget } from '../../components/MetricsCard';
import EchartsArea from '../../components/Echarts/ProtocolEchartsArea';
import CoinCard from '../../components/Cards/CoinCard';
import MetricsCard from '../../components/Cards/MetricsCard';
import useAggregatedProtocolData from '../../data/balancer/useAggregatedProtocolData';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';



export default function Protocol() {

    const theme = useTheme();
    //TODO: obtain form contants
    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    //Data
    const aggregatedProtocolData = useAggregatedProtocolData();
    const coinData = useCoinGeckoSimpleTokenPrices([balAddress]);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 2
            }}
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        { coinData && coinData[balAddress] ?
                        <CoinCard 
                            tokenAddress={balAddress}
                            tokenName='BAL'
                            tokenPrice={coinData[balAddress].usd}
                            tokenPriceChange={coinData[balAddress].usd_24h_change}
                            
                         />
                        : <CircularProgress /> }
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.volume? aggregatedProtocolData.volume : 0}
                            mainMetricInUSD={true}
                            metricName='Protocol Volume'
                            mainMetricChange={aggregatedProtocolData.volumeChange}
                            MetricIcon={EqualizerIcon}
                        />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.tvl}
                            mainMetricInUSD={true}
                            metricName='Protocol TVL'
                            mainMetricChange={aggregatedProtocolData.tvlChange}
                            MetricIcon={MonetizationOnIcon}
                        />
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <MetricsCard
                            mainMetric={aggregatedProtocolData.fees24}
                            mainMetricInUSD={true}
                            metricName='Protocol Fees'
                            mainMetricChange={aggregatedProtocolData.feesChange}
                            MetricIcon={CurrencyExchangeIcon}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        md={12}
                        xl={6}
                        xs={12}
                    >
                        <Card>
                            <Box justifyContent={"center"} ml={2}>
                        <Typography variant='h6'>Historical TVL</Typography>
                        </Box>
                        <EchartsArea/>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={6}
                        xs={12}
                    >
                        
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        
                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
}