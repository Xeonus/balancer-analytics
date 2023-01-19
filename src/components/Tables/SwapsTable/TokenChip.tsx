import { Box } from "@mui/system";
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";
import { BalancerSwapFragment } from "../../../apollo/generated/graphql-codegen-generated";
import CurrencyLogo from "../../CurrencyLogo";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Avatar } from "@mui/material";
import { NetworkInfo } from "../../../constants/networks";
import { networkPrefix } from "../../../utils/networkPrefix";
import { useActiveNetworkVersion } from "../../../state/application/hooks";
import { formatAmount } from "../../../utils/numbers";


interface TokenChipProps {
    swap: BalancerSwapFragment,
    size: number
}

const getLink = (activeNetwork: NetworkInfo, id: string) => {
    return networkPrefix(activeNetwork) + 'tokens/' + id;
}

export default function TokenChip({swap, size=35} : TokenChipProps) {

    const theme = useTheme();
    const [activeNetwork] = useActiveNetworkVersion()
    let navigate = useNavigate();

    return (
        <Box display='flex' alignItems='center' alignContent='center' flexDirection={'row'}>
            <Avatar
                key={swap.tokenIn + Math.random() * 10}
                onClick={() => { navigate(`${getLink(activeNetwork, swap.tokenIn)}/`); }}
                variant="rounded"
                sx={{
                    height: size,
                    width: size * 3,
                    borderColor: theme.palette.mode === 'dark' ? 'rgb(30, 41, 59)' : 'gb(241, 245, 249)',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                    boxShadow: 1,

                }}
            >
                <Box mr={1}>
                    <CurrencyLogo key={swap.tokenIn} address={swap.tokenIn} size='25px' />
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'} mr={0.25} sx={{ fontWeight: 'bold' }} variant="caption">{formatAmount(Number(swap.tokenAmountIn), 2)}</Typography>
                </Box>
            </Avatar>
            <Box ml={1} mr={1}>
                <ArrowForwardIcon />
            </Box>
            <Avatar
                key={swap.tokenOut + Math.random() * 10}
                onClick={() => { navigate(`${getLink(activeNetwork, swap.tokenIn)}/`); }}
                variant="rounded"
                sx={{
                    height: size,
                    width: size * 3,
                    borderColor: theme.palette.mode === 'dark' ? 'rgb(30, 41, 59)' : 'gb(241, 245, 249)',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                    boxShadow: 1,

                }}
            >
                <Box mr={1}>
                    <CurrencyLogo key={swap.tx} address={swap.tokenOut} size='25px' />
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'} mr={0.25} sx={{ fontWeight: 'bold' }} variant="caption">{formatAmount(Number(swap.tokenAmountOut), 2)}</Typography>
                </Box>
            </Avatar>
        </Box>
    );

}