

import { Box } from '@mui/material';
import CurrencyLogo from '../CurrencyLogo';
import AvatarGroup from '@mui/material/AvatarGroup';

interface PoolCurrencyLogoProps {
    margin?: boolean;
    size?: string;
    tokens: { address: string }[];
}

export default function PoolCurrencyLogo({ tokens, size = '25px'}: PoolCurrencyLogoProps) {
    return(
        <Box position={"relative"} display="flex">
        <AvatarGroup max={8}>
            {tokens.map((token) => <CurrencyLogo key={token.address + Math.random()*10} address={token.address === 'eth' ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' : token.address} size={size} /> )}
        </AvatarGroup>
        </Box>
    );
}