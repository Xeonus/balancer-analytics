

export interface PoolDataUnified {
    //Basic Info
    chain: string;
    poolId: string;
    address: string;
    name: string;
    symbol: string;
    poolType: string;
    tokens: PoolTokenDataUnified[];

    //Dynamic Data
    swapFee: number,
    totalShares: number,
    fees24h: number,
    volume24h: number,
    yieldCapture24h: number,
    totalLiquidity: number,
    globalAPRStats: GlobalAPRStats;

}

export interface NativeRewardAPRs {
    min: number,
    max: number,
}

export interface GlobalAPRStats {
    hasRewardAPR: boolean
    nativeRewardAPRs: NativeRewardAPRs,
    nativeTotalRewardAPR: number,
    thirdPartyAPR: number,
    swapAPR: number,

}


export interface PoolTokenDataUnified {
    address: string;
    decimals: number;
    id: string;
    name: string;
    symbol: string;
    weight: number;
    paidProtocolFees?: number,
}


export interface TokenPriceInfo {
    price: number;
    priceChange24h: number;
    priceChangePercentage24h: number;
}


export interface TokenPrices {
    [tokenAddress: string]: TokenPriceInfo;
}
