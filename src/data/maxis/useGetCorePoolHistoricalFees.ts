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

                // Check if endDate is before May 1st, 2025
                const cutoffDate = new Date("2025-05-01");
                const useNewEndpoint = new Date(endDate) >= cutoffDate;

                let feeEndpoint: string;

                if (useNewEndpoint) {
                    // New endpoint structure (May 1st, 2025 and after)
                    const basePath = "https://raw.githubusercontent.com/BalancerMaxis/protocol_fee_allocator_v2/refs/heads/collect-fees-cron/fee_allocator";
                    feeEndpoint = `${basePath}/allocations/incentives/v2_incentives_${startDate}_${endDate}.csv`;
                } else {
                    // Old endpoint structure (before May 1st, 2025)
                    const basePath = "https://raw.githubusercontent.com/BalancerMaxis/protocol_fee_allocator/main/fee_allocator";
                    const isAfterCutoffDate = new Date(endDate) >= new Date("2024-01-18");
                    const pathSegment = isAfterCutoffDate ? "" : "/curated";
                    feeEndpoint = `${basePath}${pathSegment}/allocations/incentives_${startDate}_${endDate}.csv`;
                }

                console.log('Fetching historical data from:', feeEndpoint);

                const response = await fetch(feeEndpoint);
                if (!response.ok) {
                    if (response.status === 404) {
                        // File doesn't exist yet (current epoch not processed), return empty data
                        console.warn(`Historical data not available yet for ${startDate} to ${endDate}`);
                        setData([]);
                        return;
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Use response.text() to get the entire response body
                let csv = await response.text();

                let correctedCsv: string;
                if (useNewEndpoint) {
                    // New endpoint: v2 format already has proper headers (pool_id)
                    correctedCsv = csv;
                } else {
                    // Old endpoint: convert poolId to pool_id for consistency
                    correctedCsv = csv.replace(/^,/, 'poolId,'); // First handle missing header
                    correctedCsv = correctedCsv.replace(/^poolId,/, 'pool_id,'); // Then convert poolId to pool_id
                }

                // Now, parse the corrected CSV string.
                const results = Papa.parse(correctedCsv, {
                    header: true,
                    skipEmptyLines: true,
                });

                if (results.errors.length > 0) {
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
