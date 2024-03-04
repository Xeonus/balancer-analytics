import { BalancerPieChartDataItem } from "../../data/balancer/balancerTypes";
import {ChainPortfolio, Portfolio, TotalTokenBalances} from "../../data/debank/debankTypes";

const STABLECOINS = {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
};

export function mergeArrays(array1 : BalancerPieChartDataItem[], array2: BalancerPieChartDataItem[]) {
    let result: BalancerPieChartDataItem[] = [];
  
    for (let i = 0; i < array1.length; i++) {
      let found = false;
      for (let j = 0; j < array2.length; j++) {
        if (array1[i].name === array2[j].name) {
          result.push({ name: array1[i].name, value: array1[i].value + array2[j].value });
          found = true;
          break;
        }
      }
      if (!found) result.push(array1[i]);
    }
  
    for (let i = 0; i < array2.length; i++) {
      let found = false;
      for (let j = 0; j < array1.length; j++) {
        if (array2[i].name === array1[j].name) {
          found = true;
          break;
        }
      }
      if (!found) result.push(array2[i]);
    }
  
    return result;
  }

export function calculatePortfolioStablecoinValue(chainPortfolio: ChainPortfolio[]) {
    let totalValue = 0;
    chainPortfolio.forEach( portfolio => {
        portfolio.portfolio_item_list?.forEach(item =>  {
            item.detail.supply_token_list?.forEach(token => {
                if (token.id === STABLECOINS.USDC.toLowerCase() || token.id === STABLECOINS.DAI.toLowerCase()) {
                    totalValue += token.amount * token.price
                }
            })
        })
    })
    return totalValue;
}

export function calculateTokenBalancesStablecoinValue(tokenBalances: TotalTokenBalances) {
    let totalValue = 0;

    tokenBalances.forEach(token => {
        if (token.id === STABLECOINS.USDC.toLowerCase() || token.id === STABLECOINS.DAI.toLowerCase()) {
            totalValue += token.amount * token.price; // Assuming amount is in asset's smallest unit
        }
    });

    return totalValue;
}