import axios from 'axios';
import { useState, useEffect } from 'react';
import isDev from '../../constants';
import { DB_KEY } from '../balancer/constants';
import { TransactionHistory } from './debankTypes';
import debankPortfolio from '../mocks/debank-complexPortfolioChain.json'
import debankTransactions from './data/treasuryTxHistory.json'
import { useActiveNetworkVersion } from '../../state/application/hooks';

export const useGetTransactions = (walletId: string, startTimeStamp: number) => {
  const [transactions, setTransactions] = useState<TransactionHistory | null>(null);

  const [activeNetwork] = useActiveNetworkVersion();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get(
            `https://us-central1-aura-analytics-1c4b3.cloudfunctions.net/historyList?id=${walletId}&chain_id=${activeNetwork.debankId}&start_time=${startTimeStamp}`,
        );
        const json: TransactionHistory = response.data
        console.log("response body", response)
        setTransactions(json);
      } catch (error) {
        console.error(error);
        setTransactions(null);
      }
    }
    if (isDev()) {
      console.log("DEV: loading transaction mock")
      const copy = JSON.parse(JSON.stringify(debankTransactions));
      setTransactions(copy)
    } else {
      console.log("PRODUCTION: fetching portfolio from Debank")
      fetchTransactions();
    }
  }, [walletId]);

  return { transactions };
};
