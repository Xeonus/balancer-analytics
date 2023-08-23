import gql from "graphql-tag";
export const GqlPoolToken = gql`
  fragment GqlPoolToken on GqlPoolToken {
    id
    index
    name
    symbol
    balance
    address
    priceRate
    decimals
    weight
    totalBalance
  }
`;
export const GqlPoolTokenLinear = gql`
  fragment GqlPoolTokenLinear on GqlPoolTokenLinear {
    id
    index
    name
    symbol
    balance
    address
    priceRate
    decimals
    weight
    mainTokenBalance
    wrappedTokenBalance
    totalMainTokenBalance
    totalBalance
    pool {
      id
      name
      symbol
      address
      owner
      factory
      createTime
      wrappedIndex
      mainIndex
      upperTarget
      lowerTarget
      totalShares
      totalLiquidity
      bptPriceRate
      tokens {
        ... on GqlPoolToken {
          ...GqlPoolToken
        }
      }
    }
  }
  ${GqlPoolToken}
`;
export const GqlPoolTokenPhantomStable = gql`
  fragment GqlPoolTokenPhantomStable on GqlPoolTokenPhantomStable {
    id
    index
    name
    symbol
    balance
    address
    weight
    priceRate
    decimals
    totalBalance
    pool {
      id
      name
      symbol
      address
      owner
      factory
      createTime
      totalShares
      totalLiquidity
      nestingType
      swapFee
      amp
      tokens {
        ... on GqlPoolToken {
          ...GqlPoolToken
        }
        ... on GqlPoolTokenLinear {
          ...GqlPoolTokenLinear
        }
      }
    }
  }
  ${GqlPoolToken}
  ${GqlPoolTokenLinear}
`;
export const TokenSnapshot = gql`
  fragment TokenSnapshot on TokenSnapshot {
    id
    timestamp
    totalBalanceUSD
    totalBalanceNotional
    totalVolumeUSD
    totalVolumeNotional
    totalSwapCount
  }
`;
export const LatestPrice = gql`
  fragment LatestPrice on LatestPrice {
    asset
    pricingAsset
    price
    poolId {
      id
    }
  }
`;
export const User = gql`
  fragment User on User {
    id
    sharesOwned(first: 1000) {
      balance
      poolId {
        id
      }
    }
  }
`;
export const BalancerChartTokenPrice = gql`
  fragment BalancerChartTokenPrice on TokenPrice {
    id
    timestamp
    price
    amount
  }
`;
export const BalancerTokenPrice = gql`
  fragment BalancerTokenPrice on TokenPrice {
    id
    poolId {
      id
    }
    asset
    amount
    pricingAsset
    price
    block
    timestamp
  }
`;
export const BalancerPoolToken = gql`
  fragment BalancerPoolToken on PoolToken {
    id
    symbol
    name
    decimals
    address
    balance
    weight
    priceRate
    poolId {
      id
      address
    }
  }
`;
export const BalancerPool = gql`
  fragment BalancerPool on Pool {
    id
    address
    poolType
    symbol
    name
    swapFee
    totalWeight
    totalSwapVolume
    totalSwapFee
    totalLiquidity
    totalProtocolFee
    totalShares
    swapsCount
    holdersCount
    createTime
    owner
    amp
    factory
    strategyType
    swapEnabled
    tokens(first: 10) {
      ...BalancerPoolToken
    }
  }
  ${BalancerPoolToken}
`;
export const BalancerPoolSnapshot = gql`
  fragment BalancerPoolSnapshot on PoolSnapshot {
    id
    pool {
      id
    }
    totalShares
    swapVolume
    swapFees
    protocolFee
    timestamp
  }
`;
export const BalancerJoinExit = gql`
  fragment BalancerJoinExit on JoinExit {
    amounts
    valueUSD
    id
    sender
    timestamp
    tx
    type
    pool {
      id
      tokensList
    }
  }
`;
export const BalancerSwap = gql`
  fragment BalancerSwap on Swap {
    id
    caller
    tokenIn
    tokenInSym
    tokenOut
    tokenOutSym
    tokenAmountIn
    tokenAmountOut
    valueUSD
    poolId {
      id
      name
      address
      swapFee
    }
    userAddress {
      id
    }
    timestamp
    tx
  }
`;
export const BalancerToken = gql`
  fragment BalancerToken on Token {
    id
    address
    decimals
    name
    symbol
    totalBalanceUSD
    totalBalanceNotional
    totalVolumeUSD
    totalVolumeNotional
    totalSwapCount
    latestUSDPrice
  }
`;
export const BalancerTradePair = gql`
  fragment BalancerTradePair on TradePair {
    id
    token0 {
      ...BalancerToken
    }
    token1 {
      ...BalancerToken
    }
    totalSwapVolume
    totalSwapFee
  }
  ${BalancerToken}
`;
export const BalancerSnapshot = gql`
  fragment BalancerSnapshot on BalancerSnapshot {
    id
    timestamp
    poolCount
    totalLiquidity
    totalSwapCount
    totalProtocolFee
    totalSwapVolume
    totalSwapFee
  }
`;
export const VeBalGetVotingGauges = gql`
  query VeBalGetVotingGauges {
    veBalGetVotingList {
      id
      address
      chain
      type
      symbol
      gauge {
        address
        isKilled
        relativeWeightCap
        addedTimestamp
      }
      tokens {
        address
        logoURI
        symbol
        weight
      }
    }
  }
`;
export const GetPool = gql`
  query GetPool($id: String!) {
    pool: poolGetPool(id: $id) {
      id
      address
      name
      owner
      decimals
      factory
      symbol
      createTime
      dynamicData {
        poolId
        swapEnabled
        totalLiquidity
        totalLiquidity24hAgo
        totalShares
        totalShares24hAgo
        fees24h
        swapFee
        volume24h
        fees48h
        volume48h
        lifetimeVolume
        lifetimeSwapFees
        holdersCount
        swapsCount
        sharePriceAth
        sharePriceAthTimestamp
        sharePriceAtl
        sharePriceAtlTimestamp
        totalLiquidityAth
        totalLiquidityAthTimestamp
        totalLiquidityAtl
        totalLiquidityAtlTimestamp
        volume24hAth
        volume24hAthTimestamp
        volume24hAtl
        volume24hAtlTimestamp
        fees24hAth
        fees24hAthTimestamp
        fees24hAtl
        fees24hAtlTimestamp
        apr {
          swapApr
          nativeRewardApr {
            __typename
            ... on GqlPoolAprRange {
              min
              max
            }
            ... on GqlPoolAprTotal {
              total
            }
          }
          thirdPartyApr {
            __typename
            ... on GqlPoolAprRange {
              min
              max
            }
            ... on GqlPoolAprTotal {
              total
            }
          }
          items {
            id
            title
            __typename
            apr {
              ... on GqlPoolAprRange {
                min
                max
              }
              ... on GqlPoolAprTotal {
                total
              }
            }
            subItems {
              id
              title
              __typename
              apr {
                ... on GqlPoolAprRange {
                  min
                  max
                }
                ... on GqlPoolAprTotal {
                  total
                }
              }
            }
          }
        }
      }
      allTokens {
        id
        address
        name
        symbol
        decimals
        isNested
        isPhantomBpt
      }
      displayTokens {
        id
        address
        name
        weight
        symbol
        nestedTokens {
          id
          address
          name
          weight
          symbol
        }
      }
      staking {
        id
        type
        address
        gauge {
          id
          gaugeAddress
          rewards {
            id
            rewardPerSecond
            tokenAddress
          }
        }
      }
      investConfig {
        singleAssetEnabled
        proportionalEnabled
        options {
          poolTokenIndex
          poolTokenAddress
          tokenOptions {
            ... on GqlPoolToken {
              ...GqlPoolToken
            }
          }
        }
      }
      withdrawConfig {
        singleAssetEnabled
        proportionalEnabled
        options {
          poolTokenIndex
          poolTokenAddress
          tokenOptions {
            ... on GqlPoolToken {
              ...GqlPoolToken
            }
          }
        }
      }
      ... on GqlPoolWeighted {
        nestingType
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
          ... on GqlPoolTokenLinear {
            ...GqlPoolTokenLinear
          }
          ... on GqlPoolTokenPhantomStable {
            ...GqlPoolTokenPhantomStable
          }
        }
      }
      ... on GqlPoolGyro {
        nestingType
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
        }
      }
      ... on GqlPoolStable {
        amp
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
        }
      }
      ... on GqlPoolMetaStable {
        amp
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
        }
      }
      ... on GqlPoolElement {
        unitSeconds
        principalToken
        baseToken
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
        }
      }
      ... on GqlPoolPhantomStable {
        amp
        nestingType
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
          ... on GqlPoolTokenLinear {
            ...GqlPoolTokenLinear
          }
          ... on GqlPoolTokenPhantomStable {
            ...GqlPoolTokenPhantomStable
          }
        }
      }
      ... on GqlPoolLinear {
        mainIndex
        wrappedIndex
        lowerTarget
        upperTarget
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
        }
      }
      ... on GqlPoolLiquidityBootstrapping {
        name
        nestingType
        tokens {
          ... on GqlPoolToken {
            ...GqlPoolToken
          }
          ... on GqlPoolTokenLinear {
            ...GqlPoolTokenLinear
          }
          ... on GqlPoolTokenPhantomStable {
            ...GqlPoolTokenPhantomStable
          }
        }
      }
    }
  }
  ${GqlPoolToken}
  ${GqlPoolTokenLinear}
  ${GqlPoolTokenPhantomStable}
`;
export const GetPoolSwaps = gql`
  query GetPoolSwaps($first: Int, $skip: Int, $where: GqlPoolSwapFilter) {
    swaps: poolGetSwaps(first: $first, skip: $skip, where: $where) {
      id
      poolId
      timestamp
      tokenAmountIn
      tokenAmountOut
      tokenIn
      tokenOut
      tx
      userAddress
      valueUSD
    }
  }
`;
export const GetPoolJoinExits = gql`
  query GetPoolJoinExits($first: Int, $skip: Int, $poolId: String!) {
    joinExits: poolGetJoinExits(
      first: $first
      skip: $skip
      where: { poolIdIn: [$poolId] }
    ) {
      id
      timestamp
      tx
      type
      poolId
      valueUSD
      amounts {
        address
        amount
      }
    }
  }
`;
export const GetPoolBptPriceChartData = gql`
  query GetPoolBptPriceChartData(
    $address: String!
    $range: GqlTokenChartDataRange!
  ) {
    prices: tokenGetPriceChartData(address: $address, range: $range) {
      id
      price
      timestamp
    }
  }
`;
export const GetPoolUserJoinExits = gql`
  query GetPoolUserJoinExits($first: Int, $skip: Int, $poolId: String!) {
    joinExits: userGetPoolJoinExits(
      poolId: $poolId
      first: $first
      skip: $skip
    ) {
      id
      timestamp
      tx
      type
      poolId
      valueUSD
      amounts {
        address
        amount
      }
    }
  }
`;
export const GetUserSwaps = gql`
  query GetUserSwaps($first: Int, $skip: Int, $poolId: String!) {
    swaps: userGetSwaps(first: $first, skip: $skip, poolId: $poolId) {
      id
      poolId
      timestamp
      tokenAmountIn
      tokenAmountOut
      tokenIn
      tokenOut
      tx
      valueUSD
    }
  }
`;
export const GetPoolSnapshots = gql`
  query GetPoolSnapshots($poolId: String!, $range: GqlPoolSnapshotDataRange!) {
    snapshots: poolGetSnapshots(id: $poolId, range: $range) {
      id
      timestamp
      totalLiquidity
      volume24h
      fees24h
      sharePrice
    }
  }
`;
export const GetAllPools = gql`
  query GetAllPools {
    poolGetPools(
      where: {
        chainIn: [MAINNET, ARBITRUM, POLYGON, OPTIMISM, GNOSIS, AVALANCHE, BASE]
      }
      orderBy: totalLiquidity
      orderDirection: desc
    ) {
      chain
      address
      type
      name
      symbol
      allTokens {
        address
        name
        weight
        symbol
        decimals
        id
      }
      dynamicData {
        swapFee
        totalShares
        volume24h
        fees24h
        yieldCapture24h
        poolId
        totalLiquidity
        apr {
          hasRewardApr
          swapApr
          nativeRewardApr {
            __typename
            ... on GqlPoolAprRange {
              min
              max
            }
            ... on GqlPoolAprTotal {
              total
            }
          }
          thirdPartyApr {
            __typename
            ... on GqlPoolAprRange {
              min
              max
            }
            ... on GqlPoolAprTotal {
              total
            }
          }
          items {
            id
            title
            __typename
            apr {
              ... on GqlPoolAprRange {
                min
                max
              }
              ... on GqlPoolAprTotal {
                total
              }
            }
            subItems {
              id
              title
              __typename
              apr {
                ... on GqlPoolAprRange {
                  min
                  max
                }
                ... on GqlPoolAprTotal {
                  total
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const GetProtocolData = gql`
  query GetProtocolData(
    $startTimestamp: Int!
    $block24: Block_height!
    $block48: Block_height!
  ) {
    balancers(first: 1) {
      totalLiquidity
      totalSwapCount
      totalSwapFee
      totalProtocolFee
      totalSwapVolume
      poolCount
    }
    balancers24: balancers(first: 1, block: $block24) {
      totalLiquidity
      totalSwapCount
      totalSwapFee
      totalProtocolFee
      totalSwapVolume
      poolCount
    }
    balancers48: balancers(first: 1, block: $block48) {
      totalLiquidity
      totalSwapCount
      totalSwapFee
      totalProtocolFee
      totalSwapVolume
      poolCount
    }
    balancerSnapshots(
      first: 1000
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gte: $startTimestamp }
    ) {
      ...BalancerSnapshot
    }
    whaleSwaps: swaps(
      first: 100
      orderBy: timestamp
      orderDirection: desc
      where: { valueUSD_gte: "10000" }
    ) {
      ...BalancerSwap
    }
  }
  ${BalancerSnapshot}
  ${BalancerSwap}
