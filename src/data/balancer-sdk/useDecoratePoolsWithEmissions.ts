import { useState } from 'react';
import { BalancerSDK, balEmissions } from '@balancer-labs/sdk';
import { PoolData } from '../balancer/balancerTypes';
import { useActiveNetworkVersion } from '../../state/application/hooks';

export async function useDecoratePoolsWithEmissions(poolDatas: PoolData[] | undefined) {

    const [decoratedPools, setDecoratedPools] = useState<PoolData[]>()
    const [activeNetwork] = useActiveNetworkVersion()

    //Init SDK
    const sdk = new BalancerSDK({
        network: Number(activeNetwork.chainId),
        rpcUrl: activeNetwork.alchemyRPCUrl,
    });

    const { data } = sdk;

    const now = Math.round(new Date().getTime() / 1000)
    const totalBalEmissions = balEmissions.between(now, now + 365 * 86400)
    const weeklyEmissions = balEmissions.weekly(now)
    console.log("totalBalEmissions", totalBalEmissions)
    console.log("balEmissions weekly", weeklyEmissions)

    //fetch gauges for pools

}