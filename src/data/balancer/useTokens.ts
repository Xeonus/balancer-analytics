import { useDeltaTimestamps } from '../../utils/queries';
import { useBlocksFromTimestamps } from '../../hooks/useBlocksFromTimestamps';
import {
    BalancerTokenFragment,
    LatestPriceFragment,
    useGetTokenDataLazyQuery,
    useGetTokenPageDataQuery,
    useGetTokenSingleDataLazyQuery,
} from '../../apollo/generated/graphql-codegen-generated';
import { useEffect, useMemo } from 'react';
import { unixToDate } from '../../utils/date';
import { BalancerChartDataItem, TokenData } from './balancerTypes';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useState } from 'react';
import useGetCurrentTokenPrices from "../balancer-api-v3/useGetCurrentTokenPrices";
import {CG_KEY} from "./constants";
import { sanitizeChartData, sanitizeScalarValue } from '../../utils/dataValidation';

//Coingecko Token price Interface
export interface CoingeckoRawData {
    [id: string]: FiatPrice
}

export interface FiatPrice {
    usd: number,
    usd_24h_change: number
}

//Coingecko Snapshot Interface
export interface CoingeckoSnapshotPriceData {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
    error?: string,
}

function getTokenValues(
    tokenAddress: string,
    tokens: BalancerTokenFragment[],
    coingeckoPriceData?: CoingeckoRawData,
): { tvl: number; volume: number; swapCount: number; tvlToken: number } {
    const token = tokens.find((token24) => tokenAddress === token24.address);

    if (!token) {
        return { tvl: 0, volume: 0, swapCount: 0, tvlToken: 0 };
    }

    return {
        //bug for totalBalance and totalVolumeNotional
        //tvl: coingeckoPriceData? Number(token.totalBalanceNotional) * coingeckoPriceData[token.address].usd : parseFloat(token.totalBalanceUSD),
        //volume: coingeckoPriceData? Number(token.totalVolumeNotional) * coingeckoPriceData[token.address].usd:  parseFloat(token.totalVolumeUSD),
        tvl: parseFloat(token.totalBalanceUSD),
        volume: parseFloat(token.totalVolumeUSD),
        swapCount: parseFloat(token.totalSwapCount),
        tvlToken: parseFloat(token.totalBalanceNotional),
    };
}

function getTokenPriceValues(tokenAddress: string, tokens24: BalancerTokenFragment[], coingeckoPriceData?: CoingeckoRawData): { price: number } {
    // const price = prices.find((prices) => prices.asset === tokenAddress);
    // let priceUSD = price ? parseFloat(price.price) : 0;
    // if (coingeckoPriceData && coingeckoPriceData[tokenAddress]) {
    //     priceUSD = coingeckoPriceData[tokenAddress].usd;
    // }
    const token = tokens24.find((token) => token.address === tokenAddress);
    let priceUSD = token?.latestUSDPrice ? parseFloat(token.latestUSDPrice) : 0;
    if (coingeckoPriceData && coingeckoPriceData[tokenAddress]) {
        priceUSD = coingeckoPriceData[tokenAddress].usd;
    }

    return { price: priceUSD };
}



