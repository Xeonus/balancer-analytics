
import ARBITRUM_LOGO_URL from '../assets/svg/arbitrum.svg'
import ETHEREUM_LOGO_URL from '../assets/svg/ethereum.svg'
import POLYGON_LOGO_URL from '../assets/svg/polygon.svg'
import GNOSIS_LOGO_URL from '../assets/svg/gnosis.svg'
import AVALANCHE_LOGO_URL from '../assets/svg/avalancheLogo.svg'
import BASE_LOGO_URL from '../assets/svg/base.svg'

import {
  BALANCER_PRIMARY_COLOR,
  BALANCER_SECONDARY_COLOR, PERSONAL_GRAPH_KEY
} from '../data/balancer/constants';

export enum SupportedNetwork {
  ETHEREUM,
  ARBITRUM,
  POLYGON,
  GNOSIS,
  AVALANCHE,
  BASE,
}

export type NetworkInfo = {
  id: SupportedNetwork
  chainId: string
  v3NetworkID: string
  coingeckoId: string
  debankId: string
  balAddress: string,
  feeCollectorThreshold: number
  decentralicedClientUri: string
  blockClientUri: string
  gaugeClientUri: string
  rpcUrl: string
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

const DECENTRALIZED_ENDPOINT = 'https://gateway-arbitrum.network.thegraph.com/api/' + PERSONAL_GRAPH_KEY + '/subgraphs/id/'
const ORMILABS_ENDPOINT = 'https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/'

export const EthereumNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.ETHEREUM,
  chainId: '1',
  v3NetworkID: 'MAINNET',
  coingeckoId: 'ethereum',
  debankId: 'eth',
  balAddress: '0xba100000625a3754423978a60c9317c58a424e3d',
  feeCollectorThreshold: 5000,
  route: '',
  name: 'Ethereum',
  startTimeStamp: 1620712698,
  appUri: 'https://app.balancer.fi/#/',
  clientUri: 'https://api.studio.thegraph.com/query/75376/balancer-v2/version/latest',
  gaugeClientUri: ORMILABS_ENDPOINT + 'balancer-gauges-mainnet/latest/gn',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + 'C4ayEZP2yTXRAB8vSaTrgN4m9anTe9Mdm2ViyiAuV9TV',
  blockClientUri: DECENTRALIZED_ENDPOINT + '9A6bkprqEG2XsZUYJ5B2XXp6ymz9fNcn4tVPxMWDztYC',
  rpcUrl: 'https://eth.llamarpc.com',
  bgColor: BALANCER_PRIMARY_COLOR,
  primaryColor: BALANCER_PRIMARY_COLOR,
  secondaryColor: BALANCER_SECONDARY_COLOR,
  imageURL: ETHEREUM_LOGO_URL,
}

export const ArbitrumNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.ARBITRUM,
  chainId: '42161',
  v3NetworkID: 'ARBITRUM',
  coingeckoId: 'arbitrum-one',
  debankId: 'arb',
  balAddress: '0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8',
  feeCollectorThreshold: 5000,
  route: 'arbitrum',
  name: 'Arbitrum',
  startTimeStamp: 1619874000,
  appUri: 'https://app.balancer.fi/#/arbitrum/',
  clientUri: 'https://api.studio.thegraph.com/query/75376/balancer-arbitrum-v2/version/latest',
  gaugeClientUri: ORMILABS_ENDPOINT + 'balancer-gauges-arbitrum/latest/gn',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + '98cQDy6tufTJtshDCuhh9z2kWXsQWBHVh2bqnLHsGAeS',
  blockClientUri: DECENTRALIZED_ENDPOINT + '64DCU8nq48qdDABnobpDafsg7RF75Rx5soKrHiGA8mqp',
  rpcUrl: 'https://arb1.arbitrum.io/rpc',
  imageURL: ARBITRUM_LOGO_URL,
  bgColor: '#0A294B',
  primaryColor: '#0490ED',
  secondaryColor: '#96BEDC',
  blurb: 'L2',
}

