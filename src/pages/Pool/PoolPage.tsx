import { Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useBalancerPoolData } from "../../data/balancer/usePools";
import { useBalancerPoolPageData } from "../../data/balancer/usePools";
import { useBalancerTransactionData } from "../../data/balancer/useTransactions";

export default function PoolPage() {
    const params = useParams();
    const poolId = params.poolId ? params.poolId : '';
    const poolData = useBalancerPoolData(poolId);
    const { tvlData, volumeData, feesData } = useBalancerPoolPageData(poolId);

    console.log("tvlData", tvlData)

    const { swaps, joinExits, swapPairVolumes } = useBalancerTransactionData(
        (poolData?.tokens || []).map((token) => token.address),
        poolData ? [poolData.id] : [],
    );
    return(
        <Typography>Pool page with id: {params.poolId}</Typography>
    );
}