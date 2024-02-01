import {
    useGetDynamicTokenPricesQuery,
} from "../../apollo/generated/graphql-codegen-generated";
import {balancerV3APIClient} from "../../apollo/client";
import {TokenPrices} from "./balancerUnifiedTypes"

export default function useGetSimpleTokenPrices(addresses: string[]) {
    const {data, loading, error} = useGetDynamicTokenPricesQuery({
        client: balancerV3APIClient,
        variables: {
            addresses: addresses
        }
    });
    // Transform the array of token data into an object indexed by tokenAddress
    const tokenPrices: TokenPrices = data?.tokenGetTokensDynamicData.reduce((acc, tokenData) => {
        const { tokenAddress, price, priceChange24h } = tokenData;
        acc[tokenAddress] = { price, priceChange24h };
        return acc;
    }, {} as TokenPrices) ?? {}

    console.log("tokenData", tokenPrices)
    return {
        loading,
        error,
        data: tokenPrices, // Return the mapped data
    };
}