

export interface corePool {
    poolId: string,
    poolTokens: PoolToken[]
}

export interface PoolToken {
    symbol: string,
    address: string,
}