export function useBalancerTokens(first = 100) {
    const [activeNetwork] = useActiveNetworkVersion();
    const [t24, t48, tWeek] = useDeltaTimestamps();
    const { blocks, error: blockError } = useBlocksFromTimestamps([t24, t48, tWeek]);
    const [block24, block48, blockWeek] = blocks ?? [];
    const [getTokenData, { data }] = useGetTokenDataLazyQuery();
    const { data: currentPrices, loading: pricesLoading } = useGetCurrentTokenPrices(["MAINNET"]);

    // Transform array to object format for backward compatibility
    const tokenPrices = useMemo(() => {
        if (!currentPrices) return null;
        return Object.fromEntries(
            currentPrices.map(token => [
                token.address.toLowerCase(),
                { price: token.price, priceChange24h: 0 }
            ])
        );
    }, [currentPrices]);

    useEffect(() => {
        if (block24) {
            getTokenData({
                variables: {
                    block24: { number: parseInt(block24.number) },
                    first: first,
                },
                context: {
                    uri: activeNetwork.decentralicedClientUri,
                },
            });
        }
    }, [block24, activeNetwork.decentralicedClientUri, first, getTokenData]);

    if (!data || pricesLoading) {
        return [];
    }

    const { tokens, tokens24 } = data;

    return tokens.map((token) => {
        let tokenData = getTokenValues(token.address, tokens);
        let tokenData24 = getTokenValues(token.address, tokens24);

        let priceData = { price: token.latestUSDPrice ? Number(token.latestUSDPrice) : 0 };
        let priceData24 = getTokenPriceValues(token.address, tokens24);
        // Override with new API data if available
        const tokenAddressLower = token.address.toLowerCase();
        if (tokenPrices && tokenPrices[tokenAddressLower]) {
            const { price, priceChange24h } = tokenPrices[tokenAddressLower];
            priceData.price = price;
            // Assuming you adjust getTokenPriceValues or similar to handle the new data structure
            //priceData24 = { ...priceData24, priceChange24h };
        }

        // Relative price change in percentage terms:
        const currentPrice = tokenPrices?.[tokenAddressLower]?.price ?? 0;
        const absolutePriceChange = tokenPrices?.[tokenAddressLower]?.priceChange24h ?? 0;
        const price24hAgo = currentPrice - absolutePriceChange;
        const priceChangePercentage = price24hAgo !== 0 ? (absolutePriceChange / price24hAgo) * 100 : 0;


        // Sanitize token metrics (hack data corruption fix)
        const sanitizedTvl = token.symbol?.includes('bb-') ? 0 : sanitizeScalarValue(tokenData.tvl, 0, 'tvl');
        const sanitizedTvl24 = sanitizeScalarValue(tokenData24.tvl, 0, 'tvl');
        const sanitizedVolume = sanitizeScalarValue(tokenData.volume, 0, 'volume');
        const sanitizedVolume24 = sanitizeScalarValue(tokenData24.volume, 0, 'volume');

        const volumeDelta = sanitizedVolume - sanitizedVolume24;
        const tvlChange = sanitizedTvl24 !== 0 ? (sanitizedTvl - sanitizedTvl24) / sanitizedTvl24 : 0;
        const volumeChange = sanitizedVolume24 !== 0 ? volumeDelta / sanitizedVolume24 : 0;

        return {
            ...token,
            name: token.name || '',
            symbol: token.symbol || '',
            exists: true,
            volumeUSD: sanitizeScalarValue(volumeDelta, 0),
            volumeUSDChange: sanitizeScalarValue(volumeChange, 0),
            txCount: parseFloat(token.totalSwapCount),
            feesUSD: 0,
            tvlToken: tokenData.tvlToken,
            tvlUSD: sanitizedTvl,
            valueUSDCollected: 0,
            tvlUSDChange: sanitizeScalarValue(tvlChange, 0),
            priceUSD: priceData.price,
            priceUSDChange: priceChangePercentage,
            isCoingeckoPriceSource: false, // Update this as needed based on your logic
        };
    });
}

export function useBalancerTokenData(address: string): TokenData | null {
    const tokens = useBalancerTokens();
    const token = tokens.find((token) => token.address === address);

    return token || null;
}

