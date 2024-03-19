import gql from 'graphql-tag';
import { useState, useEffect, useMemo } from 'react';
import { splitQuery } from '../utils/queries';
import { useActiveNetworkVersion, useClients } from '../state/application/hooks';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export const GET_BLOCKS = (timestamps: string[]) => {
    let queryString = 'query blocks {';
    queryString += timestamps.map((timestamp) => {
        return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
            timestamp + 600
        } }) {
        number
      }`;
    });
    queryString += '}';
    return gql(queryString);
};

interface BlockData {
    number: any; // Adjust the type according to the actual data
    // Add other properties of block data if necessary
}
interface SplitQueryResults {
    [key: string]: BlockData[]; // Assuming each key maps to an array of BlockData
}

/**
 * for a given array of timestamps, returns block entities
 * @param timestamps
 */
export function useBlocksFromTimestamps(
    timestamps: number[],
    blockClientOverride?: ApolloClient<NormalizedCacheObject>,
): {
    blocks: { timestamp: string; number: any }[] | undefined;
    error: boolean;
} {
    const [activeNetwork] = useActiveNetworkVersion();
    const [blocks, setBlocks] = useState<{ [networkId: string]: { timestamp: string; number: any }[] }>({});
    const [error, setError] = useState(false);
    const { blockClient } = useClients();
    const activeBlockClient = blockClientOverride ?? blockClient;

    useEffect(() => {
        const fetchData = async () => {
            setError(false); // Reset error state before fetching
            try {
                const results: SplitQueryResults | undefined = await splitQuery(GET_BLOCKS, activeBlockClient, [], timestamps);

                if (results) {
                    const formattedResults = Object.keys(results).map(key => {
                        const blockData = results[key].length > 0 ? results[key][0] : null;
                        const timestamp = key.split('t')[1]; // Assuming key is prefixed with something followed by the timestamp
                        return blockData ? { timestamp, number: blockData.number } : null;
                    }).filter(item => item !== null);

                    setBlocks(prevBlocks => ({
                        ...prevBlocks,
                        [activeNetwork.id]: formattedResults,
                    }));
                } else {
                    console.warn("splitQuery returned undefined.");
                }
            } catch (err) {
                console.error("Error fetching blocks:", err);
                setError(true);
            }
        };

        fetchData();
    }, [JSON.stringify(timestamps), activeBlockClient, activeNetwork.id]);

    return {
        blocks: blocks[activeNetwork.id],
        error,
    };
}

/**
 * @notice Fetches block objects for an array of timestamps.
 * @dev blocks are returned in chronological order (ASC) regardless of input.
 * @dev blocks are returned at string representations of Int
 * @dev timestamps are returns as they were provided; not the block time.
 * @param {Array} timestamps
 */
export async function getBlocksFromTimestamps(
    timestamps: number[],
    blockClient: ApolloClient<NormalizedCacheObject>,
    skipCount = 500,
) {
    if (timestamps?.length === 0) {
        return [];
    }
    const fetchedData: any = await splitQuery(GET_BLOCKS, blockClient, [], timestamps, skipCount);

    const blocks: any[] = [];
    if (fetchedData) {
        for (const t in fetchedData) {
            if (fetchedData[t].length > 0) {
                blocks.push({
                    timestamp: t.split('t')[1],
                    number: fetchedData[t][0]['number'],
                });
            }
        }
    }
    return blocks;
}
