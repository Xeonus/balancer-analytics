import {
    BalancerPoolFragment,
    BalancerPoolSnapshotFragment,
    useGetPoolChartDataQuery,
    useGetPoolDataLazyQuery,
    useBalancerPoolSwapFeeSnapshotQuery,
    useGetBalancerPoolLazyQuery,
} from '../../apollo/generated/graphql-codegen-generated';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useDeltaTimestamps } from '../../utils/queries';
import { useBlocksFromTimestamps } from '../../hooks/useBlocksFromTimestamps';
import { useEffect, useState } from 'react';
import { unixToDate } from '../../utils/date';
import { BalancerChartDataItem, PoolData } from './balancerTypes';
import { CoingeckoSnapshotPriceData } from './useTokens';
import { DateTime } from 'luxon';
import {CG_KEY} from "./constants";
import { sanitizeChartData, sanitizeScalarValue } from '../../utils/dataValidation';

function getPoolValues(
    poolId: string,
    pools: BalancerPoolFragment[],
    startunixTime: number,
    endunixTime: number,
    poolSwapFeeSnapshots?: BalancerPoolSnapshotFragment[],
): { tvl: number; volume: number; swapCount: number; fees: number, feesEpoch: number, protcolFeesEpoch: number, poolType: string | null | undefined } {
    const pool = pools.find((pool) => poolId === pool.id);
    let epochFees = 0;
    let epochProtocolFees = 0;
    if (poolSwapFeeSnapshots) {
        const feeData = getEpochSwapFees(poolId, startunixTime, endunixTime, poolSwapFeeSnapshots);
        epochFees = feeData.swapFee;
        epochProtocolFees = feeData.protocolFee
    }

    if (!pool || pool.poolType === 'AaveLinear') {
        return { tvl: 0, volume: 0, swapCount: 0, fees: 0, feesEpoch: 0, protcolFeesEpoch: 0, poolType: '' };
    }

    //console.log("pool", pool);

    return {
        tvl: parseFloat(pool.totalLiquidity),
        volume: parseFloat(pool.totalSwapVolume),
        fees: parseFloat(pool.totalSwapFee),
        feesEpoch: epochFees,
        protcolFeesEpoch: epochProtocolFees,
        swapCount: parseFloat(pool.swapsCount),
        poolType: pool.poolType,
    };
}

function getEpochSwapFees(
    poolId: string,
    startTimeStamp: number,
    endTimeStamp: number,
    poolSnapshots: BalancerPoolSnapshotFragment[],
): { swapFee: number, protocolFee: number } {
    let snapshotFee = 0;
    let snapshotProtocolFee = 0;
    let startProtocolFee = 0;
    let endProtocolFee = 0;
    let startFee = 0;
    let endFee = 0;
    poolSnapshots.forEach((pool) => {
        if (pool.pool.id === poolId) {
            if (pool.timestamp === endTimeStamp) {
                endFee = Number(pool.swapFees)
                endProtocolFee = Number(pool.protocolFee);
            }
            if (pool.timestamp === startTimeStamp) {
                startFee = Number(pool.swapFees);
                startProtocolFee = Number(pool.protocolFee);
            }
        }

    })
    if (endFee === 0 || startFee === 0) {
        snapshotFee = 0;
        snapshotProtocolFee = 0
    } else {
        snapshotFee = startFee - endFee;
        snapshotProtocolFee = startProtocolFee - endProtocolFee
    }
    return { swapFee: snapshotFee, protocolFee: snapshotProtocolFee };
}


//Poolsnapshots are taken OO:OO UTC.
// Get the current UTC time
const currentUTCTime = DateTime.utc();
const startTimestamp = Math.floor(currentUTCTime.startOf('day').toMillis() / 1000);

// Get the UTC time for a week ago
const weekAgoUTCTime = currentUTCTime.minus({ days: 7 });
const endTimestamp = Math.floor(weekAgoUTCTime.startOf('day').toMillis() / 1000);


