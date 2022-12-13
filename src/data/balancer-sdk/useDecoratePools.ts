import { useState, useEffect } from 'react';
import { BalancerSDK, PoolWithMethods } from '@balancer-labs/sdk';
import { ALCHEMY_URL } from "../balancer/constants";
import { PoolData } from '../balancer/balancerTypes';
import { YIELD_BEARING_TOKENS } from '../../constants';
import { useActiveNetworkVersion } from '../../state/application/hooks';


export default function useDecoratePools(
    poolDatas: PoolData[]
) {


    const [loadPools, setLoadPools] = useState(Boolean);
    const [loadAprs, setLoadAprs] = useState(Boolean);
    const [loadAll, setLoadAll] = useState(Boolean);
    const [sdkPool, setSdkPool] = useState<PoolWithMethods[]>()
    const [finalPool, setFinalPool] = useState<PoolWithMethods[]>()
    const [decoratedPools, setDecoratedPools] = useState<PoolData[]>()
    const [activeNetwork] = useActiveNetworkVersion()

    //Init SDK
    const sdk = new BalancerSDK({
        network: Number(activeNetwork.chainId),
        rpcUrl: activeNetwork.chainId === '1' ? `${ALCHEMY_URL}` : `${ALCHEMY_URL?.replace('eth-mainnet', 'polygon-mainnet.g')}`,
    });

    const { pools } = sdk;

    const fetchPools = async () => {
        const sdkPoolList = (
            await pools.where(
                (pool) =>
                    pool.poolType != 'Element' &&
                        pool.poolType != 'AaveLinear' &&
                        pool.poolType != 'LiquidityBootstrapping' &&
                        pool.tokenAddresses ? pool.tokenAddresses?.some(element => YIELD_BEARING_TOKENS.includes(element)) : false
            )
        ).sort((a, b) => parseFloat(b.totalLiquidity) - parseFloat(a.totalLiquidity))

        const poolList = await Promise.all(sdkPoolList)
        console.log("poolList loaded:", poolList)
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
            console.log("finalpools", decoratedPools)
            return decoratedPools
        }
    }

    //Load Pools
    const runLoadPools = async () => {
        const poolData = await fetchPools();
        console.log('runLoadPools');
        setLoadPools(true); //Something that is not null
        setSdkPool(poolData)
    };

    //Decorate with APRs
    const runLoadAprs = async () => {
        const pools = await fetchAprData(sdkPool);
        if (pools) {
            setFinalPool(pools)
            console.log("final decorated sdk pools", pools)
        }
        setLoadAprs(true); //Something that is not null
    };

    //Trigger chained execution
    useEffect(() => {
        runLoadPools();
        setLoadPools(true)
    }, []);

    useEffect(() => {
        if (loadPools) {
            runLoadAprs();
            setLoadAprs(true); //Something that is not null
        }
    }, [loadPools]);



    //Decorate pool data
    useEffect(() => {
        console.log("finalPool passed", finalPool)
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
        if (loadAprs && loadPools) {
            setDecoratedPools(poolDatas);
            console.log("FINAL decorated pool", decoratedPools)
        }
    }, [finalPool]);

    if (decoratedPools) {
        return decoratedPools
    }
}