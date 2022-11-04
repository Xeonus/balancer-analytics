import { useEffect, useState } from "react";
import { useActiveNetworkVersion } from "../../state/application/hooks";

//Coingecko Historical Interface
export interface CoingeckoRawData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

//Get historical Coingecko price data based on specific time-range (-> aligned to subgraph snapshots)
export function GetCoingeckoSingleTokenData (address: string, network: string, fromTimestamp: number, toTimestamp: number) {
    const [activeNetwork] = useActiveNetworkVersion();
    const baseURI = 'https://api.coingecko.com/api/v3/coins/';
    const queryParams = network + '/contract/' + address + '/market_cart/range?vs_currency=usd&from=' + fromTimestamp.toString() + '&to=' + toTimestamp.toString();
        const [jsonData, setJsonData] = useState<CoingeckoRawData>();
        //Fetch Balancer Front-End Json containing incentives data:
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(baseURI + activeNetwork.chainId + queryParams);
                    const json: CoingeckoRawData = await response.json();
                    setJsonData(json);
                    
                } catch (error) {
                    console.log("error", error);
                }
            };
    
            fetchData();
        }, []);
    return jsonData;
}