`;
export const GetTokenData = gql`
  query GetTokenData($block24: Block_height!, $first: Int!) {
    tokens: tokens(
      first: $first
      orderBy: totalVolumeUSD
      orderDirection: desc
    ) {
      ...BalancerToken
    }
    tokens24: tokens(
      first: $first
      orderBy: totalVolumeUSD
      orderDirection: desc
      block: $block24
    ) {
      ...BalancerToken
    }
  }
  ${BalancerToken}
`;
export const GetTokenSingleData = gql`
  query GetTokenSingleData($address: String!, $block24: Block_height!) {
    tokens: tokens(
      orderBy: totalBalanceUSD
      orderDirection: desc
      where: { address: $address }
    ) {
      ...BalancerToken
    }
    tokens24: tokens(
      orderBy: totalBalanceUSD
      orderDirection: desc
      block: $block24
      where: { address: $address }
    ) {
      ...BalancerToken
    }
  }
  ${BalancerToken}
`;
export const GetTokenPageData = gql`
  query GetTokenPageData($address: String!, $startTimestamp: Int!) {
    tokenSnapshots(
      first: 500
      orderBy: timestamp
      orderDirection: asc
      where: { token: $address, timestamp_gte: $startTimestamp }
    ) {
      ...TokenSnapshot
    }
  }
  ${TokenSnapshot}
