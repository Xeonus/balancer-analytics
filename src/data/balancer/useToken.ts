import { useBalancerChartTokenPricesQuery } from '../../apollo/generated/graphql-codegen-generated';
import { groupBy, head, map, orderBy, sumBy } from 'lodash';
//import { OHLC } from '../../components/Chart/OHLC';
import { PriceChartEntry } from '../../types';

import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useEffect, useState } from 'react';
import { CoingeckoSnapshotPriceData } from './useTokens';

const TIME_INTERVAL = 60*60*24;

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
    const [coingeckoSnapshotData, setCoingeckoSnapshotData] = useState<CoingeckoSnapshotPriceData>();
    const prices = [
        ...(pricesData?.prices1 || []),
        ...(pricesData?.prices2 || []),
        ...(pricesData?.prices3 || []),
        ...(pricesData?.prices4 || []),
        ...(pricesData?.prices5 || []),
        ...(pricesData?.prices6 || []),
    ];

    let formatted = prices.map((price) => ({
        ...price,
        priceUSD: parseFloat(price.amount),
        amount: parseFloat(price.amount),
    }));

    useEffect(() => {
        //V2: repopulate formatted token data with coingecko data
        if (formatted && formatted.length > 0) {
            const toTimestamp = formatted[0].timestamp;
            const fromTimestamp = formatted[prices.length - 1].timestamp;
            const getTokenSnapshotData = async (address: string, fromTimestamp: number, toTimestamp: number) => {
                const baseURI = 'https://api.coingecko.com/api/v3/coins/';
                const queryParams = activeNetwork.coingeckoId + '/contract/' + address + '/market_chart/range?vs_currency=usd&from=' + fromTimestamp.toString() + '&to=' + toTimestamp.toString();
                //console.log("api path: ", baseURI + queryParams);
                try {
                    const coingeckoResponse = await fetch(baseURI + queryParams);
                    //console.log("response", coingeckoResponse)
                    const json = await coingeckoResponse.json();
                    //console.log("coingeckosnapshots json", json);
                    //TODO: find way to append to interface object?
                    setCoingeckoSnapshotData(json);
                } catch {
                    console.log("Coingecko: market_chart API not reachable")
                }

            }
            getTokenSnapshotData(tokenAddress, fromTimestamp, toTimestamp);
        }
    }, [pricesData]);

    if (coingeckoSnapshotData) {
        formatted.forEach(el => {
            const coingeckoPrice = coingeckoSnapshotData?.prices ? coingeckoSnapshotData?.prices.find(s => s[0] === el.timestamp * 1000) : null;
            if (coingeckoPrice) {
                el.price = coingeckoPrice[1]?.toString();
                el.priceUSD = coingeckoPrice[1];
            } else {
                formatted = formatted.splice(formatted.indexOf(el), formatted.indexOf(el));
            }
        })
    }



    const grouped = groupBy(formatted, (price) => `${Math.ceil(price.timestamp / TIME_INTERVAL) * TIME_INTERVAL}`);

    const chartData = map(grouped, (prices, timestamp): PriceChartEntry => {
        return {
            open: head(orderBy(prices, 'timestamp', 'asc'))?.priceUSD || 0,
            high: head(orderBy(prices, 'priceUSD', 'desc'))?.priceUSD || 0,
            low: head(orderBy(prices, 'priceUSD', 'asc'))?.priceUSD || 0,
            close: head(orderBy(prices, 'timestamp', 'desc'))?.priceUSD || 0,
            //volume: sumBy(prices, (price) => price.amount * price.priceUSD),
            //date: new Date(parseInt(timestamp) * 1000),
            //timestamp: parseInt(timestamp),
            time: parseInt(timestamp),
        };
    });

    const sortedChartData = chartData.sort((a,b) => a.time - b.time)
    const filtered = sortedChartData.filter((item, idx) => {
        if (idx === 0) {
            return true;
        }

        return Math.abs((item.low - item.high) / (Math.abs(item.low + item.high) / 2)) < 0.2;
    });
    return {
        chartData: orderBy(filtered, 'timestamp', 'asc'),
        loading,
    };
}