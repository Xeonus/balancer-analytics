import axios from 'axios';
import { useState, useEffect } from 'react';
import isDev from '../../constants';
import { DB_KEY } from '../balancer/constants';
import { Portfolio } from './debankTypes';
import debankPortfolio from '../mocks/debank-complexPortfolio.json'

export const useGetPortfolioAllChains = (walletId: string) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    async function fetchTotalBalance() {
      try {
        const response = await axios.get(
            `https://us-central1-aura-analytics-1c4b3.cloudfunctions.net/allComplexProtocol?id=${walletId}&chain_ids=eth,matic,arb`,
        );
        const json: Portfolio = response.data
        setPortfolio(json);
      } catch (error) {
        console.error(error);
        setPortfolio(null);
      }
    }
    if (isDev()) {
      console.log("DEV: loading PORTFOLIO ALL CHAINS mock")
      const copy = JSON.parse(JSON.stringify(debankPortfolio));
      setPortfolio(copy)
    } else {
      console.log("PRODUCTION: fetching data from Debank")
      fetchTotalBalance();
    }
  }, [walletId]);

  return { portfolio };
};
