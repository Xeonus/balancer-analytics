import { useState, useEffect } from 'react';
import axios from 'axios';
import { PaladinQuest, PaladinHistoricalData } from './paladinTypes';
import { ethers } from 'ethers';
import { unixToDate } from '../../utils/date';

const API_URL = 'https://dev.paladin.vote/quest/v3/board/bal';

export const useGetPaladinHistoricalIncentives = (): {
    historicalData: PaladinHistoricalData | null;
    loading: boolean;
    error: string | null;
} => {
    const [historicalData, setHistoricalData] = useState<PaladinHistoricalData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const isValidTimestamp = (timestamp: number): boolean => {
        return timestamp >= 1692835200;
    };

    useEffect(() => {
        const ONE_DAY = 60 * 60 * 24;
        const BIWEEKLY = ONE_DAY * 7;
        const startDate = 1649894400;
        const today = Math.floor(Date.now() / 1000);

        const timestamps: number[] = [];
        for (let i = startDate; i <= today; i += BIWEEKLY) {
            if (isValidTimestamp(i)) {
                timestamps.push(i);
            }
        }

        const fetchAndCalculateHistoricalData = async () => {
            try {
                setLoading(true);
                const results = await Promise.all(
                    timestamps.map(async (timestamp: number) => {
                        const requestURL = `${API_URL}/${timestamp}`;
                        try {
                            const response = await axios.get<PaladinQuest[]>(requestURL);

                            let periodTotalValue = 0;
                            let weightedRewardPerVote = 0;
                            let totalRewardPerVote = 0;

                            response.data.forEach(quest => {
                                // Use rewardDistributed for historical total value
                                const rewardDistributedEther = Number(ethers.utils.formatEther(quest.rewardDistributed));
                                periodTotalValue += rewardDistributedEther;

                                // Use rewardPerVote directly instead of calculating from objectives
                                const questRewardPerVote = Number(ethers.utils.formatEther(quest.rewardPerVote));
                                totalRewardPerVote += questRewardPerVote;
                            });

                            // Calculate average rewardPerVote for the period
                            const averageRewardPerVote = response.data.length > 0 ?
                                totalRewardPerVote / response.data.length : 0;

                            return {
                                totalValue: periodTotalValue,
                                valuePerVote: averageRewardPerVote,
                                xAxis: unixToDate(timestamp)
                            };
                        } catch (err) {
                            console.error(`Error fetching data for timestamp ${timestamp}:`, err);
                            return null;
                        }
                    })
                );

                const filteredResults = results.filter((result):
                    result is { totalValue: number; valuePerVote: number; xAxis: string } =>
                        result !== null
                );

                const totalValueList = filteredResults.map(result => result.totalValue);
                const valuePerVoteList = filteredResults.map(result => result.valuePerVote);
                const xAxisData = filteredResults.map(result => result.xAxis);
                const totalAmountDollarsSum = totalValueList.reduce(
                    (acc, curr) => acc + curr,
                    0
                );

                setHistoricalData({
                    dollarPerVlAssetData: valuePerVoteList,
                    totalAmountDollarsData: totalValueList,
                    totalAmountDollarsSum,
                    xAxisData
                });
                setError(null);
            } catch (err) {
                console.error('Error processing historical data:', err);
                setError(err instanceof Error ? err.message : 'Failed to process historical data');
                setHistoricalData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAndCalculateHistoricalData();
    }, []);

    return { historicalData, loading, error };
};
