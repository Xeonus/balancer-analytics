// Define the structure of a single record in your CSV data.
// Note: The current_fees CSV (v2_earned_fees_*.csv) only has pool_id, chain, symbol, earned_fees
// The incentives CSV (v2_incentives_*.csv) has all fields including fee breakdown
export interface PoolFeeRecord {
    pool_id: string;
    chain: string;
    symbol: string;
    earned_fees: string;
    // The following fields are only available in historical incentives CSVs
    fees_to_vebal?: string;
    fees_to_dao?: string;
    fees_to_beets?: string;
    total_incentives?: string;
    aura_incentives?: string;
    bal_incentives?: string;
    redirected_incentives?: string;
    reroute_incentives?: number;
    bpt_price?: string;
    date_string?: string;
    last_join_exit?: string;
    is_partner?: string;
}

export interface FeeAllocations {
    feesCollected: number;
    incentivesDistributed: number;
    feesNotDistributed: number;
    auraIncentives: number;
    balIncentives: number;
    feesToDao: number;
    feesToVebal: number;
    auraIncentivesPct: number;
    balIncentivesPct: number;
    feesToDaoPct: number;
    feesToVebalPct: number;
    createdAt: number;
    periodStart: number;
    periodEnd: number;
}

export interface NetworkFees {
    mainnet: number,
    arbitrum: number,
    polygon: number,
    base: number,
    gnosis: number,
    avalanche: number,
    zkevm?: number,
}
