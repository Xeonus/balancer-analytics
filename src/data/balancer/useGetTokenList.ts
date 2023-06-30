import { useState, useEffect } from "react";

export interface TokenList {
    name: string
    version: Version
    keywords: string[]
    logoURI: string
    timestamp: string
    tokens: TokenListToken[]
}

export interface Version {
    major: number
    minor: number
    patch: number
}

export interface TokenListToken {
    chainId: number
    address: string
    name: string
    symbol: string
    decimals: number
    logoURI?: string
}

const useGetTokenLists = (): TokenList | undefined  => {
    const [tokenList, setTokenList] = useState<TokenList>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/balancer/tokenlists/main/generated/balancer.tokenlist.json"
                );
                const data = await response.json();
                setTokenList(data);
            } catch (error) {
                console.error("Error fetching token list data:", error);
            }
        };
        fetchData();
    }, []);

        return tokenList;
};

export default useGetTokenLists;
