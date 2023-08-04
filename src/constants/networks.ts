
import ARBITRUM_LOGO_URL from '../assets/svg/arbitrum.svg'
import ETHEREUM_LOGO_URL from '../assets/svg/ethereum.svg'
import POLYGON_LOGO_URL from '../assets/svg/polygon.svg'
import GNOSIS_LOGO_URL from '../assets/svg/gnosis.svg'
import ZKEVM_LOGO_URL from '../assets/svg/zkevm.svg'
import AVALANCHE_LOGO_URL from '../assets/svg/avalancheLogo.svg'
import BASE_LOGO_URL from '../assets/svg/base.svg'

import {
  ALCHEMY_KEY,
  ALCHEMY_KEY_ARBITRUM, ALCHEMY_KEY_POLYGON, ALCHEMY_KEY_ZKEVM,
  ALCHEMY_URL, ALCHEMY_URL_ARBITRUM, ALCHEMY_URL_POLYGON, ALCHEMY_URL_ZKEVM,
  BALANCER_PRIMARY_COLOR,
  BALANCER_SECONDARY_COLOR, PERSONAL_GRAPH_KEY
} from '../data/balancer/constants';

export enum SupportedNetwork {
  ETHEREUM,
  ARBITRUM,
  POLYGON,
  GNOSIS,
  ZKEVM,
  AVALANCHE,
  BASE,
}

export type NetworkInfo = {
  id: SupportedNetwork
  chainId: string
  coingeckoId: string
  debankId: string
  balAddress: string,
  feeCollectorThreshold: number
  decentralicedClientUri: string
  alchemyRPCUrl: string
  alchemyKey: string
  route: string
  name: string
  startTimeStamp: number
  clientUri: string
  appUri: string
  imageURL: string
  bgColor: string
  primaryColor: string
  secondaryColor: string
  blurb?: string
}

export const EthereumNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.ETHEREUM,
  chainId: '1',
  coingeckoId: 'ethereum',
  debankId: 'eth',
  balAddress: '0xba100000625a3754423978a60c9317c58a424e3d',
  feeCollectorThreshold: 5000,
  route: '',
  name: 'Ethereum',
  startTimeStamp: 1619874000,
  appUri: 'https://app.balancer.fi/#/',
  //clientUri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
  clientUri: 'https://balancer-v2-analytics.stellate.sh',
  decentralicedClientUri: 'https://gateway.thegraph.com/api/' + PERSONAL_GRAPH_KEY + '/subgraphs/id/GAWNgiGrA9eRce5gha9tWc7q5DPvN3fs5rSJ6tEULFNM',
  alchemyRPCUrl: ALCHEMY_URL,
  alchemyKey: ALCHEMY_KEY,
  bgColor: BALANCER_PRIMARY_COLOR,
  primaryColor: BALANCER_PRIMARY_COLOR,
  secondaryColor: BALANCER_SECONDARY_COLOR,
  imageURL: ETHEREUM_LOGO_URL,
}

export const ArbitrumNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.ARBITRUM,
  chainId: '42161',
  coingeckoId: 'arbitrum-one',
  debankId: 'arb',
  balAddress: '0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8',
  feeCollectorThreshold: 5000,
  route: 'arbitrum',
  name: 'Arbitrum',
  startTimeStamp: 1619874000,
  appUri: 'https://app.balancer.fi/#/arbitrum/',
  //clientUri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2',
  clientUri: 'https://balancer-arbitrum-v2-analytics.stellate.sh',
  decentralicedClientUri: '',
  alchemyRPCUrl: ALCHEMY_URL_ARBITRUM,
  alchemyKey: ALCHEMY_KEY_ARBITRUM,
  imageURL: ARBITRUM_LOGO_URL,
  bgColor: '#0A294B',
  primaryColor: '#0490ED',
  secondaryColor: '#96BEDC',
  blurb: 'L2',
}

