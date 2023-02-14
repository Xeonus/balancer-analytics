import { useState, useEffect } from 'react';
import { BalancerSDK, PoolWithMethods } from '@balancer-labs/sdk';
import { PoolData } from '../balancer/balancerTypes';
import { useActiveNetworkVersion } from '../../state/application/hooks';

interface EmissionData {
    poolId: string,
    weeklyBAL: number,
}

export default function useDecoratePools(
    poolDatas: PoolData[] | undefined,
    balPrice?: number
) {
    const [loadPools, setLoadPools] = useState(Boolean);
    const [loadAprs, setLoadAprs] = useState(Boolean);
    const [sdkPool, setSdkPool] = useState<PoolWithMethods[]>()
    const [finalPool, setFinalPool] = useState<PoolWithMethods[]>()
    const [decoratedPools, setDecoratedPools] = useState<PoolData[]>()
    const [activeNetwork] = useActiveNetworkVersion()

    //emissions array
    const [weeklyArray, setWeeklyArray] = useState<EmissionData[]>();

    //Init SDK
    const sdk = new BalancerSDK({
        network: Number(activeNetwork.chainId),
        rpcUrl: activeNetwork.alchemyRPCUrl,
    });

    const { pools } = sdk;
    const poolIds = poolDatas?.map(p => p.id, '');

    //TODO: remove / refactor chain logic
    const fetchPools = async () => {
        const sdkPoolList = (
            await pools.where(
                (pool) =>
                    (activeNetwork.chainId === '137' ? true : pool.poolType !== 'Element') &&
                    (activeNetwork.chainId === '137' ? true : pool.poolType !== 'AaveLinear') &&
                    (activeNetwork.chainId === '137' ? true :  pool.poolType !== 'LiquidityBootstrapping' ) &&
                    poolIds ? poolIds?.includes(pool.id) : false
            )
        ).sort((a, b) => parseFloat(b.totalLiquidity) - parseFloat(a.totalLiquidity))
        const poolList = await Promise.all(sdkPoolList)
        //console.log("sdk poolList:", poolList)
        return poolList
    }

    const fetchAprData = async (poolList: PoolWithMethods[] | undefined) => {
        let decoratedPools: PoolWithMethods[] = [];
        let balArray : EmissionData[] = [];
        if (poolList) {
            const promises = poolList.map(async sdkPool => {
                try {
                    sdkPool.apr = await pools.apr(sdkPool);
                    if (pools.emissionsService) {
                        const emission =  await pools.emissionsService.weekly(sdkPool.id)
                        //console.log("weekly emission for pool, " + sdkPool.id + " is ", emission)
                        balArray.push(
                            {
                                poolId: sdkPool.id,
                                weeklyBAL: emission,
                            }
                        )
                    }
                    decoratedPools.push(sdkPool);
                    return sdkPool;
                } catch (e) {
                    console.log(e);
                }
            });
            const finalPools = await Promise.all(promises)
            finalPools.map(pool => pool ? decoratedPools.push(pool) : null)
            //console.log("fetchAprData", decoratedPools)
            return {
                decoratedPools, 
                balArray,
            }
        }
        return {
            decoratedPools, 
            balArray,
        }
    }

    //fetching Method for weekly emissions per pool
    //1. take pools object, call weeklyEmissionsservice on PoolID, can also be done separately
    //pools.emissionsService(poolId)

    //Load Pools
    const runLoadPools = async () => {
        const poolData = await fetchPools();
        //console.log('runLoadPools');
        setLoadPools(true);
        setSdkPool(poolData)
    };

    //Decorate with APRs
    const runLoadAprs = async () => {
        const {decoratedPools, balArray} = await fetchAprData(sdkPool);
        if (decoratedPools.length > 0 && balArray.length > 0) {
            setFinalPool(decoratedPools);
            setWeeklyArray(balArray);
            //console.log("balArray loaded", balArray)
        }
        setLoadAprs(true);
    };

    //Trigger chained execution
    useEffect(() => {
        if (poolDatas && poolDatas?.length > 1) {
            //console.log("trigger useeffect")
        runLoadPools();
        setLoadPools(true)
        }
    }, [poolDatas?.length]);

    useEffect(() => {
        //if (loadPools) {
            runLoadAprs();
            setLoadAprs(true);
        //}
    }, [loadPools, sdkPool]);

    //Decorate pool data
    useEffect(() => {
        if (loadAprs && loadPools && poolDatas) {
        //console.log("decorated pools", finalPool)
        poolDatas.forEach((pool) => {
            if (pool && finalPool && weeklyArray) {
                const hit = finalPool.find((el) => el?.id === pool.id)
                const emissionHit = weeklyArray.find((el) => el?.poolId === pool.id)
                if (hit && finalPool.indexOf(hit)) {
                    pool.aprSet = hit.apr;
                    pool.balEmissions = balPrice && emissionHit ? emissionHit?.weeklyBAL * balPrice : emissionHit?.weeklyBAL;
                    pool.tokens.map(token => {
                        const target = hit.tokens.find(t => t.address === token.address)
                        token.price = target?.token?.latestUSDPrice ? Number(target?.token?.latestUSDPrice) : 0
                    })
                }
            }
        }
        )
            setDecoratedPools(poolDatas);
            //console.log("FINAL decorated pool", decoratedPools)
            console.log("Balancer SDK: successful pool data enrichment")
        }
    }, [finalPool, balPrice]);

    if (decoratedPools) {
        return decoratedPools
    }
}