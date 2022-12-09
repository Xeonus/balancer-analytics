import axios from 'axios';
import { useState, useEffect } from 'react';
import { DB_KEY } from '../balancer/constants';
import {Portfolio } from './debankPortfolioInterface'

export const useGetPortfolio = (walletId: string) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  // use an effect hook to fetch the total balance
  useEffect(() => {
    async function fetchTotalBalance() {
      try {
        // make a GET request to the API endpoint
        const response = await axios.get(
          `https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=${walletId}&chain_ids=eth,matic,arb`,
          {
            headers: {
              'AccessKey': DB_KEY,
            }
          }
        );

        // set the total balance from the response
        //setPortfolio(response.data.total_balance);
        console.log("response", response)
        const json: Portfolio = response.data
        setPortfolio(json);
      } catch (error) {
        // handle the error
        console.error(error);
        setPortfolio(null);
      }
    }

    fetchTotalBalance();
  }, [walletId]);

  // return the total balance and loading state
  return { portfolio };
};
