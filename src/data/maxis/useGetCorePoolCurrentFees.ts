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
                console.log('Fetching from:', feeEndpoint); // Optional: for debugging

                const response = await fetch(feeEndpoint);
                const reader = response.body?.getReader();
                const result = await reader?.read(); // raw array
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value); // convert the raw array to string

                // Modify the CSV string to insert 'poolId' as the first header.
                const correctedCsv = csv.replace(/^,/, 'poolId,');

                // Now, parse the corrected CSV string.
                const results = Papa.parse(correctedCsv, {
                    header: true,
                    skipEmptyLines: true,
                });

                if (results.errors.length > 0) {
                    // Handle the error or throw it.
                    console.log("CSV PARSING", results);
                    throw new Error('Error parsing CSV data');
                }

                setData(results.data as PoolFeeRecord[]);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return data;
}