export function useBalancerPools(first = 250, startunixTime = startTimestamp, endunixTime = endTimestamp): PoolData[] {
    const [activeNetwork] = useActiveNetworkVersion();
    const [t24, t48, tWeek] = useDeltaTimestamps();
    const { blocks } = useBlocksFromTimestamps([t24, t48, tWeek]);
    const [block24] = blocks ?? [];
    const [getPoolData, { data }] = useGetPoolDataLazyQuery();
    const feeData = useBalancerSwapFeePoolData(startunixTime, endunixTime);


    useEffect(() => {
        if (block24) {
            //TODO: replace this once the graph has caught up
            getPoolData({
                variables: {
                    block24: { number: parseInt(block24.number) },
                    first: first,
                },
                context: {
                    uri: activeNetwork.decentralicedClientUri,
                }
            });
        }
    }, [block24, first, activeNetwork.decentralicedClientUri, startunixTime, endunixTime]);

    if (!data) {
        return [];
    }

    const { pools, pools24 } = data;

    return pools.map((pool) => {
        const poolData = getPoolValues(pool.id, pools, startunixTime, endunixTime, feeData);
        const poolData24 = getPoolValues(pool.id, pools24, startunixTime, endunixTime);

        //TODO: token price information is not stored in PoolData Object model anymore -> remove

        // Sanitize pool metrics (hack data corruption fix)
        const sanitizedTvl = sanitizeScalarValue(poolData.tvl, 0);
        const sanitizedTvl24 = sanitizeScalarValue(poolData24.tvl, 0);
        const sanitizedVolume = sanitizeScalarValue(poolData.volume, 0);
        const sanitizedVolume24 = sanitizeScalarValue(poolData24.volume, 0);
        const sanitizedFees = sanitizeScalarValue(poolData.fees, 0);
        const sanitizedFees24 = sanitizeScalarValue(poolData24.fees, 0);
        const sanitizedFeesEpoch = sanitizeScalarValue(poolData.feesEpoch, 0);
        const sanitizedProtocolFeesEpoch = sanitizeScalarValue(poolData.protcolFeesEpoch, 0);

        const volumeDelta = sanitizedVolume - sanitizedVolume24;
        const feesDelta = sanitizedFees - sanitizedFees24;
        const tvlChange = sanitizedTvl24 !== 0 ? (sanitizedTvl - sanitizedTvl24) / sanitizedTvl24 : 0;
        const volumeChange = sanitizedVolume24 !== 0 ? volumeDelta / sanitizedVolume24 : 0;

        return {
            ...pool,
            name: pool.name || '',
            symbol: pool.symbol || '',
            feeTier: 1,
            swapFee: parseFloat(pool.swapFee),
            tokens: (pool.tokens || []).map((token) => {
                const weight = token.weight ? parseFloat(token.weight) : 0;
                const price = 0
                const balance = parseFloat(token.balance);

                return {
                    ...token,
                    decimals: token.decimals,
                    derivedETH: 0,
                    price,
                    tvl: parseFloat(token.balance) * price,
                    weight,
                    balance,
                };
            }),
            liquidity: sanitizedTvl,
            sqrtPrice: 0,
            tick: 0,
            volumeUSD: sanitizeScalarValue(volumeDelta, 0),
            volumeUSDChange: sanitizeScalarValue(volumeChange, 0),
            //volumeUSDChange: 100 / poolData24.volume * poolData.volume,
            feesUSD: sanitizeScalarValue(feesDelta, 0),
            feesEpochUSD: sanitizedFeesEpoch,
            protocolFeesEpocUSD: sanitizedProtocolFeesEpoch,
            tvlUSD: sanitizedTvl,
            tvlUSDChange: sanitizeScalarValue(tvlChange, 0),
            //tvlUSDChange: 100 / poolData24.tvl * poolData.tvl,
            poolType: poolData.poolType + "",
            amp: pool.amp ? pool.amp : '0',
            owner: pool.owner ? pool.owner : '',
            createTime: pool.createTime,
            holdersCount: parseInt(pool.holdersCount),
            factory: pool.factory ? pool.factory : '',
            totalShares: parseInt(pool.totalShares),
        };
    });
}

export function useBalancerSwapFeePoolData(startTimestamp: number, endTimeStamp: number) {

    const [activeNetwork] = useActiveNetworkVersion();
    const { data } = useBalancerPoolSwapFeeSnapshotQuery({
        variables: { startTimestamp: startTimestamp, endTimeStamp: endTimeStamp },
        context: {
            uri: activeNetwork.decentralicedClientUri,
        }
    });

    if (!data) {
        return [];
    }
    const { poolSnapshots } = data;
    return poolSnapshots;

}

export function useBalancerPoolData(poolId: string): PoolData | null {
    const pools = useBalancerPools();
    const pool = pools.find((pool) => pool.id === poolId);

    if (pool && pool.poolType === 'ComposableStable') {
        //remove Composable factory boosted token:
        pool.tokens = pool.tokens.filter((tokens) => tokens.balance < 2596140000000000)
    }

    return pool || null;
}

