import {PoolFeeRecord} from "./maxiStaticTypes";
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const combinedFeesEndpoint = 'https://raw.githubusercontent.com/BalancerMaxis/protocol_fee_allocator/e12a37d1a0e068ee3c392e412954c3497b863f9d/fee_allocator/allocations/combined_incentives.csv'

export default function useGetCombinedIncentives () : PoolFeeRecord[] {

    const [data, setData] = useState<PoolFeeRecord[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(combinedFeesEndpoint);
                const reader = response.body?.getReader();
                const result = await reader?.read(); // raw array
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value); // convert the raw array to string
                // Modify the CSV string to insert 'poolId' as the first header.
                const correctedCsv = csv.replace('Unnamed: 0,', 'poolId,');
                const finalizedCsv = correctedCsv.replace('date string,', 'date_string,');
                //console.log("correctedCsv", correctedCsv)
                // Now, parse the corrected CSV string.
                const results = Papa.parse(finalizedCsv,
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