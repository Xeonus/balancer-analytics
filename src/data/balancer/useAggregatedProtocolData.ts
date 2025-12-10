import { useBalancerChainProtocolData } from './useProtocolDataWithClientOverride';
import {
    EthereumNetworkInfo,
    ArbitrumNetworkInfo,
    PolygonNetworkInfo,
    GnosisNetworkInfo,
    PolygonZkEVMNetworkInfo,
    AvalancheNetworkInfo,
    BaseNetworkInfo, FraxtalNetworkInfo
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
    baseClient, fraxtalBlockClient, fraxtalClient,
} from '../../apollo/client';
import { ProtocolData } from './useProtocolDataWithClientOverride';
import { getUnixTimestamp1000DaysAgo } from "../../utils/date";
import {BalancerChartDataItem} from "./balancerTypes";
import { sanitizeChartData, sanitizeScalarValue } from '../../utils/dataValidation';

export interface AggregatedProtocolData {
    mainnetData: ProtocolData,
    arbitrumData: ProtocolData,
    polygonData: ProtocolData,
    polygonzkEVMData: ProtocolData,
    gnosisData: ProtocolData,
    avalancheData: ProtocolData,
    baseData: ProtocolData,
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
        useBalancerChainProtocolData(PolygonZkEVMNetworkInfo.decentralicedClientUri, startDate, polygonZKEVMBlockClient, polygonZKEVMClient),
        useBalancerChainProtocolData(GnosisNetworkInfo.decentralicedClientUri, startDate, gnosisBlockClient, gnosisClient),
        useBalancerChainProtocolData(AvalancheNetworkInfo.decentralicedClientUri, startDate, avalancheBlockClient, avalancheClient),
        useBalancerChainProtocolData(BaseNetworkInfo.decentralicedClientUri, startDate, baseBlockClient, baseClient),
        useBalancerChainProtocolData(FraxtalNetworkInfo.clientUri, startDate, fraxtalBlockClient, fraxtalClient),
    ];

    // Aggregate numeric metrics and sanitize (hack data corruption fix)
    const volume = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'volume24'), 0);
    const volumeChange = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'volumeChange'), 0);
    const fees24 = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'fees24'), 0);
    const protocolFees24 = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'protocolFees24'), 0);
    const feesChange = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'feesChange'), 0);
    const protocolFeesChange = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'protocolFeesChange'), 0);
    const tvl = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'tvl'), 0);
    const tvlChange = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'tvlChange'), 0);
    const swaps24 = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'swaps24'), 0);
    const swapsChange = sanitizeScalarValue(aggregateNumericMetrics(protocolsData, 'swapsChange'), 0);

    // Aggregate chart data and sanitize (hack data corruption fix)
    const overallTvlData = sanitizeChartData(aggregateChartData(protocolsData, 'tvlData'));
    const overallProtocolFeeData = sanitizeChartData(aggregateChartData(protocolsData, 'protocolFeeData'));
    const overallVolumeChartData = sanitizeChartData(aggregateChartData(protocolsData, 'volumeData'));
    const overallFeeChartData = sanitizeChartData(aggregateChartData(protocolsData, 'feeData'));
    const overallSwapsChartData = sanitizeChartData(aggregateChartData(protocolsData, 'swapData'));

    return {
        mainnetData: protocolsData[0],
        arbitrumData: protocolsData[1],
        polygonData: protocolsData[2],
        polygonzkEVMData: protocolsData[3],
        gnosisData: protocolsData[4],
        avalancheData: protocolsData[5],
        baseData: protocolsData[6],
        fraxtalData: protocolsData[7],
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
