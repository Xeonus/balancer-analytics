import {Accordion, AccordionDetails, AccordionSummary, Box, Card, Grid, Link, Typography} from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavCrumbs, {NavElement} from '../../components/NavCrumbs';
import {useActiveNetworkVersion} from "../../state/application/hooks";
import {getTreasuryConfig, KARPATKEY_SAFE, OPCO_SAFE} from "../../constants/wallets";
import {useGetTotalBalances} from "../../data/debank/useGetTotalBalances";
import {useGetPortfolio} from '../../data/debank/useGetPortfolio';
import StyledExternalLink from '../../components/StyledExternalLink';
import MetricsCard from '../../components/Cards/MetricsCard';
import FeeCollectorTokenTable from "../../components/Tables/FeeCollectorTokenTable";
import LiquidityPosition from '../../components/LiquidityPosition';
import {BalancerPieChartDataItem} from '../../data/balancer/balancerTypes';
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import {calculatePortfolioStablecoinValue, calculateTokenBalancesStablecoinValue, mergeArrays} from "./helpers";
import * as React from "react";
import {EthereumNetworkInfo} from "../../constants/networks";
import LaunchIcon from "@mui/icons-material/Launch";

export default function Treasury() {

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
        name: 'Treasury',
        link: 'treasury'
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)
    navCrumbs.push(chainNav);
    navCrumbs.push(feesNav);


    const [activeNetwork] = useActiveNetworkVersion()
    //Fetch debank data
    const TREASURY_CONFIG = getTreasuryConfig(activeNetwork.chainId);
    const {portfolio} = useGetPortfolio(TREASURY_CONFIG.treasury);
    const karpatkeyPortfolio = useGetPortfolio(KARPATKEY_SAFE);
    const opcoPortfolio = useGetPortfolio(OPCO_SAFE);
    const {totalBalances} = useGetTotalBalances(TREASURY_CONFIG.treasury);
    const karpatkeyBalances = useGetTotalBalances(KARPATKEY_SAFE);
    const opcoBalances = useGetTotalBalances(OPCO_SAFE);


    let totalStablecoinValue = 0
    if (portfolio &&  totalBalances &&
        karpatkeyPortfolio && karpatkeyPortfolio.portfolio  && karpatkeyBalances && karpatkeyBalances.totalBalances &&
        opcoPortfolio && opcoPortfolio.portfolio && opcoBalances && opcoBalances.totalBalances
    ) {

        const portfolioValue = calculatePortfolioStablecoinValue([...portfolio, ...karpatkeyPortfolio.portfolio, ...opcoPortfolio.portfolio]);
        const balancesValue = calculateTokenBalancesStablecoinValue([...totalBalances, ...karpatkeyBalances.totalBalances, ...opcoBalances.totalBalances]);
        totalStablecoinValue = portfolioValue + balancesValue;
    }


    //Obtain wallet total worth and USDC
    const walletTokenNetworth = totalBalances && karpatkeyBalances.totalBalances ?
        totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0)
        + karpatkeyBalances.totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    const karpatkeyTokenNetworth = karpatkeyBalances.totalBalances ? karpatkeyBalances.totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    let netWorth = portfolio && karpatkeyPortfolio.portfolio ?
        portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0)
        + karpatkeyPortfolio.portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0)
        : 0;
    let karpatkeyNetworth = karpatkeyPortfolio.portfolio ?
        karpatkeyPortfolio.portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0
    netWorth += walletTokenNetworth;
    const usdcReserves = totalBalances && karpatkeyBalances.totalBalances ? totalBalances.find(el => {
        if (el.symbol === 'USDC') {
            return el
        } else {
            return 0
        }
    })?.amount : 0;

    const karpatkeyusdcReserves = karpatkeyBalances.totalBalances ? karpatkeyBalances.totalBalances.find(el => {
        if (el.symbol === 'USDC') {
            return el
        } else {
            return 0
        }
    })?.amount : 0;

    const opcoUsdcReserves = opcoBalances.totalBalances ? opcoBalances.totalBalances.find(el => {
        if (el.symbol === 'USDC') {
            return el
        } else {
            return 0
        }
    })?.amount : 0;

    const totalUSDCReserves = usdcReserves && karpatkeyusdcReserves !== undefined && opcoUsdcReserves !== undefined ? usdcReserves + karpatkeyusdcReserves + opcoUsdcReserves : usdcReserves;

    //BAL insurance fund
    const BALinsuranceAmount = activeNetwork === EthereumNetworkInfo ? 1250000 : 0;


    // Calculate the sum of the portfolio values
    const portfolioValue = portfolio ? portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0;
    const karpatkeyPortfolioValue = karpatkeyPortfolio.portfolio ? karpatkeyPortfolio.portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0;

// Calculate the sum of the token balances
    const totalTokenBalance = totalBalances ? totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    const karpatkeyTokenBalance = karpatkeyBalances.totalBalances ? karpatkeyBalances.totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    const opcoTokenBalances = opcoBalances.totalBalances ? opcoBalances.totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;

