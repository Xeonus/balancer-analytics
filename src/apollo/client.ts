import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
    ArbitrumNetworkInfo, AvalancheNetworkInfo, BaseNetworkInfo,
    EthereumNetworkInfo, FraxtalNetworkInfo, GnosisNetworkInfo,
    PolygonNetworkInfo,
    PolygonZkEVMNetworkInfo
} from "../constants/networks";

export const blockClient = new ApolloClient({
    uri: EthereumNetworkInfo.blockClientUri,
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
    uri: EthereumNetworkInfo.decentralicedClientUri,
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
    uri: ArbitrumNetworkInfo.decentralicedClientUri,
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
    uri: ArbitrumNetworkInfo.blockClientUri,
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
    uri: PolygonNetworkInfo.decentralicedClientUri,
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
    uri: PolygonNetworkInfo.blockClientUri,
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
    uri: PolygonZkEVMNetworkInfo.decentralicedClientUri,
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
    uri: PolygonZkEVMNetworkInfo.blockClientUri,
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
    uri: GnosisNetworkInfo.decentralicedClientUri,
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
    uri: GnosisNetworkInfo.blockClientUri,
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
    uri: AvalancheNetworkInfo.blockClientUri,
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
    uri: AvalancheNetworkInfo.decentralicedClientUri,
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
    uri: BaseNetworkInfo.decentralicedClientUri,
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

export const fraxtalBlockClient = new ApolloClient({
    uri: 'https://api.goldsky.com/api/public/project_clwhu1vopoigi01wmbn514m1z/subgraphs/fraxtal-blocks/1.0.0/gn',
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

export const fraxtalClient = new ApolloClient({
    uri: FraxtalNetworkInfo.clientUri,
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

export const balancerV3APIClient = new ApolloClient({
    uri: 'https://api-v3.balancer.fi/',
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
