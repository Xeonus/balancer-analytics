import { GetCoingeckoData } from "utils/getCoingecoSimpleTokenPrices";
import { useActiveNetworkVersion } from "state/application/hooks";


export function useCoinGeckoSimpleTokenPrices(tokenAddresses: string[]){
    //Obtain tokens from list
    const [activeNetwork] = useActiveNetworkVersion();
    const coinPriceList = GetCoingeckoData(tokenAddresses, activeNetwork.coingeckoId);
    return coinPriceList;
}