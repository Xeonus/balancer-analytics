import { TokenData } from "data/balancer/balancerTypes";
import { WalletTokenData } from "./getAddressTokenBalances";
import { ERC20TokenData } from "./getAddressTokenBalances";
import { STATIC_TREASURY_INVESTMENTS } from "pages/Treasury/investments";

export default function curateOtherInvestmentTokenData(tokenDatas: TokenData[], walletTokenDatas: WalletTokenData, chainId: string): TokenData[] {
    
    const newTokenDatas: TokenData[] = [];
    STATIC_TREASURY_INVESTMENTS.forEach((token) => {
        const tokenData = tokenDatas.find((t) => t.symbol === token.tokenSymbol);
        const walletTokenData = walletTokenDatas.data.items.find((w) => (w.contract_ticker_symbol === token.tokenSymbol));
        if (tokenData && token.chainId === chainId) {
            if (walletTokenData && walletTokenData.quote_rate) {
                tokenData.priceUSD = walletTokenData.quote_rate;
            }
            tokenData.valueUSDCollected = token.amount * tokenData.priceUSD;
            newTokenDatas.push(tokenData);
        }
    });
    return newTokenDatas;
}