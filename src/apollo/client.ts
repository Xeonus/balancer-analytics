import { ApolloClient, InMemoryCache } from '@apollo/client';

export const healthClient = new ApolloClient({
    uri: 'https://api.thegraph.com/index-node/graphql',
    cache: new InMemoryCache(),
});

export const blockClient = new ApolloClient({
    uri: process.env.REACT_APP_BLOCKS_SUBGRAPH_URL,
    cache: new InMemoryCache(),
    queryDeduplication: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

export const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
    cache: new InMemoryCache({
        typePolicies: {
            Token: {
                // Singleton types that have no identifying field can use an empty
                // array for their keyFields.
                keyFields: false,
            },
            Pool: {
                // Singleton types that have no identifying field can use an empty
                // array for their keyFields.
                keyFields: false,
            },
        },
    }),
    queryDeduplication: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

export const arbitrumClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2',
    cache: new InMemoryCache({
      typePolicies: {
        Token: {
          // Singleton types that have no identifying field can use an empty
          // array for their keyFields.
          keyFields: false,
        },
        Pool: {
          // Singleton types that have no identifying field can use an empty
          // array for their keyFields.
          keyFields: false,
        },
      },
    }),
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })
  
  export const arbitrumBlockClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks',
    cache: new InMemoryCache(),
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    },
  })

  export const polygonClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
    cache: new InMemoryCache({
      typePolicies: {
        Token: {
          // Singleton types that have no identifying field can use an empty
          // array for their keyFields.
          keyFields: false,
        },
        Pool: {
          // Singleton types that have no identifying field can use an empty
          // array for their keyFields.
          keyFields: false,
        },
      },
    }),
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    },
  })
  
  export const polygonBlockClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/polygon-blocks',
    cache: new InMemoryCache(),
    queryDeduplication: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    },
  })