export function useBalancerTokenSingleData(address: string): TokenData | null {
    const [activeNetwork] = useActiveNetworkVersion();
    const [t24, t48, tWeek] = useDeltaTimestamps();
    const { blocks, error: blockError } = useBlocksFromTimestamps([t24, t48, tWeek]);
    const [block24, block48, blockWeek] = blocks ?? [];
    const [getTokenData, { data }] = useGetTokenSingleDataLazyQuery();
    const tokenAddresses: Array<string> = [];
    const [coingeckoData, setCoingeckoData] = useState<CoingeckoRawData>();

    useEffect(() => {
        if (block24) {
            getTokenData({
                variables: {
                    address: address,
                    block24: { number: parseInt(block24.number) },
                },
                context: {
                    uri: activeNetwork.decentralicedClientUri,
                },
            });
        }
    }, [block24]);

    useEffect(() => {
        //V2: repopulate formatted token data with coingecko data
        if (data && data.tokens.length === 1) {
            data.tokens.forEach(token => {
                tokenAddresses.push(token.address);
            })

            const getTokenPrices = async (addresses: string) => {
                const baseURI = 'https://api.coingecko.com/api/v3/simple/token_price/';
                const queryParams = activeNetwork.coingeckoId + '?contract_addresses=' + addresses + '&vs_currencies=usd&include_24hr_change=true'  + '&x_cg_demo_api_key=' + CG_KEY;
                try {
                    const coingeckoResponse = await fetch(baseURI + queryParams);
                    const json = await coingeckoResponse.json();
                    //TODO: find way to append to interface object?
                    const spread = {
                        ...coingeckoData,
                        json
                    }
                    setCoingeckoData(json);
                } catch {
                    console.log("Coingecko: token_price API not reachable")
                }
            }
            const tokenAddresses1 = tokenAddresses.slice(1, 150);
            const tokenAddresses2 = tokenAddresses.slice(151, 300);
            //raw batch call in hook:
            let addressesString1 = '';
            tokenAddresses1.forEach(el => {
                addressesString1 = addressesString1 + el + ','
            })

            getTokenPrices(addressesString1);

            let addressesString2 = '';
            tokenAddresses2.forEach(el => {
                addressesString2 = addressesString2 + el + ','
            })

            //getTokenPrices(addressesString2);
        }
    }, [data]);

    if (!data) {
        return null;
    }

    const { tokens, tokens24 } = data;

    //const singleToken = tokens.find(t => t.address === address)
    //const singleToken24 = tokens.find(t => t.address === address)

    let tokenData = getTokenValues(tokens[0].address, tokens);
    let tokenData24 = getTokenValues(tokens[0].address, tokens24);

    let priceData = { price: tokens[0].latestUSDPrice ? Number(tokens[0].latestUSDPrice) : 0 };
    let priceData24 = getTokenPriceValues(tokens[0].address, tokens24);
    //override:
    let priceChange = 0
    if (coingeckoData && coingeckoData[tokens[0].address]) {
        tokenData = getTokenValues(tokens[0].address, tokens, coingeckoData);
        tokenData24 = getTokenValues(tokens[0].address, tokens24, coingeckoData);
        priceData = getTokenPriceValues(tokens[0].address, tokens24, coingeckoData);
        priceData24 = getTokenPriceValues(tokens[0].address, tokens24, coingeckoData);
        priceChange = coingeckoData[tokens[0].address].usd_24h_change;
    }

    const valueUSDCollected = 0;

    // Sanitize token metrics (hack data corruption fix)
    const sanitizedTvl = tokens[0].symbol?.includes('bb-') ? 0 : sanitizeScalarValue(tokenData.tvl, 0, 'tvl');
    const sanitizedTvl24 = sanitizeScalarValue(tokenData24.tvl, 0, 'tvl');
    const sanitizedVolume = sanitizeScalarValue(tokenData.volume, 0, 'volume');
    const sanitizedVolume24 = sanitizeScalarValue(tokenData24.volume, 0, 'volume');

    const volumeDelta = sanitizedVolume - sanitizedVolume24;
    const tvlChangeCalc = sanitizedTvl24 !== 0 ? (sanitizedTvl - sanitizedTvl24) / sanitizedTvl24 : 0;
    const volumeChangeCalc = sanitizedVolume24 !== 0 ? volumeDelta / sanitizedVolume24 : 0;

    return {
        address: tokens[0].address,
        name: tokens[0].name || '',
        symbol: tokens[0].symbol || '',
        exists: true,
        volumeUSD: sanitizeScalarValue(volumeDelta, 0),
        volumeUSDChange: sanitizeScalarValue(volumeChangeCalc, 0),
        txCount: parseFloat(tokens[0].totalSwapCount),
        feesUSD: 0,
        tvlToken: tokenData.tvlToken,
        tvlUSD: sanitizedTvl,
        valueUSDCollected: valueUSDCollected,
        tvlUSDChange: sanitizeScalarValue(tvlChangeCalc, 0),
        priceUSD: priceData.price,
        priceUSDChange: priceChange,
        isCoingeckoPriceSource: priceChange !== 0 ? true : false,
    };
}

