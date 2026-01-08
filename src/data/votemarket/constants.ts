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
