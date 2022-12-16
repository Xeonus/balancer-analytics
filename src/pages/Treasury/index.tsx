import * as React from 'react';
import { Typography, Grid, Box, Card, Divider, Stack, CircularProgress } from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { NavElement } from '../../components/NavCrumbs';
import NavCrumbs from '../../components/NavCrumbs';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { getTreasuryConfig } from "../../constants/wallets";
import { useGetTotalBalances } from "../../data/debank/useGetTotalBalances";
import { useGetPortfolio } from '../../data/debank/useGetPortfolio';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';
import StyledExternalLink from '../../components/StyledExternalLink';
import CoinCard from '../../components/Cards/CoinCard';
import MetricsCard from '../../components/Cards/MetricsCard';
import FeeCollectorTokenTable from "../../components/Tables/FeeCollectorTokenTable";
import LiquidityPosition from '../../components/LiquidityPosition';

export default function Treasury() {

    //TODO: obtain form contants
    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    //Data
    const coinData = useCoinGeckoSimpleTokenPrices([balAddress]);


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
        link: 'fees'
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)
    navCrumbs.push(chainNav);
    navCrumbs.push(feesNav);


    const [activeNetwork] = useActiveNetworkVersion()
    const TREASURY_CONFIG = getTreasuryConfig(activeNetwork.chainId);
    const { portfolio } = useGetPortfolio(TREASURY_CONFIG.treasury);
    const { totalBalances } = useGetTotalBalances(TREASURY_CONFIG.treasury);

    console.log("portfolio", portfolio)

    //Obtain wallet total worth and USDC
    const walletTokenNetworth = totalBalances ? totalBalances.reduce((acc, el) => acc + el.amount * el.price, 0) : 0;
    let netWorth = portfolio ? portfolio.reduce((acc, el) => el.portfolio_item_list.reduce((p, pel) => p + pel.stats.net_usd_value, 0) + acc, 0) : 0;
    netWorth += walletTokenNetworth;
    const usdcReserves = totalBalances ? totalBalances.find(el => {
        if (el.symbol === 'USDC') {
            return el
        }
    })?.amount : 0;
    console.log("walletTokenNetworth", walletTokenNetworth);
    console.log("usdcReserves", usdcReserves)

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
                            <Typography variant={"h5"}>Treasury Metrics on {activeNetwork.name}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={10}
                >
                    <Stack direction="row" spacing={2} justifyContent="flex-start">
                        {coinData && coinData[balAddress] && coinData[balAddress].usd ?
                            <CoinCard
                                tokenAddress={balAddress}
                                tokenName='BAL'
                                tokenPrice={coinData[balAddress].usd}
                                tokenPriceChange={coinData[balAddress].usd_24h_change}

                            />
                            : <CircularProgress />}
                        <MetricsCard
                            mainMetric={netWorth}
                            mainMetricInUSD={true}
                            metricName='Net Worth'
                            mainMetricChange={0}
                            MetricIcon={WalletIcon}
                        />
                        <MetricsCard
                            mainMetric={walletTokenNetworth}
                            mainMetricInUSD={true}
                            metricName='Tokens in Wallet'
                            mainMetricChange={0}
                            MetricIcon={WalletIcon}
                        />
                        <MetricsCard
                            mainMetric={usdcReserves ? usdcReserves : 0}
                            mainMetricInUSD={true}
                            metricName='USDC Reserves'
                            mainMetricChange={0}
                            MetricIcon={CurrencyExchangeIcon}
                        />
                    </Stack>
                </Grid>
                <Grid mt={2} item xs={10}>
                    <Box display="flex" alignItems='center'>
                        <Typography variant="h5">Tokens in Treasury Wallet</Typography>
                        <Box ml={1}>
                            <StyledExternalLink address={TREASURY_CONFIG.treasury} type={'address'} activeNetwork={activeNetwork} />
                        </Box>
                    </Box>
                </Grid>
                {totalBalances ?
                    <Grid item xs={10}>
                        <FeeCollectorTokenTable tokenBalances={totalBalances} />
                        <Grid mt={2} item xs={10}>
                            <Typography variant="h5">Liquidity Provisions</Typography>
                        </Grid>
                    </Grid> : null}
                {portfolio ?
                    portfolio.map(pos =>
                        <Grid item xs={10}>
                            <LiquidityPosition position={pos} />
                        </Grid>
                    )
                    : undefined}
            </Grid>
        </Box>
    );
}