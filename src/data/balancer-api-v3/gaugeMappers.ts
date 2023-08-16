import {BalancerStakingGauges} from "../balancer/balancerTypes";

export const createGauge = (e: any): BalancerStakingGauges => {
    const tokenLogoURIs = e.tokens.reduce((acc: {[key: string]: string}, token: any) => {
        acc[token.address] = token.logoURI;
        return acc;
    }, {});

    return {
        address: e.gauge.address,
        network: e.chain,
        isKilled: e.gauge.isKilled,
        addedTimestamp: e.gauge.addedTimestamp,
        relativeWeightCap: e.gauge.relativeWeightCap,
        pool: {
            id: e.id,
            address: e.address,
            poolType: e.type,
            symbol: e.symbol,
            tokens: e.tokens.map((token: any) => ({
                address: token.address,
                weight: token.weight ? token.weight : null,
                symbol: token.symbol,
            })),
        },
        tokenLogoURIs: tokenLogoURIs,
        // These properties below are missing from your subgraph query:
        workingSupply: "",
        totalSupply: "",
        aprSet: undefined,
        userVotingPower: 0,
        recipient: "",
        boost: "",
        workingBalance: "",
        userBalance: 0,
        max_boost: "",
        min_VeBAL: "",
        voteCount: 0,
        valuePerVote: 0,
        totalRewards: 0,
        userValue: 0
    };
};
