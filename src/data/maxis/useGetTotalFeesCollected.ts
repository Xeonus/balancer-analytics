import { useEffect, useState } from 'react';
import { NetworkFees } from "./maxiStaticTypes";

// Use a TypeScript generic to define the function's return type
export default function useGetCollectedFees(endDate: string): NetworkFees | undefined {
    const [data, setData] = useState<NetworkFees | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
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
                const feeEndpoint = `${basePath}${pathSegment}/fees_collected/fees_${startDate}_${endDate}.json`;

                const response = await fetch(feeEndpoint);
                if (!response.ok) {
                    // If the server response was not ok, throw an error
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const fees: NetworkFees = await response.json();
                setData(fees);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endDate]); // Add endDate as a dependency to refetch when it changes

    return data;
};
