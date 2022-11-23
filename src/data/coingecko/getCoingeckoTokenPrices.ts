import { TokenData } from "../balancer/balancerTypes";

//Coingecko Interface
export interface CoingeckoRawData {
    [id: string]: FiatPrice
}

export interface FiatPrice {
    usd: number,
    usd_24h_change: number
}

export async function getCoingeckoPrices(addresses: string, formattedTokens: TokenData[], coingeckoNetwork: string) {
    const baseURI = 'https://api.coingecko.com/api/v3/simple/token_price/';
    const queryParams = coingeckoNetwork + '?contract_addresses=' + addresses + '&vs_currencies=usd&include_24hr_change=true';
    const coingeckoResponse = await fetch(baseURI + queryParams);
    const json: CoingeckoRawData = await coingeckoResponse.json();
    if (json) {
    formattedTokens.forEach(token => {
        if (json[token.address] && json[token.address].usd) {
            token.priceUSD = json[token.address].usd;
        }
        if (json[token.address] && json[token.address].usd_24h_change) {
            token.priceUSDChange = json[token.address].usd_24h_change;
        }
    })
}
}