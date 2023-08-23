
import {createGauge} from "./gaugeMappers";
import {balancerV3APIClient} from "../../apollo/client";
import {useGetAllPoolsQuery} from "../../apollo/generated/graphql-codegen-generated";
import {GlobalAPRStats, PoolDataUnified, PoolTokenDataUnified} from "./balancerUnifiedTypes";

export default function useGetBalancerV3StakingGauges() : PoolDataUnified[] | undefined {
    const { data, loading, error } = useGetAllPoolsQuery(
        {
            client: balancerV3APIClient,

        }
    );

    if (loading) return [];
    if (error) {
        console.error("Error fetching gauges:", error);
        return [];
    }

    if (data && data.poolGetPools.length > 0) {
        const { poolGetPools  } = data;

        /*return poolGetPools.map((pool) => {
            return {
                ...pool,
                    //Basic Info
                    chain: pool.chain,
                    poolId: pool.dynamicData.poolId,
                    address: pool.address,
                    name: pool.name,
                    poolType: pool.type,
                    symbol: pool.symbol,
                    tokens: (pool.allTokens || []).map((token) => {
                        const weight = token.weight ? parseFloat(token.weight) : 0;
                        const price = 0
                        const balance = parseFloat(token.balance);

                        return {
                            ...token,
                            address: string;
                            decimals: number;
                            id: string;
                            isMainToken: boolean;
                            name: string;
                            symbol: string;
                            weight: string;
                        };
                    }),
                    //Dynamic Data
                    swapFee: pool.dynamicData.swapFee,
                    totalShares: pool.dynamicData.totalShares,
                    volume24h: pool.dynamicData.volume24h,
                    yieldCapture24h: pool.dynamicData.yieldCapture24h,
                    totalLiquidity: pool.dynamicData.totalLiquidity,
                    globalAPRStats: GlobalAPRStats;
            }
        })*/
    }

}
