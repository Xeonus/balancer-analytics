import { GqlChain, useGetDynamicTokenPricesQuery } from "../../apollo/generated/graphql-codegen-generated";
import { balancerV3APIClient } from "../../apollo/client";
import useGetCurrentTokenPrices from "./useGetCurrentTokenPrices";

export interface TokenPriceWithChange {
    price: number;
    priceChange24h: number;
}

export default function useGetTokenPriceWithChange(
    address: string,
    chain: GqlChain = "MAINNET",
): TokenPriceWithChange | undefined {
    const { data: currentPrices } = useGetCurrentTokenPrices([chain]);
    const { data: dynamicData } = useGetDynamicTokenPricesQuery({
        client: balancerV3APIClient,
        variables: {
            addresses: [address],
            chain: chain,
        },
    });

    const basePrice = currentPrices?.find(
        t => t.address.toLowerCase() === address.toLowerCase()
    );

    if (!basePrice) return undefined;

    const dynamicToken = dynamicData?.tokenGetTokensDynamicData?.find(
        d => d.tokenAddress.toLowerCase() === address.toLowerCase()
    );

    const absoluteChange = dynamicToken?.priceChange24h ?? 0;
    const price24hAgo = basePrice.price - absoluteChange;
    const priceChangePercent = price24hAgo !== 0
        ? (absoluteChange / price24hAgo) * 100
        : 0;

    return {
        price: basePrice.price,
        priceChange24h: priceChangePercent,
    };
}
