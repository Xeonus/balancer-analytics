
import { useBalancerChainProtocolData } from '../../data/balancer/useProtocolDataWithClientOverride';
import { EthereumNetworkInfo, ArbitrumNetworkInfo,  PolygonNetworkInfo } from '../../constants/networks';
import { arbitrumBlockClient, arbitrumClient, polygonBlockClient, polygonClient } from '../../apollo/client';
import { ProtocolData } from './useProtocolDataWithClientOverride'

//TODO: Define interface with SupportedNetwork array
export interface AggregatedProtocolData {
    mainnetData: ProtocolData,
    arbitrumData: ProtocolData,
    polygonData: ProtocolData,
    volume: number;
    volumeChange: number;
    fees24: number;
    feesChange: number;
    tvl: number;
    tvlChange: number;
    swaps24: number;
    swapsChange: number;
}

export default function useAggregatedProtocolData() {
    const protocolData = useBalancerChainProtocolData(EthereumNetworkInfo.clientUri, EthereumNetworkInfo.startTimeStamp);
    const protocolArbitrumData = useBalancerChainProtocolData(ArbitrumNetworkInfo.clientUri, ArbitrumNetworkInfo.startTimeStamp, arbitrumBlockClient, arbitrumClient);
    const protocolPolygonData = useBalancerChainProtocolData(PolygonNetworkInfo.clientUri, PolygonNetworkInfo.startTimeStamp, polygonBlockClient, polygonClient);


    if (!protocolData && !protocolArbitrumData && !protocolPolygonData) {
        return { mainnetData: [], arbitrumData: [], polygonData: [], volume24: 0, volumeChange: 0, fees24: 0, feesChange: 0, tvl: 0, tvlChange: 0, swaps24: 0 };
    }


    let tvl = 0
    let tvlChange = 0
    let volume = 0
    let volumeChange = 0
    let fees24 = 0
    let feeChange = 0
    let swaps24 = 0
    let swapsChange = 0

    if (protocolData.tvl && protocolArbitrumData.tvl && protocolPolygonData.tvl) {
        tvl = protocolData.tvl + protocolArbitrumData.tvl + protocolPolygonData.tvl;
    }

    if (protocolData.tvlChange && protocolArbitrumData.tvlChange && protocolPolygonData.tvlChange) {
        tvlChange = protocolData.tvlChange + protocolArbitrumData.tvlChange + protocolPolygonData.tvlChange;
    }

    if (protocolData.volume24 && protocolArbitrumData.volume24 && protocolPolygonData.volume24) {
        volume = protocolData.volume24 + protocolArbitrumData.volume24 + protocolPolygonData.volume24;
    }
    if (protocolData.volumeChange && protocolArbitrumData.volumeChange && protocolPolygonData.volumeChange) {
        volumeChange = protocolData.volumeChange + protocolArbitrumData.volumeChange + protocolPolygonData.volumeChange;
    }


    if (protocolData.fees24 && protocolArbitrumData.fees24 && protocolPolygonData.fees24) {
        fees24 = protocolData.fees24 + protocolArbitrumData.fees24 + protocolPolygonData.fees24;
    }

    if (protocolData.feesChange && protocolArbitrumData.feesChange && protocolPolygonData.feesChange) {
        feeChange = protocolData.feesChange + protocolArbitrumData.feesChange + protocolPolygonData.feesChange;
    }

    if (protocolData.swaps24 && protocolArbitrumData.swaps24 && protocolPolygonData.swaps24) {
        swaps24 = protocolData.swaps24 + protocolArbitrumData.swaps24 + protocolPolygonData.swaps24;
    }

    if (protocolData.swapsChange && protocolArbitrumData.swapsChange && protocolPolygonData.swapsChange) {
        swapsChange = protocolData.swapsChange + protocolArbitrumData.swapsChange + protocolPolygonData.swapsChange;
    }

    return {
        mainnetData: protocolData,
        arbitrumData: protocolArbitrumData,
        polygonData: protocolPolygonData,
        volume: volume,
        volumeChange: volumeChange,
        fees24: fees24,
        feesChange: feeChange,
        tvl,
        tvlChange: tvlChange,
        swaps24: swaps24,
        swapsChange: swapsChange,

    };
}