import { useState, useEffect } from 'react';
import { BalancerSDK } from '@balancer-labs/sdk';
import { ALCHEMY_URL } from "../balancer/constants";
import { PoolData, AprSet } from '../balancer/balancerTypes';
import { YIELD_BEARING_TOKENS } from '../../constants';
import { useActiveNetworkVersion } from '../../state/application/hooks';

export async function useDecoratePoolStats(
  poolDatas: PoolData[]
) {

  const [decoratedPools, setDecoratedPools] = useState<PoolData[]>()
  const [activeNetwork] = useActiveNetworkVersion()
  const sdk = new BalancerSDK({
    network: Number(activeNetwork.chainId),
    rpcUrl: activeNetwork.chainId === '1' ? `${ALCHEMY_URL}` : `${ALCHEMY_URL?.replace('eth-mainnet', 'polygon-mainnet.g')}`,
  });

  const { pools } = sdk;

  useEffect(() => {
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

      console.log("poolList", poolList)

      const fetchData = async () => {
        const promises = poolList.map(async sdkPool => {
          try {
            const hit = poolDatas.find((el) => el.id === sdkPool.id)
            if (hit && poolDatas.indexOf(hit)) {
              sdkPool.apr = await pools.apr(sdkPool);
              return sdkPool;
            }
          } catch (e) {
            console.log(e);
          }
        });
        const finalPools = await Promise.all(promises)


        console.log("finalpools", finalPools)

        poolDatas.forEach((pool) => {
          if (pool) {
            const hit = finalPools.find((el) => el?.id === pool.id)
            if (hit && finalPools.indexOf(hit)) {
              pool.aprSet = hit.apr;
              pool.tokens.map(token => {
                const target = hit.tokens.find(t => t.address === token.address)
                token.price = target?.token?.latestUSDPrice ? Number(target?.token?.latestUSDPrice) : 0
              })
            }
          }
        }
        )
        //console.log("decorated", poolDatas)
        setDecoratedPools(poolDatas)
      }
      fetchData();
    }
    fetchPools();
  }, []);

  console.log("final decorated", decoratedPools)

  return decoratedPools
}