export function useBalancerPoolSingleData(poolId: string): PoolData | null {
    const [activeNetwork] = useActiveNetworkVersion();
    const [t24, t48, tWeek] = useDeltaTimestamps();
    const { blocks, error: blockError } = useBlocksFromTimestamps([t24, t48, tWeek]);
    const [block24, block48, blockWeek] = blocks ?? [];
    const [getPoolData, { data }] = useGetBalancerPoolLazyQuery();

    //const incentives = GetIncentiveList();
    //console.log("incentives", incentives['week_52']);

    useEffect(() => {
        if (block24) {
            //TODO: replace this once the graph has caught up
            getPoolData({
                variables: {
                    id: poolId,
                    block24: { number: parseInt(block24.number) }

                },
                context: {
                    uri: activeNetwork.decentralicedClientUri,
                }
            });
        }
    }, [block24]);

    if (!data) {
        return null;
    }

    const { pool, pool24 } = data;

    if (!pool || !pool24) {
        return null
    }


    // Sanitize pool metrics (hack data corruption fix)
    const sanitizedTvl = sanitizeScalarValue(parseFloat(pool.totalLiquidity), 0);
    const sanitizedTvl24 = sanitizeScalarValue(parseFloat(pool24.totalLiquidity), 0);
    const sanitizedVolume = sanitizeScalarValue(parseFloat(pool.totalSwapVolume), 0);
    const sanitizedVolume24 = sanitizeScalarValue(parseFloat(pool24.totalSwapVolume), 0);
    const sanitizedFees = sanitizeScalarValue(parseFloat(pool.totalSwapFee), 0);
    const sanitizedFees24 = sanitizeScalarValue(parseFloat(pool24.totalSwapFee), 0);

    const volumeDelta = sanitizedVolume - sanitizedVolume24;
    const feesDelta = sanitizedFees - sanitizedFees24;
    const tvlChange = sanitizedTvl24 !== 0 ? (sanitizedTvl - sanitizedTvl24) / sanitizedTvl24 : 0;
    const volumeChange = sanitizedVolume24 !== 0 ? volumeDelta / sanitizedVolume24 : 0;

    return {
        ...pool,
        name: pool.name || '',
        symbol: pool.symbol || '',
        feeTier: 1,
        swapFee: parseFloat(pool.swapFee),
        tokens: (pool.tokens || []).map((token) => {
            const weight = token.weight ? parseFloat(token.weight) : 0;
            const tokenPrice = 0
            const price = 0
            const balance = parseFloat(token.balance);
            return {
                ...token,
                decimals: token.decimals,
                derivedETH: 0,
                price,
                tvl: parseFloat(token.balance) * price,
                weight,
                balance,
            };
        }),
        liquidity: sanitizedTvl,
        sqrtPrice: 0,
        tick: 0,
        volumeUSD: sanitizeScalarValue(volumeDelta, 0),
        volumeUSDChange: sanitizeScalarValue(volumeChange, 0),
        //volumeUSDChange: 100 / poolData24.volume * poolData.volume,
        feesUSD: sanitizeScalarValue(feesDelta, 0),
        feesEpochUSD: 0,
        protocolFeesEpocUSD: 0,
        tvlUSD: sanitizedTvl,
        tvlUSDChange: sanitizeScalarValue(tvlChange, 0),
        //tvlUSDChange: 100 / poolData24.tvl * poolData.tvl,
        poolType: pool.poolType + "",
        amp: pool.amp ? pool.amp : '0',
        owner: pool.owner ? pool.owner : '',
        createTime: pool.createTime,
        holdersCount: parseInt(pool.holdersCount),
        factory: pool.factory ? pool.factory : '',
        totalShares: parseInt(pool.totalShares),

    };
}

export function useBalancerPoolsForToken(address: string) {
    const pools = useBalancerPools();

    return pools.filter((pool) => pool.tokens.find((token) => token.address === address));
}

