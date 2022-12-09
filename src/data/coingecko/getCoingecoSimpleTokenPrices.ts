import { useEffect, useState } from "react";

//Coingecko Interface
export interface CoingeckoRawData {
    [id: string]: FiatPrice
}

export interface FiatPrice {
    usd: number,
    usd_24h_change: number,
    usd_24h_vol: number
}

//Get historical Coingecko price data based on specific time-range (-> aligned to subgraph snapshots)
export function GetCoingeckoData (addresses: string[], network: string) {
    let addressesString = '';
    addresses.forEach(el => {
       addressesString = addressesString + el + ','})
    const baseURI = 'https://api.coingecko.com/api/v3/simple/token_price/';
    const queryParams = network + '?contract_addresses=' + addressesString + '&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true';
        const [jsonData, setJsonData] = useState<CoingeckoRawData>();
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(baseURI + queryParams);
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