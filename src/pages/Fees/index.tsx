import { Typography, Grid, Box, Card } from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { useBalancerProtocolData } from "../../data/balancer/useProtocolData";
import ChainFeeChart from "../../components/ChainFeeChart";
import { useBalancerPools } from "../../data/balancer/usePools";
import { useGetPortfolio } from "../../data/debank/useGetPortfolio";
import { FEE_COLLECTOR_ADDRESS } from "../../constants/wallets";

export default function Fees () {

    const [activeNetwork] = useActiveNetworkVersion()
    const protocolData = useBalancerProtocolData()
    const subgraphPools = useBalancerPools();

    const { portfolio } = useGetPortfolio(FEE_COLLECTOR_ADDRESS)

    console.log("portfolio object", portfolio)

    //merge APR data as a test

    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const chainNav: NavElement = {
        name: 'Chain',
        link: 'chain'
    }
    const feesNav: NavElement = {
        name: 'Fees',
        link: 'fees'
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)
    navCrumbs.push(chainNav);
    navCrumbs.push(feesNav);


    return (
        <Box sx={{ flexGrow: 2 }}>
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center' }}
        >
            <Grid item xs={10}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name} />
                </Box>

            </Grid>
            <Grid item xs={10}>
                <Box display="flex" alignItems="center">
                    <Box mb={1}>
                        <Typography variant={"h5"}>Fee Metrics ({activeNetwork.name})</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={10}>
                <Card>
                <ChainFeeChart feesData={protocolData.feeData} />
                </Card>
            </Grid>
        </Grid>
        </Box>
    );
}