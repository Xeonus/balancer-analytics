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
    //uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
    uri: 'https://balancer-v2-analytics.stellate.sh/',
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
    //uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2',
    uri: 'https://balancer-arbitrum-v2-analytics.stellate.sh',
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
    //uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
    uri: 'https://balancer-polygon-prune-v2-analytics.stellate.sh',
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

export const polygonZKEVMClient = new ApolloClient({
    //uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
    uri: 'https://balancer-polygon-zkevm-v2-analytics.stellate.sh',
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

export const polygonZKEVMBlockClient = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/48427/bleu-polygon-zkevm-blocks/version/latest',
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

  export const gnosisClient = new ApolloClient({
    //uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
    uri: 'https://balancer-gnosis-chain-v2-analytics.stellate.sh',
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

  export const gnosisBlockClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/x0swapsubgraph/xdai-blocks',
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

export const avalancheBlockClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/lynnshaoyu/avalanche-blocks',
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

export const avalancheClient = new ApolloClient({
    //uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
    uri: 'https://balancer-avalanche-v2-analytics.stellate.sh',
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

export const baseBlockClient = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/48427/bleu-base-blocks/version/latest',
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

export const baseClient = new ApolloClient({
    //uri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
    uri: 'https://api.studio.thegraph.com/query/24660/balancer-base-v2/version/latest',
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