import { useState, useEffect } from 'react';
import axios from 'axios';
import { unixToDate } from '../../utils/date';
import {
    VoteMarketHistoricalRound,
    VoteMarketRoundMetadata,
    VoteMarketHistoricalData
} from './voteMarketTypes';
import {
    VOTEMARKET_GITHUB_BASE,
    VOTEMARKET_METADATA_URL,
    BATCH_SIZE,
    BATCH_DELAY_MS
} from './constants';

export interface VoteMarketHistoricalResult {
    data: VoteMarketHistoricalData | null;
    loading: boolean;
    error: string | null;
}

/**
 * Hook to fetch Vote Market historical incentives data.
 * Note: Historical data from Votemarket already accounts for Aura's veBAL share
 * in the incentiveDirectedUSD values.
 */
export const useGetVoteMarketHistoricalIncentives = (): VoteMarketHistoricalResult => {
    const [data, setData] = useState<VoteMarketHistoricalData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                setLoading(true);
                setError(null);

                // 1. Fetch metadata to get all available round IDs
                const metadataResponse = await axios.get<VoteMarketRoundMetadata[]>(
                    VOTEMARKET_METADATA_URL,
                    { timeout: 10000 }
                );

                const metadata = metadataResponse.data;
                if (!metadata || metadata.length === 0) {
                    throw new Error('No round metadata available');
                }

                console.log(`Vote Market: Found ${metadata.length} historical rounds`);

                // 2. Fetch each round's data with batching
                const roundResults: Array<{
                    id: number;
                    timestamp: number;
                    data: VoteMarketHistoricalRound | null;
                }> = [];

                for (let i = 0; i < metadata.length; i += BATCH_SIZE) {
                    const batch = metadata.slice(i, i + BATCH_SIZE);

                    console.log(`Fetching Vote Market batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(metadata.length / BATCH_SIZE)}`);

                    const batchResponses = await Promise.all(
                        batch.map(async (round) => {
                            try {
                                const response = await axios.get<VoteMarketHistoricalRound>(
                                    `${VOTEMARKET_GITHUB_BASE}/${round.id}.json`,
                                    { timeout: 10000 }
                                );
                                return {
                                    id: round.id,
                                    timestamp: round.endVoting,
                                    data: response.data
                                };
                            } catch (err) {
                                console.warn(`Failed to fetch round ${round.id}:`, err);
                                return {
                                    id: round.id,
                                    timestamp: round.endVoting,
                                    data: null
                                };
                            }
                        })
                    );

                    roundResults.push(...batchResponses);

                    // Add delay between batches
                    if (i + BATCH_SIZE < metadata.length) {
                        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
                    }
                }

                // 3. Process results into chart-ready format
                const validResults = roundResults
                    .filter(r => r.data !== null)
                    .sort((a, b) => a.timestamp - b.timestamp);

                if (validResults.length === 0) {
                    throw new Error('No valid round data found');
                }

                const dollarPerVlAssetData: number[] = [];
                const totalAmountDollarsData: number[] = [];
                const xAxisData: string[] = [];
                const roundIds: number[] = [];
                let totalSum = 0;

                validResults.forEach(result => {
                    if (result.data) {
                        // Use globalAverageDollarPerVote if available, otherwise calculate from analytics
                        let dollarPerVote = result.data.globalAverageDollarPerVote || 0;

                        // If dollarPerVote is 0 but we have analytics data, calculate it manually
                        if (dollarPerVote === 0 && result.data.analytics && result.data.analytics.length > 0) {
                            const totalVotes = result.data.analytics.reduce((sum, gauge) => {
                                return sum + (parseFloat(gauge.nonBlacklistedVotes) || 0);
                            }, 0);

                            if (totalVotes > 0 && result.data.totalDepositedUSD > 0) {
                                dollarPerVote = result.data.totalDepositedUSD / totalVotes;
                            }
                        }

                        dollarPerVlAssetData.push(dollarPerVote);
                        totalAmountDollarsData.push(result.data.totalDepositedUSD || 0);
                        xAxisData.push(unixToDate(result.timestamp));
                        roundIds.push(result.id);
                        totalSum += result.data.totalDepositedUSD || 0;
                    }
                });

                setData({
                    dollarPerVlAssetData,
                    totalAmountDollarsData,
                    totalAmountDollarsSum: totalSum,
                    xAxisData,
                    roundIds
                });
            } catch (err) {
                console.error('Error fetching Vote Market historical data:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch historical data');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, []);

    return { data, loading, error };
};

// Hook to fetch a specific historical round by ID
export const useGetVoteMarketRound = (roundId: number | null): {
    roundData: VoteMarketHistoricalRound | null;
    loading: boolean;
    error: string | null;
} => {
    const [roundData, setRoundData] = useState<VoteMarketHistoricalRound | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (roundId === null) {
            setRoundData(null);
            return;
        }

        const fetchRound = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get<VoteMarketHistoricalRound>(
                    `${VOTEMARKET_GITHUB_BASE}/${roundId}.json`,
                    { timeout: 10000 }
                );

                setRoundData(response.data);
            } catch (err) {
                console.error(`Error fetching round ${roundId}:`, err);
                setError(err instanceof Error ? err.message : 'Failed to fetch round data');
                setRoundData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRound();
    }, [roundId]);

    return { roundData, loading, error };
};

// Hook to get round metadata only (lightweight)
export const useGetVoteMarketRoundMetadata = (): {
    metadata: VoteMarketRoundMetadata[];
    loading: boolean;
    error: string | null;
} => {
    const [metadata, setMetadata] = useState<VoteMarketRoundMetadata[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setLoading(true);
                const response = await axios.get<VoteMarketRoundMetadata[]>(
                    VOTEMARKET_METADATA_URL,
                    { timeout: 10000 }
                );
                setMetadata(response.data || []);
            } catch (err) {
                console.error('Error fetching Vote Market metadata:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch metadata');
                setMetadata([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMetadata();
    }, []);

    return { metadata, loading, error };
};
