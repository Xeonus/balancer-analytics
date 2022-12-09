import { Typography, Grid, Box, Card } from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { useBalancerProtocolData } from "../../data/balancer/useProtocolData";
import ChainFeeChart from "../../components/ChainFeeChart";
import { useBalancerPools } from "../../data/balancer/usePools";
import { FEE_COLLECTOR_ADDRESS } from "../../constants/wallets";
import { useGetTotalBalances } from "../../data/debank/useGetTotalBalances";
import FeeCollectorTokenTable from "../../components/Tables/FeeCollectorTokenTable";
import { formatDollarAmount } from "../../utils/numbers";
import CustomLinearProgress from "../../components/Progress/CustomLinearProgress";

export default function Fees() {

    const [activeNetwork] = useActiveNetworkVersion()
    const protocolData = useBalancerProtocolData()
    const pools = useBalancerPools();
    const { totalBalances } = useGetTotalBalances(FEE_COLLECTOR_ADDRESS);

    //Clean up data and retrieve total amounts
    const balancesAboveThreshold = totalBalances ? totalBalances.filter(balance =>
        balance.amount * balance.price >= activeNetwork.feeCollectorThreshold &&
        balance.chain === activeNetwork.debankId) : null;
    const totalAmountAboveThreshold = balancesAboveThreshold ? balancesAboveThreshold.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;

    const balancesBelowThreshold = totalBalances ? totalBalances.filter(balance =>
        balance.amount * balance.price < activeNetwork.feeCollectorThreshold &&
        balance.chain === activeNetwork.debankId) : null;
    const totalAmountBelowThreshold = balancesBelowThreshold ? balancesBelowThreshold.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;



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
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={10}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name} />
                    </Box>

                </Grid>
                <Grid mt={2} item xs={10}>
                    <Box display="flex" alignItems="center">
                        <Box>
                            <Typography variant={"h5"}>Fee Metrics ({activeNetwork.name})</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Card>
                        <ChainFeeChart feesData={protocolData.feeData} />
                    </Card>
                </Grid>
                <Grid mt={2} item xs={10}>
                    <Typography variant="h5">Tokens in Fee Collector</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6">Tokens to be collected: {formatDollarAmount(totalAmountAboveThreshold)}</Typography>
                </Grid>
            </Grid>
            {totalBalances ?
                <Grid
                    container
                    spacing={1}
                    sx={{ justifyContent: 'center' }}
                >
                    {balancesAboveThreshold && balancesAboveThreshold.length > 0 ?
                        <Grid item xs={10}>
                            <FeeCollectorTokenTable tokenBalances={balancesAboveThreshold} />
                        </Grid> : 
                        <Grid item xs={10}>
                                                    <Box ml={1}>
                            <Typography color='error'>No tokens to be collected</Typography>
                            </Box>
                        </Grid> 
                        }
                    <Grid item xs={10}>

                            <Typography variant="h6">
                                Tokens below threshold ( &lt; {formatDollarAmount(activeNetwork.feeCollectorThreshold)}) : {formatDollarAmount(totalAmountBelowThreshold)}
                            </Typography>
                    </Grid>
                    {balancesBelowThreshold ?
                        <Grid item xs={10}>
                            <FeeCollectorTokenTable tokenBalances={balancesBelowThreshold} />
                        </Grid> : <Typography>No tokens below threshold</Typography>}
                </Grid> : (<Grid
                    container
                    spacing={2}
                    mt='25%'
                    sx={{ justifyContent: 'center' }}
                >
                    <CustomLinearProgress />
                </Grid>)}
        </Box>
    );
}