import {GqlChain, useGetAllPoolsQuery} from "../../apollo/generated/graphql-codegen-generated";
import { PoolDataUnified } from "./balancerUnifiedTypes";
import { balancerV3APIClient } from "../../apollo/client";

export default function useGetAllPools(chainInIds: GqlChain[], poolInIDs: string[]): PoolDataUnified[] | undefined {
    const { data, loading, error } = useGetAllPoolsQuery(
        {
            client: balancerV3APIClient,
            variables: {
                chainIn: chainInIds,
                idIn: poolInIDs,
            }
        }
    );

    if (error) {
        console.error("Error fetching gauges:", error);
        return undefined; // Return undefined in case of loading or error
    }

    if (data && data.poolGetPools.length > 0) {
        return data.poolGetPools.map((pool) => {
            const nativeRewardApr = pool.dynamicData.apr.nativeRewardApr;
            const thirdPartyApr = pool.dynamicData.apr.thirdPartyApr;

            let nativeRewardAPRs;
            if (nativeRewardApr.__typename === "GqlPoolAprTotal") {
                nativeRewardAPRs = {
                    min: parseFloat(nativeRewardApr.total),
                    max: parseFloat(nativeRewardApr.total),
                };
            } else {
                nativeRewardAPRs = {
                    min: parseFloat(nativeRewardApr.min),
                    max: parseFloat(nativeRewardApr.max),
                };
            }

            let thirdPartyAPR = 0;
            if (thirdPartyApr.__typename === "GqlPoolAprTotal") {
                thirdPartyAPR = parseFloat(thirdPartyApr.total);
            }

            return {
                chain: pool.chain,
                poolId: pool.dynamicData.poolId,
                address: pool.address,
                name: pool.name,
                poolType: pool.type,
                symbol: pool.symbol,
                tokens: pool.allTokens.map((token) => ({
                    address: token.address,
                    decimals: token.decimals,
                    id: token.id,
                    isMainToken: token.isMainToken,
                    name: token.name,
                    symbol: token.symbol,
                    weight: parseFloat(token.weight || '0'),
                })),
                swapFee: parseFloat(pool.dynamicData.swapFee),
                totalShares: parseFloat(pool.dynamicData.totalShares),
                volume24h: parseFloat(pool.dynamicData.volume24h),
                fees24h: parseFloat(pool.dynamicData.fees24h),
                yieldCapture24h: parseFloat(pool.dynamicData.yieldCapture24h),
                totalLiquidity: parseFloat(pool.dynamicData.totalLiquidity),
                globalAPRStats: {
                    hasRewardAPR: pool.dynamicData.apr.hasRewardApr,
                    nativeRewardAPRs: nativeRewardAPRs,
                    nativeTotalRewardAPR: nativeRewardAPRs.max,
                    thirdPartyAPR: thirdPartyAPR,
                    swapAPR: parseFloat(pool.dynamicData.apr.swapApr),
                },
            };
        });
    }

    return []; // Return an empty array if there's no data
}
