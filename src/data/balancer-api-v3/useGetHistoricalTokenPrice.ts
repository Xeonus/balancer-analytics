import {GqlChain, useGetTokenPriceQuery} from "../../apollo/generated/graphql-codegen-generated";
import { balancerV3APIClient } from "../../apollo/client";
import { BalancerChartDataItem } from "../balancer/balancerTypes";
import { unixToDate } from "../../utils/date";

export default function useGetHistoricalTokenPrice(address: string, chainId: GqlChain) {
    const { data, loading, error } = useGetTokenPriceQuery({
        client: balancerV3APIClient,
        variables: {
            address: address,
            chain: chainId,
        },
    });

    let mappedData: BalancerChartDataItem[] | undefined = undefined;

    if (data && data.tokenGetPriceChartData) {
        // Group data by date string
        const groupedByDate: { [date: string]: BalancerChartDataItem[] } = {};
        data.tokenGetPriceChartData.forEach((item) => {
            const dateString = unixToDate(item.timestamp); // Get date string
            if (!groupedByDate[dateString]) {
                groupedByDate[dateString] = [];
            }
            groupedByDate[dateString].push({
                value: parseFloat(item.price),
                time: dateString,
            });
        });

        // Select the first item for each date
        mappedData = Object.keys(groupedByDate).map(date => {
            const items = groupedByDate[date];
            return items[0]; // Assuming items are sorted by time, selects the first data point of the day
        }).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()); // Sort by date
    }

    return {
        loading,
        error,
        data: mappedData, // Return the mapped data
    };
}
