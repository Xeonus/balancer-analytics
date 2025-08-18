import { BalancerStakingGauges } from "../../data/balancer/balancerTypes";

export interface EnhancedGaugeData extends BalancerStakingGauges {
    gaugeRelativeWeight: number;
    gaugeVotes: number;
}