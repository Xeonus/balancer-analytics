import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    VoteMarketResponse,
    VoteMarketCampaign,
    VoteMarketAnalytics,
    VoteMarketGaugeAnalytics
} from './voteMarketTypes';
import {
    VOTEMARKET_API_URL,
    VOTEMARKET_API_URL_FALLBACK,
    isAuraBlacklistedForCampaign,
    getEffectiveBalancerIncentive
} from './constants';

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

// Helper function to get total incentives USD from analytics (raw, unadjusted)
export const getTotalIncentivesUSD = (analytics: VoteMarketAnalytics | null): number => {
    if (!analytics) return 0;
    return analytics.totalDepositedUSD;
};

/**
 * Get total incentives USD adjusted for Aura's veBAL share.
 * For campaigns where Aura is NOT blacklisted, only the non-Aura portion goes to Balancer voters.
 * Uses currentPeriod.rewardPerPeriod for current round rewards (not totalDistributed).
 */
export const getAdjustedTotalIncentivesUSD = (
    campaigns: VoteMarketCampaign[],
    auraVeBALShare: number
): number => {
    return campaigns.reduce((sum, campaign) => {
        // Only include campaigns with an active current period
        if (!campaign.currentPeriod) return sum;

        const rewardPerPeriod = parseFloat(campaign.currentPeriod.rewardPerPeriod);
        const rawValue = rewardPerPeriod * campaign.rewardTokenPrice;
        const isAuraBlacklisted = isAuraBlacklistedForCampaign(campaign);
        const adjustedValue = getEffectiveBalancerIncentive(rawValue, auraVeBALShare, isAuraBlacklisted);
        return sum + adjustedValue;
    }, 0);
};

// Helper function to aggregate campaigns by gauge for display (with Aura adjustment)
// Uses currentPeriod.rewardPerPeriod for current round rewards
export const aggregateCampaignsByGauge = (
    campaigns: VoteMarketCampaign[],
    auraVeBALShare: number = 0
): Map<string, {
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
        // Only include campaigns with an active current period
        if (!campaign.currentPeriod) return;

        const gaugeAddress = campaign.gauge.toLowerCase();
        const rewardPerPeriod = parseFloat(campaign.currentPeriod.rewardPerPeriod);
        const rawRewardValue = rewardPerPeriod * campaign.rewardTokenPrice;

        // Apply Aura adjustment based on whether Aura is blacklisted for this campaign
        const isAuraBlacklisted = isAuraBlacklistedForCampaign(campaign);
        const rewardValue = getEffectiveBalancerIncentive(rawRewardValue, auraVeBALShare, isAuraBlacklisted);

        if (gaugeMap.has(gaugeAddress)) {
            const existing = gaugeMap.get(gaugeAddress)!;
            existing.totalValue += rewardValue;
            existing.rewards.push({
                symbol: campaign.rewardToken.symbol,
                value: rewardValue,
                amount: campaign.currentPeriod.rewardPerPeriod
            });
        } else {
            gaugeMap.set(gaugeAddress, {
                gauge: campaign.gauge,
                totalValue: rewardValue,
                rewards: [{
                    symbol: campaign.rewardToken.symbol,
                    value: rewardValue,
                    amount: campaign.currentPeriod.rewardPerPeriod
                }]
            });
        }
    });

    return gaugeMap;
};
