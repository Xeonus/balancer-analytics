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

function getPoolValues(
    poolId: string,
    pools: BalancerPoolFragment[],
    poolSwapFeeSnapshots?: BalancerPoolSnapshotFragment[],
): { tvl: number; volume: number; swapCount: number; fees: number, feesEpoch: number, poolType: string | null | undefined } {
    const pool = pools.find((pool) => poolId === pool.id);
    let epochFees = 0;
    if (poolSwapFeeSnapshots) {
        const feeData = getEpochSwapFees(poolId, Math.floor(today.getTime() / 1000), Math.floor(prevThuDate.getTime() / 1000), poolSwapFeeSnapshots);
        epochFees = feeData.swapFee;
    }

    if (!pool || pool.poolType === 'AaveLinear') {
        return { tvl: 0, volume: 0, swapCount: 0, fees: 0, feesEpoch: 0, poolType: '' };
    }

    //console.log("pool", pool);

    return {
        tvl: parseFloat(pool.totalLiquidity),
        volume: parseFloat(pool.totalSwapVolume),
        fees: parseFloat(pool.totalSwapFee),
        feesEpoch: epochFees,
        swapCount: parseFloat(pool.swapsCount),
        poolType: pool.poolType,
    };
}

function getEpochSwapFees(
    poolId: string,
    startTimeStamp: number,
    endTimeStamp: number,
    poolSnapshots: BalancerPoolSnapshotFragment[],
): { swapFee: number } {
    let snapshotFee = 0;
    let startFee = 0;
    let endFee = 0;
    poolSnapshots.forEach((pool) => {
        if (pool.pool.id === poolId) {
            if (pool.timestamp === endTimeStamp) {
                endFee = Number(pool.swapFees);
            }
            if (pool.timestamp === startTimeStamp) {
                startFee = Number(pool.swapFees);
            }
        }

    })
    if (endFee === 0 || startFee === 0) {
        snapshotFee = 0;
    } else {
        snapshotFee = startFee - endFee;
    }
    return { swapFee: snapshotFee };
}


//Poolsnapshots are taken OO:OO UTC. Generate previous snapshot date and previous Thu. Used to calculate weekly sweep fee generators
const target = 3 // Wednesday
const prevThuDate = new Date()
prevThuDate.setDate(prevThuDate.getDate() - (prevThuDate.getDay() == target ? 7 : (prevThuDate.getDay() + (7 - target)) % 7));
prevThuDate.setUTCHours(0, 0, 0, 0);
const today = new Date();
today.setUTCHours(0, 0, 0, 0);

export function useBalancerPools(first = 250): PoolData[] {
    const [activeNetwork] = useActiveNetworkVersion();
    const [t24, t48, tWeek] = useDeltaTimestamps();
    const { blocks, error: blockError } = useBlocksFromTimestamps([t24, t48, tWeek]);
    const [block24, block48, blockWeek] = blocks ?? [];
    const [getPoolData, { data }] = useGetPoolDataLazyQuery();
    const feeData = useBalancerSwapFeePoolData();

    //const incentives = GetIncentiveList();
    //console.log("incentives", incentives['week_52']);

    useEffect(() => {
        if (block24) {
            //TODO: replace this once the graph has caught up
            getPoolData({
                variables: {
                    block24: { number: parseInt(block24.number) },
                    first: first,
                },
                context: {
                    uri: activeNetwork.clientUri,
                }
            });
        }
    }, [block24, first]);

    if (!data) {
        return [];
    }

    const { pools, pools24 } = data;

    return pools.map((pool) => {
        const poolData = getPoolValues(pool.id, pools, feeData);
        const poolData24 = getPoolValues(pool.id, pools24);

        //TODO: token price information is not stored in PoolData Object model anymore -> remove

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
            liquidity: poolData.tvl,
            sqrtPrice: 0,
            tick: 0,
            volumeUSD: poolData.volume - poolData24.volume,
            volumeUSDChange:
                (poolData.volume - poolData24.volume) / poolData24.volume,
            //volumeUSDChange: 100 / poolData24.volume * poolData.volume,
            feesUSD: poolData.fees - poolData24.fees,
            feesEpochUSD: poolData.feesEpoch,
            tvlUSD: poolData.tvl,
            tvlUSDChange: (poolData.tvl - poolData24.tvl) / poolData24.tvl,
            //tvlUSDChange: 100 / poolData24.tvl * poolData.tvl,
            poolType: poolData.poolType + "",
            amp: pool.amp ? pool.amp : '0',
            owner: pool.owner ? pool.owner : '',
            createTime: pool.createTime,
            holdersCount: parseInt(pool.holdersCount),
            factory: pool.factory ? pool.factory : '',
        };
    });
}

