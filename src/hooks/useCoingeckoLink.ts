import { useState, useEffect } from 'react';

const coingeckoUrlPrefix = 'https://www.coingecko.com/en/coins/';

/**
 * Check if asset exists on CMC, if exists
 * return  url, if not return undefined
 * @param address token address
 */
export function useCoingeckoLink(address: string): string | undefined {
    const [link, setLink] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetchLink() {
            const url = coingeckoUrlPrefix + address.toLowerCase();

            setLink(url);
        }
        if (address) {
            fetchLink();
        }
    }, [address]);

    return link;
}