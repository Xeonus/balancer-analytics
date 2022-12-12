import { BalancerSDK } from '@balancer-labs/sdk';
import { ALCHEMY_URL } from "../balancer/constants";
import { PoolData } from '../balancer/balancerTypes';
import { YIELD_BEARING_TOKENS } from '../../constants';

export async function decoratePoolsWithTokenAPRs(
  poolDatas : PoolData[]
) {

    const sdk = new BalancerSDK({
        network: 1,
        rpcUrl: `${ALCHEMY_URL}`,
      });
      
    const { pools } = sdk;

    const list = (
      await pools.where(
        (pool) =>
          pool.poolType != 'Element' &&
          pool.poolType != 'AaveLinear' &&
          pool.poolType != 'LiquidityBootstrapping' &&
          pool.tokenAddresses ? pool.tokenAddresses?.some(element => YIELD_BEARING_TOKENS.includes(element)) : false
      )
    ).sort((a, b) => parseFloat(b.totalLiquidity) - parseFloat(a.totalLiquidity))

    console.log("list",)
    list.forEach(async (pool) => {
      try {
        const hit = poolDatas.find((el) => el.id === pool.id)
        if (hit && poolDatas.indexOf(hit)) {
          poolDatas[poolDatas.indexOf(hit)].aprSet = await pools.apr(pool);
          poolDatas[poolDatas.indexOf(hit)].tokens.map(token => {
            const target = pool.tokens.find(t => t.address === token.address)
            token.price = target?.token?.latestUSDPrice ? Number(target?.token?.latestUSDPrice) : 0
          })
          console.log("hit found and decorated", poolDatas[poolDatas.indexOf(hit)])
        }
      } catch (e) {
        console.log(e);
      }
    });
}
