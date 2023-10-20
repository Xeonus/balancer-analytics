import {useActiveNetworkVersion} from "../../state/application/hooks";
import NavCrumbs, {NavElement} from "../../components/NavCrumbs";
import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import useGetAllPools from "../../data/balancer-api-v3/useGetAllPools";
import {GqlChain} from "../../apollo/generated/graphql-codegen-generated";

export default function Emissions() {


    const [activeNetwork] = useActiveNetworkVersion();
    let globalPools = useGetAllPools([activeNetwork.v3NetworkID as GqlChain]);

    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const poolNav: NavElement = {
        name: 'Chain',
        link: 'chain'
    }
    const tokenNav: NavElement = {
        name: 'Core Pools',
        link: 'corePools'
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)
    navCrumbs.push(poolNav);
    navCrumbs.push(tokenNav)

    return (
        <Box sx={{flexGrow: 2}}>
            <Grid
                container
                spacing={2}
                sx={{justifyContent: 'center'}}
            >
                <Grid item xs={11} mb={2}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name}/>
                    </Box>

                </Grid>
                <Grid item xs={11}>
                    <Typography>
                        Core Pool Statistics
                    </Typography>
                </Grid>
                <Grid>

                </Grid>
            </Grid>
        </Box>
    );
}