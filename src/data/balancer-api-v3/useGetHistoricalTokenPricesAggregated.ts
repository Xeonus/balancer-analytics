import { useState, useEffect } from 'react';
import { GqlChain, useGetTokenSetHistoricalPricesQuery } from "../../apollo/generated/graphql-codegen-generated";
import { unixToDate } from "../../utils/date";
import {balancerV3APIClient} from "../../apollo/client";

// Token price data with timestamp
export interface TokenPriceData {
    [tokenAddress: string]: {
        [timestamp: string]: number;  // timestamp -> price mapping
    };
}

export const useGetHistoricalTokenPricesAggregated = (
    tokenAddresses: string[],
    timestamps: number[]
) => {
    const [aggregatedPriceData, setAggregatedPriceData] = useState<TokenPriceData>({});

    // Normalize addresses to lowercase
    const normalizedAddresses = tokenAddresses.map(addr => addr.toLowerCase());

    // Skip the query if we don't have addresses
    const { data, loading, error } = useGetTokenSetHistoricalPricesQuery({
        client: balancerV3APIClient,
        variables: {
            addresses: normalizedAddresses,
            chain: "MAINNET" as GqlChain,
            range: "ONE_YEAR",
        },
        skip: !normalizedAddresses.length,
    });

    useEffect(() => {
        console.log("Token Addresses:", normalizedAddresses);
        console.log("Timestamps:", timestamps);
        console.log("Raw Query Data:", data);

        if (loading || error || !timestamps.length) {
            console.log("Early return due to:", { loading, error, timestampsLength: timestamps.length });
            return;
        }

        if (!data?.tokenGetHistoricalPrices) {
            console.log("No historical prices data");
            return;
        }

        const newPriceData: TokenPriceData = {};

        data.tokenGetHistoricalPrices.forEach(tokenData => {
            if (!tokenData?.prices || !tokenData.address) {
                console.log("Skipping token due to missing data:", tokenData);
                return;
            }

            // Store data with lowercase address
            const normalizedAddress = tokenData.address.toLowerCase();
            newPriceData[normalizedAddress] = {};

            // Create a sorted array of all price points for this token
            const sortedPrices = [...tokenData.prices]
                .sort((a, b) => Number(a.timestamp) - Number(b.timestamp));

            console.log(`Processing prices for token ${normalizedAddress}:`, sortedPrices);

            // For each timestamp we need, find the closest price
            timestamps.forEach(targetTimestamp => {
                const dateStr = unixToDate(targetTimestamp);

                // Find the closest price point that's not after our target timestamp
                const closestPrice = sortedPrices
                    .filter(p => Number(p.timestamp) <= targetTimestamp)
                    .slice(-1)[0];

                newPriceData[normalizedAddress][dateStr] = closestPrice
                    ? Number(closestPrice.price)
                    : 0;
            });
        });

        console.log("Setting new price data:", newPriceData);
        setAggregatedPriceData(newPriceData);
    }, [data, loading, error, JSON.stringify(timestamps), JSON.stringify(normalizedAddresses)]);

    return {
        priceData: aggregatedPriceData,
        loading,
        error
    };
};

// Helper function to get the price for a specific token at a specific timestamp
export const getTokenPriceAtTimestamp = (
    priceData: TokenPriceData,
    tokenAddress: string,
    timestamp: number
): number => {
    const dateStr = unixToDate(timestamp);
    const normalizedAddress = tokenAddress.toLowerCase();
    return priceData[normalizedAddress]?.[dateStr] || 0;
};
