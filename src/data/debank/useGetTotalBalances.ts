import axios from 'axios';
import { useState, useEffect } from 'react';
import isDev, { YIELD_BEARING_TOKENS } from '../../constants';
import { DB_KEY } from '../balancer/constants';
import { TotalTokenBalances } from './debankTypes';
import debankBalances from '../mocks/debank-tokensTreasury.json'
import { useActiveNetworkVersion } from '../../state/application/hooks';

export const useGetTotalBalances = (walletId: string) => {
  const [balances, setBalances] = useState<TotalTokenBalances | null>(null);
  const [activeNetwork] = useActiveNetworkVersion()

  useEffect(() => {
    async function fetchTotalBalance() {
      try {
        //Optimizing for single chain! Multi-chain call:
        //`https://pro-openapi.debank.com/v1/user/all_token_list?id=${walletId}&is_all=true`,
        const response = await axios.get(
          `https://pro-openapi.debank.com/v1/user/token_list?id=${walletId}&chain_id=${activeNetwork.debankId}&is_all=true`,
          {
            headers: {
              'AccessKey': DB_KEY,
            }
          }
        );
        console.log("TOKEN BALANCES: ", response.data)
        const json: TotalTokenBalances = response.data
        setBalances(json);
      } catch (error) {
        // handle the error
        console.error(error);
        setBalances(null);
      }
    }
    if (isDev()) {
      console.log("DEV: loading mock")
      const copy = JSON.parse(JSON.stringify(debankBalances));
      setBalances(copy)
    } else {
      console.log("PRODUCTION: fetching data from Debank")
      fetchTotalBalance();
    }
  }, [walletId]);

  const totalBalances = balances ? balances.filter(balance => balance.is_core || (balance.is_core === false && YIELD_BEARING_TOKENS.includes(balance.id))) : null;

  return { totalBalances };
};
