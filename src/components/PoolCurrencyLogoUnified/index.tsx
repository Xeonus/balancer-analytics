import { Box } from '@mui/material';
import CurrencyLogo from '../CurrencyLogo';
import AvatarGroup from '@mui/material/AvatarGroup';
import {PoolTokenDataUnified} from "../../data/balancer-api-v3/balancerUnifiedTypes";

interface PoolCurrencyLogoProps {
    margin?: boolean;
    size?: string;
    tokens: PoolTokenDataUnified[]
}

export default function PoolCurrencyLogoUnified({ tokens, size = '25px'}: PoolCurrencyLogoProps) {
    const filteredTokens = tokens.filter((token) => ! token.symbol.includes('BPT') && ! token.symbol.includes('/') || token.isMainToken)
    return(
        <Box position={"relative"} display="flex">
            <AvatarGroup max={8}>
                {filteredTokens.map((token) => <CurrencyLogo key={token.address + Math.random()*10} address={token.address === 'eth' ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' : token.address} size={size} /> )}
            </AvatarGroup>
        </Box>
    );
}