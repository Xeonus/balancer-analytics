
import { useBalancerChainProtocolData } from './useProtocolDataWithClientOverride';
import {
    EthereumNetworkInfo,
    ArbitrumNetworkInfo,
    PolygonNetworkInfo,
    GnosisNetworkInfo,
    PolygonZkEVMNetworkInfo, AvalancheNetworkInfo, BaseNetworkInfo
} from '../../constants/networks';
import {
    arbitrumBlockClient,
    arbitrumClient, avalancheBlockClient, avalancheClient, baseBlockClient, baseClient, blockClient, client,
    gnosisBlockClient,
    gnosisClient,
    polygonBlockClient,
    polygonClient,
    polygonZKEVMBlockClient, polygonZKEVMClient
} from '../../apollo/client';
import { ProtocolData } from './useProtocolDataWithClientOverride'
import {BalancerChartDataItem} from "./balancerTypes";

//TODO: Define interface with SupportedNetwork array
export interface AggregatedProtocolData {
    mainnetData: ProtocolData,
    arbitrumData: ProtocolData,
    polygonData: ProtocolData,
    polygonzkEVMData: ProtocolData,
    gnosisData: ProtocolData,
    avalancheData: ProtocolData,
    baseData: ProtocolData,
    volume: number;
    volumeChange: number;
    fees24: number;
    protocolFees24: number;
    feesChange: number;
    protocolFeesChange: number;
    tvl: number;
    tvlChange: number;
    swaps24: number;
    swapsChange: number;
}

const aggregateChartData = (
    mainData: ProtocolData,
    sideChainsData: ProtocolData[],
    field: keyof ProtocolData
): BalancerChartDataItem[] => {
    const mainFieldData = mainData[field] as BalancerChartDataItem[] | undefined;
    if (mainFieldData) {
        // Clone the main data to avoid mutating the original state
        let aggregatedData: BalancerChartDataItem[] = JSON.parse(JSON.stringify(mainFieldData));

        // Loop through the side-chain data and add the values to the main chain data
        aggregatedData.forEach(mainDataPoint => {
            sideChainsData.forEach(sideChain => {
                const sideChainFieldData = sideChain[field] as BalancerChartDataItem[] | undefined;
                if (sideChainFieldData) {
                    const match = sideChainFieldData.find(entry => entry.time === mainDataPoint.time);
                    if (match) {
                        mainDataPoint.value += match.value;
                    }
                }
            });
        });

        return aggregatedData;
    }
    return [];
};

