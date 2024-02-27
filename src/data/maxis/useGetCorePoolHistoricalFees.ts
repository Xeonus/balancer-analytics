import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { PoolFeeRecord } from "./maxiStaticTypes";

//Obtain historical fees run
export default function useGetCorePoolHistoricalFees(endDate: string): PoolFeeRecord[] {
    const [data, setData] = useState<PoolFeeRecord[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Calculate the start date by subtracting 14 days from the endDate
                const endDateObj = new Date(endDate);
                const startDateObj = new Date(endDateObj);
                startDateObj.setDate(endDateObj.getDate() - 14);

                // Format dates to 'YYYY-MM-DD' format
                const startDate = startDateObj.toISOString().split('T')[0];
                // Adjust the path based on the endDate
                const basePath = "https://raw.githubusercontent.com/BalancerMaxis/protocol_fee_allocator/main/fee_allocator";
                const isAfterCutoffDate = new Date(endDate) >= new Date("2024-01-18");
                const pathSegment = isAfterCutoffDate ? "" : "/curated";
                const feeEndpoint = `${basePath}${pathSegment}/allocations/incentives_${startDate}_${endDate}.csv`;



                const response = await fetch(feeEndpoint);
                const reader = response.body?.getReader();
                const result = await reader?.read(); // raw array
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result?.value); // convert the raw array to string
                const correctedCsv = csv.replace(/^,/, 'poolId,');

                // Now, parse the corrected CSV string.
                const results = Papa.parse(correctedCsv, {
                    header: true,
                    skipEmptyLines: true,
                });

                if (results.errors.length > 0) {
                    // Handle the error or throw it.
                    console.log("CSV PARSING ERROR:", results.errors);
                    throw new Error('Error parsing CSV data');
                }
                setData(results.data as PoolFeeRecord[]);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [endDate]); // Add endDate as a dependency to refetch when it changes

    return data;
};