`;
export const GetTransactionData = gql`
  query GetTransactionData(
    $addresses: [Bytes!]!
    $poolIds: [String!]!
    $startTimestamp: Int!
  ) {
    swapsIn: swaps(
      first: 500
      orderBy: timestamp
      orderDirection: desc
      where: {
        tokenIn_in: $addresses
        poolId_in: $poolIds
        timestamp_gte: $startTimestamp
      }
    ) {
      ...BalancerSwap
    }
    swapsOut: swaps(
      first: 500
      orderBy: timestamp
      orderDirection: desc
      where: {
        tokenOut_in: $addresses
        poolId_in: $poolIds
        timestamp_gte: $startTimestamp
      }
    ) {
      ...BalancerSwap
    }
    joinExits(
      first: 150
      orderBy: timestamp
      orderDirection: desc
      where: { pool_in: $poolIds, timestamp_gte: $startTimestamp }
    ) {
      ...BalancerJoinExit
    }
  }
  ${BalancerSwap}
  ${BalancerJoinExit}
`;
export const GetPoolData = gql`
  query GetPoolData($block24: Block_height!, $first: Int!) {
    pools(first: $first, orderBy: totalLiquidity, orderDirection: desc) {
      ...BalancerPool
    }
    pools24: pools(
      first: $first
      orderBy: totalLiquidity
      orderDirection: desc
      block: $block24
    ) {
      ...BalancerPool
    }
  }
  ${BalancerPool}
