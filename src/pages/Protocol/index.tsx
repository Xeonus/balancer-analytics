import { useTheme } from '@mui/material/styles'
import { useBalancerChainProtocolData } from '../../data/balancer/useAggregatedProtocolData';
import { EthereumNetworkInfo, ArbitrumNetworkInfo,  PolygonNetworkInfo } from '../../constants/networks';
import { arbitrumBlockClient, arbitrumClient, polygonBlockClient, polygonClient } from '../../apollo/client';
import getAggregatedProtocolChartData  from '../../utils/getAggregatedProtocolChartData';
import { useTransformedVolumeData } from '../../hooks/chart';
import { Typography } from '@mui/material';


export default function Protocol() {

    const theme = useTheme();
    const protocolData = useBalancerChainProtocolData(EthereumNetworkInfo.clientUri, EthereumNetworkInfo.startTimeStamp);
    const protocolArbitrumData = useBalancerChainProtocolData(ArbitrumNetworkInfo.clientUri, ArbitrumNetworkInfo.startTimeStamp, arbitrumBlockClient, arbitrumClient);
    const protocolPolygonData = useBalancerChainProtocolData(PolygonNetworkInfo.clientUri, PolygonNetworkInfo.startTimeStamp, polygonBlockClient, polygonClient);


    //---Aggregated TVL Data---
    let aggregatedTVL:any[] = [];
    let  protocolTVL = 0;
    let protocolTVLChange = 0;
    //Create aggregate / stitched together TVL test:
    if (protocolData.tvlData && protocolArbitrumData.tvlData && protocolPolygonData.tvlData) {
        aggregatedTVL = getAggregatedProtocolChartData(protocolData.tvlData, protocolArbitrumData.tvlData, protocolPolygonData.tvlData, NaN)
        if (protocolData.tvl && protocolArbitrumData.tvl && protocolPolygonData.tvl) {
            protocolTVL = protocolData.tvl + protocolArbitrumData.tvl + protocolPolygonData.tvl;
        }
        if (protocolData.tvlChange && protocolArbitrumData.tvlChange && protocolPolygonData.tvlChange) {
            protocolTVLChange = protocolData.tvlChange + protocolArbitrumData.tvlChange + protocolPolygonData.tvlChange;
        }
    }

    //---Aggregated Trading volume data---
    let aggregatedVolume:any[] = [];
    let  protocolVolume = 0;
    let protocolVolumeChange = 0
    if (protocolData.volumeData && protocolArbitrumData.volumeData && protocolPolygonData.volumeData) {
        aggregatedVolume = getAggregatedProtocolChartData(protocolData.volumeData, protocolArbitrumData.volumeData, protocolPolygonData.volumeData, 0)
        if (protocolData.volume24 && protocolArbitrumData.volume24 && protocolPolygonData.volume24) {
            protocolVolume = protocolData.volume24 + protocolArbitrumData.volume24 + protocolPolygonData.volume24;
        }
        if (protocolData.volumeChange && protocolArbitrumData.volumeChange && protocolPolygonData.volumeChange) {
            protocolVolumeChange = protocolData.volumeChange + protocolArbitrumData.volumeChange + protocolPolygonData.volumeChange;
        }
    }
    let aggregatedWeeklyVolume:any[] = [];
    const weeklyVolumeData = useTransformedVolumeData(protocolData?.volumeData, 'week');
    const weeklyArbitrumVolumeData = useTransformedVolumeData(protocolArbitrumData?.volumeData, 'week');
    const weeklyPolygonVolumeData = useTransformedVolumeData(protocolPolygonData?.volumeData, 'week');

    if (weeklyVolumeData && weeklyArbitrumVolumeData && weeklyPolygonVolumeData) {
        //time, value, chainId
        aggregatedWeeklyVolume = getAggregatedProtocolChartData(weeklyVolumeData, weeklyArbitrumVolumeData, weeklyPolygonVolumeData, 0)
    }

    //---Aggregated Swaps data---
    let aggregatedSwaps:any[] = [];
    let  protocolSwaps = 0;
    if (protocolData.swapData && protocolArbitrumData.swapData && protocolPolygonData.swapData) {
        aggregatedSwaps = getAggregatedProtocolChartData(protocolData.swapData, protocolArbitrumData.swapData, protocolPolygonData.swapData, 0)
        if (protocolData.swaps24 && protocolArbitrumData.swaps24 && protocolPolygonData.swaps24) {
            protocolSwaps = protocolData.swaps24 + protocolArbitrumData.swaps24 + protocolPolygonData.swaps24;
        }
        if (protocolData.swaps24 && protocolArbitrumData.swaps24 && protocolPolygonData.swaps24) {
            protocolSwaps = protocolData.swaps24 + protocolArbitrumData.swaps24 + protocolPolygonData.swaps24;
        }
    }
    let aggregatedWeeklySwaps:any[] = [];
    const weeklySwapData = useTransformedVolumeData(protocolData?.swapData, 'week');
    const weeklyArbitrumSwapData = useTransformedVolumeData(protocolArbitrumData?.swapData, 'week');
    const weeklyPolygonSwapData = useTransformedVolumeData(protocolPolygonData?.swapData, 'week');

    if (weeklySwapData && weeklyArbitrumSwapData && weeklyPolygonSwapData) {
        //time, value, chainId
        aggregatedWeeklySwaps = getAggregatedProtocolChartData(weeklySwapData, weeklyArbitrumSwapData, weeklyPolygonSwapData, 0)
    }

    //---Aggregated fee data
        //---Aggregated Swaps data---
        let aggregatedFees:any[] = [];
        let  protocolFees = 0;
        let protocolFeesChange = 0;
        if (protocolData.feeData && protocolArbitrumData.feeData && protocolPolygonData.feeData) {
            aggregatedFees = getAggregatedProtocolChartData(protocolData.feeData, protocolArbitrumData.feeData, protocolPolygonData.feeData, 0)
            if (protocolData.fees24 && protocolArbitrumData.fees24 && protocolPolygonData.fees24) {
                protocolFees = protocolData.fees24 + protocolArbitrumData.fees24 + protocolPolygonData.fees24;
            }
            if (protocolData.feesChange && protocolArbitrumData.feesChange && protocolPolygonData.feesChange) {
                protocolFeesChange = protocolData.feesChange + protocolArbitrumData.feesChange + protocolPolygonData.feesChange;
            }
        }
        let aggregatedWeeklyFees:any[] = [];
        const weeklyFeeData = useTransformedVolumeData(protocolData?.feeData, 'week');
        const weeklyArbitrumFeeData = useTransformedVolumeData(protocolArbitrumData?.feeData, 'week');
        const weeklyPolygonFeeData = useTransformedVolumeData(protocolPolygonData?.feeData, 'week');
    
        if (weeklySwapData && weeklyArbitrumSwapData && weeklyPolygonSwapData) {
            //time, value, chainId
            aggregatedWeeklyFees = getAggregatedProtocolChartData(weeklyFeeData, weeklyArbitrumFeeData, weeklyPolygonFeeData, 0)
        }
    



    return (
        <Typography>Loaded</Typography>
    );
}