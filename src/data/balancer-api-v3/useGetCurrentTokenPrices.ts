import {
    GqlChain,
    useTokenGetCurrentPricesQuery,
} from "../../apollo/generated/graphql-codegen-generated";
import {balancerV3APIClient} from "../../apollo/client";

export default function useGetCurrentTokenPrices(chainInIds: GqlChain[]) {
    const {data, loading, error} = useTokenGetCurrentPricesQuery({
        client: balancerV3APIClient,
        variables: {
            chains: chainInIds
        }
    });

    return {
        loading,
        error,
        data: data?.tokenGetCurrentPrices,
    };
}
