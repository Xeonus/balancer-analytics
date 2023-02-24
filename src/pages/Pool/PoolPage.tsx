import { useParams } from 'react-router-dom';
import { Typography, Box, Card, Grid, CircularProgress, Stack } from "@mui/material";
import PoolChart from '../../components/PoolChart';
import { useBalancerPoolPageData, useBalancerPoolSingleData } from "../../data/balancer/usePools";
import { useBalancerTransactionData } from "../../data/balancer/useTransactions";
import { getShortPoolName } from '../../utils/getShortPoolName';
import PoolCompositionWithLogos from '../../components/PoolCompositionWithLogos';
import SwapFee from '../../components/SwapFee';
import MetricsCard from '../../components/Cards/MetricsCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import PoolTokenChart from '../../components/PoolTokenChart';
import NavCrumbs, { NavElement } from '../../components/NavCrumbs';
import StyledExternalLink from '../../components/StyledExternalLink';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import PoolTokenTable from '../../components/Tables/PoolTokenTable';
import PoolInfoTable from '../../components/Tables/PoolInfoTable';
import StyledLinkButton from '../../components/Buttons/StyledLinkButton';
import SwapsTable from '../../components/Tables/SwapsTable';
import JoinExitsTable from '../../components/Tables/JoinExitsTable';
import { STABLE_POOLS } from '../../constants';