export const PolygonNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.POLYGON,
  chainId: '137',
  v3NetworkID: 'POLYGON',
  coingeckoId: 'polygon-pos',
  debankId: 'matic',
  balAddress: '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3',
  feeCollectorThreshold: 5000,
  route: 'polygon',
  name: 'Polygon',
  startTimeStamp: 1619874000,
  appUri: 'https://app.balancer.fi/#/polygon/',
  clientUri: 'https://api.studio.thegraph.com/query/75376/balancer-polygon-v2/version/latest',
  gaugeClientUri: ORMILABS_ENDPOINT + 'balancer-gauges-polygon/latest/gn',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + 'H9oPAbXnobBRq1cB3HDmbZ1E8MWQyJYQjT1QDJMrdbNp',
  blockClientUri: DECENTRALIZED_ENDPOINT + 'DMnXZnphMTkcFiK5NHm6LzwhJ7yUy7seVnZuNkNsXLHp',
  rpcUrl: 'https://polygon-rpc.com',
  bgColor: '#8247e5',
  primaryColor: '#8247e5',
  secondaryColor: '#FB7876',
  imageURL: POLYGON_LOGO_URL,
  blurb: 'Beta',
}

export const GnosisNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.GNOSIS,
  chainId: '100',
  v3NetworkID: 'GNOSIS',
  coingeckoId: 'xdai-ecosystem',
  debankId: 'xdai',
  balAddress: '0x7eF541E2a22058048904fE5744f9c7E4C57AF717',
  feeCollectorThreshold: 5000,
  route: 'gnosis',
  name: 'Gnosis',
  startTimeStamp: 1673807871,
  appUri: 'https://app.balancer.fi/#/gnosis-chain/',
  clientUri: 'https://api.studio.thegraph.com/query/75376/balancer-gnosis-chain-v2/version/latest',
  gaugeClientUri: ORMILABS_ENDPOINT + 'balancer-gauges-gnosis/latest/gn',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + 'EJezH1Cp31QkKPaBDerhVPRWsKVZLrDfzjrLqpmv6cGg',
  blockClientUri: DECENTRALIZED_ENDPOINT + '8ZD25Ff1efVjqHkGmPdgn7oevwe3FkSB7WFygyNEsAco',
  rpcUrl: 'https://rpc.gnosis.gateway.fm',
  bgColor: '#8247e5',
  primaryColor: '#0d8e74',
  secondaryColor: '#FB7876',
  imageURL: GNOSIS_LOGO_URL,
  blurb: 'Beta',
}

export const AvalancheNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.AVALANCHE,
  chainId: '43114',
  v3NetworkID: 'AVALANCHE',
  coingeckoId: 'avalanche',
  debankId: 'avax',
  balAddress: '',
  feeCollectorThreshold: 5000,
  route: 'avalanche',
  name: 'Avalanche',
  startTimeStamp: 1688229198,
  appUri: 'https://app.balancer.fi/#/avalanche/',
  clientUri: 'https://api.studio.thegraph.com/query/75376/balancer-avalanche-v2/version/latest',
  gaugeClientUri: ORMILABS_ENDPOINT + 'balancer-gauges-avalanche/latest/gn',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + '7asfmtQA1KYu6CP7YVm5kv4bGxVyfAHEiptt2HMFgkHu',
  blockClientUri: DECENTRALIZED_ENDPOINT + '97YH6dMhGcXoTvVwDAML6GxYm9hBh7PCz6WPscUkrFhv',
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  bgColor: '#F01B36',
  primaryColor: '#F01B36',
  secondaryColor: '#FB7876',
  imageURL: AVALANCHE_LOGO_URL,
  blurb: 'Beta',
}

export const BaseNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.BASE,
  chainId: '8453',
  v3NetworkID: 'BASE',
  coingeckoId: 'base',
  debankId: 'base',
  balAddress: '0x4158734d47fc9692176b5085e0f52ee0da5d47f1',
  feeCollectorThreshold: 5000,
  route: 'base',
  name: 'Base',
  startTimeStamp: 1690495200,
  appUri: 'https://app.balancer.fi/#/base/',
  clientUri: 'https://api.studio.thegraph.com/query/24660/balancer-base-v2/version/latest',
  gaugeClientUri: ORMILABS_ENDPOINT + 'balancer-gauges-base/latest/gn',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + 'E7XyutxXVLrp8njmjF16Hh38PCJuHm12RRyMt5ma4ctX',
  blockClientUri: DECENTRALIZED_ENDPOINT + '8k66QCiBQGaTE4Vg62UpQL9Umhr5JQ3V6KcPNy1vvBaT',
  rpcUrl: 'https://base.publicnode.com',
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
  GnosisNetworkInfo,
  AvalancheNetworkInfo,
  BaseNetworkInfo,
]
