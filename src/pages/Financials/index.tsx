import * as React from 'react';
import { Typography, Grid, Box, Card, Divider, CircularProgress } from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";

export default function Financials() {

    const [activeNetwork] = useActiveNetworkVersion()
    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const feesNav: NavElement = {
        name: 'DAO Financials',
        link: 'financials'
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)
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
                            <Typography variant={"h5"}>DAO Real-Time Financial Report Dashboard</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid mt={2} item xs={10}>
                    <Typography>Coming soon!</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}