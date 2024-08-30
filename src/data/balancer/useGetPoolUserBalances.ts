import {useGetUserPoolBalancesQuery,} from '../../apollo/generated/graphql-codegen-generated';
import {useActiveNetworkVersion} from "../../state/application/hooks";

export interface UserPoolAndGaugeShares {
    balance: number,
    userAddress: string,
    isStakedInGauge: boolean,
}

export default function useGetPoolUserBalances(poolId: string, gaugeId = ''): UserPoolAndGaugeShares[] {

    const [activeNetwork] = useActiveNetworkVersion()

    const { data  } = useGetUserPoolBalancesQuery({
        context: {
            uri: activeNetwork.decentralicedClientUri,
        },
        variables: {
            poolId: poolId,
        },
    });

    if (!data || !data.pool?.shares) {
        return [];
    }

    //Protocol Wallets
    const excludedAddresses = [
        "0xc128a9954e6c874ea3d62ce62b468ba073093f25",
        "0xba12222222228d8ba445958a75a0704d566bf2c8",
        gaugeId
    ];

    return data.pool.shares
        .filter(share => !excludedAddresses.includes(share.userAddress.id))
        .map(share => ({
            balance: parseFloat(share.balance),
            userAddress: share.userAddress.id,
            isStakedInGauge: false
        }));
}
