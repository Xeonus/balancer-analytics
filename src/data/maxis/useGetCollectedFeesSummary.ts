import {FeeAllocations} from "./maxiStaticTypes";
import React, { useEffect, useState } from 'react';
import historicalData from './static/historical_fee_allocations_monthly.json';

// Cutoff timestamp: January 30, 2025 00:00:00 UTC
const V2_CUTOFF_TIMESTAMP = 1738195200;

export default function useGetCollectedFeesSummary () : { feeData: FeeAllocations[], loading: boolean, error: string } {

    const [feeData, setFeeData] = useState<FeeAllocations[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch from both old and new endpoints in parallel
                const [oldResponse, v2Response] = await Promise.all([
                    fetch('https://raw.githubusercontent.com/BalancerMaxis/protocol_fee_allocator/main/fee_allocator/summaries/recon.json'),
                    fetch('https://raw.githubusercontent.com/BalancerMaxis/protocol_fee_allocator_v2/refs/heads/collect-fees-cron/fee_allocator/summaries/v2_recon.json')
                ]);

                let oldData: FeeAllocations[] = [];
                let v2Data: FeeAllocations[] = [];

                if (oldResponse.ok) {
                    oldData = await oldResponse.json();
                    // Filter old data to only include entries up to and including the cutoff
                    oldData = oldData.filter(entry => entry.periodEnd <= V2_CUTOFF_TIMESTAMP);
                }

                if (v2Response.ok) {
                    v2Data = await v2Response.json();
                    // Filter v2 data to only include entries after the cutoff
                    v2Data = v2Data.filter(entry => entry.periodEnd > V2_CUTOFF_TIMESTAMP);
                } else {
                    console.warn('Failed to fetch v2 recon data');
                }

                // Combine historical data, filtered old data, and v2 data
                // Sort by periodEnd to ensure chronological order
                const combinedData = [...historicalData, ...oldData, ...v2Data]
                    .sort((a, b) => a.periodEnd - b.periodEnd);

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