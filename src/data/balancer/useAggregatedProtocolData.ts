
import { useBalancerChainProtocolData } from '../../data/balancer/useProtocolDataWithClientOverride';
import {
    EthereumNetworkInfo,
    ArbitrumNetworkInfo,
    PolygonNetworkInfo,
    GnosisNetworkInfo,
    PolygonZkEVMNetworkInfo, AvalancheNetworkInfo
} from '../../constants/networks';
import {
    arbitrumBlockClient,
    arbitrumClient, avalancheBlockClient, avalancheClient,
    gnosisBlockClient,
    gnosisClient,
    polygonBlockClient,
    polygonClient,
    polygonZKEVMBlockClient, polygonZKEVMClient
} from '../../apollo/client';
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
    const protocolPolygonZkEVMData = useBalancerChainProtocolData(PolygonZkEVMNetworkInfo.clientUri, PolygonZkEVMNetworkInfo.startTimeStamp, polygonZKEVMBlockClient, polygonZKEVMClient);
    const protocolGnosisData = useBalancerChainProtocolData(GnosisNetworkInfo.clientUri, GnosisNetworkInfo.startTimeStamp, gnosisBlockClient, gnosisClient)
    const protocolDataAvalanche = useBalancerChainProtocolData(AvalancheNetworkInfo.clientUri, AvalancheNetworkInfo.startTimeStamp, avalancheBlockClient, avalancheClient)


    if (!protocolData && !protocolArbitrumData && !protocolPolygonData && !protocolPolygonZkEVMData && !protocolGnosisData) {
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

    if (protocolData.tvl && protocolArbitrumData.tvl && protocolPolygonData.tvl && protocolPolygonZkEVMData.tvl && protocolGnosisData.tvl && protocolDataAvalanche.tvl) {
        tvl = protocolData.tvl + protocolArbitrumData.tvl + protocolPolygonData.tvl + protocolPolygonZkEVMData.tvl + protocolGnosisData.tvl + protocolDataAvalanche.tvl;
    }

    if (protocolData.tvlChange && protocolArbitrumData.tvlChange && protocolPolygonData.tvlChange && protocolPolygonZkEVMData.tvlChange && protocolGnosisData.tvlChange && protocolDataAvalanche.tvlChange) {
        tvlChange = protocolData.tvlChange + protocolArbitrumData.tvlChange + protocolPolygonZkEVMData.tvlChange + protocolPolygonData.tvlChange + protocolGnosisData.tvlChange + protocolDataAvalanche.tvlChange;
    }

    if (protocolData.volume24 && protocolArbitrumData.volume24 && protocolPolygonData.volume24  && protocolPolygonZkEVMData.volume24 && protocolGnosisData.volume24 && protocolDataAvalanche.volume24) {
        volume = protocolData.volume24 + protocolArbitrumData.volume24 + protocolPolygonData.volume24 + protocolPolygonZkEVMData.volume24 + protocolGnosisData.volume24 + protocolDataAvalanche.volume24;
    }
    if (protocolData.volumeChange && protocolArbitrumData.volumeChange && protocolPolygonData.volumeChange  && protocolPolygonZkEVMData.volumeChange&& protocolGnosisData.volumeChange && protocolDataAvalanche.volumeChange) {
        volumeChange = protocolData.volumeChange + protocolArbitrumData.volumeChange + protocolPolygonData.volumeChange + protocolPolygonZkEVMData.volumeChange + protocolGnosisData.volumeChange + protocolDataAvalanche.volumeChange;
    }


    if (protocolData.fees24 && protocolArbitrumData.fees24 && protocolPolygonData.fees24 && protocolPolygonZkEVMData.fees24 && protocolGnosisData.fees24 && protocolDataAvalanche.fees24) {
        fees24 = protocolData.fees24 + protocolArbitrumData.fees24 + protocolPolygonData.fees24 + protocolPolygonZkEVMData.fees24 + protocolGnosisData.fees24 + protocolDataAvalanche.fees24;
    }

    if (protocolData.feesChange && protocolArbitrumData.feesChange && protocolPolygonData.feesChange && protocolPolygonZkEVMData.feesChange && protocolGnosisData.feesChange && protocolDataAvalanche.feesChange) {
        feeChange = protocolData.feesChange + protocolArbitrumData.feesChange + protocolPolygonData.feesChange + protocolPolygonZkEVMData.feesChange  + protocolGnosisData.feesChange + protocolDataAvalanche.feesChange;
    }

    if (protocolData.swaps24 && protocolArbitrumData.swaps24 && protocolPolygonData.swaps24 && protocolPolygonZkEVMData.swaps24 && protocolGnosisData.swaps24 && protocolDataAvalanche.swaps24) {
        swaps24 = protocolData.swaps24 + protocolArbitrumData.swaps24 + protocolPolygonData.swaps24 + protocolPolygonZkEVMData.swaps24 + protocolGnosisData.swaps24 + protocolDataAvalanche.swaps24;
    }

    if (protocolData.swapsChange && protocolArbitrumData.swapsChange && protocolPolygonData.swapsChange && protocolPolygonZkEVMData.swapsChange && protocolGnosisData.swapsChange && protocolDataAvalanche.swapsChange) {
        swapsChange = protocolData.swapsChange + protocolArbitrumData.swapsChange + protocolPolygonData.swapsChange +  protocolPolygonZkEVMData.swapsChange + protocolGnosisData.swapsChange + protocolDataAvalanche.swapsChange;
    }

    return {
        mainnetData: protocolData,
        arbitrumData: protocolArbitrumData,
        polygonData: protocolPolygonData,
        polygonZkEvmData: protocolPolygonZkEVMData,
        gnosisData : protocolGnosisData,
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