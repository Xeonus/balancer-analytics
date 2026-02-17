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
        return undefined;
    }

    if (data && data.poolGetPools.length > 0) {
        return data.poolGetPools.map((pool) => {
            const aprItems = pool.dynamicData.aprItems;

            // Native reward types: VEBAL_EMISSIONS, STAKING, STAKING_BOOST, MABEETS_EMISSIONS
            const nativeRewardTypes = ['VEBAL_EMISSIONS', 'STAKING', 'STAKING_BOOST', 'MABEETS_EMISSIONS'];
            const nativeRewardItems = aprItems.filter(item => nativeRewardTypes.includes(item.type));
            const totalNativeRewardApr = nativeRewardItems.reduce((sum, item) => sum + item.apr, 0);

            // Third party reward types: AURA, MERKL
            const thirdPartyTypes = ['AURA', 'MERKL'];
            const thirdPartyItems = aprItems.filter(item => thirdPartyTypes.includes(item.type));
            const thirdPartyAPR = thirdPartyItems.reduce((sum, item) => sum + item.apr, 0);

            // Swap fee APR
            const swapFeeTypes = ['SWAP_FEE', 'SWAP_FEE_24H', 'SWAP_FEE_7D', 'SWAP_FEE_30D', 'DYNAMIC_SWAP_FEE_24H'];
            const swapItems = aprItems.filter(item => swapFeeTypes.includes(item.type));
            const swapAPR = swapItems.reduce((sum, item) => sum + item.apr, 0);

            const hasRewardAPR = nativeRewardItems.length > 0 || thirdPartyItems.length > 0;

            return {
                chain: pool.chain,
                poolId: pool.dynamicData.poolId,
                address: pool.address,
                name: pool.name,
                poolType: pool.type,
                symbol: pool.symbol,
                tokens: pool.poolTokens.map((token) => ({
                    address: token.address,
                    decimals: token.decimals,
                    id: token.id,
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
                    hasRewardAPR: hasRewardAPR,
                    nativeRewardAPRs: {
                        min: totalNativeRewardApr,
                        max: totalNativeRewardApr,
                    },
                    nativeTotalRewardAPR: totalNativeRewardApr,
                    thirdPartyAPR: thirdPartyAPR,
                    swapAPR: swapAPR,
                },
            };
        });
    }

    return [];
}
