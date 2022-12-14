import { useState, useEffect } from 'react';
import { BalancerSDK, PoolWithMethods } from '@balancer-labs/sdk';
import { PoolData } from '../balancer/balancerTypes';
import { useActiveNetworkVersion } from '../../state/application/hooks';


export default function useDecoratePools(
    poolDatas: PoolData[]
) {
    const [loadPools, setLoadPools] = useState(Boolean);
    const [loadAprs, setLoadAprs] = useState(Boolean);
    const [sdkPool, setSdkPool] = useState<PoolWithMethods[]>()
    const [finalPool, setFinalPool] = useState<PoolWithMethods[]>()
    const [decoratedPools, setDecoratedPools] = useState<PoolData[]>()
    const [activeNetwork] = useActiveNetworkVersion()

    //Init SDK
    const sdk = new BalancerSDK({
        network: Number(activeNetwork.chainId),
        rpcUrl: activeNetwork.alchemyRPCUrl,
    });

    const { pools } = sdk;

    const fetchPools = async () => {
        const sdkPoolList = (
            await pools.where(
                (pool) =>
                    (activeNetwork.chainId === '137' ? true : pool.poolType != 'Element') &&
                    (activeNetwork.chainId === '137' ? true : pool.poolType != 'AaveLinear') &&
                    (activeNetwork.chainId === '137' ? true :  pool.poolType != 'LiquidityBootstrapping' ) &&
                    poolDatas.find(p => p.address === pool.address) !== null
            )
        ).sort((a, b) => parseFloat(b.totalLiquidity) - parseFloat(a.totalLiquidity))

        const poolList = await Promise.all(sdkPoolList)
        //console.log("fetchPools:", poolList)
        return poolList
    }

    const fetchAprData = async (poolList: PoolWithMethods[] | undefined) => {
        let decoratedPools: PoolWithMethods[];
        decoratedPools = []
        if (poolList) {
            const promises = poolList.map(async sdkPool => {
                try {
                    sdkPool.apr = await pools.apr(sdkPool);
                    decoratedPools.push(sdkPool);
                    return sdkPool;
                } catch (e) {
                    console.log(e);
                }
            });
            const finalPools = await Promise.all(promises)
            finalPools.map(pool => pool ? decoratedPools.push(pool) : null)
            //console.log("fetchAprData", decoratedPools)
            return decoratedPools
        }
    }

    //Load Pools
    const runLoadPools = async () => {
        const poolData = await fetchPools();
        //console.log('runLoadPools');
        setLoadPools(true);
        setSdkPool(poolData)
    };

    //Decorate with APRs
    const runLoadAprs = async () => {
        const pools = await fetchAprData(sdkPool);
        if (pools) {
            setFinalPool(pools)
            //console.log("runLoadAprs", pools)
        }
        setLoadAprs(true);
    };

    //Trigger chained execution
    useEffect(() => {
        runLoadPools();
        setLoadPools(true)
    }, []);

    useEffect(() => {
        //if (loadPools) {
            runLoadAprs();
            setLoadAprs(true);
        //}
    }, [loadPools, sdkPool]);

    //Decorate pool data
    useEffect(() => {
        if (loadAprs && loadPools) {
        console.log("decorated pools", finalPool)
        poolDatas.forEach((pool) => {
            if (pool && finalPool) {
                const hit = finalPool.find((el) => el?.id === pool.id)
                if (hit && finalPool.indexOf(hit)) {
                    pool.aprSet = hit.apr;
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
    }, [finalPool]);

    if (decoratedPools) {
        return decoratedPools
    }
}