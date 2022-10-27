import { BalancerChartDataItem } from "../data/balancer/balancerTypes";

//TODO: remove hard-coded chain redundancy via passable variable?
export default function getAggregatedProtocolChartData(
    mainnetChartData: BalancerChartDataItem[], 
    arbitrumChartData: BalancerChartDataItem[], 
    polygonChartData: BalancerChartDataItem[],
    defaultValue: number,
     ){

        //TODO: aggregated interface
        const aggregatedData:any[] = [];
        //time, value, chainId
        mainnetChartData.forEach((el) => {
            //add chain info
            const aggregatedEntry = {
                time: el.time,
                Mainnet: el.value,
                Arbitrum: defaultValue,
                Polygon: defaultValue,
            }
            const arbitrumEntry = arbitrumChartData.find((arbItem) => arbItem.time === el.time);
            const polygonEntry = polygonChartData.find((polyItem) => polyItem.time === el.time);
            if (arbitrumEntry?.time) {
                aggregatedEntry['Arbitrum'] = arbitrumEntry.value;
            }
            if (polygonEntry?.time) {
                aggregatedEntry['Polygon'] = polygonEntry.value;
            }

            aggregatedData.push(aggregatedEntry);
        })
        return aggregatedData;
}