// Vote Market API Types based on https://api-v3.stakedao.org/votemarket/balancer

export interface VoteMarketToken {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
    chainId: number;
    price: number;
}

export interface VoteMarketPeriod {
    rewardPerPeriod: string;
    rewardPerVote: string;
    leftover: string;
    updated: boolean;
    timestampStart: number;
    timestampEnd: number;
}

export interface VoteMarketStatus {
    voteOpen: boolean;
    voteClosed: boolean;
    claimOpen: boolean;
    claimClosed: boolean;
    expired: boolean;
}

export interface VoteMarketBreakdown {
    key: string;
    nonBlacklistedVotes: string;
}

export interface VoteMarketCampaign {
    key: string;
    id: number;
    platform: string;
    chainId: number;
    gaugeChainId: number;
    gauge: string;
    manager: string;
    rewardToken: VoteMarketToken;
    receiptRewardToken: VoteMarketToken;
    numberOfPeriods: number;
    maxRewardPerVote: string;
    totalRewardAmount: string;
    totalDistributed: string;
    totalClaimed: string;
    startTimestamp: number;
    endTimestamp: number;
    hook: string;
    isClosed: boolean;
    isWhitelist: boolean;
    isBlacklist: boolean;
    addresses: string[];
    periods: VoteMarketPeriod[];
    periodLeft: number;
    rewardAddress: string;
    rewardChainId: number;
    rewardTokenPrice: number;
    restrictedVotes: string;
    previousPeriod: VoteMarketPeriod | null;
    currentPeriod: VoteMarketPeriod | null;
    status: VoteMarketStatus;
    liquidityScore: number;
}

export interface VoteMarketGaugeAnalytics {
    gauge: string;
    nonBlacklistedVotes: string;
    nonBlacklistedVotesBreakdowns: VoteMarketBreakdown[];
    totalDeposited: number;
    dollarPerVote: number;
    incentiveDirected: string;
    incentiveDirectedUSD: number;
    efficiency: number;
    platform: string;
}

export interface VoteMarketAnalytics {
    totalDepositedUSD: number;
    globalAverageDollarPerVote: number;
    globalAverageEfficiency: number;
    analytics: VoteMarketGaugeAnalytics[];
}

export interface VoteMarketResponse {
    lastBlock: number;
    campaignCount: number;
    campaigns: VoteMarketCampaign[];
    analytics: VoteMarketAnalytics;
}

// Historical round data from GitHub
export interface VoteMarketHistoricalRound {
    totalDepositedUSD: number;
    globalAverageDollarPerVote: number;
    globalAverageEfficiency: number;
    analytics: VoteMarketGaugeAnalytics[];
}

export interface VoteMarketRoundMetadata {
    id: number;
    endVoting: number;
}

// Processed historical data format (matches existing pattern)
export interface VoteMarketHistoricalData {
    dollarPerVlAssetData: number[];
    totalAmountDollarsData: number[];
    totalAmountDollarsSum: number;
    xAxisData: string[];
    roundIds: number[];
}

// Combined incentive data for stacked charts
export interface CombinedIncentiveData {
    dollarPerVlAssetData: number[];
    totalAmountDollarsData: number[];
    xAxisData: string[];
    totalAmountDollarsSum: number;
}
