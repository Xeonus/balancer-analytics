import Box from '@mui/material/Box';
import {Grid, CircularProgress, Typography, Stack, Skeleton, IconButton, AlertProps, AppBar} from '@mui/material';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import MuiAlert from '@mui/material/Alert';
import CoinCard from '../../components/Cards/CoinCard';
import MetricsCard from '../../components/Cards/MetricsCard';
import useAggregatedProtocolData from '../../data/balancer/useAggregatedProtocolData';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PieChartIcon from '@mui/icons-material/PieChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
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
import {smoothData} from "../../utils/data";
import useGetSimpleTokenPrices from "../../data/balancer-api-v3/useGetSimpleTokenPrices";
import {useActiveNetworkVersion} from "../../state/application/hooks";
import {getUnixTimestamp1000DaysAgo} from "../../utils/date";
import CloseIcon from '@mui/icons-material/Close';
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        {...props} />;
});



export default function Protocol() {


    const [protocolAlert, setProtocolAlert] = React.useState(false);
    const protocolAlertMessage = 'Polygon zkEVM Subgraph issues - Protocol TVL stats affected!'


    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    const [activeNetwork] = useActiveNetworkVersion()
    //Data
    const aggregatedProtocolData = useAggregatedProtocolData();
    const v3CoinData = useGetSimpleTokenPrices([balAddress], activeNetwork.chainId);

    const protocolData = useBalancerChainProtocolData(EthereumNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo());
    console.log("protocolData", protocolData)
    const arbitrumProtocolData = useBalancerChainProtocolData(ArbitrumNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), arbitrumBlockClient, arbitrumClient);
    const polygonProtocolData = useBalancerChainProtocolData(PolygonNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), polygonBlockClient, polygonClient);
    const polygonZkEVMProtocolData = useBalancerChainProtocolData(PolygonZkEVMNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), polygonZKEVMBlockClient, polygonZKEVMClient);
    const gnosisProtocolData = useBalancerChainProtocolData(GnosisNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), gnosisBlockClient, gnosisClient);
    const avalancheProtocolData = useBalancerChainProtocolData(AvalancheNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), avalancheBlockClient, avalancheClient);
    const baseProtocolData = useBalancerChainProtocolData(BaseNetworkInfo.clientUri, getUnixTimestamp1000DaysAgo(), baseBlockClient, baseClient);

    //Mainnet dominance
    const mainnetTVL = protocolData.tvl ? protocolData.tvl : 0
    const mainnetTVLChange = protocolData.tvlChange ? protocolData.tvlChange : 0
    const swapsChange = aggregatedProtocolData.swapsChange ? aggregatedProtocolData.swapsChange * 100 : 0
    const mainnetPercentage = 100 / aggregatedProtocolData.tvl * mainnetTVL


    const handleProtocolAlert = () => {
        setProtocolAlert(false);
    };

    const networkExplorers = [
        { name: 'Ethereum', linkTarget: 'chain', svgPath: EtherLogo },
        { name: 'Arbitrum', linkTarget: 'arbitrum/chain', svgPath: ArbitrumLogo },
        { name: 'Polygon', linkTarget: 'polygon/chain', svgPath: PolygonLogo },
        { name: 'zkEVM', linkTarget: 'zkevm/chain', svgPath: PolygonZkEVMLogo },
        { name: 'Gnosis', linkTarget: 'gnosis/chain', svgPath: GnosisLogo },
        { name: 'Avalanche', linkTarget: 'avalanche/chain', svgPath: AvalancheLogo },
        { name: 'Base', linkTarget: 'base/chain', svgPath: BaseLogo },

    ];


    return (
        <Box sx={{ flexGrow: 2 }}>
            <Box mb={1} sx={{flexGrow: 2, justifyContent: "center"}}>
                {protocolAlert && (
                    <Alert
                        severity="warning"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleProtocolAlert}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {protocolAlertMessage}
                    </Alert>
                )}
            </Box>
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
                            <Grid container spacing={2} justifyContent="center">
                                {networkExplorers.map((network, index) => (
                                    <Grid item xs={3} sm={4} md={3} lg={1} key={index}>
                                        <ExploreCard
                                            linkName={network.name}
                                            linkTarget={network.linkTarget}
                                            svgPath={network.svgPath}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
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
                    <Grid item xs={11}>
                        <Typography sx={{fontSize: '24px'}} mb={1}>Global Balancer Stats</Typography>
                    </Grid>

                    <Grid item xs={11}>
                        <Grid
                            container
                            columns={{xs: 4, sm: 8, md: 12}}
                            sx={{justifyContent: {md: 'space-between', xs: 'center'}, alignContent: 'center'}}
                        >
                            <Box m={{xs: 0, sm: 1}}>
                                {v3CoinData && v3CoinData.data[balAddress] && v3CoinData.data[balAddress].price ?
                                    <CoinCard
                                        tokenAddress={balAddress}
                                        tokenName='BAL'
                                        tokenPrice={v3CoinData.data[balAddress].price}
                                        tokenPriceChange={v3CoinData.data[balAddress].priceChangePercentage24h}

                                    />
                                    : <CircularProgress />}
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.tvl}
                                    mainMetricInUSD={true}
                                    metricName='Protocol TVL'
                                    mainMetricChange={aggregatedProtocolData.tvlChange * 100}
                                    MetricIcon={MonetizationOnIcon}
                                />
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                    <MetricsCard
                                        mainMetric={mainnetPercentage}
                                        mainMetricInUSD={false}
                                        mainMetricUnit={' %'}
                                        metricName='Mainnet Dominance'
                                        mainMetricChange={mainnetTVLChange * 100}
                                        MetricIcon={PieChartIcon}
                                    />
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.volume ? aggregatedProtocolData.volume : 0}
                                    mainMetricInUSD={true}
                                    metricName='Protocol Volume'
                                    mainMetricChange={aggregatedProtocolData.volumeChange}
                                    MetricIcon={EqualizerIcon}
                                />
                            </Box>
                            <Box m={{xs: 0, sm: 1}}>
                                <MetricsCard
                                    mainMetric={aggregatedProtocolData.protocolFees24 ? aggregatedProtocolData.protocolFees24 : 0}
                                    mainMetricInUSD={true}
                                    metricName='Protocol Fees'
                                    mainMetricChange={aggregatedProtocolData.protocolFeesChange}
                                    MetricIcon={RequestQuoteIcon}
                                />
                            </Box>
                        <Box m={{xs: 0, sm: 1}}>
                            <MetricsCard
                                mainMetric={aggregatedProtocolData.fees24}
                                mainMetricInUSD={true}
                                metricName='Trading Fees'
                                mainMetricChange={aggregatedProtocolData.feesChange}
                                MetricIcon={CurrencyExchangeIcon}
                            />
                        </Box>
                            <Box m={{xs: 0, sm: 1}}>
                            <MetricsCard
                                mainMetric={aggregatedProtocolData.swaps24 ? aggregatedProtocolData.swaps24 : 0}
                                mainMetricInUSD={false}
                                metricName='Swaps'
                                mainMetricChange={swapsChange}
                                MetricIcon={SwapHorizIcon}
                            />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item mt={1} xs={11}>
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical TVL</Typography>
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
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical Volume</Typography>
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={smoothData(protocolData.volumeData, 100000000)}
                            arbitrumProtocolData={smoothData(arbitrumProtocolData.volumeData, 100000000)}
                            polygonProtocolData={smoothData(polygonProtocolData.volumeData, 100000000)}
                            polygonZkEVMProtocolData={smoothData(polygonZkEVMProtocolData.volumeData, 100000000)}
                            gnosisProtocolData={smoothData(gnosisProtocolData.volumeData, 100000000)}
                            avalancheProtocolData={smoothData(avalancheProtocolData.volumeData, 100000000)}
                            baseProtocolData={smoothData(baseProtocolData.volumeData, 100000000)}
                            isUSD={true}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical Collected Protocol Fees</Typography>
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={smoothData(protocolData.protocolFeeData, 100000000)}
                            arbitrumProtocolData={smoothData(arbitrumProtocolData.protocolFeeData, 100000000)}
                            polygonProtocolData={smoothData(polygonProtocolData.protocolFeeData, 100000000)}
                            polygonZkEVMProtocolData={smoothData(polygonZkEVMProtocolData.protocolFeeData, 100000000)}
                            gnosisProtocolData={smoothData(gnosisProtocolData.protocolFeeData, 100000000)}
                            avalancheProtocolData={smoothData(avalancheProtocolData.protocolFeeData, 100000000)}
                            baseProtocolData={smoothData(baseProtocolData.protocolFeeData, 100000000)}
                            isUSD={true}
                        />
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical Trading Fees</Typography>
                    </Grid>
                    <Grid item mt={1} xs={11} >
                        <ProtocolMultipleBarChart
                            mainnetProtocolData={smoothData(protocolData.feeData, 100000000)}
                            arbitrumProtocolData={smoothData(arbitrumProtocolData.feeData, 100000000)}
                            polygonProtocolData={smoothData(polygonProtocolData.feeData, 100000000)}
                            polygonZkEVMProtocolData={smoothData(polygonZkEVMProtocolData.feeData, 100000000)}
                            gnosisProtocolData={smoothData(gnosisProtocolData.feeData, 100000000)}
                            avalancheProtocolData={smoothData(avalancheProtocolData.feeData, 100000000)}
                            baseProtocolData={smoothData(baseProtocolData.feeData, 100000000)}
                            isUSD={true}
                        />
                    </Grid>

                    <Grid item mt={1} xs={11} >
                        <Typography sx={{fontSize: '24px'}} mb={1}>Historical Swaps</Typography>
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
