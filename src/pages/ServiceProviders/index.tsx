import * as React from 'react';
import { Typography, Grid, Box, Card, Divider, CircularProgress } from "@mui/material";
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
import StyledExternalLink from '../../components/StyledExternalLink';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useDecoratePools from '../../data/balancer-sdk/useDecoratePools';
import AggregatedPoolFeeTable from '../../components/Tables/AggregatedPoolFeeTable';
import ProtocolFeeSankeyChart from '../../components/Echarts/ProtocolCharts/ProtocolFeeSankeyChart';
import PoolFeeTable from '../../components/Tables/PoolFeeTable';

export default function ServiceProviders() {

    const [activeNetwork] = useActiveNetworkVersion()
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
        name: 'Service Providers',
        link: 'serviceProviders'
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
                            <Typography variant={"h5"}>Service Provider Dashboard</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}