`;
export const GetUserWalletPoolData = gql`
  query GetUserWalletPoolData($userAddress: String!, $block: Int!) {
    poolShares(
      block: { number: $block }
      first: 1000
      where: { userAddress: $userAddress, balance_gt: 0 }
    ) {
      balance
      poolId {
        id
        totalLiquidity
        totalShares
      }
    }
  }
`;
export const GetUserPoolBalances = gql`
  query GetUserPoolBalances($poolId: ID!) {
    pool(id: $poolId) {
      shares(
        where: { balance_gt: "0" }
        orderBy: balance
        orderDirection: desc
      ) {
        userAddress {
          id
        }
        balance
      }
    }
  }
`;
export const GetPoolChartData = gql`
  query GetPoolChartData($poolId: String!, $startTimestamp: Int!) {
    poolSnapshots(
      first: 1000
      orderBy: timestamp
      orderDirection: asc
      where: { pool: $poolId, timestamp_gte: $startTimestamp }
    ) {
      id
      amounts
      swapVolume
      swapFees
      protocolFee
      timestamp
      swapsCount
      holdersCount
      pool {
        id
        tokens {
          address
          balance
        }
      }
    }
  }
`;
export const BalancerPoolSwapFeeSnapshot = gql`
  query BalancerPoolSwapFeeSnapshot(
    $startTimestamp: Int!
    $endTimeStamp: Int!
  ) {
    poolSnapshots(
      first: 1000
      orderBy: swapFees
      orderDirection: desc
      where: { timestamp_in: [$startTimestamp, $endTimeStamp] }
    ) {
      id
      amounts
      totalShares
      protocolFee
      swapVolume
      swapFees
      timestamp
      swapsCount
      holdersCount
      pool {
        id
      }
    }
  }
