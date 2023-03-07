import { Avatar, AvatarGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useActiveNetworkVersion } from "../../../state/application/hooks";
import { NetworkInfo } from "../../../constants/networks";
import { networkPrefix } from "../../../utils/networkPrefix";
import { useTheme } from '@mui/material/styles'
import CurrencyLogo from "../../CurrencyLogo";
import { formatAmount } from "../../../utils/numbers";

export interface JoinExitChipProps {
    amounts: string[], 
    tokenList: string[], 
    size: number
}

const getLink = (activeNetwork: NetworkInfo, id: string) => {
    return networkPrefix(activeNetwork) + 'tokens/' + id;
}

export default function JoinExitChip({amounts, tokenList, size}: JoinExitChipProps) {

    const [activeNetwork] = useActiveNetworkVersion();
    let navigate = useNavigate();
    const theme = useTheme();

    return(
        <Box display='flex' alignItems='center' alignContent='center' flexDirection={'row'}>
            <AvatarGroup max={4}
                variant="rounded"
                sx={{
                    '& .MuiAvatar-root': {
                        borderColor: theme.palette.mode === 'dark' ? 'rgb(30, 41, 59)' : 'gb(241, 245, 249)',
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                        marginLeft: '-0.5rem',
                        color: theme.palette.mode === 'dark' ? 'white' : 'black',
                        fontSize: '15px'
                    },
                }}
            >
        {tokenList.map((token => 
            Number(amounts[tokenList.indexOf(token)]) > 0 ?
            <Box 
                mr={1}
                key={token + Math.random() * 100 + amounts[tokenList.indexOf(token)]}
            >
                
             <Avatar
             key={token + Math.random() * 10 + amounts[tokenList.indexOf(token)]}
             onClick={() => { navigate(`${getLink(activeNetwork, token)}/`); }}
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
                <CurrencyLogo address={token} size={'25px'} />
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography color={theme.palette.mode === 'dark' ? 'white' : 'black'} mr={0.25} sx={{ fontWeight: 'bold' }} variant="caption">{formatAmount(Number(amounts[tokenList.indexOf(token)]), 2)}</Typography>
                </Box>
             </Avatar>
            </Box>  : null 
            ))}</AvatarGroup>
             
        </Box>
    );
}