export default function useAggregatedProtocolData() {
    const protocolData = useBalancerChainProtocolData(EthereumNetworkInfo.clientUri, EthereumNetworkInfo.startTimeStamp, blockClient, client);
    const protocolArbitrumData = useBalancerChainProtocolData(ArbitrumNetworkInfo.clientUri, ArbitrumNetworkInfo.startTimeStamp, arbitrumBlockClient, arbitrumClient);
    const protocolPolygonData = useBalancerChainProtocolData(PolygonNetworkInfo.clientUri, PolygonNetworkInfo.startTimeStamp, polygonBlockClient, polygonClient);
    const protocolPolygonZkEVMData = useBalancerChainProtocolData(PolygonZkEVMNetworkInfo.clientUri, PolygonZkEVMNetworkInfo.startTimeStamp, polygonZKEVMBlockClient, polygonZKEVMClient);
    const protocolGnosisData = useBalancerChainProtocolData(GnosisNetworkInfo.clientUri, GnosisNetworkInfo.startTimeStamp, gnosisBlockClient, gnosisClient)
    const protocolDataAvalanche = useBalancerChainProtocolData(AvalancheNetworkInfo.clientUri, AvalancheNetworkInfo.startTimeStamp, avalancheBlockClient, avalancheClient)
    const protocolDataBase = useBalancerChainProtocolData(BaseNetworkInfo.clientUri, BaseNetworkInfo.startTimeStamp, baseBlockClient, baseClient);


    if (!protocolData && !protocolArbitrumData && !protocolPolygonData && !protocolPolygonZkEVMData && !protocolGnosisData) {
        return {
            mainnetData: [],
            arbitrumData: [],
            polygonData: [],
            polygonZkEvmData: [],
            protocolPolygonZkEVMData: [],
            gnosisData : [],
            avalancheData: [],
            baseData: [],
            volume24: 0,
            volumeChange: 0,
            fees24: 0,
            feesChange: 0,
            tvl: 0,
            tvlChange: 0,
            swaps24: 0
        };
    }

    //Global Metrics
    let tvl = 0
    let tvlChange = 0
    let volume = 0
    let volumeChange = 0
    let fees24 = 0
    let protocolFees24 = 0
    let feeChange = 0
    let protocolFeesChange = 0
    let swaps24 = 0
    let swapsChange = 0

    if (protocolData.tvl && protocolArbitrumData.tvl && protocolPolygonData.tvl && protocolPolygonZkEVMData.tvl &&
        protocolGnosisData.tvl && protocolDataAvalanche.tvl && protocolDataBase.tvl) {
        tvl = protocolData.tvl + protocolArbitrumData.tvl + protocolPolygonData.tvl +
            protocolPolygonZkEVMData.tvl + protocolGnosisData.tvl + protocolDataAvalanche.tvl + protocolDataBase.tvl;
    }

    if (protocolData.tvlChange && protocolArbitrumData.tvlChange && protocolPolygonData.tvlChange && protocolPolygonZkEVMData.tvlChange &&
        protocolGnosisData.tvlChange && protocolDataAvalanche.tvlChange && protocolDataBase.tvlChange) {
        tvlChange = protocolData.tvlChange + protocolArbitrumData.tvlChange + protocolPolygonZkEVMData.tvlChange +
            protocolPolygonData.tvlChange + protocolGnosisData.tvlChange + protocolDataAvalanche.tvlChange + protocolDataBase.tvlChange;
    }

    if (protocolData.volume24 && protocolArbitrumData.volume24 && protocolPolygonData.volume24  &&
        protocolPolygonZkEVMData.volume24 && protocolGnosisData.volume24 && protocolDataAvalanche.volume24 && protocolDataBase.volume24) {
        volume = protocolData.volume24 + protocolArbitrumData.volume24 + protocolPolygonData.volume24 +
            protocolPolygonZkEVMData.volume24 + protocolGnosisData.volume24 + protocolDataAvalanche.volume24 + protocolDataBase.volume24;
    }
    if (protocolData.volumeChange && protocolArbitrumData.volumeChange && protocolPolygonData.volumeChange  &&
        protocolPolygonZkEVMData.volumeChange&& protocolGnosisData.volumeChange && protocolDataAvalanche.volumeChange && protocolDataBase.volumeChange) {
        volumeChange = protocolData.volumeChange + protocolArbitrumData.volumeChange + protocolPolygonData.volumeChange +
            protocolPolygonZkEVMData.volumeChange + protocolGnosisData.volumeChange + protocolDataAvalanche.volumeChange + protocolDataBase.volumeChange;
    }


    if (protocolData.fees24 && protocolArbitrumData.fees24 && protocolPolygonData.fees24 && protocolPolygonZkEVMData.fees24 &&
        protocolGnosisData.fees24 && protocolDataAvalanche.fees24 && protocolDataBase.fees24) {
        fees24 = protocolData.fees24 + protocolArbitrumData.fees24 + protocolPolygonData.fees24 +
            protocolPolygonZkEVMData.fees24 + protocolGnosisData.fees24 + protocolDataAvalanche.fees24 + protocolDataBase.fees24;
    }

    if (protocolData.protocolFees24 && protocolArbitrumData.protocolFees24 && protocolPolygonData.protocolFees24 && protocolPolygonZkEVMData.protocolFees24 &&
        protocolGnosisData.protocolFees24 && protocolDataAvalanche.protocolFees24 && protocolDataBase.protocolFees24) {
        protocolFees24 = protocolData.protocolFees24 + protocolArbitrumData.protocolFees24 + protocolPolygonData.protocolFees24 +
            protocolPolygonZkEVMData.protocolFees24 + protocolGnosisData.protocolFees24 + protocolDataAvalanche.protocolFees24 + protocolDataBase.protocolFees24;
    }

    if (protocolData.feesChange && protocolArbitrumData.feesChange && protocolPolygonData.feesChange &&
        protocolPolygonZkEVMData.feesChange && protocolGnosisData.feesChange && protocolDataAvalanche.feesChange && protocolDataBase.feesChange) {
        feeChange = protocolData.feesChange + protocolArbitrumData.feesChange + protocolPolygonData.feesChange +
            protocolPolygonZkEVMData.feesChange  + protocolGnosisData.feesChange + protocolDataAvalanche.feesChange + protocolDataBase.feesChange;
    }

    if (protocolData.protocolFeesChange && protocolArbitrumData.protocolFeesChange && protocolPolygonData.protocolFeesChange &&
        protocolPolygonZkEVMData.protocolFeesChange && protocolGnosisData.protocolFeesChange && protocolDataAvalanche.protocolFeesChange && protocolDataBase.protocolFeesChange) {
        protocolFeesChange = protocolData.protocolFeesChange + protocolArbitrumData.protocolFeesChange + protocolPolygonData.protocolFeesChange +
            protocolPolygonZkEVMData.protocolFeesChange  + protocolGnosisData.protocolFeesChange + protocolDataAvalanche.protocolFeesChange + protocolDataBase.protocolFeesChange;
    }

    if (protocolData.swaps24 && protocolArbitrumData.swaps24 && protocolPolygonData.swaps24 && protocolPolygonZkEVMData.swaps24 &&
        protocolGnosisData.swaps24 && protocolDataAvalanche.swaps24 && protocolDataBase.swaps24) {
        swaps24 = protocolData.swaps24 + protocolArbitrumData.swaps24 + protocolPolygonData.swaps24 +
            protocolPolygonZkEVMData.swaps24 + protocolGnosisData.swaps24 + protocolDataAvalanche.swaps24 + protocolDataBase.swaps24;
    }

    if (protocolData.swapsChange && protocolArbitrumData.swapsChange && protocolPolygonData.swapsChange &&
        protocolPolygonZkEVMData.swapsChange && protocolGnosisData.swapsChange && protocolDataAvalanche.swapsChange && protocolDataBase.swapsChange) {
        swapsChange = protocolData.swapsChange + protocolArbitrumData.swapsChange + protocolPolygonData.swapsChange +
            protocolPolygonZkEVMData.swapsChange + protocolGnosisData.swapsChange + protocolDataAvalanche.swapsChange + protocolDataBase.swapsChange;
    }

    //Protocol TVL Data
    const tvlChartData: BalancerChartDataItem[] = aggregateChartData(
        protocolData,
        [protocolArbitrumData, protocolPolygonData, protocolPolygonZkEVMData, protocolGnosisData, protocolDataAvalanche, protocolDataBase],
        'tvlData'
    );

    // Protocol Fee Data
    const protocolFeesChartData: BalancerChartDataItem[] = aggregateChartData(
        protocolData,
        [protocolArbitrumData, protocolPolygonData, protocolPolygonZkEVMData, protocolGnosisData, protocolDataAvalanche, protocolDataBase],
        'protocolFeeData'
    );

    // Volume Data
    const protocolVolumeChartData: BalancerChartDataItem[] = aggregateChartData(
        protocolData,
        [protocolArbitrumData, protocolPolygonData, protocolPolygonZkEVMData, protocolGnosisData, protocolDataAvalanche, protocolDataBase],
        'volumeData'
    );

    return {
        mainnetData: protocolData,
        arbitrumData: protocolArbitrumData,
        polygonData: protocolPolygonData,
        polygonZkEvmData: protocolPolygonZkEVMData,
        gnosisData : protocolGnosisData,
        avalancheData: protocolDataAvalanche,
        baseData: protocolDataBase,
        volume: volume,
        volumeChange: volumeChange,
        fees24: fees24,
        protocolFees24: protocolFees24,
        feesChange: feeChange,
        protocolFeesChange: protocolFeesChange,
        tvl,
        tvlChange: tvlChange,
        swaps24: swaps24,
        swapsChange: swapsChange,
        overallTvlData: tvlChartData,
        overallProtocolFeeData: protocolFeesChartData,
        overallVolumeChartData: protocolVolumeChartData,
    };
}
