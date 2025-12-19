import {PoolFeeRecord} from "./maxiStaticTypes";
import {useEffect, useState} from 'react';
import Papa from 'papaparse';

// Helper function to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Helper function to generate the dynamic endpoint URL
const generateFeeEndpoint = (): string => {
    const today = new Date();
    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(today.getDate() - 14);

    const startDate = formatDate(fourteenDaysAgo);
    const endDate = formatDate(today);

    const baseUrl = 'https://raw.githubusercontent.com/BalancerMaxis/protocol_fee_allocator_v2/refs/heads/collect-fees-cron/fee_allocator/allocations/incentives/current_fees/';
    const fileName = `v2_earned_fees_${startDate}_${endDate}.csv`;

    return `${baseUrl}${fileName}`;
};

export default function useGetCorePoolCurrentFees(): PoolFeeRecord[] {
    const [data, setData] = useState<PoolFeeRecord[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const feeEndpoint = generateFeeEndpoint();
                console.log('Fetching from:', feeEndpoint);

                const response = await fetch(feeEndpoint);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Use response.text() to get the entire response body
                const csv = await response.text();

                // Parse the CSV string - v2 format already has proper headers
                const results = Papa.parse(csv, {
                    header: true,
                    skipEmptyLines: true,
                });

                if (results.errors.length > 0) {
                    console.log("CSV PARSING errors:", results.errors);
                    throw new Error('Error parsing CSV data');
                }

                // The current_fees CSV only has: pool_id, chain, symbol, earned_fees
                // Other fields will be undefined but that's okay - they're calculated in the UI
                setData(results.data as PoolFeeRecord[]);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return data;
}