export default function PoolPage() {
    const params = useParams();
    const [activeNetwork] = useActiveNetworkVersion();
    const poolId = params.poolId ? params.poolId : '';
    const poolData = useBalancerPoolSingleData(poolId);
    const { tvlData, volumeData, feesData, tokenDatas } = useBalancerPoolPageData(poolId);
    const { swaps, joinExits, swapPairVolumes } = useBalancerTransactionData(
        (poolData?.tokens || []).map((token) => token.address),
        poolData ? [poolData.id] : [],
    );
    console.log("swaps", swaps);
    console.log("joinExits", joinExits);
    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const poolNav: NavElement = {
        name: 'Pools',
        link: 'pools'
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)
    navCrumbs.push(poolNav);

    console.log("swapPairVolumes: ", swapPairVolumes)

    //TODO: Refactor in own function calls (geSwaps, getSwapsChange etc?)
    //Swaps
    let swaps24h = 0;
    let swaps24hChange = 0;
    if (swaps.length >= 3) {
        swaps24h = swaps.filter(swap => swap.timestamp >= (Date.now() - 24 * 3600000) / 1000).length;
        const swaps48hTo24h = swaps.filter(swap => swap.timestamp >= (Date.now() - 48 * 3600000) / 1000 && swap.timestamp <= (Date.now() - 24 * 3600000) / 1000).length;
        swaps24hChange = swaps24h * 100 / swaps48hTo24h - 100;
    }

    //Fees
    let feesUSD = 0;
    let feesUSDChange = 0;
    if (feesData.length >= 3) {
        feesUSD = feesData[feesData.length - 1].value;
        if (feesData[feesData.length - 2]) {
            feesUSDChange = 100 / feesData[feesData.length - 2].value * feesData[feesData.length - 1].value - 100
            //feesUSDChange = (feesUSD - feesData[feesData.length - 2].value) / feesData[feesData.length - 2].value
        }
    }

    //Volume
    let volumeUSD = 0;
    let volumeUSDChange = 0;
    if (volumeData.length >= 3) {
        volumeUSD = volumeData[feesData.length - 1].value;
        if (volumeData[volumeData.length - 2]) {
            volumeUSDChange = 100 / volumeData[volumeData.length - 2].value * volumeData[volumeData.length - 1].value - 100
        }
    }

    //TVL
    let tvlUSD = 0;
    let tvlUSDChange = 0;
    if (tvlData.length >= 3) {
        tvlUSD = tvlData[tvlData.length - 1].value;
        if (tvlData[tvlData.length - 2]) {
            tvlUSDChange = 100 / tvlData[tvlData.length - 2].value * tvlData[tvlData.length - 1].value - 100
        }
    }

    //Filter token datas for pool token IDs as those do not contain composable tokens
    const tokenList = poolData?.tokens.map(token => token.balance < 2596140000000000 ? token.address : '')
    const filteredTokenDatas = tokenDatas.filter(tokenData => tokenList?.includes(tokenData.tokenAddress))
    if (filteredTokenDatas) {
        poolData?.tokens.map((token) => {
            const filteredToken = filteredTokenDatas.find(el => el.tokenAddress === token.address);
            if (filteredToken && !filteredToken.coingeckoRawData.error && filteredToken.coingeckoRawData.prices.length) {
                const price = filteredToken.coingeckoRawData.prices[filteredToken.coingeckoRawData.prices.length - 1][1];
                token.tvl = token.balance * price;
            }
        })
    }

    //Ideas to show richer data:
    //24h swaps / biggest swap / 24h joins / show token price data stacked / poolinfo?
    return (
        poolData ?
            <Box sx={{ flexGrow: 2 }}>
                <Grid
                    container
                    spacing={1}
                    sx={{ justifyContent: 'center' }}
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
                    <Grid item xs={11}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box
                                display="flex"
                                sx={{
                                    flexDirection: { xs: 'column', md: 'row' },
                                    alignItems: { xs: 'left', md: "center" }
                                }}>
                                <Box mr={1}>
                                    <Typography variant={"h5"}>{poolData.poolType} Pool - </Typography>
                                </Box>
                                <PoolCompositionWithLogos poolData={poolData} size={35} />
                                <Box ml={1}>
                                    <SwapFee swapFee={poolData.swapFee} size={30} />
                                </Box>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems="center" flexDirection="row">
                                <StyledLinkButton href={`${activeNetwork.appUri}pool/${poolId}`} name={'Invest'} />
                                <StyledLinkButton href={`${activeNetwork.appUri}trade/`} name={'Trade'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                        <Grid
                            container
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{ justifyContent: {md: 'flex-start', xs: 'center'}, alignContent: 'center' }}
                        >
                            <Box
                            m={1}
                            >
                            <MetricsCard
                                mainMetric={volumeUSD ? volumeUSD : poolData.volumeUSD}
                                mainMetricInUSD={true}
                                metricName='Pool Volume'
                                mainMetricChange={volumeUSDChange ? volumeUSDChange : poolData.volumeUSDChange}
                                MetricIcon={EqualizerIcon}
                            />
                            </Box>
                            <Box
                            m={1}
                            >
                            <MetricsCard
                                mainMetric={tvlUSD ? tvlUSD : poolData.tvlUSD}
                                mainMetricInUSD={true}
                                metricName='Pool TVL'
                                mainMetricChange={tvlUSDChange ? tvlUSDChange : poolData.tvlUSDChange * 100}
                                MetricIcon={MonetizationOnIcon}
                            />
                            </Box>
                            <Box
                            m={1}
                            >
                            <MetricsCard
                                mainMetric={swaps24h}
                                mainMetricInUSD={false}
                                metricName='Pool Swaps'
                                mainMetricChange={swaps24hChange}
                                MetricIcon={SwapHorizontalCircleIcon}

                            />
                            </Box>
                            <Box
                            m={1}
                            >
                            <MetricsCard
                                mainMetric={feesUSD}
                                mainMetricInUSD={true}
                                metricName='Pool Fees'
                                mainMetricChange={feesUSDChange}
                                MetricIcon={CurrencyExchangeIcon}

                            />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid mt={2} item xs={11}>
                        <Typography variant="h5">Historical Performance </Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Card>
                            <PoolChart tvlData={tvlData} volumeData={volumeData} feesData={feesData} />
                        </Card>
                    </Grid>

                    <Grid item mt={1} xs={11}>
                        <Typography variant="h5">Pool & Token Metrics </Typography>

                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        <Grid
                            item
                            mt={1}
                            xs={11}
                            md={5.5}
                        >
                            <PoolTokenTable tokenDatas={poolData.tokens} poolType={poolData.poolType} />
                            {filteredTokenDatas.length === poolData.tokens.length ? <PoolTokenChart poolData={poolData} tokenDatas={filteredTokenDatas} /> :
                                <Box display="flex" alignItems="center" flexDirection="column">
                                    <CircularProgress />
                                    <Typography variant="caption">Loading historical token data</Typography>
                                </Box>}

                        </Grid>
                        <Grid
                            item
                            mt={1}
                            xs={11}
                            md={5.5}
                        >
                            <PoolInfoTable poolData={poolData} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        <Grid
                            item
                            mt={1}
                            xs={11}
                        >
                            <Typography variant="h5">Historical Swaps </Typography>
                        </Grid>
                        <Grid item xs={11}>
                            <SwapsTable swaps={swaps} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                        <Grid item mt={1} xs={11}>
                            <Typography variant="h5">Liquidity Provisions </Typography>
                        </Grid>
                        <Grid item xs={11}>
                            <JoinExitsTable joinExits={joinExits} />
                        </Grid>
                    </Grid>
                </Grid>
            </Box> :
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