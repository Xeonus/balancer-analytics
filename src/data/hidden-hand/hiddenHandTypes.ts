export interface HiddenHandIncentives {
    error: boolean
    data: HiddenHandData[]
}

export interface HiddenHandData {
    proposal: string
    proposalHash: string
    title: string
    proposalDeadline: number
    totalValue: number
    voteCount: number
    valuePerVote: number
    bribes: Bribe[]
}

export interface Bribe {
    symbol: string
    token: string
    amount: number
    chainId: number
    value: number
}

export interface HiddenHandRewards {
    error: boolean
    data: HiddenHandRewards[]
}

export interface HiddenHandRewards {
    symbol: string
    name: string
    token: string
    decimals: number
    chainId: number
    protocol: string
    claimable: string
    cumulativeAmount: string
    value: number
    activeTimer: number
    pausedTimer: number
    claimMetadata: ClaimMetadata
}

export interface ClaimMetadata {
    identifier: string
    account: string
    amount: string
    merkleProof: string[]
}
