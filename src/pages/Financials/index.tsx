import * as React from 'react';
import { Typography, Grid, Box, Card, Divider, CircularProgress } from "@mui/material";
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import txnJson from '../../data/debank/data/treasuryTxHistory.json'
import { TransactionHistory } from '../../data/debank/debankTypes';
import { BalancerPieChartDataItem } from '../../data/balancer/balancerTypes';
import { extractTransactionsByTokenAndType, getChartDataByMonth, getChartDataByQuarter, getCumulativeSumTrace } from './helpers';
import GenericBarChart from '../../components/Echarts/GenericBarChart';
import { useGetTransactions } from '../../data/debank/useGetTransactions';
import { FEE_COLLECTOR_ADDRESS, FEE_STREAMER, getTreasuryConfig } from '../../constants/wallets';
import GenericAreaChart from '../../components/Echarts/GenericAreaChart';

export default function Financials() {

    const [activeNetwork] = useActiveNetworkVersion()
    const TREASURY_CONFIG = getTreasuryConfig(activeNetwork.chainId);
    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)

    //Load history
    const txnHistory: TransactionHistory = JSON.parse(JSON.stringify(txnJson));

    //complement with actual data
    //const { transactions } = useGetTransactions(TREASURY_CONFIG.treasury, Math.floor(Date.now() / 1000))
    //txnHistory.history_list.find(el => el.time_at)

    //console.log("txnHistory", txnHistory)

    //TODOs: 
    //1. show quarterly graph of historical USDC income per source. 
    //sources: fjord / copper, protocol fees / paybacks / ribbon margin calls / taxations like liquidations
    //2. show quarterly spendings (past and future for SPs -> use same data as SP page)
    //3. show forecast gauge in months (based on average spendings how far we can go with reserves)
    //4. Show sankey chart of in- and outflows? Breakdown of BAL and USDC
    
    //Obtain quarterly data:
    //1. obtain whitelist token data
    //2. aggregate by Quarter
    //3. Feed into multi-bar-chart
    const usdc = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    const weth = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'


    const usdcReceived = extractTransactionsByTokenAndType(txnHistory, usdc.toLowerCase(), 'receive', FEE_STREAMER);
    const quarterlyUSDC = getChartDataByQuarter(usdcReceived);
    const monthlyUSDC = getChartDataByMonth(usdcReceived)
    console.log("monthlyUSDC", monthlyUSDC)
    const cumulativeChartData = getCumulativeSumTrace(usdcReceived);
    console.log("cumulativeChartData", cumulativeChartData)
    //console.log("quarterlyUSDC", quarterlyUSDC);
    const wethReceived = extractTransactionsByTokenAndType(txnHistory, weth.toLowerCase(), 'receive');
    const quarterlyWETH = getChartDataByQuarter(wethReceived);
    //console.log("wethReceived", wethReceived)
    //TODO: Load token price data the same way we do it for historical pool data?


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
                    <Card>
                        <GenericBarChart data={monthlyUSDC} />
                    </Card>
                    <Card>
                        <GenericBarChart data={quarterlyWETH} />
                    </Card>
                    <Card>
                        <GenericAreaChart chartData={cumulativeChartData} dataTitle='test' />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}