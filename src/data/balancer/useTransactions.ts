import {
    BalancerJoinExitFragment,
    BalancerSwapFragment,
    useGetTransactionDataLazyQuery,
} from '../../apollo/generated/graphql-codegen-generated';
import { useEffect, useRef } from 'react';
import { useActiveNetworkVersion } from '../../state/application/hooks';

export function useBalancerTransactionData(
    addresses: string[],
    poolIds: string[],
): {
    swaps: BalancerSwapFragment[];
    joinExits: BalancerJoinExitFragment[];
    swapPairVolumes: { name: string; value: number }[];
} {
    const [activeNetwork] = useActiveNetworkVersion();
    const [getTokenTransactionData, { data }] = useGetTransactionDataLazyQuery();
    const ref = useRef<{ poolIds: string[]; addresses: string[] }>({ poolIds: [], addresses: [] });

    useEffect(() => {
        if (poolIds.length !== ref.current.poolIds.length || addresses.length !== ref.current.addresses.length) {
            ref.current = { poolIds, addresses };
            getTokenTransactionData({
                variables: {
                    addresses,
                    poolIds,
                    startTimestamp: activeNetwork.startTimeStamp,
                },
                context: {
                    uri: activeNetwork.decentralicedClientUri,
                },
            });
        }
    }, [poolIds, addresses]);

    console.log("data", data);

    const swaps = uniqSwaps([...(data?.swapsIn || []), ...(data?.swapsOut || [])]);

    const groupedByPair = groupSwapsByPair(swaps);
    const swapPairVolumes = getSwapPairVolumes(groupedByPair);

    return {
        swaps,
        joinExits: data?.joinExits || [],
        swapPairVolumes,
    };
}

function uniqSwaps(swaps: BalancerSwapFragment[]): BalancerSwapFragment[] {
    const uniqueSwaps: BalancerSwapFragment[] = [];
    const seenIds = new Set<string>();

    for (const swap of swaps) {
        if (!seenIds.has(swap.id)) {
            seenIds.add(swap.id);
            uniqueSwaps.push(swap);
        }
    }

    return uniqueSwaps;
}

function groupSwapsByPair(swaps: BalancerSwapFragment[]): { [key: string]: BalancerSwapFragment[] } {
    const groupedByPair: { [key: string]: BalancerSwapFragment[] } = {};

    for (const swap of swaps) {
        const key = `${swap.tokenInSym} -> ${swap.tokenOutSym}`;
        if (!groupedByPair[key]) {
            groupedByPair[key] = [];
        }
        groupedByPair[key].push(swap);
    }

    return groupedByPair;
}

function getSwapPairVolumes(groupedByPair: { [key: string]: BalancerSwapFragment[] }): { name: string; value: number }[] {
    const swapPairVolumes: { name: string; value: number }[] = [];

    for (const key in groupedByPair) {
        const swaps = groupedByPair[key];
        const totalValue = swaps.reduce((total, swap) => total + parseFloat(swap.valueUSD), 0);
        swapPairVolumes.push({ name: key, value: totalValue });
    }

    return swapPairVolumes;
}
