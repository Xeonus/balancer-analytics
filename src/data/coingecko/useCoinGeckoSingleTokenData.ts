import { GetCoingeckoSingleTokenData } from "./getCoingeckoSingleTokenData";
import { useActiveNetworkVersion } from "../../state/application/hooks";


export function useCoinGeckoSingleTokenData(tokenAddress: string){
    //Obtain tokens from list
    const [activeNetwork] = useActiveNetworkVersion();
    //const coinPriceList = GetCoingeckoSingleTokenData(tokenAddresses, activeNetwork.coingeckoId);
    const coinInfo = 0
    return coinInfo;
}