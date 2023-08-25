

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
    isMainToken: boolean;
    name: string;
    symbol: string;
    weight: number;
}
