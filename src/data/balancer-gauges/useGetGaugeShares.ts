import { useFetchGaugeSharesQuery } from '../../apollo/generated/graphql-codegen-generated';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import {UserPoolAndGaugeShares} from "../balancer/useGetPoolUserBalances";


export default function useGetGaugeShares(gaugeAddress: string): UserPoolAndGaugeShares[] {
    const [activeNetwork] = useActiveNetworkVersion();

    const { data } = useFetchGaugeSharesQuery({
        context: {
            uri: activeNetwork.gaugeClientUri,
        },
        variables: {
            gaugeAddress: gaugeAddress,
        },
    });

    if (!data || !data.gaugeShares) {
        return [];
    }

    return data.gaugeShares.map(share => ({
        balance: parseFloat(share.balance),
        userAddress: share.user.id,
        isStakedInGauge: true,
    }));
}
