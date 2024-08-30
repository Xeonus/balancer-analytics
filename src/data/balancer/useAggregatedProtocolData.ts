import { useBalancerChainProtocolData } from './useProtocolDataWithClientOverride';
import {
    EthereumNetworkInfo,
    ArbitrumNetworkInfo,
    PolygonNetworkInfo,
    GnosisNetworkInfo,
    PolygonZkEVMNetworkInfo,
    AvalancheNetworkInfo,
    BaseNetworkInfo, ModeNetworkInfo, FraxtalNetworkInfo
} from '../../constants/networks';
import {
    blockClient,
    client,
    arbitrumBlockClient,
    arbitrumClient,
    polygonBlockClient,
    polygonClient,
    polygonZKEVMBlockClient,
    polygonZKEVMClient,
    gnosisBlockClient,
    gnosisClient,
    avalancheBlockClient,
    avalancheClient,
    baseBlockClient,
    baseClient, modeBlockClient, modeClient, fraxtalBlockClient, fraxtalClient,
} from '../../apollo/client';
import { ProtocolData } from './useProtocolDataWithClientOverride';
import { getUnixTimestamp1000DaysAgo } from "../../utils/date";
import {BalancerChartDataItem} from "./balancerTypes";

export interface AggregatedProtocolData {
    mainnetData: ProtocolData,
    arbitrumData: ProtocolData,
    polygonData: ProtocolData,
    polygonzkEVMData: ProtocolData,
    gnosisData: ProtocolData,
    avalancheData: ProtocolData,
    baseData: ProtocolData,
    modeData: ProtocolData,
    fraxtalData: ProtocolData,
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
    overallTvlData?: BalancerChartDataItem[];
    overallProtocolFeeData?: BalancerChartDataItem[];
    overallVolumeChartData?: BalancerChartDataItem[];
    overallFeeChartData?: BalancerChartDataItem[];
    overallSwapsChartData?: BalancerChartDataItem[];
}

const sumNumericMetrics = (metrics: (number | undefined)[]): number => {
    return metrics.filter((metric): metric is number => metric !== undefined).reduce((acc, metric) => acc + metric, 0);
};

const aggregateNumericMetrics = (protocolsData: ProtocolData[], metricKey: keyof ProtocolData): number => {
    // Filter out non-numeric data before aggregation
    const metrics = protocolsData.map(data => {
        const metric = data[metricKey];
        return typeof metric === 'number' ? metric : undefined;
    });
    return sumNumericMetrics(metrics);
};


const aggregateChartData = (protocolsData: ProtocolData[], metricKey: keyof ProtocolData): BalancerChartDataItem[] => {
    const allChartData: BalancerChartDataItem[][] = protocolsData
        .map(data => data[metricKey] as BalancerChartDataItem[] | undefined)
        .filter((chartData): chartData is BalancerChartDataItem[] => chartData !== undefined);

    const aggregatedData: { [key: string]: number } = {};

    allChartData.forEach(chartDataArray => {
        chartDataArray.forEach(({ value, time }) => {
            if (!aggregatedData[time]) aggregatedData[time] = 0;
            aggregatedData[time] += value;
        });
    });

    return Object.entries(aggregatedData).map(([time, value]) => ({ time, value }));
};

export default function useAggregatedProtocolData(): AggregatedProtocolData {
    const startDate = getUnixTimestamp1000DaysAgo();
    const protocolsData = [
        useBalancerChainProtocolData(EthereumNetworkInfo.decentralicedClientUri, startDate, blockClient, client),
        useBalancerChainProtocolData(ArbitrumNetworkInfo.decentralicedClientUri, startDate, arbitrumBlockClient, arbitrumClient),
        useBalancerChainProtocolData(PolygonNetworkInfo.decentralicedClientUri, startDate, polygonBlockClient, polygonClient),
        useBalancerChainProtocolData(PolygonZkEVMNetworkInfo.clientUri, startDate, polygonZKEVMBlockClient, polygonZKEVMClient),
        useBalancerChainProtocolData(GnosisNetworkInfo.decentralicedClientUri, startDate, gnosisBlockClient, gnosisClient),
        useBalancerChainProtocolData(AvalancheNetworkInfo.decentralicedClientUri, startDate, avalancheBlockClient, avalancheClient),
        useBalancerChainProtocolData(BaseNetworkInfo.clientUri, startDate, baseBlockClient, baseClient),
        useBalancerChainProtocolData(ModeNetworkInfo.clientUri, startDate, modeBlockClient, modeClient),
        useBalancerChainProtocolData(FraxtalNetworkInfo.clientUri, startDate, fraxtalBlockClient, fraxtalClient),
    ];

    // Aggregate numeric metrics
    const volume = aggregateNumericMetrics(protocolsData, 'volume24');
    const volumeChange = aggregateNumericMetrics(protocolsData, 'volumeChange');
    const fees24 = aggregateNumericMetrics(protocolsData, 'fees24');
    const protocolFees24 = aggregateNumericMetrics(protocolsData, 'protocolFees24');
    const feesChange = aggregateNumericMetrics(protocolsData, 'feesChange');
    const protocolFeesChange = aggregateNumericMetrics(protocolsData, 'protocolFeesChange');
    const tvl = aggregateNumericMetrics(protocolsData, 'tvl');
    const tvlChange = aggregateNumericMetrics(protocolsData, 'tvlChange');
    const swaps24 = aggregateNumericMetrics(protocolsData, 'swaps24');
    const swapsChange = aggregateNumericMetrics(protocolsData, 'swapsChange');

    // Aggregate chart data
    const overallTvlData = aggregateChartData(protocolsData, 'tvlData');
    const overallProtocolFeeData = aggregateChartData(protocolsData, 'protocolFeeData');
    const overallVolumeChartData = aggregateChartData(protocolsData, 'volumeData');
    const overallFeeChartData = aggregateChartData(protocolsData, 'feeData');
    const overallSwapsChartData = aggregateChartData(protocolsData, 'swapData');

    return {
        mainnetData: protocolsData[0],
        arbitrumData: protocolsData[1],
        polygonData: protocolsData[2],
        polygonzkEVMData: protocolsData[3],
        gnosisData: protocolsData[4],
        avalancheData: protocolsData[5],
        baseData: protocolsData[6],
        modeData: protocolsData[7],
        fraxtalData: protocolsData[8],
        volume,
        volumeChange,
        fees24,
        protocolFees24,
        feesChange,
        protocolFeesChange,
        tvl,
        tvlChange,
        swaps24,
        swapsChange,
        overallTvlData,
        overallProtocolFeeData,
        overallVolumeChartData,
        overallFeeChartData,
        overallSwapsChartData,
    };
}