// Sum up all the values
    const totalAssetValue = portfolioValue + karpatkeyPortfolioValue + totalTokenBalance + karpatkeyTokenBalance + opcoTokenBalances;


    //Token Balances Pie Chart
    const tokenPieChartData: BalancerPieChartDataItem[] | null = totalBalances ? totalBalances.filter(
        x => x.chain === activeNetwork.debankId &&
            x.amount * x.price > 10).map((balance) => {
            return {
                value: balance.amount * balance.price,
                name: balance.symbol
            }
        }
    ) : null;

    //Token balances Karpatkey
    const tokenPieChartDataKarpatkey: BalancerPieChartDataItem[] | null = karpatkeyBalances.totalBalances ? karpatkeyBalances.totalBalances.filter(
        x => x.chain === activeNetwork.debankId &&
            x.amount * x.price > 10).map((balance) => {
            return {
                value: balance.amount * balance.price,
                name: balance.symbol
            }
        }
    ) : null;

    const ratioPieChartData = [];

// Add main address token value
    if (totalTokenBalance > 0) {
        ratioPieChartData.push({
            value: totalTokenBalance - BALinsuranceAmount,
            name: 'Treasury Tokens'
        });
    }

// Add Karpatkey token value
    if (karpatkeyTokenBalance > 0) {
        ratioPieChartData.push({
            value: karpatkeyTokenBalance,
            name: 'Karpatkey Managed Tokens'
        });
    }
    // Add OpCo token value
    if (opcoTokenBalances > 0) {
        ratioPieChartData.push({
            value: opcoTokenBalances,
            name: 'OpCo Treasury Tokens'
        });
    }

