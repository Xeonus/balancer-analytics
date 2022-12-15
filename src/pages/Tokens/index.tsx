import { Typography, Box } from '@mui/material';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useBalancerTokens } from '../../data/balancer/useTokens';
import TokenTable from '../../components/Tables/TokenTable';
import { Grid } from '@mui/material';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';


export default function Tokens() {

    const [activeNetwork] = useActiveNetworkVersion();
    let tokenDatas = useBalancerTokens();
    tokenDatas = tokenDatas.filter(x => x.tvlUSD < 10000000000)

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
                    {tokenDatas ?
                        <Grid item xs={10}>
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