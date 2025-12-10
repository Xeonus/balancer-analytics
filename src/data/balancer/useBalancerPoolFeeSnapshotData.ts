import {useBlocksFromTimestamps} from "../../hooks/useBlocksFromTimestamps";
import {useBalancerPoolFeeSnapshotsLazyQuery,} from "../../apollo/generated/graphql-codegen-generated";
import {ApolloClient, NormalizedCacheObject} from "@apollo/client";
import {useEffect, useState} from "react";
import {JoinExitTimestamp, PoolFeeSnapshotData} from "./balancerTypes";
import { sanitizeScalarValue } from '../../utils/dataValidation';

export function useBalancerPoolFeeSnapshotData(clientUri: string, startTimestamp: number, blockClientOverride?: ApolloClient<NormalizedCacheObject>, clientOverride?: ApolloClient<NormalizedCacheObject>): PoolFeeSnapshotData | undefined {

    const {blocks, error: blockError} = useBlocksFromTimestamps([startTimestamp], blockClientOverride);
    const [block] = blocks ?? [];
    const [getPoolData, {data}] = useBalancerPoolFeeSnapshotsLazyQuery({client: clientOverride});
    const [poolFeeData, setPoolFeeData] = useState<PoolFeeSnapshotData | undefined>();

    useEffect(() => {
        if (block) {
            getPoolData({
                variables: {
                    block: {
                        number: parseFloat(block.number),
                    },
                    where: {
                        protocolFee_not: null,
                    }
                },
                context: {
                    uri: clientUri,
                },
            });
        }
    }, [block]);

    useEffect(() => {
        if (data && data.poolSnapshots) {


            // Filter snapshots to only include those >= the provided timestamp
            //const filteredSnapshots = data.poolSnapshots.filter(snapshot => snapshot.timestamp >= startTimestamp);

            // Step 1: Group snapshots by pool ID
            const groupedByPoolId: Record<string, typeof data.poolSnapshots[0][]> = {};
            data.poolSnapshots.forEach(snapshot => {
                const poolId = snapshot.pool.id;
                if (!groupedByPoolId[poolId]) {
                    groupedByPoolId[poolId] = [];
                }
                groupedByPoolId[poolId].push(snapshot);
            });

            // Step 2: Select the most recent snapshot for each pool
            const mostRecentSnapshots = Object.values(groupedByPoolId).map(snapshots => {
                return snapshots.reduce((mostRecent, current) => {
                    return (mostRecent.timestamp > current.timestamp) ? mostRecent : current;
                });
            });

            const transformedData: PoolFeeSnapshotData = {
                pools: mostRecentSnapshots.map(snapshot => ({
                    address: snapshot.pool.address,
                    id: snapshot.pool.id,
                    // Provide a default value for symbol if it's null or undefined
                    symbol: snapshot.pool.symbol || '',
                    totalAumFeeCollectedInBPT: snapshot.pool.totalAumFeeCollectedInBPT ? parseFloat(snapshot.pool.totalAumFeeCollectedInBPT) : 0,
                    totalProtocolFee: parseFloat(snapshot.pool.totalProtocolFee ? snapshot.pool.totalProtocolFee : '0'),
                    totalProtocolFeePaidInBPT: snapshot.pool.totalProtocolFeePaidInBPT ? parseFloat(snapshot.pool.totalProtocolFeePaidInBPT) : 0,
                    totalSwapFee: parseFloat(snapshot.pool.totalSwapFee),
                    tokens: snapshot.pool.tokens ? snapshot.pool.tokens.map(token => ({
                        address: token.address,
                        decimals: token.decimals,
                        id: token.id,
                        isMainToken: false,
                        name: token.name,
                        symbol: token.symbol || '', // Provide a default value for symbol if it's null or undefined
                        weight: token.weight ? parseFloat(token.weight) : 0,
                        paidProtocolFees: parseFloat(token.paidProtocolFees ? token.paidProtocolFees : '0'),
                    })) : [], // Provide an empty array as a fallback
                    timestamp: snapshot.timestamp,
                    protocolFee: parseFloat(snapshot.protocolFee ? snapshot.protocolFee : '0'),
                    swapFees: parseFloat(snapshot.swapFees),
                    swapVolume: parseFloat(snapshot.swapVolume),
                    liquidity: parseFloat(snapshot.liquidity),
                    poolType: snapshot.pool.poolType ? snapshot.pool.poolType : '',
                    name: snapshot.pool.name ? snapshot.pool.name : '',
                    isInRecoveryMode: snapshot.pool.isInRecoveryMode ? snapshot.pool.isInRecoveryMode : false,
                    createTime: snapshot.pool.createTime,
                    joinExits: snapshot.pool.joinsExits ? snapshot.pool.joinsExits : [{timestamp: 0}],
                })),
            };
            setPoolFeeData(transformedData);
        }
    }, [data?.poolSnapshots.length, startTimestamp]);

    // Effect to reset pool fee data when clientUri changes
    useEffect(() => {
        // Reset poolFeeData to undefined or any initial state you prefer
        setPoolFeeData(undefined);
        // You might also want to re-fetch the pool data here if necessary
    }, [clientUri, startTimestamp]);

    return poolFeeData;
}