// Add portfolio values
    if (portfolioValue > 0) {
        ratioPieChartData.push({
            value: portfolioValue,
            name: 'Treasury Portfolio Liquidity'
        });
    }

    if (karpatkeyPortfolioValue > 0) {
        ratioPieChartData.push({
            value: karpatkeyPortfolioValue,
            name: 'Karpatkey Managed Liquidity'
        });
    }

    // Add Foundation BAL Insurance
    if (activeNetwork === EthereumNetworkInfo) {
        ratioPieChartData.push({
            value: BALinsuranceAmount,
            name: 'Foundation BAL Insurance'
        });
    }

    console.log("totalASsetValue", totalAssetValue)
    console.log("ratioPieChartData", ratioPieChartData)

    return (
        <Box sx={{flexGrow: 2}}>
            {totalBalances && portfolio ?
                <Grid
                    container
                    spacing={1}
                    sx={{justifyContent: 'center'}}
                >
                    <Grid item xs={11}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name}/>
                        </Box>

                    </Grid>
                    <Grid mt={2} mb={1} item xs={11}>
                        <Box display="flex" alignItems="center">
                            <Box>
                                <Typography variant={"h5"}>Treasury Metrics on {activeNetwork.name}</Typography>
                            </Box>
                        </Box>
                        <Typography variant={"body2"}>
                            Combined views of the treasury wallets for the given network. Consult the docs or a full list of treasury wallets
                            <Link target="_blank" href={'https://docs.balancer.fi/concepts/governance/multisig.html#the-multisigs-and-their-addresses'}><LaunchIcon sx={{height: '20px'}}/></Link>
                        </Typography>

                    </Grid>

                    {totalBalances && portfolio ?
                        <Grid item xs={11}>
                            <Grid
                                container
                                columns={{xs: 4, sm: 8, md: 12}}
                                sx={{justifyContent: {md: 'flex-start', xs: 'center'}, alignContent: 'center'}}
                            >
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={netWorth}
                                        mainMetricInUSD={true}
                                        metricName='Net Worth'
                                        mainMetricChange={0}
                                        MetricIcon={AccountBalanceIcon}
                                    />
                                </Box>
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={walletTokenNetworth}
                                        mainMetricInUSD={true}
                                        metricName='Tokens in Wallets'
                                        mainMetricChange={0}
                                        MetricIcon={WalletIcon}
                                        toolTipText={'Combined net worth of tokens in the treasury, Karpatkey and OpCo wallets unless otherwise specified.'}
                                    />
                                </Box>
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={totalUSDCReserves ? totalUSDCReserves : 0}
                                        mainMetricInUSD={true}
                                        metricName='Liquid USDC'
                                        mainMetricChange={0}
                                        MetricIcon={CurrencyExchangeIcon}
                                        toolTipText={'Combined net worth of USDC in the treasury, Karpatkey and OpCo wallets unless otherwise specified.'}
                                    />
                                </Box>
                                <Box mr={1}>
                                    <MetricsCard
                                        mainMetric={totalStablecoinValue}
                                        mainMetricInUSD={true}
                                        metricName='Total Stable Coins'
                                        mainMetricChange={0}
                                        MetricIcon={LocalAtmIcon}
                                        toolTipText={"USD value of all assets combined resembling stable coins like sDAI, DAI, USDC, USDT etc."}
                                    />
                                </Box>
                            </Grid>
                        </Grid> : null}
                    {ratioPieChartData && ratioPieChartData.length > 0 ?
                        <Grid
                            container
                            sx={{direction: {xs: 'column', sm: 'row'}}}
                            justifyContent="center"
                            alignItems="left"
                            alignContent="left"
                            spacing={1}
                        >
                            <Grid
                                item
                                mt={2}
                                xs={11}
                                md={5.5}
                            >
                                <Box mb={1}>
                                    <Card
                                        sx={{boxShadow: 3}}>
                                        <Box p={1}>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="h6"
                                            >
                                                Asset Distribution
                                            </Typography>
                                        </Box>
                                        <GenericPieChart data={ratioPieChartData} height='295px'/>
                                    </Card>
                                </Box>

                            </Grid>
                            {tokenPieChartData && tokenPieChartData.length > 0 && tokenPieChartDataKarpatkey && tokenPieChartDataKarpatkey.length > 0 ?
                                <Grid
                                    item
                                    xs={11}
                                    mt={2}
                                    md={5.5}
                                >
                                    <Card sx={{boxShadow: 3}}>
                                        <Box p={1}>
                                            <Typography
                                                color="textSecondary"
                                                gutterBottom
                                                variant="h6"
                                            >
                                                Token distribution
                                            </Typography>
                                        </Box>
                                        <GenericPieChart
                                            data={mergeArrays(tokenPieChartData, tokenPieChartDataKarpatkey)}
                                            height='295px'/>
                                    </Card>
                                </Grid> : null}
                        </Grid>
                        : null}
                    <Grid
                        item
                        mt={1}
                        xs={11}
                    >
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="row">
                                    <Typography variant="h6"> DAO Treasury </Typography>

                                    <Box ml={1}>
                                        <StyledExternalLink address={TREASURY_CONFIG.treasury} type={'debank'}
                                                            activeNetwork={activeNetwork}/>
                                    </Box>

                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">Tokens in Treasury Wallet</Typography>
                                {totalBalances && totalBalances.length > 0 ?
                                    <FeeCollectorTokenTable tokenBalances={totalBalances}/>
                                    : null}
                                <Typography variant="h6">Liquidity Provisions</Typography>
                                <Card
                                    sx={{boxShadow: 3}}
                                >
                                    <Box p={2}>
                                        {portfolio && portfolio.length > 0 ?
                                            portfolio.map(pos =>
                                                pos.chain === activeNetwork.debankId ?
                                                    <Box key={pos.id + "box"} mb={1}>
                                                        <LiquidityPosition key={'treasury'} position={pos}/>
                                                    </Box> : undefined
                                            )
                                            : <Typography>none</Typography>}
                                    </Box>
                                </Card>
                            </AccordionDetails>
                        </Accordion>

                    </Grid>
                    {activeNetwork === EthereumNetworkInfo ?
                    <Grid
                        item
                        mt={2}
                        xs={11}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="row">
                                    <Typography variant="h6"> Assets Managed by Karpatkey </Typography>

                                    <Box ml={1}>
                                        <StyledExternalLink address={KARPATKEY_SAFE} type={'debank'}
                                                            activeNetwork={activeNetwork}/>
                                    </Box>

                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>

                                        <Typography variant="h6">Managed Tokens</Typography>

                                {karpatkeyBalances.totalBalances && karpatkeyBalances.totalBalances.length > 0 ?

                                        <FeeCollectorTokenTable tokenBalances={karpatkeyBalances.totalBalances}/> : null}
                                <Typography variant="h6">Managed Liquidity Provisions</Typography>
                                <Card
                                    sx={{boxShadow: 3}}
                                >
                                    <Box p={2}>
                                        {karpatkeyPortfolio.portfolio && karpatkeyPortfolio.portfolio.length > 0 ?
                                            karpatkeyPortfolio.portfolio.map(pos =>
                                                pos.chain === activeNetwork.debankId ?
                                                    <Box key={pos.id + "box"} mb={1}>
                                                        <LiquidityPosition key={'karpatkey'} position={pos}/>
                                                    </Box> : <Typography>none</Typography>
                                            )
                                            : <Typography>none</Typography>}
                                    </Box>
                                </Card>
                            </AccordionDetails>
                        </Accordion>
                    </Grid> : null }
                    {activeNetwork === EthereumNetworkInfo ?
                    <Grid
                        item
                        mt={2}
                        xs={11}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="row">
                                    <Typography variant="h6"> Assets Managed by OpCo</Typography>

                                    <Box ml={1}>
                                        <StyledExternalLink address={OPCO_SAFE} type={'debank'}
                                                            activeNetwork={activeNetwork}/>
                                    </Box>

                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">Managed Tokens</Typography>
                                {opcoBalances.totalBalances && opcoBalances.totalBalances.length > 0 ?
                                    <FeeCollectorTokenTable tokenBalances={opcoBalances.totalBalances}/> : null}
                            </AccordionDetails>
                        </Accordion>
                    </Grid> : null }
                    <Grid mb={2} item xs={11}>

                    </Grid>

                </Grid>
                :
                <Grid
                    container
                    spacing={2}
                    mt='25%'
                    sx={{justifyContent: 'center'}}
                >
                    <CustomLinearProgress/>
                </Grid>}
        </Box>
    );
}