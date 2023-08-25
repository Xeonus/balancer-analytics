import { useState, useEffect } from 'react';
import {child, get, getDatabase, ref} from "firebase/database";
import {HistoryList, TransactionHistory} from "../debank/debankTypes";

export const useGetAddressTransactionsHistorically = (walletAddress:string) => {
    const [transactions, setTransactions] = useState<TransactionHistory | null>(null);

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `debankTransactions/eth/` + walletAddress + '/'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const object = snapshot.val();

                    if (object.history_list && typeof object.history_list === 'object') {
                        object.history_list = Object.values(object.history_list);

                        object.history_list = object.history_list.map((item: HistoryList)=> ({
                            ...item,
                            sends: item.sends || [],
                            receives: item.receives || [],
                        }));

                        object.history_list.sort((a: HistoryList, b: HistoryList) => b.time_at - a.time_at);
                    }

                    setTransactions(object);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
            console.error(error);
        });

    }, [walletAddress]);

    return transactions;
};
