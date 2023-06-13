import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

type JSONRPCRequest = {
    jsonrpc: string;
    method: string;
    params: any[];
    id: number;
};

type JSONRPCResponse = {
    result: string;
};

const useLatestAlchemyBlock = (chainUrl: string): number | null => {
    const [blockNumber, setBlockNumber] = useState<number | null>(null);

    useEffect(() => {
        const fetchBlockNumber = async () => {
            try {
                const requestData: JSONRPCRequest = {
                    jsonrpc: '2.0',
                    method: 'eth_blockNumber',
                    params: [],
                    id: 0,
                };

                const response: AxiosResponse<JSONRPCResponse> = await axios.post(chainUrl, requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const latestBlockNumber = parseInt(response.data.result, 16);
                setBlockNumber(latestBlockNumber);
            } catch (error) {
                console.error('Error fetching block number:', error);
            }
        };

        fetchBlockNumber();
    }, [chainUrl]);

    return blockNumber;
};

export default useLatestAlchemyBlock;