export function getSnapshotFees(feeSnapshotNow: PoolFeeSnapshotData, feeSnapshotPast: PoolFeeSnapshotData, pastTimestamp: number): PoolFeeSnapshotData {
    return {
        pools: feeSnapshotNow.pools.map(nowPool => {
            const pastPool = feeSnapshotPast.pools.find(past => past.id === nowPool.id);

            if (!pastPool && !(nowPool.createTime > pastTimestamp)) {
                return {
                    ...nowPool,
                    swapFees: 0,
                    totalSwapFee: 0,
                    totalProtocolFee: 0,
                    totalProtocolFeePaidInBPT: 0,
                    swapVolume: 0,
                    protocolFee: 0,
                    tokens: nowPool.tokens.map(token => ({
                        ...token,
                        paidProtocolFees: 0,
                    })),
                };
            }
            // Default to 0 if no corresponding past pool is found
            // Sanitize fee snapshot values (hack data corruption fix)
            const swapFees = sanitizeScalarValue(nowPool.swapFees - (pastPool?.swapFees || 0), 0);
            const totalSwapFee = sanitizeScalarValue(nowPool.totalSwapFee - (pastPool?.totalSwapFee || 0), 0);
            const totalProtocolFee = sanitizeScalarValue(nowPool.totalProtocolFee - (pastPool?.totalProtocolFee || 0), 0);
            const totalProtocolFeePaidInBPT = sanitizeScalarValue(nowPool.totalProtocolFeePaidInBPT - (pastPool?.totalProtocolFeePaidInBPT || 0), 0);
            const liquidity = sanitizeScalarValue(nowPool.liquidity, 0);
            const swapVolume = sanitizeScalarValue(nowPool.swapVolume - (pastPool?.swapVolume || 0), 0);
            const protocolFee = sanitizeScalarValue(nowPool.protocolFee - (pastPool?.protocolFee || 0), 0);
            const isInRecoveryMode = nowPool.isInRecoveryMode //if the pool is in recovery mode at newest snapshot date, then tag as such
            return {
                ...nowPool, // Copy all current pool data
                swapFees,
                totalSwapFee,
                totalProtocolFee,
                totalProtocolFeePaidInBPT,
                liquidity,
                swapVolume,
                protocolFee,
                isInRecoveryMode,
                // Update other fields as necessary
                tokens: nowPool.tokens.map(token => {
                    const pastToken = pastPool?.tokens.find(p => p.symbol === token.symbol);
                    const paidProtocolFees = sanitizeScalarValue((token.paidProtocolFees ? token.paidProtocolFees : 0) - (pastToken?.paidProtocolFees || 0), 0);
                    // Subtract other token-specific fields as necessary
                    return {
                        ...token,
                        paidProtocolFees
                        // Update other fields as necessary
                    };
                })
            };
        })
    };
}
