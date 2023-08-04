import { BalancerStakingGauges } from '../../data/balancer/balancerTypes';
import { HiddenHandIncentives } from '../../data/hidden-hand/hiddenHandTypes';

export function decorateGaugesWithIncentives(
    balancerGauges: BalancerStakingGauges[],
    votingIncentives: HiddenHandIncentives
): BalancerStakingGauges[] {
    const processedAddresses = new Set<string>(); // Create a Set to store processed addresses

    return balancerGauges.map((gauge) => {
        const gaugeAddressLower = gauge.address.toLowerCase();

        if (processedAddresses.has(gaugeAddressLower)) {
            // Check if the address has already been processed, if yes, return the original gauge.
            return gauge;
        }
        const matchingIncentive = votingIncentives.data.find(
            (incentive) => incentive.proposal.toLowerCase() === gaugeAddressLower
        );
        if (matchingIncentive) {
            // Add the processed address to the set before returning the gauge with incentives
            processedAddresses.add(gaugeAddressLower);

            return {
                ...gauge,
                voteCount: matchingIncentive.voteCount,
                valuePerVote: matchingIncentive.valuePerVote,
                totalRewards: matchingIncentive.totalValue,
            };
        } else {
            // Add the processed address to the set before returning the original gauge
            processedAddresses.add(gaugeAddressLower);
            return gauge;
        }
    });
}
