import { useDeltaTimestamps } from '../../utils/queries';
import { useBlocksFromTimestamps } from '../../hooks/useBlocksFromTimestamps';
import { BalancerSwapFragment, useGetProtocolDataLazyQuery } from '../../apollo/generated/graphql-codegen-generated';
import { useEffect } from 'react';
import { unixToDate } from '../../utils/date';
import { BalancerChartDataItem } from './balancerTypes';
import { useActiveNetworkVersion } from '../../state/application/hooks';

export interface ProtocolData {
    volume24?: number;
    volumeChange?: number;
    fees24?: number;
    protocolFees24?: number;
    feesChange?: number;
    protocolFeesChange?: number;
    tvl?: number;
    tvlChange?: number;
    swaps24?: number;
    swapsChange?: number;
    tvlData: BalancerChartDataItem[];
    volumeData: BalancerChartDataItem[];
    swapData: BalancerChartDataItem[];
    feeData: BalancerChartDataItem[];
    protocolFeeData: BalancerChartDataItem[];
    whaleSwaps: BalancerSwapFragment[];
}

export function useBalancerProtocolData(): ProtocolData {
    const [activeNetwork] = useActiveNetworkVersion();
    const [t24, t48, tWeek] = useDeltaTimestamps();
    const { blocks, error: blockError } = useBlocksFromTimestamps([t24, t48, tWeek]);
    const [block24, block48, blockWeek] = blocks ?? [];
    const [getProcotolData, { data }] = useGetProtocolDataLazyQuery();

    useEffect(() => {
        if (block24) {
            getProcotolData({
                variables: {
                    startTimestamp: activeNetwork.startTimeStamp,
                    block24: { number: parseInt(block24.number) },
                    block48: { number: parseInt(block48.number) },
                },
                context: {
                    uri: activeNetwork.clientUri,
                },
            });
        }
    }, [block24]);



    if (!data) {
        return { tvlData: [], volumeData: [], swapData: [], feeData: [], protocolFeeData: [], whaleSwaps: [] };
    }

    const snapshots = data.balancerSnapshots;
    const balancer = data.balancers[0];
    const balancer24 = data.balancers24[0];
    const balancer48 = data.balancers48[0];

    const tvlData = snapshots.map((snapshot) => {
        const value = parseFloat(snapshot.totalLiquidity);

        return {
            value: value > 0 ? value : 0,
            time: unixToDate(snapshot.timestamp),
        };
    });

    const volumeData = snapshots.map((snapshot, idx) => {
        const prevValue = idx === 0 ? 0 : parseFloat(snapshots[idx - 1].totalSwapVolume);
        const value = parseFloat(snapshot.totalSwapVolume);

        return {
            value: value - prevValue > 0 ? value - prevValue : 0,
            time: unixToDate(snapshot.timestamp),
        };
    });

    const swapData = snapshots.map((snapshot, idx) => {
        const prevValue = idx === 0 ? 0 : parseFloat(snapshots[idx - 1].totalSwapCount);
        const value = parseFloat(snapshot.totalSwapCount);

        return {
            value: value - prevValue > 0 ? value - prevValue : 0,
            time: unixToDate(snapshot.timestamp),
        };
    });

    const feeData = snapshots.map((snapshot, idx) => {
        const prevValue = idx === 0 ? 0 : parseFloat(snapshots[idx - 1].totalSwapFee);
        const value = parseFloat(snapshot.totalSwapFee);

        return {
            value: value - prevValue > 0 ? value - prevValue : 0,
            time: unixToDate(snapshot.timestamp),
        };
    });

    const protocolFeeData = snapshots.map((snapshot, idx) => {
        let prevValue = 0;
        if (idx !== 0) {
            const previousFee = snapshots[idx - 1].totalProtocolFee;
            prevValue = previousFee ? parseFloat(previousFee) : 0;
        }
        const value = parseFloat(snapshot.totalProtocolFee || '0');

        return {
            value: Math.max(value - prevValue, 0),
            time: unixToDate(snapshot.timestamp),
        };
    });


    const tvl = parseFloat(balancer.totalLiquidity);
    const tvl24 = parseFloat(balancer24.totalLiquidity);
    const volume = parseFloat(balancer.totalSwapVolume);
    const volume24 = parseFloat(balancer24.totalSwapVolume);
    const volume48 = parseFloat(balancer48.totalSwapVolume);
    const fees = parseFloat(balancer.totalSwapFee);
    const protocolFees = parseFloat(balancer.totalProtocolFee || '0');
    const protocolFees24 = parseFloat(balancer24.totalProtocolFee || '0')
    const protocolFees48 = parseFloat(balancer48.totalProtocolFee || '0')
    const fees24 = parseFloat(balancer24.totalSwapFee);
    const fees48 = parseFloat(balancer48.totalSwapFee);
    const swaps = parseFloat(balancer.totalSwapCount);
    const swaps24 = parseFloat(balancer24.totalSwapCount);
    const swaps48 = parseFloat(balancer48.totalSwapCount)

    return {
        volume24: volume - volume24,
        volumeChange: (volume - volume24 - (volume24 - volume48)) / (volume24 - volume48),
        tvl,
        tvlChange: (tvl - tvl24) / tvl24,
        fees24: fees - fees24,
        protocolFees24: protocolFees - protocolFees24,
        protocolFeesChange: (protocolFees - protocolFees24 - (protocolFees24 - protocolFees48)) / (protocolFees24 - protocolFees48),
        feesChange: (fees - fees24 - (fees24 - fees48)) / (fees24 - fees48),
        swaps24: swaps - swaps24,
        swapsChange: (swaps - swaps24 - (swaps24 - swaps48)) / (swaps24 - swaps48),
        tvlData,
        volumeData,
        swapData,
        feeData,
        protocolFeeData,
        whaleSwaps: data.whaleSwaps,
    };
}
