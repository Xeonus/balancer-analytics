export interface BalancerChartDataItem {
    value: number;
    time: string;
}

export type TokenData = {
    // token is in some pool on uniswap
    exists: boolean;

    // basic token info
    name: string;
    symbol: string;
    address: string;

    // volume
    volumeUSD: number;
    volumeUSDChange: number;
    txCount: number;

    //fees
    feesUSD: number;

    // tvl
    tvlToken: number;
    tvlUSD: number;
    tvlUSDChange: number;

    // price
    priceUSD: number;
    priceUSDChange: number;

    //protocol collector info
    valueUSDCollected: number;

    //Coingecko price source?
    isCoingeckoPriceSource?: boolean
};

export interface PoolTokenData {
    name: string;
    symbol: string;
    balance: number;
    address: string;
    decimals: number;
    derivedETH: number;
    price: number;
    tvl: number;
    weight: number;
}

export interface PoolData {
    id: string;
    name: string;
    symbol: string;
    
    // basic token info
    address: string;
    feeTier: number;
    swapFee: number;

    tokens: PoolTokenData[];

    // for tick math
    liquidity: number;
    sqrtPrice: number;
    tick: number;

    // volume
    volumeUSD: number;
    volumeUSDChange: number;

    // liquidity
    tvlUSD: number;
    tvlUSDChange: number;

    feesUSD: number;
    feesEpochUSD: number;

    //Pool Type info
    poolType: string;
}


export interface PoolDataUser extends PoolData {
    userTVL: number;
    userRelativeTVL: number,
    tokenSet: TokenSet[],
    dailyFees: number,
}

export interface AssetData {
    name: string,
    type: string,
    relativeWeight: number,
    valueUSD: number,
}


//----Incentives Interface----
export interface Incentives {
    chainIncentives: ChainIncentives[];
}

export interface ChainIncentives {
    poolIncentives: PoolIncentives[];
    chainId: number;
}

export interface PoolIncentives {
    poolId: string;
    weekIncentives: WeekIncentives[];
}

export interface WeekIncentives {
    weekId: number;
    tokenSet: TokenSet[];
}

export interface TokenSet {
    tokenId: string;
    amount: number;
}