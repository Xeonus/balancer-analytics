import { PoolData } from "../../data/balancer/balancerTypes";
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";
import { Avatar, Box } from "@mui/material";
import CurrencyLogo from '../CurrencyLogo';
import { NetworkInfo } from "../../constants/networks";
import { networkPrefix } from "../../utils/networkPrefix";
import { useActiveNetworkVersion } from "../../state/application/hooks";


interface PoolCompositionProps {
    poolData: PoolData;
    size?: number;
}

const getLink = (activeNetwork: NetworkInfo, id: string) => {
    return networkPrefix(activeNetwork) + 'tokens/' + id;
}

export default function PoolCompositionWithLogos({ poolData, size = 24 }: PoolCompositionProps) {

    const theme = useTheme();
    const [activeNetwork] = useActiveNetworkVersion()
    let navigate = useNavigate();

    poolData.tokens = poolData.tokens.filter((tokens) => tokens.balance < 2596140000000000);
    return (
        <Box 
        position={"relative"} 
        display="flex" 
        alignItems={"center"} 
        sx={{ 
            overflow: 'auto', 
            maxWidth: {xs: '250px', md: '900px'} }}
        >
                {poolData.tokens.map((token) =>
                <Box mr={1}>
                    <Avatar
                        key={token.address + Math.random() * 10}
                        onClick={() => { navigate(`${getLink(activeNetwork, token.address)}/`); }}
                        variant="rounded"
                        sx={{
                            height: size,
                            width: 'auto',
                            borderColor: theme.palette.mode === 'dark' ? 'rgb(30, 41, 59)' : 'gb(241, 245, 249)',
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        <Box ml={1}>
                            <CurrencyLogo key={token.address} address={token.address} size='20px' />
                        </Box>
                        <Box m={1} display="flex" justifyContent="space-between">
                            <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'} mr={0.25} sx={{ fontWeight: 'bold' }} variant="caption">{token.symbol}</Typography>
                            {poolData.poolType === 'Weighted' ?
                                <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'} variant="caption">{Number((token.weight * 100).toFixed(0))}%</Typography>
                                : null}
                        </Box>
                    </Avatar>
                    </Box>
                )}
        </Box>
    )
}