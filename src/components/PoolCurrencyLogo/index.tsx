

import { styled } from '@mui/material/styles';
import CurrencyLogo from '../CurrencyLogo';
import AvatarGroup from '@mui/material/AvatarGroup';

interface PoolCurrencyLogoProps {
    margin?: boolean;
    size?: number;
    tokens: { address: string }[];
}

export default function PoolCurrencyLogo({ tokens, size = 20, margin = true }: PoolCurrencyLogoProps) {
    return(
        <AvatarGroup sx={{alignItems:"left"}}>
            {tokens.map((token) => <CurrencyLogo address={token.address}/> )}
        </AvatarGroup>
    );
}