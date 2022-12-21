import axios from 'axios';
import { useState, useEffect } from 'react';
import isDev from '../../constants';
import { WalletTransactiondata } from './covalentTypes';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import debankTransactions from '../mocks/debank-transactions.json'

export const useGetRawTransactionData = (walletId: string, pageSize = 1000) => {
  const [transactions, setTransactions] = useState<WalletTransactiondata | null>(null);

  const [activeNetwork] = useActiveNetworkVersion();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const baseURI = 'https://api.covalenthq.com/v1/';
        const queryParams = `/address/` + walletId + `/transactions_v2/?page-size=${pageSize}&key=ckey_0234f04900264446a5dfbd4687d`;
        const response = await axios.get(baseURI + activeNetwork.chainId + queryParams);
        const json: WalletTransactiondata =  response.data;
        console.log("response body", json)
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
      console.log("PRODUCTION: fetching transactions from Covalent")
      fetchTransactions();
    }
  }, [walletId]);

  return { transactions };
};
