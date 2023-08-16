import { useBalancerChartTokenPricesQuery } from '../../apollo/generated/graphql-codegen-generated';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useEffect, useState } from 'react';
import { PriceChartEntry } from '../../types';

const TIME_INTERVAL = 60 * 60 * 24;

interface CoingeckoPriceData {
    timestamp: number;
    price: number;
}

export interface BalancerTokenData {
    chartData: PriceChartEntry[];
    loading: boolean;
}

export function useBalancerToken(tokenAddress: string): BalancerTokenData {
    const {
        data: pricesData,
        loading,
        error,
    } = useBalancerChartTokenPricesQuery({ variables: { asset: tokenAddress } });

    const [activeNetwork] = useActiveNetworkVersion();
    const [coingeckoSnapshotData, setCoingeckoSnapshotData] = useState<CoingeckoPriceData[]>([]);
    const prices = [
        ...(pricesData?.prices1 || []),
        ...(pricesData?.prices2 || []),
        ...(pricesData?.prices3 || []),
        ...(pricesData?.prices4 || []),
        ...(pricesData?.prices5 || []),
        ...(pricesData?.prices6 || []),
    ];

    const formatted = prices.map((price) => ({
        ...price,
        priceUSD: parseFloat(price.amount),
        amount: parseFloat(price.amount),
    }));

    useEffect(() => {
        if (formatted.length > 0) {
            const toTimestamp = formatted[0].timestamp;
            const fromTimestamp = formatted[prices.length - 1].timestamp;
            const getTokenSnapshotData = async (address: string, fromTimestamp: number, toTimestamp: number) => {
                const baseURI = 'https://api.coingecko.com/api/v3/coins/';
                const queryParams =
                    activeNetwork.coingeckoId + '/contract/' + address + '/market_chart/range?vs_currency=usd&from=' + fromTimestamp.toString() + '&to=' + toTimestamp.toString();
                try {
                    const coingeckoResponse = await fetch(baseURI + queryParams);
                    const json = await coingeckoResponse.json();
                    setCoingeckoSnapshotData(json.prices || []);
                } catch {
                    console.log("Coingecko: market_chart API not reachable");
                }
            };
            getTokenSnapshotData(tokenAddress, fromTimestamp, toTimestamp);
        }
    }, [pricesData]);

    const chartData = coingeckoSnapshotData.map((priceData) => ({
        open: priceData.price,
        high: priceData.price,
        low: priceData.price,
        close: priceData.price,
        time: priceData.timestamp,
    }));

    const sortedChartData = chartData.sort((a, b) => a.time - b.time);
    const filtered = sortedChartData.filter((item, idx) => {
        if (idx === 0) {
            return true;
        }

        return Math.abs((item.low - item.high) / (Math.abs(item.low + item.high) / 2)) < 0.2;
    });

    return {
        chartData: filtered,
        loading,
    };
}
