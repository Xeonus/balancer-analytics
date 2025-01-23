import { useState, useEffect } from 'react';
import axios from 'axios';
import { PaladinQuest, PaladinQuestData } from './paladinTypes';
import { ethers } from 'ethers';

const API_URL = 'https://dev.paladin.vote/quest/v3/board/bal';
const ONE_WEEK = 7 * 24 * 60 * 60;
const now = Math.floor(Date.now() / 1000);

export const useGetPaladinVotingIncentives = (timestamp = ''): {
    questData: PaladinQuestData | null;
    loading: boolean;
    error: string | null;
} => {
    const [questData, setQuestData] = useState<PaladinQuestData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // If timestamp is within current week, use current endpoint
    if (Number(timestamp) > now - ONE_WEEK) {
        timestamp = '';
    }

    const requestURL = timestamp ? `${API_URL}/${timestamp}` : API_URL;

    useEffect(() => {
        const fetchPaladinQuests = async () => {
            try {
                setLoading(true);
                const response = await axios.get<PaladinQuest[]>(requestURL);

                // Calculate aggregated metrics
                let totalValue = 0;
                let totalVotes = 0;

                response.data.forEach(quest => {
                    // Convert weekly rewards from wei to ether and multiply by token price (TODO: add token price fetching)
                    const weeklyRewardsEther = Number(ethers.utils.formatEther(quest.weeklyRewards));
                    totalValue += weeklyRewardsEther;

                    // Calculate total votes from objectives
                    const minVotes = ethers.utils.formatEther(quest.minObjective);
                    const maxVotes = ethers.utils.formatEther(quest.maxObjective);
                    totalVotes += (Number(minVotes) + Number(maxVotes)) / 2;
                });

                const averageRewardPerVote = totalVotes > 0 ? totalValue / totalVotes : 0;

                setQuestData({
                    currentQuests: response.data,
                    totalValue,
                    totalVotes,
                    averageRewardPerVote
                });
                setError(null);
            } catch (err) {
                console.error('Error fetching Paladin quests:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch Paladin quests');
                setQuestData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPaladinQuests();
    }, [requestURL]);

    return { questData, loading, error };
};