export function useBalancerSwapFeePoolData() {
    const [activeNetwork] = useActiveNetworkVersion();
    const { data } = useBalancerPoolSwapFeeSnapshotQuery({
        variables: { startTimestamp: Math.floor(today.getTime() / 1000), endTimeStamp: Math.floor(prevThuDate.getTime() / 1000) },
        context: {
            uri: activeNetwork.clientUri,
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

export function useBalancerPoolSingleData(poolId: string): PoolData | null  {
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
                    uri: activeNetwork.clientUri,
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

    console.log("amp", pool.amp)

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
        liquidity: parseFloat(pool.totalLiquidity),
        sqrtPrice: 0,
        tick: 0,
        volumeUSD: parseFloat(pool.totalSwapVolume) - parseFloat(pool24.totalSwapVolume),
        volumeUSDChange:
            (parseFloat(pool.totalSwapVolume) - parseFloat(pool24.totalSwapVolume)) / parseFloat(pool24.totalSwapVolume),
        //volumeUSDChange: 100 / poolData24.volume * poolData.volume,
        feesUSD: parseFloat(pool.totalSwapFee) - parseFloat(pool24.totalSwapFee),
        feesEpochUSD: 0,
        tvlUSD: parseFloat(pool.totalLiquidity),
        tvlUSDChange: (parseFloat(pool.totalLiquidity) - parseFloat(pool24.totalLiquidity)) / parseFloat(pool24.totalLiquidity),
        //tvlUSDChange: 100 / poolData24.tvl * poolData.tvl,
        poolType: pool.poolType + "",
        amp: pool.amp ? pool.amp : '0',
        owner: pool.owner ? pool.owner : '',
        createTime: pool.createTime,
        holdersCount: parseInt(pool.holdersCount),
        factory: pool.factory ? pool.factory : '',

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
    tokenDatas: { tokenAddress: string, coingeckoRawData: CoingeckoSnapshotPriceData }[];
} {
    const [activeNetwork] = useActiveNetworkVersion();
    const [coingeckoSnapshotData, setCoingeckoSnapshotData] = useState<{ tokenAddress: string, coingeckoRawData: CoingeckoSnapshotPriceData }[]>([]);
    const { data } = useGetPoolChartDataQuery({
        variables: { poolId, startTimestamp: activeNetwork.startTimeStamp },
        context: {
            uri: activeNetwork.clientUri,
        },
    });

    useEffect(() => {
        //V2: repopulate formatted token data with coingecko data
        if (data && data.poolSnapshots && data.poolSnapshots.length > 1) {
            const fromTimestamp = data.poolSnapshots[0].timestamp;
            const toTimestamp = data.poolSnapshots[data.poolSnapshots.length - 1].timestamp;
            const getTokenSnapshotData = async (address: string, fromTimestamp: number, toTimestamp: number) => {
                const baseURI = 'https://api.coingecko.com/api/v3/coins/';
                const queryParams = activeNetwork.coingeckoId + '/contract/' + address + '/market_chart/range?vs_currency=usd&from=' + fromTimestamp.toString() + '&to=' + toTimestamp.toString();
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
        return { tvlData: [], volumeData: [], feesData: [], tokenDatas: [] };
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

    const tokenDatas = coingeckoSnapshotData;

    return {
        tvlData,
        volumeData,
        feesData,
        tokenDatas,
    };
}
