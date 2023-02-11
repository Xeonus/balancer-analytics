import {
    BalancerJoinExitFragment,
    BalancerSwapFragment,
    useGetTransactionDataLazyQuery,
} from '../../apollo/generated/graphql-codegen-generated';
import { useEffect, useRef } from 'react';
import { orderBy, uniqBy, groupBy, sumBy, map } from 'lodash';
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
                    uri: activeNetwork.clientUri,
                },
            });
        }
    }, [poolIds, addresses]);

    console.log("data", data)

    const swaps = uniqBy(
        orderBy([...(data?.swapsIn || []), ...(data?.swapsOut || [])], 'timestamp', 'desc'),
        (swap) => swap.id,
    );

    const groupedByPair = groupBy(swaps, (swap) => `${swap.tokenInSym} -> ${swap.tokenOutSym}`);
    const swapPairVolumes = map(groupedByPair, (swaps, key) => {
        return {
            name: key,
            value: sumBy(swaps, (swap) => parseFloat(swap.valueUSD)),
        };
    });

    return {
        swaps,
        joinExits: data?.joinExits || [],
        swapPairVolumes,
    };
}
