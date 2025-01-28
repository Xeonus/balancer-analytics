import {PoolFeeRecord} from "./maxiStaticTypes";
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const feeEndpoint = 'https://raw.githubusercontent.com/BalancerMaxis/protocol_fee_allocator/collect-fees-cron/fee_allocator/allocations/current_fees.csv'

export default function useGetCorePoolCurrentFees () : PoolFeeRecord[] {

    const [data, setData] = useState<PoolFeeRecord[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(feeEndpoint);
                const reader = response.body?.getReader();
                const result = await reader?.read(); // raw array
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value); // convert the raw array to string
                // Modify the CSV string to insert 'poolId' as the first header.
                const correctedCsv = csv.replace(/^,/, 'poolId,');
                //console.log("correctedCsv", correctedCsv)
                // Now, parse the corrected CSV string.
                const results = Papa.parse(correctedCsv,
                    { header: true,
                        skipEmptyLines: true,
                });
                //console.log("results", results)

                if (results.errors.length > 0) {
                    // Handle the error or throw it.
                    console.log("CSV PARSING", results)
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
};
