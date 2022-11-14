import { useParams } from 'react-router-dom';
import { Typography, Box, Card, Grid, CircularProgress, LinearProgress } from "@mui/material";
import PoolChart from '../../components/PoolChart';
import { useBalancerPoolData } from "../../data/balancer/usePools";
import { useBalancerPoolPageData } from "../../data/balancer/usePools";
import { useBalancerTransactionData } from "../../data/balancer/useTransactions";
import { getShortPoolName } from '../../utils/getShortPoolName';
import PoolCurrencyLogo from '../../components/PoolCurrencyLogo';
import PoolComposition from '../../components/PoolComposition';
import SwapFee from '../../components/SwapFee';
import MetricsCard from '../../components/Cards/MetricsCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CoinPriceCard from '../../components/Cards/CoinPriceCard'



export default function PoolPage() {
    const params = useParams();
    const poolId = params.poolId ? params.poolId : '';
    const poolData = useBalancerPoolData(poolId);
    const { tvlData, volumeData, feesData, tokenDatas } = useBalancerPoolPageData(poolId);

    const { swaps, joinExits, swapPairVolumes } = useBalancerTransactionData(
        (poolData?.tokens || []).map((token) => token.address),
        poolData ? [poolData.id] : [],
    );

    //Swaps
    let swaps24h = 0;
    let swaps24hChange = 0;
    if (swaps.length > 10) {
        swaps24h = swaps.filter(swap => swap.timestamp >= (Date.now() - 24*3600000)/1000).length;
        const swaps48hTo24h = swaps.filter(swap => swap.timestamp >= (Date.now() - 48*3600000)/1000 && swap.timestamp <= (Date.now() - 24*3600000)/1000).length;
        swaps24hChange = swaps24h* 100 / swaps48hTo24h ;
    }

    //Fees
    let feesUSD = 0;
    let feesUSDChange = 0;
    if (feesData[feesData.length]) {
        feesUSD = feesData[feesData.length].value;
        if (feesData[feesData.length-1]) {
            feesUSDChange = feesData[feesData.length].value - feesData[feesData.length-1].value
        }
    }
    console.log("feesUSD", feesUSD);
    console.log("feesUSDChange", feesUSDChange);

    //Ideas to show richer data:
    //24h swaps / biggest swap / 24h joins / show token price data stacked / poolinfo?
    return (
        poolData ?
            <Grid
                container
                spacing={2}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item xs={4}>
                <Box mr={2}>
                            <Typography variant={"h5"}>{poolData.poolType} - {poolData.name}</Typography>
                </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Box mr={2}>
                            <PoolCurrencyLogo tokens={poolData.tokens} size={"30px"} />
                        </Box>
                        <Box mr={2}>
                            <PoolComposition poolData={poolData} size={30} />
                        </Box>
                        <Box>
                            <SwapFee swapFee={poolData.swapFee} size={30} />
                        </Box>
                       

                    </Box>
                </Grid>

                <Grid
                    item
                    xl={3}
                    lg={3}
                    sm={6}
                    xs={12}
                >
                    <MetricsCard
                        mainMetric={volumeData ? poolData.volumeUSD : 0}
                        mainMetricInUSD={true}
                        metricName='Pool Volume'
                        mainMetricChange={poolData.volumeUSDChange}
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
                        mainMetric={poolData.tvlUSD}
                        mainMetricInUSD={true}
                        metricName='Pool TVL'
                        mainMetricChange={poolData.tvlUSDChange}
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
                        mainMetric={poolData.feesUSD}
                        mainMetricInUSD={true}
                        metricName='Pool Fees'
                        mainMetricChange={poolData.feesUSD}
                        MetricIcon={CurrencyExchangeIcon}
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
                        mainMetric={swaps24h}
                        mainMetricInUSD={false}
                        metricName='Pool Swaps'
                        mainMetricChange={swaps24hChange}
                        MetricIcon={SwapHorizontalCircleIcon}
                    
                    />
                </Grid>
                <Grid item xs={12} >
                    <Box m={1}>
                        <Typography variant="h5">Historical Data </Typography>
                    </Box>
                    <Card>
                        <PoolChart tvlData={tvlData} volumeData={volumeData} feesData={feesData} />
                    </Card>
                </Grid>
                
                <Grid item xs={10}>
                <Typography variant="h6">Historical Token Prices </Typography>
                    <Box display="flex" alignItems="center" >
                    {poolData.tokens.map(element => 
                    <Box mr={1}>
                        {tokenDatas.filter(el => el.tokenAddress === element.address) ?
                    <CoinPriceCard 
                        mainMetric={0} 
                        mainMetricChange={0} 
                        chartData={tokenDatas.filter(el => el.tokenAddress === element.address)[0].coingeckoRawData} 
                        tokenAddress={element.address} 
                        tokenName={element.symbol} /> : null}
                    </Box> 
                    )}
                    </Box>
                </Grid> 
            </Grid> :
            <Grid
                container
                spacing={2}
                mt='25%'
                sx={{ justifyContent: 'center' }}
            >
                <Box
                    alignItems="center"
                    justifyContent="center"
                    sx={{width: '90%'}}
                    >
                    <LinearProgress />
                </Box>
            </Grid>
    );
}