import { useState, useEffect } from 'react';
import axios from 'axios';
import {PaladinQuest, PaladinHistoricalData, RawHistoricalQuestData} from './paladinTypes';
import { ethers } from 'ethers';
import { unixToDate } from '../../utils/date';

const API_URL = 'https://dev.paladin.vote/quest/v3/board/bal';

export const useGetPaladinHistoricalQuests = (): {
    questData: RawHistoricalQuestData | null;
    loading: boolean;
    error: string | null;
} => {
    const [questData, setQuestData] = useState<RawHistoricalQuestData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const isValidTimestamp = (timestamp: number): boolean => {
        return timestamp >= 1692835200;
    };

    useEffect(() => {
        const fetchHistoricalQuests = async () => {
            try {
                setLoading(true);

                // Generate timestamps
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

                // Fetch all quests
                const questResponses = await Promise.all(
                    timestamps.map(async timestamp => {
                        try {
                            const response = await axios.get<PaladinQuest[]>(`${API_URL}/${timestamp}`);
                            return { timestamp, data: response.data, error: null };
                        } catch (err) {
                            console.error(`Error fetching data for timestamp ${timestamp}:`, err);
                            return { timestamp, data: null, error: err };
                        }
                    })
                );

                // Collect token addresses and filter valid responses
                const allTokenAddresses = new Set<string>();
                const validQuests = questResponses
                    .filter((response): response is { timestamp: number; data: PaladinQuest[]; error: null } =>
                        response.data !== null
                    )
                    .map(response => {
                        response.data.forEach(quest => {
                            if (quest.rewardToken) {
                                allTokenAddresses.add(quest.rewardToken);
                            }
                        });
                        return {
                            timestamp: response.timestamp,
                            data: response.data
                        };
                    });

                if (validQuests.length === 0) {
                    throw new Error('No valid quest data found');
                }

                setQuestData({
                    quests: validQuests,
                    tokenAddresses: allTokenAddresses
                });
                setError(null);
            } catch (err) {
                console.error('Error fetching historical quests:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch historical quests');
                setQuestData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricalQuests();
    }, []); // Empty dependency array since we only want to fetch once

    return { questData, loading, error };
};
