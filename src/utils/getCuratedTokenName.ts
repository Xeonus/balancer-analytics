import { MKR, SWAPR } from "../constants/index";
import { TokenData } from "../data/balancer/balancerTypes";

export default function getCuratedTokenName(tokenData: TokenData) {
    //check if token-symbol is consistent via symbol check. If not, curate name from curated cases
    switch (tokenData.address){
        case MKR.address.toLowerCase(): return MKR.symbol;
        case SWAPR.address.toLowerCase(): return SWAPR.symbol;
        default: tokenData.symbol;
    }
    return tokenData.symbol;
}