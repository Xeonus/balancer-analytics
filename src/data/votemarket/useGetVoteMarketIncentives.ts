import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    VoteMarketResponse,
    VoteMarketCampaign,
    VoteMarketAnalytics,
    VoteMarketGaugeAnalytics
} from './voteMarketTypes';
import { VOTEMARKET_API_URL, VOTEMARKET_API_URL_FALLBACK } from './constants';

export interface VoteMarketIncentivesResult {
    campaigns: VoteMarketCampaign[];
    analytics: VoteMarketAnalytics | null;
    loading: boolean;
    error: string | null;
}

export const useGetVoteMarketIncentives = (): VoteMarketIncentivesResult => {
    const [campaigns, setCampaigns] = useState<VoteMarketCampaign[]>([]);
    const [analytics, setAnalytics] = useState<VoteMarketAnalytics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                let response;
                try {
                    response = await axios.get<VoteMarketResponse>(VOTEMARKET_API_URL, {
                        timeout: 15000,
                    });
                } catch (primaryError) {
                    console.warn('Primary Vote Market API failed, trying fallback...', primaryError);
                    response = await axios.get<VoteMarketResponse>(VOTEMARKET_API_URL_FALLBACK, {
                        timeout: 15000,
                    });
                }

                const data = response.data;

                // Filter for active campaigns only
                const activeCampaigns = data.campaigns.filter(campaign =>
                    !campaign.isClosed && campaign.status.voteOpen
                );

                setCampaigns(activeCampaigns);
                setAnalytics(data.analytics);
            } catch (err) {
                console.error('Error fetching Vote Market data:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch Vote Market data');
                setCampaigns([]);
                setAnalytics(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { campaigns, analytics, loading, error };
};

// Helper function to get total votes from analytics
export const getTotalVotesFromAnalytics = (analytics: VoteMarketAnalytics | null): number => {
    if (!analytics || !analytics.analytics) return 0;
    return analytics.analytics.reduce((sum, gauge) => {
        return sum + parseFloat(gauge.nonBlacklistedVotes || '0');
    }, 0);
};

// Helper function to get total incentives USD from analytics
export const getTotalIncentivesUSD = (analytics: VoteMarketAnalytics | null): number => {
    if (!analytics) return 0;
    return analytics.totalDepositedUSD;
};

// Helper function to aggregate campaigns by gauge for display
export const aggregateCampaignsByGauge = (campaigns: VoteMarketCampaign[]): Map<string, {
    gauge: string;
    totalValue: number;
    rewards: { symbol: string; value: number; amount: string }[];
}> => {
    const gaugeMap = new Map<string, {
        gauge: string;
        totalValue: number;
        rewards: { symbol: string; value: number; amount: string }[];
    }>();

    campaigns.forEach(campaign => {
        const gaugeAddress = campaign.gauge.toLowerCase();
        const rewardValue = parseFloat(campaign.totalDistributed) * campaign.rewardTokenPrice;

        if (gaugeMap.has(gaugeAddress)) {
            const existing = gaugeMap.get(gaugeAddress)!;
            existing.totalValue += rewardValue;
            existing.rewards.push({
                symbol: campaign.rewardToken.symbol,
                value: rewardValue,
                amount: campaign.totalDistributed
            });
        } else {
            gaugeMap.set(gaugeAddress, {
                gauge: campaign.gauge,
                totalValue: rewardValue,
                rewards: [{
                    symbol: campaign.rewardToken.symbol,
                    value: rewardValue,
                    amount: campaign.totalDistributed
                }]
            });
        }
    });

    return gaugeMap;
};
