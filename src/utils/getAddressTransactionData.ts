import { useEffect, useState } from "react";
import { useActiveNetworkVersion } from "../state/application/hooks";

//Define wallet TokenData interface
export interface Param {
    name: string;
    type: string;
    indexed: boolean;
    decoded: boolean;
    value: any;
}

export interface Decoded {
    name: string;
    signature: string;
    params: Param[];
}

export interface LogEvent {
    block_signed_at: Date;
    block_height: number;
    tx_offset: number;
    log_offset: number;
    tx_hash: string;
    raw_log_topics: string[];
    sender_contract_decimals: number;
    sender_name: string;
    sender_contract_ticker_symbol: string;
    sender_address: string;
    sender_address_label: string;
    sender_logo_url: string;
    raw_log_data: string;
    decoded: Decoded;
}

export interface Item {
    block_signed_at: Date;
    block_height: number;
    tx_hash: string;
    tx_offset: number;
    successful: boolean;
    from_address: string;
    from_address_label?: any;
    to_address: string;
    to_address_label?: any;
    value: string;
    value_quote: number;
    gas_offered: number;
    gas_spent: number;
    gas_price: any;
    fees_paid: string;
    gas_quote: number;
    gas_quote_rate: number;
    log_events: LogEvent[];
}

export interface Pagination {
    has_more: boolean;
    page_number: number;
    page_size: number;
    total_count?: any;
}

export interface Data {
    address: string;
    updated_at: string;
    next_update_at: string;
    quote_currency: string;
    chain_id: number;
    items: Item[];
    pagination: Pagination;
}

export interface WalletTransactiondata {
    data: Data;
    error: boolean;
    error_message?: any;
    error_code?: any;
}


//TODO take address as input argument
export function GetAddressTransactionData (address: string) {
    const [activeNetwork] = useActiveNetworkVersion();
    const baseURI = 'https://api.covalenthq.com/v1/';
    const queryParams = '/address/' + address + '/transactions_v2/?page-size=10000&key=ckey_0234f04900264446a5dfbd4687d';
        const [jsonData, setJsonData] = useState<WalletTransactiondata>();
        //Fetch Balancer Front-End Json containing incentives data:
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(baseURI + activeNetwork.chainId + queryParams);
                    const json: WalletTransactiondata = await response.json();
                    setJsonData(json);
                    
                } catch (error) {
                    console.log("error", error);
                }
            };
    
            fetchData();
        }, []);
    return jsonData;
}