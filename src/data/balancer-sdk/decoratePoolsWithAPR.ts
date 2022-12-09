import { BalancerSDK } from '@balancer-labs/sdk';
import { ALCHEMY_URL } from "../balancer/constants";
import { PoolData } from '../balancer/balancerTypes';

export async function decoratePoolsWithAPR({
  poolDatas
}: {
  poolDatas?: PoolData[]
}) {

    const sdk = new BalancerSDK({
        network: 1,
        rpcUrl: `${ALCHEMY_URL}`,
      });
      
    const { pools } = sdk;

    console.log("pools", pools)

    const main = async () => {
      const pool = await pools.find('');
    
      if (pool) {
        const apr = await pools.apr(pool);
        console.log(pool.id, apr);
      }
    };
      main();
}