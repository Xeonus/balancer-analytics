import {FeeAllocations} from "./maxiStaticTypes";
import React, { useEffect, useState } from 'react';
import historicalData from './static/historical_fee_allocations_monthly.json';

export default function useGetCollectedFees () : { feeData: FeeAllocations[], loading: boolean, error: string } {

    const [feeData, setFeeData] = useState<FeeAllocations[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/BalancerMaxis/protocol_fee_allocator/main/fee_allocator/summaries/recon.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const fetchedData = await response.json();

                // Combine the fetched data with historical data
                const combinedData = [...historicalData, ...fetchedData];
                setFeeData(combinedData);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { feeData, loading, error };
};