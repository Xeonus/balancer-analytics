// used to mark unsupported tokens, these are hosted lists of unsupported tokens

export const UNSUPPORTED_LIST_URLS: string[] = [];
export const OPTIMISM_LIST = 'https://static.optimism.io/optimism.tokenlist.json';
export const ARBITRUM_LIST = 'https://raw.githubusercontent.com/balancer-labs/assets/refactor-for-multichain/generated/arbitrum.listed.tokenlist.json';
export const POLYGON_LIST = 'https://unpkg.com/quickswap-default-token-list@1.0.67/build/quickswap-default.tokenlist.json'
export const MAINNET_LIST = 'https://raw.githubusercontent.com/balancer-labs/assets/master/generated/vetted.tokenlist.json';

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
    OPTIMISM_LIST,
    ARBITRUM_LIST,
    POLYGON_LIST,
    MAINNET_LIST,
    ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
];

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [MAINNET_LIST];
