import { VoteMarketCampaign } from './voteMarketTypes';

// Vote Market API endpoints
export const VOTEMARKET_API_URL = 'https://api-v3.stakedao.org/votemarket/balancer';
export const VOTEMARKET_API_URL_FALLBACK = 'https://votemarket-api.contact-69d.workers.dev/votemarket/balancer';

// GitHub historical data endpoints
export const VOTEMARKET_GITHUB_BASE = 'https://raw.githubusercontent.com/stake-dao/votemarket-analytics/refs/heads/main/analytics/votemarket-analytics/balancer';
export const VOTEMARKET_METADATA_URL = `${VOTEMARKET_GITHUB_BASE}/rounds-metadata.json`;

// Vote Market became primary for Balancer in January 2026
// Round 268 corresponds to approximately January 8, 2026
export const VOTEMARKET_PRIMARY_START_ROUND = 268;
export const VOTEMARKET_PRIMARY_START_TIMESTAMP = 1736294400; // Jan 8, 2026

// Batching constants for API requests
export const BATCH_SIZE = 5;
export const BATCH_DELAY_MS = 200;

// Aura Finance voter proxy address on mainnet
export const AURA_VOTER_PROXY = '0xaf52695e1bb01a16d33d7194c28c42b10e0dbec2';

/**
 * Check if Aura is blacklisted for a given campaign.
 * When Aura is blacklisted, the full incentive goes to Balancer voters.
 * When Aura is NOT blacklisted, the incentive is split between Aura and Balancer markets.
 */
export function isAuraBlacklistedForCampaign(campaign: VoteMarketCampaign): boolean {
    if (!campaign.isBlacklist || !campaign.addresses || campaign.addresses.length === 0) {
        return false;
    }
    return campaign.addresses.some(
        addr => addr.toLowerCase() === AURA_VOTER_PROXY.toLowerCase()
    );
}

/**
 * Calculate the effective incentive amount for Balancer voters.
 * If Aura is blacklisted, returns the full amount.
 * If Aura is NOT blacklisted, returns amount * (1 - auraVeBALShare).
 */
export function getEffectiveBalancerIncentive(
    amount: number,
    auraVeBALShare: number,
    isAuraBlacklisted: boolean
): number {
    if (isAuraBlacklisted) {
        return amount;
    }
    return amount * (1 - auraVeBALShare);
}
