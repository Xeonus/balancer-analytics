export interface PaladinQuest {
    questId: number;
    period: number;
    chain: number;
    gauge: string;
    rewardToken: string;
    duration: number;
    minRPV: string;
    maxRPV: string;
    rewardPerVote: string;
    minObjective: string;
    maxObjective: string;
    rewardDistributed: number;
    weeklyRewards: string;
    permissions: number;
}

export interface PaladinQuestData {
    currentQuests: PaladinQuest[];
    totalValue: number;
    totalVotes: number;
    averageRewardPerVote: number;
}

export interface PaladinHistoricalData {
    dollarPerVlAssetData: number[];
    totalAmountDollarsData: number[];
    totalAmountDollarsSum: number;
    xAxisData: string[];
}

// Constants
export const PALADIN_CHAINS = {
    ETHEREUM: 1,
    ARBITRUM: 42161
} as const;

export interface RawHistoricalQuestData {
    quests: {
        timestamp: number;
        data: PaladinQuest[];
    }[];
    tokenAddresses: Set<string>;
}
