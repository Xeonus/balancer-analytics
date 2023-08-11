import {useGetUserPoolBalancesQuery,} from '../../apollo/generated/graphql-codegen-generated';
import {useActiveNetworkVersion} from "../../state/application/hooks";

export interface UserPoolShares {
    balance: number,
    userAddress: string,
}

export default function useGetPoolUserBalances(poolId: string): UserPoolShares[] {

    const [activeNetwork] = useActiveNetworkVersion()

    const { data  } = useGetUserPoolBalancesQuery({
        context: {
            uri: activeNetwork.clientUri,
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
        "0xba12222222228d8ba445958a75a0704d566bf2c8"
    ];

    return data.pool.shares
        .filter(share => !excludedAddresses.includes(share.userAddress.id))
        .map(share => ({
            balance: parseFloat(share.balance), // Assuming balance is a string and you want to convert to a number
            userAddress: share.userAddress.id,
        }));
}
