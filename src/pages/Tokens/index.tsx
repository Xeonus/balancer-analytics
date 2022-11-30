import { useEffect, useState } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useBalancerTokens } from '../../data/balancer/useTokens';
import TokenTable from '../../components/Tables/TokenTable';
import { Grid } from '@mui/material';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import CoinCard from '../../components/Cards/CoinCard';
import { TokenData } from '../../data/balancer/balancerTypes';


export default function Tokens() {

    const [activeNetwork] = useActiveNetworkVersion();
    let tokenDatas = useBalancerTokens();
    tokenDatas = tokenDatas.filter(x => x.tvlUSD < 10000000000)

    const [topGainerToken, setTopGainerToken] = useState({} as TokenData)
    const [topLoserToken, setTopLoserToken] = useState({} as TokenData)
    useEffect(() => {
        if (tokenDatas && tokenDatas.length > 10) {
            const topGainer = tokenDatas.reduce(function (prev, current) {
                return (prev.priceUSDChange > current.priceUSDChange) ? prev : current
            })
            const topLoser = tokenDatas.reduce(function (prev, current) {
                return (prev.priceUSDChange > current.priceUSDChange) ? current : prev
            })
            if (topGainer) {
                setTopGainerToken(topGainer)
            }
            if (topLoser) {
                setTopLoserToken(topLoser)
            }
        }
    }, [JSON.stringify(tokenDatas)]);

    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'center' }}
            >
                <Grid item xs={10}>
                    <Typography variant="h5" mb={1}>Tokens Overview ({activeNetwork.name})</Typography>
                </Grid>
                    {topGainerToken.address && topLoserToken.address ?
                        <Grid item xs={10}>
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
        </Box>
    );
}