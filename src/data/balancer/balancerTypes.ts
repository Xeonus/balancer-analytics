export interface BalancerChartDataItem {
    value: number;
    time: string;
}

//Reduntant?
export interface BalancerPieChartDataItem {
    value: number;
    name: string;
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
    totalShares: number;

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

    //Fees
    feesUSD: number;
    feesEpochUSD: number;

    //Additional pool info
    poolType: string;
    amp: string;
    createTime: number;
    owner: string;
    holdersCount: number;
    factory: string;

    //APR data
    aprSet?: AprSet
    // BAL emissions
    balEmissions?: number;
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

//Balancer SDK APR interface
export interface AprSet {
    swapFees: number
    tokenAprs: TokenAprs
    stakingApr: StakingApr
    rewardAprs: RewardAprs
    protocolApr: number
    min: number
    max: number
  }
  
  export interface TokenAprs {
    total: number
    breakdown: TokenBreakdown
  }
  
  export interface TokenBreakdown {
    [key: string]: number
  }
  
  export interface StakingApr {
    min: number
    max: number
  }
  
  export interface RewardAprs {
    total: number
    breakdown: RewardsBreakdown
  }
  
  export interface RewardsBreakdown {
    [key: string]: number
  }