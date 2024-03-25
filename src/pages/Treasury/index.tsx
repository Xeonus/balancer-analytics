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
import {formatDollarAmount} from "../../utils/numbers";

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

    //Obtain per wallet token value
    const treasuryTokenBalances = totalBalances  ?
        totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0

    const karpatkeyTokenBalances = karpatkeyBalances && karpatkeyBalances.totalBalances ?
        karpatkeyBalances.totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0

    const opcoTokenBalances = opcoBalances && opcoBalances.totalBalances ?
        opcoBalances.totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0

    //Obtain per wallet Portfolio (LP) value
    const treasuryPortfolioValue = portfolio ?
        portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0

    const karpatkeyPortfolioValue = karpatkeyPortfolio && karpatkeyPortfolio.portfolio ?
        karpatkeyPortfolio.portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0

    const opcoPortfolioValue = opcoPortfolio && opcoPortfolio.portfolio ?
        opcoPortfolio.portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0


    const usdcReserves = totalBalances ? totalBalances.find(el => el.symbol === 'USDC')?.amount ?? 0 : 0;
    const karpatkeyUsdcReserves = karpatkeyBalances.totalBalances ? karpatkeyBalances.totalBalances.find(el => el.symbol === 'USDC')?.amount ?? 0 : 0;
    const opcoUsdcReserves = opcoBalances.totalBalances ? opcoBalances.totalBalances.find(el => el.symbol === 'USDC')?.amount ?? 0 : 0;

    const totalUSDCReserves = usdcReserves + karpatkeyUsdcReserves + opcoUsdcReserves

    //BAL insurance fund
    const BALinsuranceAmount = activeNetwork === EthereumNetworkInfo ? 1250000 : 0;
    // Sum up all the values
    const totalAssetValue = treasuryTokenBalances + karpatkeyTokenBalances + opcoTokenBalances + treasuryPortfolioValue + karpatkeyPortfolioValue + opcoPortfolioValue;


    //Treasury Token Balances Pie Chart
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

    const tokenPieChartDataOpco: BalancerPieChartDataItem[] | null = opcoBalances.totalBalances ? opcoBalances.totalBalances.filter(
        x => x.chain === activeNetwork.debankId &&
            x.amount * x.price > 10).map((balance) => {
            return {
                value: balance.amount * balance.price,
                name: balance.symbol
            }
        }
    ) : null;

    const ratioPieChartData = [];

    let overallTokenDistro : BalancerPieChartDataItem[] = []

    if (tokenPieChartData && tokenPieChartDataKarpatkey && tokenPieChartDataOpco) {
        const mergedAssets = mergeArrays(tokenPieChartData, tokenPieChartDataKarpatkey);
        overallTokenDistro = mergeArrays(mergedAssets, tokenPieChartDataOpco);
    }


// Add main address token value
    if (treasuryTokenBalances > 0) {
        ratioPieChartData.push({
            value: treasuryTokenBalances - BALinsuranceAmount,
            name: 'Treasury Tokens (*)'
        });
    }

