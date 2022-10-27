import { TokenData } from "../data/balancer/balancerTypes";
import { WalletTokenData } from "./getAddressTokenBalances";
import { ERC20TokenData } from "./getAddressTokenBalances";

export default function curateTokenDatas(tokenDatas: TokenData[], walletTokenData: WalletTokenData, sweepLimit: number, sweepLimitActive: boolean): TokenData[] {
    const newTokenDatas: TokenData[] = [];
    walletTokenData.data.items.forEach((item: ERC20TokenData) => {
        tokenDatas.forEach((tokenData: TokenData) => {
            if (item.quote_rate_24h) {
                if (sweepLimitActive && item.contract_address === tokenData.address && Number(parseInt(item.balance) / 10 ** item.contract_decimals * item.quote_rate_24h) > sweepLimit) {
                    tokenData.valueUSDCollected = Number(parseInt(item.balance) / 10 ** item.contract_decimals * item.quote_rate_24h);
                    tokenData.priceUSD = item.quote_rate_24h;
                    newTokenDatas.push(tokenData);
                } else if (sweepLimitActive === false && item.contract_address === tokenData.address && Number(parseInt(item.balance) / 10 ** item.contract_decimals * item.quote_rate_24h) <= sweepLimit) {
                    tokenData.valueUSDCollected = Number(parseInt(item.balance) / 10 ** item.contract_decimals * item.quote_rate_24h);
                    tokenData.priceUSD = item.quote_rate_24h;
                    newTokenDatas.push(tokenData);
                }
            } else if (item.quote_rate) {
                //Fallback if 24h quote rate is not filled
                if (sweepLimitActive && item.contract_address === tokenData.address && Number(parseInt(item.balance) / 10 ** item.contract_decimals * item.quote_rate) > sweepLimit) {
                    tokenData.valueUSDCollected = Number(parseInt(item.balance) / 10 ** item.contract_decimals * item.quote_rate);
                    tokenData.priceUSD = item.quote_rate;
                    newTokenDatas.push(tokenData);
                } else if (sweepLimitActive === false && item.contract_address === tokenData.address && Number(parseInt(item.balance) / 10 ** item.contract_decimals * item.quote_rate) <= sweepLimit) {
                    tokenData.valueUSDCollected = Number(parseInt(item.balance) / 10 ** item.contract_decimals * item.quote_rate);
                    tokenData.priceUSD = item.quote_rate;
                    newTokenDatas.push(tokenData);
                }
            }
        });
        //TODO: If token data does not exist, populate it from walletTokenData


    });
    return newTokenDatas;
}