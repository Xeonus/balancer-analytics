import { useState, useEffect } from 'react';
import { GqlChain, useGetTokenPriceQuery } from "../../apollo/generated/graphql-codegen-generated";
import { balancerV3APIClient } from "../../apollo/client";
import { BalancerChartDataItem } from "../balancer/balancerTypes";
import { unixToDate } from "../../utils/date";

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
    const [priceData, setPriceData] = useState<TokenPriceData>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrices = async () => {
            if (!tokenAddresses.length || !timestamps.length) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const tokenPrices: TokenPriceData = {};

                // Fetch historical prices for each token
                await Promise.all(
                    tokenAddresses.map(async (address) => {
                        const { data } = await balancerV3APIClient.query({
                            query: useGetTokenPriceQuery.document,
                            variables: {
                                address: address,
                                chain: 'MAINNET' as GqlChain,
                            },
                        });

                        if (data?.tokenGetPriceChartData) {
                            tokenPrices[address] = {};

                            // Create a map of all price data points
                            const pricePoints = new Map<string, number>();
                            data.tokenGetPriceChartData.forEach(item => {
                                const dateStr = unixToDate(item.timestamp);
                                pricePoints.set(dateStr, parseFloat(item.price));
                            });

                            // For each timestamp we care about, find the closest price
                            timestamps.forEach(timestamp => {
                                const dateStr = unixToDate(timestamp);
                                let price = pricePoints.get(dateStr);

                                if (!price) {
                                    // If no exact match, find the closest previous date
                                    const sortedDates = Array.from(pricePoints.keys()).sort();
                                    const closestDate = sortedDates.find(date => date >= dateStr)
                                        || sortedDates[sortedDates.length - 1];
                                    price = pricePoints.get(closestDate) || 0;
                                }

                                tokenPrices[address][dateStr] = price;
                            });
                        }
                    })
                );

                setPriceData(tokenPrices);
                setError(null);
            } catch (err) {
                console.error('Error fetching historical token prices:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch token prices');
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, [JSON.stringify(tokenAddresses), JSON.stringify(timestamps)]);

    return { priceData, loading, error };
};

// Helper function to get the price for a specific token at a specific timestamp
export const getTokenPriceAtTimestamp = (
    priceData: TokenPriceData,
    tokenAddress: string,
    timestamp: number
): number => {
    const dateStr = unixToDate(timestamp);
    return priceData[tokenAddress]?.[dateStr] || 0;
};