// Add Karpatkey token value
    if (karpatkeyTokenBalances > 0) {
        ratioPieChartData.push({
            value: karpatkeyTokenBalances,
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
    if (treasuryPortfolioValue > 0) {
        ratioPieChartData.push({
            value: treasuryPortfolioValue,
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

    //OpCo Portfolio
    if (opcoPortfolioValue > 0) {
        ratioPieChartData.push({
            value: opcoPortfolioValue,
            name: 'OpCo Portfolio Liquidity'
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
                                        mainMetric={totalAssetValue}
                                        mainMetricInUSD={true}
                                        metricName='Net Worth'
                                        mainMetricChange={0}
                                        MetricIcon={AccountBalanceIcon}
                                    />
                                </Box>
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={treasuryTokenBalances + karpatkeyTokenBalances + opcoTokenBalances}
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
                                                Asset Allocation across Safes
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
                                                Liquid Token Distribution across Safes (non-LPs)
                                            </Typography>
                                        </Box>
                                        <GenericPieChart
                                            data={overallTokenDistro}
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
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                    {/* Left side content */}
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
                                        {/* First Row: Title and External Link */}
                                        <Box display="flex" justifyContent="flex-start" alignItems="center">
                                            <Typography variant="h6">DAO Treasury</Typography>
                                            <Box ml={1}>
                                                <StyledExternalLink address={TREASURY_CONFIG.treasury} type={'debank'} activeNetwork={activeNetwork} />
                                            </Box>
                                        </Box>

                                        {/* Description */}
                                        <Typography variant="caption">
                                            The DAO Treasury is the main treasury wallet holding all DAO tokens incl. BAL held in the wallet and as liquidity positions.
                                        </Typography>
                                    </Box>
                                    <Box mr={2}>
                                        <Typography variant="h6" align="right">{formatDollarAmount(treasuryPortfolioValue + treasuryTokenBalances)}</Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                    {/* Left side content */}
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
                                        {/* First Row: Title and External Link */}
                                        <Box display="flex" justifyContent="flex-start" alignItems="center">
                                            <Typography variant="h6">Tokens in Treasury Wallet</Typography>
                                        </Box>
                                        <Typography variant="caption">
                                            (*) Note that out of the BAL reserves reported hereafter, $1.25m are reserved for the DAO insurance fund and deducted in the asset distribution pie chart.
                                        </Typography>
                                    </Box>
                                    <Box mr={2}>
                                        <Typography variant="h6" align="right">{formatDollarAmount(treasuryTokenBalances)}</Typography>
                                    </Box>
                                </Box>
                                {totalBalances && totalBalances.length > 0 ?
                                    <FeeCollectorTokenTable tokenBalances={totalBalances}/>
                                    : null}
                                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={3}>
                                    {/* Left side content */}
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
                                        {/* First Row: Title and External Link */}
                                        <Box display="flex" justifyContent="flex-start" alignItems="center">
                                            <Typography variant="h6">Liquidity Provisions</Typography>
                                        </Box>
                                    </Box>
                                    <Box mr={2}>
                                        <Typography variant="h6" align="right">{formatDollarAmount(treasuryPortfolioValue)}</Typography>
                                    </Box>
                                </Box>
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
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                    {/* Left side content */}
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
                                        {/* First Row: Title and External Link */}
                                        <Box display="flex" justifyContent="flex-start" alignItems="center">
                                            <Typography variant="h6">Karpatkey-managed Assets</Typography>
                                            <Box ml={1}>
                                                <StyledExternalLink address={KARPATKEY_SAFE} type={'debank'} activeNetwork={activeNetwork}/>
                                            </Box>
                                        </Box>

                                        {/* Description */}
                                        <Typography variant="caption">
                                            These are DAO funds that are managed by Karpatkey to generate passive income for the treasury.
                                        </Typography>
                                    </Box>
                                    <Box mr={2}>
                                        <Typography variant="h6" align="right">{formatDollarAmount(karpatkeyTokenBalances + karpatkeyPortfolioValue)}</Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                    {/* Left side content */}
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
                                        {/* First Row: Title and External Link */}
                                        <Box display="flex" justifyContent="flex-start" alignItems="center">
                                            <Typography variant="h6">Managed Tokens</Typography>
                                        </Box>
                                    </Box>
                                    <Box mr={2}>
                                        <Typography variant="h6" align="right">{formatDollarAmount(karpatkeyTokenBalances)}</Typography>
                                    </Box>
                                </Box>

                                {karpatkeyBalances.totalBalances && karpatkeyBalances.totalBalances.length > 0 ?

                                        <FeeCollectorTokenTable tokenBalances={karpatkeyBalances.totalBalances}/> : null}
                                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={3}>
                                    {/* Left side content */}
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
                                        {/* First Row: Title and External Link */}
                                        <Box display="flex" justifyContent="flex-start" alignItems="center">
                                            <Typography variant="h6">Managed Liquidity Provisions</Typography>
                                        </Box>
                                    </Box>
                                    <Box mr={2}>
                                        <Typography variant="h6" align="right">{formatDollarAmount(karpatkeyPortfolioValue)}</Typography>
                                    </Box>
                                </Box>
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
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                    {/* Left side content */}
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
                                        {/* First Row: Title and External Link */}
                                        <Box display="flex" justifyContent="flex-start" alignItems="center">
                                            <Typography variant="h6">Balancer OpCo</Typography>
                                            <Box ml={1}>
                                                <StyledExternalLink address={OPCO_SAFE} type={'debank'} activeNetwork={activeNetwork}/>
                                            </Box>
                                        </Box>

                                        {/* Description */}
                                        <Typography variant="caption">
                                            These funds are part of OpCo and the foundation. Parts of the USDC reserves stem from BAL OTC sales. These funds may be used to fund Service Providers like the front-end team.
                                        </Typography>
                                    </Box>
                                    <Box mr={2}>
                                        <Typography variant="h6" align="right">{formatDollarAmount(opcoTokenBalances + opcoPortfolioValue)}</Typography>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                    {/* Left side content */}
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="start">
                                        {/* First Row: Title and External Link */}
                                        <Box display="flex" justifyContent="flex-start" alignItems="center">
                                            <Typography variant="h6">Managed Tokens</Typography>
                                        </Box>
                                    </Box>
                                    <Box mr={2}>
                                        <Typography variant="h6" align="right">{formatDollarAmount(opcoTokenBalances)}</Typography>
                                    </Box>
                                </Box>
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