export const PolygonNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.POLYGON,
  chainId: '137',
  coingeckoId: 'polygon-pos',
  debankId: 'matic',
  balAddress: '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3',
  feeCollectorThreshold: 5000,
  route: 'polygon',
  name: 'Polygon',
  startTimeStamp: 1619874000,
  appUri: 'https://app.balancer.fi/#/polygon/',
  //clientUri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-prune-v2',
  clientUri: 'https://balancer-polygon-prune-v2-analytics.stellate.sh',
  decentralicedClientUri: '',
  alchemyRPCUrl: ALCHEMY_URL_POLYGON,
  alchemyKey: ALCHEMY_KEY_POLYGON,
  bgColor: '#8247e5',
  primaryColor: '#8247e5',
  secondaryColor: '#FB7876',
  imageURL: POLYGON_LOGO_URL,
  blurb: 'Beta',
}

export const PolygonZkEVMNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.ZKEVM,
  chainId: '1101',
  coingeckoId: 'polygon-zkevm',
  debankId: 'pze',
  balAddress: '0x120eF59b80774F02211563834d8E3b72cb1649d6',
  feeCollectorThreshold: 5000,
  route: 'zkevm',
  name: 'Polygon zkEVM',
  startTimeStamp: 1685990897,
  appUri: 'https://app.balancer.fi/#/zkevm/',
  //clientUri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-prune-v2',
  clientUri: 'https://balancer-polygon-zkevm-v2-analytics.stellate.sh',
  decentralicedClientUri: '',
  alchemyRPCUrl: ALCHEMY_URL_ZKEVM,
  alchemyKey: ALCHEMY_KEY_ZKEVM,
  bgColor: '#a176e8',
  primaryColor: '#620df3',
  secondaryColor: '#FB7876',
  imageURL: ZKEVM_LOGO_URL,
  blurb: 'Beta',
}

export const GnosisNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.GNOSIS,
  chainId: '100',
  coingeckoId: 'xdai-ecosystem',
  debankId: 'xdai',
  balAddress: '0x7eF541E2a22058048904fE5744f9c7E4C57AF717',
  feeCollectorThreshold: 5000,
  route: 'gnosis',
  name: 'Gnosis',
  startTimeStamp: 1673807871,
  appUri: 'https://app.balancer.fi/#/gnosis-chain/',
  //clientUri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-prune-v2',
  clientUri: 'https://balancer-gnosis-chain-v2-analytics.stellate.sh',
  decentralicedClientUri: '',
  alchemyRPCUrl: 'https://rpc.gnosis.gateway.fm',
  alchemyKey: '',
  bgColor: '#8247e5',
  primaryColor: '#0d8e74',
  secondaryColor: '#FB7876',
  imageURL: GNOSIS_LOGO_URL,
  blurb: 'Beta',
}

export const AvalancheNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.AVALANCHE,
  chainId: '43114',
  coingeckoId: 'avalanche',
  debankId: 'avax',
  balAddress: '',
  feeCollectorThreshold: 5000,
  route: 'avalanche',
  name: 'Avalanche',
  startTimeStamp: 1688229198,
  appUri: 'https://app.balancer.fi/#/avalanche/',
  //clientUri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-prune-v2',
  clientUri: 'https://balancer-avalanche-v2-analytics.stellate.sh',
  decentralicedClientUri: '',
  alchemyRPCUrl: ' https://api.avax.network/ext/bc/C/rpc ',
  alchemyKey: '',
  bgColor: '#F01B36',
  primaryColor: '#F01B36',
  secondaryColor: '#FB7876',
  imageURL: AVALANCHE_LOGO_URL,
  blurb: 'Beta',
}

export const BaseNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.BASE,
  chainId: '8453',
  coingeckoId: 'base',
  debankId: 'base',
  balAddress: '',
  feeCollectorThreshold: 5000,
  route: 'base',
  name: 'Base',
  startTimeStamp: 1690495200,
  appUri: 'https://app.balancer.fi/#/avalanche/',
  //clientUri: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-prune-v2',
  clientUri: 'https://api.studio.thegraph.com/query/24660/balancer-base-v2/version/latest',
  decentralicedClientUri: '',
  alchemyRPCUrl: ' https://mainnet.base.org ',
  alchemyKey: '',
  bgColor: '#0030a6',
  primaryColor: '#0027a2',
  secondaryColor: '#005094',
  imageURL: BASE_LOGO_URL,
  blurb: 'Beta',
}

export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [
  EthereumNetworkInfo,
  ArbitrumNetworkInfo,
  PolygonNetworkInfo,
  PolygonZkEVMNetworkInfo,
  GnosisNetworkInfo,
  AvalancheNetworkInfo,
  BaseNetworkInfo
]