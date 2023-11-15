import { GetCoingeckoData } from "./getCoingecoSimpleTokenPrices";
import { useActiveNetworkVersion } from "../../state/application/hooks";
import {EthereumNetworkInfo} from "../../constants/networks";

export function useCoinGeckoSimpleTokenPrices(tokenAddresses: string[], enforceMainnet=false){
    //Obtain tokens from list
    const [activeNetwork] = useActiveNetworkVersion();
    const coinPriceList = GetCoingeckoData(tokenAddresses, enforceMainnet ? EthereumNetworkInfo.coingeckoId : activeNetwork.coingeckoId);
    return coinPriceList;
}
