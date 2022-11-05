import { Typography, Box } from "@mui/material";
import PoolTable from "../../components/Tables/PoolTable";
import { useBalancerPools } from "../../data/balancer/usePools";
import { useActiveNetworkVersion } from "../../state/application/hooks";

export default function PoolsOverview() {

    const poolData = useBalancerPools();
    const [ activeNetwork ] = useActiveNetworkVersion();
    
    return (
        <Box>
        <Typography variant="h5" mb={1}>Liquidity Pools Overview ({activeNetwork.name})</Typography>
        <PoolTable poolDatas={poolData}/>
        </Box>
    );
}