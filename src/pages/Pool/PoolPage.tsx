import { useParams } from 'react-router-dom';
import { Typography, Box, Card, Grid } from "@mui/material";
import PoolChart from '../../components/PoolChart';
import { useBalancerPoolData } from "../../data/balancer/usePools";
import { useBalancerPoolPageData } from "../../data/balancer/usePools";
import { useBalancerTransactionData } from "../../data/balancer/useTransactions";

export default function PoolPage() {
    const params = useParams();
    const poolId = params.poolId ? params.poolId : '';
    const poolData = useBalancerPoolData(poolId);
    const { tvlData, volumeData, feesData } = useBalancerPoolPageData(poolId);

    const { swaps, joinExits, swapPairVolumes } = useBalancerTransactionData(
        (poolData?.tokens || []).map((token) => token.address),
        poolData ? [poolData.id] : [],
    );
    return (
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
        >
            <Grid item xs={8} >
                <Typography>Pool page with id: {params.poolId}</Typography>
                <Card>
                    <PoolChart tvlData={tvlData} volumeData={volumeData} feesData={feesData} />
                </Card>
            </Grid>
        </Grid>
    );
}