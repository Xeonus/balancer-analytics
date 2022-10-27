import { useEffect, useState } from "react";
import { useActiveNetworkVersion } from "../state/application/hooks";


//Define wallet historical TokenData interface
    export interface Open {
        balance: string;
        quote?: number;
    }

    export interface High {
        balance: string;
        quote?: number;
    }

    export interface Low {
        balance: string;
        quote?: number;
    }

    export interface Close {
        balance: string;
        quote?: number;
    }

    export interface Holding {
        timestamp: Date;
        quote_rate?: number;
        open: Open;
        high: High;
        low: Low;
        close: Close;
    }

    export interface Item {
        contract_decimals: number;
        contract_name: string;
        contract_ticker_symbol: string;
        contract_address: string;
        supports_erc?: any;
        logo_url: string;
        holdings: Holding[];
    }

    export interface Data {
        address: string;
        updated_at: string;
        next_update_at: string;
        quote_currency: string;
        chain_id: number;
        items: Item[];
        pagination?: any;
    }

    export interface WalletHistoryData {
        data: Data;
        error: boolean;
        error_message?: any;
        error_code?: any;
    }

//TODO take address as input argument
export function GetAddressHistoricalTokenData (address: string) {
    const [activeNetwork] = useActiveNetworkVersion();
    const baseURI = 'https://api.covalenthq.com/v1/';
    const queryParams = '/address/' + address + '/portfolio_v2/?&key=ckey_0234f04900264446a5dfbd4687d';
        const [jsonData, setJsonData] = useState<WalletHistoryData>();
        //Fetch Balancer Front-End Json containing incentives data:
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(baseURI + activeNetwork.chainId + queryParams);
                    const json: WalletHistoryData = await response.json();
                    setJsonData(json);
                    
                } catch (error) {
                    console.log("error", error);
                }
            };
    
            fetchData();
        }, []);
        
    return jsonData;
}