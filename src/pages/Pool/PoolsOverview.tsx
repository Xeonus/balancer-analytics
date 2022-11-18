import { Typography, Box, Grid } from "@mui/material";
import PoolTable from "../../components/Tables/PoolTable";
import { useBalancerPools } from "../../data/balancer/usePools";
import { useActiveNetworkVersion } from "../../state/application/hooks";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";

export default function PoolsOverview() {

    const poolData = useBalancerPools();
    const [ activeNetwork ] = useActiveNetworkVersion();

    //Ideas: show Top Pools: TVL, Fees, Swaps etc?
    //show bar graph top 50 pools per TVL! -> beets dashboard inspiration
    
    return (
        <Grid item xs={12}>
        <Typography variant="h5" mb={1}>Liquidity Pools Overview ({activeNetwork.name})</Typography>
        {poolData.length > 10 ?
        <PoolTable poolDatas={poolData}/> : 
        <Grid
        container
        spacing={2}
        mt='25%'
        sx={{ justifyContent: 'center' }}
    >
        <CustomLinearProgress />
    </Grid>}
        </Grid>
    );
}