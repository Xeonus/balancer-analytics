import {useActiveNetworkVersion} from "../../state/application/hooks";
import NavCrumbs, {NavElement} from "../../components/NavCrumbs";
import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import useGetAllPools from "../../data/balancer-api-v3/useGetAllPools";
import {GqlChain} from "../../apollo/generated/graphql-codegen-generated";
import useGetCorePoolCurrentFees from "../../data/maxis/useGetCorePoolCurrentFees";
import CorePoolTable from "../../components/Tables/CorePoolTable";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";
import LinkIcon from '@mui/icons-material/Link';

export default function CorePools() {


    const [activeNetwork] = useActiveNetworkVersion();
    let globalPools = useGetAllPools(['MAINNET', 'POLYGON', 'ARBITRUM', 'ZKEVM', 'AVALANCHE', 'BASE']);
    //console.log("globalPools", globalPools)
    const corePools = useGetCorePoolCurrentFees();
    //console.log("corePools", corePools)

    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)

    return (
        <Box sx={{flexGrow: 2}}>
            <Grid
                container
                spacing={2}
                sx={{justifyContent: 'center'}}
            >
                <Grid item xs={11} mb={2}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={'Core Pools'}/>
                    </Box>

                </Grid>
                <Grid item xs={11}>
                    <Typography variant={'h5'}>
                        Core Pools: Earned Fees Statistics
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant={'body1'}>
                        {'This table provides an overview of currently collected fees that are distributed according to the '}
                        <a
                            href="https://forum.balancer.fi/t/bip-457-core-pool-incentive-program-automation/5254"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }} // Adjust styles as needed
                        >
                            core-pool framework
                            <LinkIcon style={{ verticalAlign: 'bottom', marginLeft: '0.25rem' }} />
                        </a>
                        {'.'}
                    </Typography>
                </Grid>

                <Grid item xs={11}>
                    {globalPools && globalPools.length > 10 ?
                    <CorePoolTable poolDatas={globalPools} corePools={corePools} /> :
                        <Grid
                            container
                            spacing={2}
                            mt='25%'
                            sx={{justifyContent: 'center'}}
                        >
                            <CustomLinearProgress/>
                        </Grid>}

                </Grid>
                <Grid>
                </Grid>
            </Grid>
        </Box>
    );
}