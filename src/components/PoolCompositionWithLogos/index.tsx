import { PoolData } from "../../data/balancer/balancerTypes";
import { useTheme } from '@mui/material/styles'
import { AvatarGroup, Typography } from "@mui/material";
import { Avatar, Box } from "@mui/material";
import { formatPercentageAmount } from '../../utils/numbers'
import CurrencyLogo from '../CurrencyLogo';

interface PoolCompositionProps {
    poolData: PoolData;
    size?: number;
}

export default function PoolCompositionWithLogos({ poolData, size = 24 }: PoolCompositionProps) {

    const theme = useTheme();

    poolData.tokens = poolData.tokens.filter((tokens) => tokens.balance < 2596140000000000);
    return (
        <Box position={"relative"} display="flex" alignItems={"center"}>
                {poolData.tokens.map((token) =>
                <Box mr={1}>
                    <Avatar
                        key={token.address + Math.random() * 10}
                        variant="rounded"
                        sx={{
                            height: size,
                            width: size * 3.75,
                            borderColor: theme.palette.mode === 'dark' ? 'rgb(30, 41, 59)' : 'gb(241, 245, 249)',
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Box mr={1}>
                            <CurrencyLogo key={token.address} address={token.address} size='20px' />
                        </Box>
                        <Box display="flex" justifyContent="space-between">
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