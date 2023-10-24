// Define the structure of a single record in your CSV data.
export interface PoolFeeRecord {
    poolId: string;
    chain: string;
    symbol: string;
    earned_fees: string;
    fees_to_vebal: string;
    fees_to_dao: string;
    total_incentives: string;
    aura_incentives: string;
    bal_incentives: string;
    redirected_incentives: string;
    reroute_incentives: number;
}