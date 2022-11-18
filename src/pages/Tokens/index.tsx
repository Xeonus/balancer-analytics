import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles'
import { Typography, Stack, Box } from '@mui/material';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useBalancerTokens } from '../../data/balancer/useTokens';
import TokenTable from '../../components/Tables/TokenTable';
import { Grid } from '@mui/material';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import MetricsCard from '../../components/Cards/MetricsCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CoinCard from '../../components/Cards/CoinCard';
import { TokenData } from '../../data/balancer/balancerTypes';

export default function Tokens() {

    const theme = useTheme();
    const [activeNetwork] = useActiveNetworkVersion();
    let tokenDatas = useBalancerTokens();
    tokenDatas = tokenDatas.filter(x => x.tvlUSD < 10000000000)

    const [topGainerToken, setTopGainerToken] = useState({} as TokenData)
    const [topLoserToken, setTopLoserToken] = useState({} as TokenData)
    useEffect(() => {
        if (tokenDatas && tokenDatas.length > 10) {
        const topGainer = tokenDatas.reduce(function (prev, current) {
            return (prev.priceUSDChange * 100 > current.priceUSDChange * 100) ? prev : current
        })
        const topLoser = tokenDatas.reduce(function (prev, current) {
            return (prev.priceUSDChange < current.priceUSDChange) ? prev : current
        })
        if (topGainer) {
            setTopGainerToken(topGainer)
        }
        if (topLoser) {
            setTopLoserToken(topLoser)
        }
    }
    }, [tokenDatas.length > 200]);

    return (
        <Grid item xs={12}>
            <Typography variant="h5" mb={1}>Tokens Overview ({activeNetwork.name})</Typography>

            {tokenDatas.length > 10 ?
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <CoinCard
                            tokenPrice={topGainerToken.priceUSD}
                            tokenPriceChange={topGainerToken.priceUSDChange}
                            tokenName={'Gainer: ' + topGainerToken.symbol}
                            tokenAddress={topGainerToken.address}
                        />
                        <CoinCard
                            tokenPrice={topLoserToken.priceUSD}
                            tokenPriceChange={topLoserToken.priceUSDChange}
                            tokenName={'Loser: ' + topLoserToken.symbol}
                            tokenAddress={topLoserToken.address}
                        />
                    </Stack>
                    <Box mt={2}>
                        <TokenTable tokenDatas={tokenDatas} />
                    </Box>
                </Grid>

                :
                <Grid
                    container
                    spacing={2}
                    mt='25%'
                    sx={{ justifyContent: 'center' }}
                >
                    <CustomLinearProgress />
                </Grid>
            }
        </Grid>

    );
}