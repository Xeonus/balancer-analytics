import { useGetLatestBlockQuery } from '../../apollo/generated/graphql-codegen-generated';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export function useLatestBlock(blockClient: ApolloClient<NormalizedCacheObject>): { blockNumber?: number; loading: boolean } {
    const { data, loading } = useGetLatestBlockQuery({ pollInterval: 180000, client: blockClient });

    return {
        blockNumber: data?.blocks[0]?.number ? parseFloat(data.blocks[0].number) : undefined,
        loading,
    };
}