export function useBalancerPoolPageData(poolId: string): {
    tvlData: BalancerChartDataItem[];
    volumeData: BalancerChartDataItem[];
    feesData: BalancerChartDataItem[];
    protocolFeesData: BalancerChartDataItem[];
    tokenDatas: { tokenAddress: string, coingeckoRawData: CoingeckoSnapshotPriceData }[];
} {
    const [activeNetwork] = useActiveNetworkVersion();
    const [coingeckoSnapshotData, setCoingeckoSnapshotData] = useState<{ tokenAddress: string, coingeckoRawData: CoingeckoSnapshotPriceData }[]>([]);
    const { data } = useGetPoolChartDataQuery({
        variables: { poolId, startTimestamp: activeNetwork.startTimeStamp },
        context: {
            uri: activeNetwork.decentralicedClientUri,
        },
    });

    useEffect(() => {
        //V2: repopulate formatted token data with coingecko data
        if (data && data.poolSnapshots && data.poolSnapshots.length > 1) {
            const fromTimestamp = data.poolSnapshots[0].timestamp;
            const toTimestamp = data.poolSnapshots[data.poolSnapshots.length - 1].timestamp;
            const getTokenSnapshotData = async (address: string, fromTimestamp: number, toTimestamp: number) => {
                const baseURI = 'https://api.coingecko.com/api/v3/coins/';
                const queryParams = activeNetwork.coingeckoId + '/contract/' + address +
                    '/market_chart/range?vs_currency=usd&from=' + fromTimestamp.toString() +
                    '&to=' + toTimestamp.toString() + '&x_cg_demo_api_key=' + CG_KEY;
                try {
                    const coingeckoResponse = await fetch(baseURI + queryParams);
                    const hit = coingeckoSnapshotData.find(el => el.tokenAddress === address);
                    if (hit === undefined) {
                        const json = await coingeckoResponse.json();
                        setCoingeckoSnapshotData(coingeckoSnapshotData => [
                            ...coingeckoSnapshotData,
                            {
                                tokenAddress: address,
                                coingeckoRawData: json,
                            }
                        ]);
                    }
                } catch {
                    console.log("Coingecko: market_chart API not reachable")
                }
            }
            if (data.poolSnapshots[0].pool.tokens) {
                data.poolSnapshots[0].pool.tokens.forEach(poolToken => {
                    getTokenSnapshotData(poolToken.address, fromTimestamp, toTimestamp);
                })
            }

        }
    }, [data]);


    if (!data || !coingeckoSnapshotData) {
        return { tvlData: [], volumeData: [], feesData: [], tokenDatas: [], protocolFeesData: []};
    }

    //console.log("coingeckoRawData", coingeckoSnapshotData)

    let { poolSnapshots } = data;

    //remove composable tokens from snapshots:
    //poolSnapshots = poolSnapshots.filter((el) => el.pool.tokens?.filter((token) => token.balance < 2596140000000000) );


    const tvlData = poolSnapshots.map((snapshot) => {
        let coingeckoValue = 0;
        if (coingeckoSnapshotData && coingeckoSnapshotData.length === poolSnapshots[0].pool.tokens?.length) {
            //Map token index from poolSnapshot to coingeckoRawData
            for (let i = 0; i <= coingeckoSnapshotData.length - 1; i++) {
                if (coingeckoSnapshotData[i].coingeckoRawData.prices) {
                    const snapshotTokenIndex = poolSnapshots[0].pool.tokens?.findIndex(s => s.address === coingeckoSnapshotData[i].tokenAddress);
                    //Range < 90d -> hourly rate -> approximate closest timestamp
                    let timestamp = snapshot.timestamp * 1000;
                    if (poolSnapshots.length < 90) {
                        const rawData = coingeckoSnapshotData[i].coingeckoRawData.prices;
                        if (rawData && rawData.length > 0) {
                            const match = rawData.reduce(function (prev, curr) {
                                return (Math.abs(curr[0] - timestamp) < Math.abs(prev[0] - timestamp) ? curr : prev);
                            });
                            if (match) {
                                timestamp = match[0];
                            }
                        }
                    }
                    const price = coingeckoSnapshotData[i].coingeckoRawData.prices.find(s => s[0] === timestamp);
                    if (price && snapshotTokenIndex !== null) {
                        const usdWorth = parseFloat(snapshot.amounts[snapshotTokenIndex]) * price[1];
                        //TODO: properly filter bb-a tokens
                        if (usdWorth < 1000000000) {
                            coingeckoValue = coingeckoValue + parseFloat(snapshot.amounts[snapshotTokenIndex]) * price[1];
                        }
                    }
                }
            }
        }
        return {
            value: coingeckoValue > 0 ? coingeckoValue : parseFloat(snapshot.swapVolume),
            time: unixToDate(snapshot.timestamp),
        }
    });

    const volumeData = poolSnapshots.map((snapshot, idx) => {
        const prevValue = idx === 0 ? 0 : parseFloat(poolSnapshots[idx - 1].swapVolume);
        const value = parseFloat(snapshot.swapVolume);

        return {
            value: value - prevValue > 0 ? value - prevValue : 0,
            time: unixToDate(snapshot.timestamp),
        };
    });

    const feesData = poolSnapshots.map((snapshot, idx) => {
        const prevValue = idx === 0 ? 0 : parseFloat(poolSnapshots[idx - 1].swapFees);
        const value = parseFloat(snapshot.swapFees);

        return {
            value: value - prevValue > 0 ? value - prevValue : 0,
            time: unixToDate(snapshot.timestamp),
        };
    });

    const protocolFeesData = poolSnapshots.map((snapshot, idx) => {
        const prevValue = idx === 0 ? 0 : parseFloat(poolSnapshots[idx - 1].protocolFee || '0');
        const value = parseFloat(snapshot.protocolFee || '0');

        return {
            value: value - prevValue > 0 ? value - prevValue : 0,
            time: unixToDate(snapshot.timestamp),
        };
    });

    const tokenDatas = coingeckoSnapshotData;

    // Sanitize chart data (hack data corruption fix)
    return {
        tvlData: sanitizeChartData(tvlData),
        volumeData: sanitizeChartData(volumeData),
        feesData: sanitizeChartData(feesData),
        protocolFeesData: sanitizeChartData(protocolFeesData),
        tokenDatas,
    };
}