export function useBalancerTokenPageData(address: string): {
    tvlData: BalancerChartDataItem[];
    volumeData: BalancerChartDataItem[];
    priceData: BalancerChartDataItem[];
} {
    const [activeNetwork] = useActiveNetworkVersion();
    const { data } = useGetTokenPageDataQuery({
        variables: { address, startTimestamp: activeNetwork.startTimeStamp },
        context: {
            uri: activeNetwork.decentralicedClientUri,
        },
    });
    const [coingeckoSnapshotData, setCoingeckoSnapshotData] = useState<CoingeckoSnapshotPriceData>();
    const snapshots = data?.tokenSnapshots || [];


    useEffect(() => {
        //V2: repopulate formatted token data with coingecko data
        if (snapshots && snapshots.length > 0) {
            const fromTimestamp = snapshots[0].timestamp;
            const toTimestamp = snapshots[snapshots.length - 1].timestamp;
            const getTokenSnapshotData = async (address: string, fromTimestamp: number, toTimestamp: number) => {
                const baseURI = 'https://api.coingecko.com/api/v3/coins/';
                const queryParams = activeNetwork.coingeckoId + '/contract/' +
                    address + '/market_chart/range?vs_currency=usd&from=' + fromTimestamp.toString() + '&to=' +
                    toTimestamp.toString() + '&x_cg_demo_api_key=' + CG_KEY;
                try {
                    const coingeckoResponse = await fetch(baseURI + queryParams);
                    const json = await coingeckoResponse.json();
                    setCoingeckoSnapshotData(json);
                } catch {
                    console.log("Coingecko: market_chart API not reachable")
                }

            }
            getTokenSnapshotData(address, fromTimestamp, toTimestamp);
        }
    }, [snapshots]);


    const tvlData = snapshots.map((snapshot) => {
        const coingeckoPrice = coingeckoSnapshotData?.prices ? coingeckoSnapshotData?.prices.find(s => s[0] === snapshot.timestamp * 1000) : 0;
        let coingeckoValue = 0;
        if (coingeckoPrice) {
            coingeckoValue = Number(snapshot.totalBalanceNotional) * coingeckoPrice[1];
        }
        const value = parseFloat(snapshot.totalBalanceUSD);
        return {
            value: coingeckoValue > 0 ? coingeckoValue : value,
            time: unixToDate(snapshot.timestamp),
        };
    });

    const volumeData = snapshots.map((snapshot, idx) => {

        const coingeckoPrevPrice = coingeckoSnapshotData?.prices ? coingeckoSnapshotData?.prices.find(s => idx === 0 ? 0 : s[0] === snapshots[idx - 1].timestamp * 1000) : null;
        let coingeckoPrevVolValue = 0;
        if (coingeckoPrevPrice) {
            coingeckoPrevVolValue = idx === 0 ? 0 : Number(snapshots[idx - 1].totalVolumeNotional) * coingeckoPrevPrice[1];
        }
        const coingeckoPrice = coingeckoSnapshotData?.prices ? coingeckoSnapshotData?.prices.find(s => s[0] === snapshot.timestamp * 1000) : null;
        let coingeckoVolValue = 0;
        if (coingeckoPrice) {
            coingeckoVolValue = Number(snapshot.totalVolumeNotional) * coingeckoPrice[1];
        }
        const coingeckoDelta = coingeckoVolValue - coingeckoPrevVolValue > 0 ? coingeckoVolValue - coingeckoPrevVolValue : 0;

        const prevValue = idx === 0 ? 0 : parseFloat(snapshots[idx - 1].totalVolumeUSD);
        const value = parseFloat(snapshot.totalVolumeUSD);

        return {
            value: coingeckoDelta > 0 ? coingeckoDelta : value - prevValue,
            time: unixToDate(snapshot.timestamp),
        };
    });

    const priceData = snapshots.map((snapshot) => {
        const coingeckoPrice = coingeckoSnapshotData?.prices ? coingeckoSnapshotData?.prices.find(s => s[0] === snapshot.timestamp * 1000) : null;
        let coingeckoValue = 0;
        if (coingeckoPrice) {
            coingeckoValue = coingeckoPrice[1];
        }
        return {
            value: coingeckoValue,
            time: unixToDate(snapshot.timestamp),
        };
    });

    // Sanitize chart data (hack data corruption fix)
    return {
        tvlData: sanitizeChartData(tvlData, 'tvl'),
        volumeData: sanitizeChartData(volumeData, 'volume'),
        priceData,
    };
}
