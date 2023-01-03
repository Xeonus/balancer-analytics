import * as React from 'react';
import { Typography, Grid, Box, Card, Divider, CircularProgress } from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import txnJson from '../../data/debank/data/treasuryTxHistory.json'
import { TransactionHistory } from '../../data/debank/debankTypes';

export default function Financials() {

    const [activeNetwork] = useActiveNetworkVersion()
    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)

    const txnHistory: TransactionHistory = JSON.parse(JSON.stringify(txnJson));

    console.log("txnHistory", txnHistory)

    //TODOs: 
    //1. show quarterly graph of historical USDC income per source. 
    //sources: fjord / copper, protocol fees / paybacks / ribbon margin calls / taxations like liquidations
    //2. show quarterly spendings (past and future for SPs -> use same data as SP page)
    //3. show forecast gauge in months (based on average spendings how far we can go with reserves)
    //4. Show sankey chart of in- and outflows? Breakdown of BAL and USDC

    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={10}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={'DAO Financials'} />
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