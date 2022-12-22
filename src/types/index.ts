export interface Block {
    number: number;
    timestamp: string;
}

export enum VolumeWindow {
    daily,
    weekly,
    monthly,
}

export interface ChartDayData {
    date: number;
    volumeUSD: number;
    tvlUSD: number;
}

export interface GenericChartEntry {
    time: string;
    value: number;
}

export enum TransactionType {
    SWAP,
    MINT,
    BURN,
}

export type BalancerTransaction = {
    type: TransactionType;
    hash: string;
    timestamp: string;
    sender: string;
    tokens: BalancerTransactionToken[];
};

export type BalancerTransactionToken = {
    symbol: string;
    address: string;
    amountUSD: number;
    amountToken: number;
};

export type Transaction = {
    type: TransactionType;
    hash: string;
    timestamp: string;
    sender: string;
    token0Symbol: string;
    token1Symbol: string;
    token0Address: string;
    token1Address: string;
    amountUSD: number;
    amountToken0: number;
    amountToken1: number;
};

/**
 * Formatted type for Candlestick charts
 */
export type PriceChartEntry = {
    time: number; // unix timestamp
    open: number;
    close: number;
    high: number;
    low: number;
};


export interface ServiceProvidersConfig {
    service_provider: ServiceProviderEntry[];
}

export interface ServiceProviderEntry {
    name:               string;
    short_description?: string;
    site_url:           string;
    budgets:            Budget[];
    img_ref:            string;
    short_descrption?:  string;
}

export interface Budget {
    year:              number;
    quarter:           number;
    snapshotReference: string;
    budget_requested:  BudgetRequested;
}

export interface BudgetRequested {
    USDC:       number;
    BAL:        number;
    BAL_VESTED: number;
}
