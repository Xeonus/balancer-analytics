import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useBalancerTokens } from '../../data/balancer/useTokens';
import TokenTable from '../../components/Tables/TokenTable';
import { Grid } from '@mui/material';


export default function Tokens() {

    const theme = useTheme();
    const [activeNetwork] = useActiveNetworkVersion();
    let tokenDatas = useBalancerTokens();
    tokenDatas = tokenDatas.filter(x => x.tvlUSD < 10000000000)

    return (
        <Grid item xs={12}>
        <Typography variant="h5" mb={1}>Tokens Overview ({activeNetwork.name})</Typography>
        <TokenTable tokenDatas={tokenDatas} />
        </Grid>
        
    );
}