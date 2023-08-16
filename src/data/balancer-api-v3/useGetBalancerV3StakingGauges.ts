
import {BalancerStakingGauges} from "../balancer/balancerTypes";
import {createGauge} from "./gaugeMappers";
import {balancerV3APIClient} from "../../apollo/client";
import {useVeBalGetVotingGaugesQuery} from "../../apollo/generated/graphql-codegen-generated";

export default function useGetBalancerV3StakingGauges() {
    const { data, loading, error } = useVeBalGetVotingGaugesQuery(
        {
            client: balancerV3APIClient,

        }
    );

    if (loading) return [];
    if (error) {
        console.error("Error fetching gauges:", error);
        return [];
    }

    const adaptToBalancerStakingGauges = (data: any): BalancerStakingGauges[] => {
        const rawData = data.veBalGetVotingList;

        const noDupes = rawData.filter((e: any) => {
            return !e.gauge.isKilled;
        });

        const poolIds = new Map();
        noDupes.forEach((e: any) => {
            const id = e.id;
            poolIds.set(id, (poolIds.get(id) || 0) + 1);
        });

        const maxTimestamp = new Map();
        noDupes.forEach((e: any) => {
            const id = e.id;
            if (poolIds.get(id) > 1) {
                if (!maxTimestamp.has(id) || e.gauge.addedTimestamp > maxTimestamp.get(id)) {
                    maxTimestamp.set(id, e.gauge.addedTimestamp);
                }
            }
        });
        //Map to BalancerStakingGauges object
        const gauges: BalancerStakingGauges[] = noDupes.map(createGauge);
         // Filter testnets
        return gauges.filter(gauge => gauge.network !== 'GOERLI');
    };

    return adaptToBalancerStakingGauges(data);
}
