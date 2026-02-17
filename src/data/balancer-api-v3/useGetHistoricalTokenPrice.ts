import {GqlChain, useGetTokenSetHistoricalPricesQuery} from "../../apollo/generated/graphql-codegen-generated";
import { balancerV3APIClient } from "../../apollo/client";
import { BalancerChartDataItem } from "../balancer/balancerTypes";
import { unixToDate } from "../../utils/date";

export default function useGetHistoricalTokenPrice(address: string, chainId: GqlChain) {
    const { data, loading, error } = useGetTokenSetHistoricalPricesQuery({
        client: balancerV3APIClient,
        variables: {
            addresses: [address],
            chain: chainId,
            range: "ONE_YEAR",
        },
    });

    let mappedData: BalancerChartDataItem[] | undefined = undefined;

    if (data && data.tokenGetHistoricalPrices && data.tokenGetHistoricalPrices.length > 0) {
        const priceEntries = data.tokenGetHistoricalPrices[0].prices;
        // Group data by date string
        const groupedByDate: { [date: string]: BalancerChartDataItem[] } = {};
        priceEntries.forEach((item) => {
            const dateString = unixToDate(parseInt(item.timestamp));
            if (!groupedByDate[dateString]) {
                groupedByDate[dateString] = [];
            }
            groupedByDate[dateString].push({
                value: item.price,
                time: dateString,
            });
        });

        // Select the first item for each date
        mappedData = Object.keys(groupedByDate).map(date => {
            const items = groupedByDate[date];
            return items[0];
        }).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    }

    return {
        loading,
        error,
        data: mappedData,
    };
}
