import { useEffect, useState } from 'react';
import { useBalancerTokens } from './useTokens';
import { useBalancerPools } from './usePools';
import { PoolData, TokenData } from './balancerTypes';

export function useFetchSearchResults(value: string): {
    tokens: TokenData[];
    pools: PoolData[];
    loading: boolean;
} {
    const allTokens = useBalancerTokens();
    const allPools = useBalancerPools();
    const [tokenData, setTokenData] = useState<TokenData[]>([]);
    const [poolData, setPoolData] = useState<PoolData[]>([]);

    useEffect(() => {
        if (value && value.length > 0) {
            const expression = new RegExp(value, 'i');
            const filteredTokens = allTokens.filter(
                (token) => token.name.search(expression) || token.symbol.match(expression),
            );
            const filteredPools = allPools.filter((pool) => {
                if (pool.name.match(expression) || pool.symbol.match(expression)) {
                    return true;
                }

                return (
                    pool.tokens.filter((token) => token.name.search(expression) || token.symbol.match(expression))
                        .length > 0
                );
            });

            setTokenData(filteredTokens);
            setPoolData(filteredPools);
        }
    }, [value]);

    return {
        tokens: tokenData,
        pools: poolData,
        loading: false,
    };
}
