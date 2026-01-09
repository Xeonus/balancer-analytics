import { BalancerStakingGauges } from '../../data/balancer/balancerTypes';
import { HiddenHandIncentives } from '../../data/hidden-hand/hiddenHandTypes';
import { VoteMarketAnalytics, VoteMarketCampaign } from '../../data/votemarket/voteMarketTypes';

export function decorateGaugesWithIncentives(
    balancerGauges: BalancerStakingGauges[],
    votingIncentives: HiddenHandIncentives
): BalancerStakingGauges[] {
    const processedAddresses = new Set<string>(); // Create a Set to store processed addresses

    return balancerGauges.map((gauge) => {
        const gaugeAddressLower = gauge.address.toLowerCase();

        if (processedAddresses.has(gaugeAddressLower)) {
            // Check if the address has already been processed, if yes, return the original gauge.
            return gauge;
        }
        const matchingIncentive = votingIncentives.data.find(
            (incentive) => incentive.proposal.toLowerCase() === gaugeAddressLower
        );
        if (matchingIncentive) {
            // Add the processed address to the set before returning the gauge with incentives
            processedAddresses.add(gaugeAddressLower);

            return {
                ...gauge,
                voteCount: matchingIncentive.voteCount,
                valuePerVote: matchingIncentive.valuePerVote,
                totalRewards: matchingIncentive.totalValue,
            };
        } else {
            // Add the processed address to the set before returning the original gauge
            processedAddresses.add(gaugeAddressLower);
            return gauge;
        }
    });
}

// Decorate gauges with Vote Market analytics data
export function decorateGaugesWithVoteMarketIncentives(
    balancerGauges: BalancerStakingGauges[],
    analytics: VoteMarketAnalytics | null
): BalancerStakingGauges[] {
    if (!analytics || !analytics.analytics) {
        return balancerGauges;
    }

    const processedAddresses = new Set<string>();

    return balancerGauges.map((gauge) => {
        const gaugeAddressLower = gauge.address.toLowerCase();

        if (processedAddresses.has(gaugeAddressLower)) {
            return gauge;
        }

        const matchingAnalytics = analytics.analytics.find(
            (ga) => ga.gauge.toLowerCase() === gaugeAddressLower
        );

        processedAddresses.add(gaugeAddressLower);

        if (matchingAnalytics) {
            return {
                ...gauge,
                voteCount: parseFloat(matchingAnalytics.nonBlacklistedVotes) || 0,
                valuePerVote: matchingAnalytics.dollarPerVote || 0,
                totalRewards: matchingAnalytics.incentiveDirectedUSD || 0,
            };
        }

        return gauge;
    });
}

// Transform Vote Market campaigns to PoolReward format for charts
export interface PoolReward {
    pool: string;
    [token: string]: string | number;
}

export function extractVoteMarketPoolRewards(
    campaigns: VoteMarketCampaign[],
    analytics: VoteMarketAnalytics | null,
    gauges: BalancerStakingGauges[]
): PoolReward[] {
    const poolRewards: PoolReward[] = [];

    if (!analytics || !analytics.analytics) {
        return poolRewards;
    }

    // Group campaigns by gauge
    const campaignsByGauge = new Map<string, VoteMarketCampaign[]>();
    campaigns.forEach(campaign => {
        const gaugeKey = campaign.gauge.toLowerCase();
        if (!campaignsByGauge.has(gaugeKey)) {
            campaignsByGauge.set(gaugeKey, []);
        }
        campaignsByGauge.get(gaugeKey)!.push(campaign);
    });

    // Process each gauge with incentives
    analytics.analytics.forEach(gaugeAnalytics => {
        const gaugeAddress = gaugeAnalytics.gauge.toLowerCase();
        const gaugeCampaigns = campaignsByGauge.get(gaugeAddress) || [];

        // Find the pool name from gauges
        const matchingGauge = gauges.find(g => g.address.toLowerCase() === gaugeAddress);
        const poolName = matchingGauge?.pool?.symbol || gaugeAddress.slice(0, 10) + '...';

        // Use incentiveDirectedUSD from analytics as the source of truth
        const totalUSD = gaugeAnalytics.incentiveDirectedUSD;

        if (totalUSD > 0) {
            const poolReward: PoolReward = { pool: poolName };

            if (gaugeCampaigns.length > 0) {
                // Calculate raw token amounts for proportional distribution
                const tokenAmounts: { symbol: string; rawAmount: number }[] = [];
                let totalRawValue = 0;

                gaugeCampaigns.forEach(campaign => {
                    const decimals = campaign.rewardToken.decimals || 18;
                    const rawAmount = parseFloat(campaign.totalDistributed) / Math.pow(10, decimals);
                    const rawValue = rawAmount * campaign.rewardTokenPrice;
                    tokenAmounts.push({
                        symbol: campaign.rewardToken.symbol.toUpperCase(),
                        rawAmount: rawValue
                    });
                    totalRawValue += rawValue;
                });

                // Distribute the correct total USD proportionally to each token
                if (totalRawValue > 0) {
                    tokenAmounts.forEach(({ symbol, rawAmount }) => {
                        const proportion = rawAmount / totalRawValue;
                        const tokenValueUSD = totalUSD * proportion;

                        if (!poolReward[symbol]) {
                            poolReward[symbol] = tokenValueUSD;
                        } else {
                            poolReward[symbol] = (poolReward[symbol] as number) + tokenValueUSD;
                        }
                    });
                } else {
                    // Fallback: if raw calculation fails, just show total
                    poolReward['INCENTIVES'] = totalUSD;
                }
            } else {
                // No campaigns found but analytics shows incentives
                poolReward['INCENTIVES'] = totalUSD;
            }

            poolRewards.push(poolReward);
        }
    });

    return poolRewards;
}

