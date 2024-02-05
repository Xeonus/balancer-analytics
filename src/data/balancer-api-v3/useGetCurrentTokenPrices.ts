import {
    GqlChain,
    useGetDynamicTokenPricesQuery, useTokenGetCurrentPricesQuery,
} from "../../apollo/generated/graphql-codegen-generated";
import {balancerV3APIClient} from "../../apollo/client";

export default function useGetCurrentTokenPrices(chainInIds: GqlChain[]) {
    const {data, loading, error} = useTokenGetCurrentPricesQuery({
        client: balancerV3APIClient,
        variables: {
            chains: chainInIds
        }
    });


    console.log("Mapped token prices data", data?.tokenGetCurrentPrices);

    return {
        loading,
        error,
        data: data?.tokenGetCurrentPrices, // Return the mapped data
    };
}