`;
export const BalancerProtocolData = gql`
  query BalancerProtocolData(
    $skip: Int
    $first: Int
    $orderBy: Balancer_orderBy
    $orderDirection: OrderDirection
    $where: Balancer_filter
    $block: Block_height
  ) {
    balancers(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      totalLiquidity
      totalSwapVolume
      totalSwapFee
      totalProtocolFee
      poolCount
      totalSwapCount
    }
  }
`;
export const BalancerUser = gql`
  query BalancerUser($id: ID!, $block: Block_height) {
    user(id: $id, block: $block) {
      ...User
    }
  }
  ${User}
`;
export const BalancerUsers = gql`
  query BalancerUsers(
    $skip: Int
    $first: Int
    $orderBy: User_orderBy
    $orderDirection: OrderDirection
    $where: User_filter
    $block: Block_height
  ) {
    users(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...User
    }
  }
  ${User}
`;
export const BalancerTokenPrices = gql`
  query BalancerTokenPrices(
    $skip: Int
    $first: Int
    $orderBy: TokenPrice_orderBy
    $orderDirection: OrderDirection
    $where: TokenPrice_filter
    $block: Block_height
  ) {
    tokenPrices(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerTokenPrice
    }
  }
  ${BalancerTokenPrice}
`;
export const BalancerChartTokenPrices = gql`
  query BalancerChartTokenPrices($asset: Bytes!) {
    prices1: tokenPrices(
      skip: 0
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices2: tokenPrices(
      skip: 1000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices3: tokenPrices(
      skip: 2000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices4: tokenPrices(
      skip: 3000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices5: tokenPrices(
      skip: 4000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices6: tokenPrices(
      skip: 5000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
  }
  ${BalancerChartTokenPrice}
`;
export const GetBalancerPools = gql`
  query GetBalancerPools(
    $skip: Int
    $first: Int
    $orderBy: Pool_orderBy
    $orderDirection: OrderDirection
    $where: Pool_filter
    $block: Block_height
  ) {
    pools(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerPool
    }
  }
  ${BalancerPool}
`;
export const GetBalancerPool = gql`
  query GetBalancerPool($id: ID!, $block24: Block_height) {
    pool(id: $id) {
      ...BalancerPool
    }
    pool24: pool(id: $id, block: $block24) {
      ...BalancerPool
    }
  }
  ${BalancerPool}
`;
export const BalancerPoolTokens = gql`
  query BalancerPoolTokens(
    $skip: Int
    $first: Int
    $orderBy: PoolToken_orderBy
    $orderDirection: OrderDirection
    $where: PoolToken_filter
    $block: Block_height
  ) {
    poolTokens(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerPoolToken
    }
  }
  ${BalancerPoolToken}
`;
export const BalancerPoolHistoricalLiquidities = gql`
  query BalancerPoolHistoricalLiquidities(
    $skip: Int
    $first: Int
    $orderBy: PoolHistoricalLiquidity_orderBy
    $orderDirection: OrderDirection
    $where: PoolHistoricalLiquidity_filter
    $block: Block_height
  ) {
    poolHistoricalLiquidities(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      poolId {
        id
      }
      poolTotalShares
      poolLiquidity
      poolShareValue
      pricingAsset
      block
    }
  }
`;
export const BalancerPoolSnapshots = gql`
  query BalancerPoolSnapshots(
    $skip: Int
    $first: Int
    $orderBy: PoolSnapshot_orderBy
    $orderDirection: OrderDirection
    $where: PoolSnapshot_filter
    $block: Block_height
  ) {
    poolSnapshots(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerPoolSnapshot
    }
  }
  ${BalancerPoolSnapshot}
`;
export const BalancerLatestPrices = gql`
  query BalancerLatestPrices(
    $skip: Int
    $first: Int
    $orderBy: LatestPrice_orderBy
    $orderDirection: OrderDirection
    $where: LatestPrice_filter
    $block: Block_height
  ) {
    latestPrices(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      asset
      price
      poolId {
        id
      }
      pricingAsset
    }
  }
`;
export const BalancerJoinExits = gql`
  query BalancerJoinExits(
    $skip: Int
    $first: Int
    $orderBy: JoinExit_orderBy
    $orderDirection: OrderDirection
    $where: JoinExit_filter
    $block: Block_height
  ) {
    joinExits(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerJoinExit
    }
  }
  ${BalancerJoinExit}
`;
export const BalancePortfolioData = gql`
  query BalancePortfolioData($id: ID!, $previousBlockNumber: Int!) {
    user(id: $id) {
      ...User
    }
    pools(first: 1000, where: { totalShares_gt: "0" }) {
      ...BalancerPool
    }
    previousUser: user(id: $id, block: { number: $previousBlockNumber }) {
      ...User
    }
    previousPools: pools(
      first: 1000
      where: { totalShares_gt: "0" }
      block: { number: $previousBlockNumber }
    ) {
      ...BalancerPool
    }
  }
  ${User}
  ${BalancerPool}
`;
export const BalancerSwaps = gql`
  query BalancerSwaps(
    $skip: Int
    $first: Int
    $orderBy: Swap_orderBy
    $orderDirection: OrderDirection
    $where: Swap_filter
    $block: Block_height
  ) {
    swaps(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerSwap
    }
  }
  ${BalancerSwap}
`;
export const GetBalancerTokens = gql`
  query GetBalancerTokens(
    $skip: Int
    $first: Int
    $orderBy: Token_orderBy
    $orderDirection: OrderDirection
    $where: Token_filter
    $block: Block_height
  ) {
    tokens(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerToken
    }
  }
  ${BalancerToken}
`;
export const BalancerTradePairs = gql`
  query BalancerTradePairs(
    $skip: Int
    $first: Int
    $orderBy: TradePair_orderBy
    $orderDirection: OrderDirection
    $where: TradePair_filter
    $block: Block_height
  ) {
    tradePairs(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerTradePair
    }
  }
  ${BalancerTradePair}
`;
export const GetBalancerSnapshots = gql`
  query GetBalancerSnapshots(
    $skip: Int
    $first: Int
    $orderBy: BalancerSnapshot_orderBy
    $orderDirection: OrderDirection
    $where: BalancerSnapshot_filter
    $block: Block_height
  ) {
    balancerSnapshots(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerSnapshot
    }
  }
  ${BalancerSnapshot}
`;
export const GetLatestPrices = gql`
  query GetLatestPrices(
    $skip: Int
    $first: Int
    $orderBy: LatestPrice_orderBy
    $orderDirection: OrderDirection
    $where: LatestPrice_filter
    $block: Block_height
  ) {
    latestPrices(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...LatestPrice
    }
  }
  ${LatestPrice}
`;
export const GetLatestBlock = gql`
  query GetLatestBlock {
    blocks(first: 1, orderBy: timestamp, orderDirection: desc) {
      id
      number
      timestamp
    }
  }
`;