// Combine historical data from multiple sources
export interface CombinedHistoricalData {
    dollarPerVlAssetData: number[];
    totalAmountDollarsData: number[];
    xAxisData: string[];
    totalAmountDollarsSum: number;
    // For stacked charts - individual platform data
    hiddenHandData?: number[];
    paladinData?: number[];
    voteMarketData?: number[];
}

export function combineHistoricalIncentiveData(
    hiddenHandData: { dollarPerVlAssetData: number[]; totalAmountDollarsData: number[]; xAxisData: string[]; totalAmountDollarsSum: number } | null,
    paladinData: { dollarPerVlAssetData: number[]; totalAmountDollarsData: number[]; xAxisData: string[]; totalAmountDollarsSum: number } | null,
    voteMarketData: { dollarPerVlAssetData: number[]; totalAmountDollarsData: number[]; xAxisData: string[]; totalAmountDollarsSum: number } | null,
    voteMarketPrimaryStartDate: string = '2026-01-08' // When Vote Market became primary
): CombinedHistoricalData | null {
    // Collect all unique dates
    const allDates = new Set<string>();
    if (hiddenHandData) hiddenHandData.xAxisData.forEach(d => allDates.add(d));
    if (paladinData) paladinData.xAxisData.forEach(d => allDates.add(d));
    if (voteMarketData) voteMarketData.xAxisData.forEach(d => allDates.add(d));

    if (allDates.size === 0) return null;

    // Sort dates chronologically
    const sortedDates = Array.from(allDates).sort((a, b) =>
        new Date(a).getTime() - new Date(b).getTime()
    );

    const vmStartTime = new Date(voteMarketPrimaryStartDate).getTime();

    // Initialize arrays
    const combinedDollarPerVlAsset: number[] = [];
    const combinedTotalAmount: number[] = [];
    const hhDataArray: number[] = [];
    const paladinDataArray: number[] = [];
    const vmDataArray: number[] = [];

    sortedDates.forEach(date => {
        const dateTime = new Date(date).getTime();
        const isVoteMarketPrimary = dateTime >= vmStartTime;

        // Get values for each source at this date
        const hhIndex = hiddenHandData?.xAxisData.indexOf(date) ?? -1;
        const paladinIndex = paladinData?.xAxisData.indexOf(date) ?? -1;
        const vmIndex = voteMarketData?.xAxisData.indexOf(date) ?? -1;

        const hhDollarPerVote = hhIndex >= 0 ? hiddenHandData!.dollarPerVlAssetData[hhIndex] : 0;
        const hhTotal = hhIndex >= 0 ? hiddenHandData!.totalAmountDollarsData[hhIndex] : 0;

        const paladinDollarPerVote = paladinIndex >= 0 ? paladinData!.dollarPerVlAssetData[paladinIndex] : 0;
        const paladinTotal = paladinIndex >= 0 ? paladinData!.totalAmountDollarsData[paladinIndex] : 0;

        const vmDollarPerVote = vmIndex >= 0 ? voteMarketData!.dollarPerVlAssetData[vmIndex] : 0;
        const vmTotal = vmIndex >= 0 ? voteMarketData!.totalAmountDollarsData[vmIndex] : 0;

        // For stacked chart data
        if (isVoteMarketPrimary) {
            // After Jan 2025: Use Vote Market + Paladin
            hhDataArray.push(0);
            paladinDataArray.push(paladinTotal);
            vmDataArray.push(vmTotal);
            combinedTotalAmount.push(vmTotal + paladinTotal);
            combinedDollarPerVlAsset.push(vmDollarPerVote + paladinDollarPerVote);
        } else {
            // Before Jan 2025: Use Hidden Hand + Paladin
            hhDataArray.push(hhTotal);
            paladinDataArray.push(paladinTotal);
            vmDataArray.push(0);
            combinedTotalAmount.push(hhTotal + paladinTotal);
            combinedDollarPerVlAsset.push(hhDollarPerVote + paladinDollarPerVote);
        }
    });

    const totalSum = (hiddenHandData?.totalAmountDollarsSum || 0) +
                     (paladinData?.totalAmountDollarsSum || 0) +
                     (voteMarketData?.totalAmountDollarsSum || 0);

    return {
        dollarPerVlAssetData: combinedDollarPerVlAsset,
        totalAmountDollarsData: combinedTotalAmount,
        xAxisData: sortedDates,
        totalAmountDollarsSum: totalSum,
        hiddenHandData: hhDataArray,
        paladinData: paladinDataArray,
        voteMarketData: vmDataArray
    };
}
