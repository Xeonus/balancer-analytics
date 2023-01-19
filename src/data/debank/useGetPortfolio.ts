import axios from 'axios';
import { useState, useEffect } from 'react';
import isDev from '../../constants';
import { DB_KEY } from '../balancer/constants';
import { Portfolio } from './debankTypes';
import debankPortfolio from '../mocks/debank-complexPortfolioChain.json'
import { useActiveNetworkVersion } from '../../state/application/hooks';

export const useGetPortfolio = (walletId: string) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const [activeNetwork] = useActiveNetworkVersion();

  useEffect(() => {
    async function fetchTotalPortfolio() {
      try {
        const response = await axios.get(
          `https://pro-openapi.debank.com/v1/user/complex_protocol_list?id=${walletId}&chain_id=${activeNetwork.debankId}`,
          {
            headers: {
              'AccessKey': DB_KEY,
            }
          }
        );
        const json: Portfolio = response.data
        //console.log("portfolio response json", response.data)
        setPortfolio(json);
      } catch (error) {
        console.error(error);
        setPortfolio(null);
      }
    }
    if (isDev()) {
      console.log("DEV: loading PORTFOLIO mock")
      const copy = JSON.parse(JSON.stringify(debankPortfolio));
      setPortfolio(copy)
    } else {
      console.log("PRODUCTION: fetching portfolio from Debank")
      fetchTotalPortfolio();
    }
  }, [walletId]);

  return { portfolio };
};
