
import ARBITRUM_LOGO_URL from '../assets/svg/arbitrum.svg'
import ETHEREUM_LOGO_URL from '../assets/svg/ethereum.svg'
import POLYGON_LOGO_URL from '../assets/svg/polygon.svg'
import GNOSIS_LOGO_URL from '../assets/svg/gnosis.svg'
import ZKEVM_LOGO_URL from '../assets/svg/zkevm.svg'
import AVALANCHE_LOGO_URL from '../assets/svg/avalancheLogo.svg'
import BASE_LOGO_URL from '../assets/svg/base.svg'
import MODE_LOGO_URL from '../assets/svg/mode.svg'
import FRAXTAL_LOGO_URL from '../assets/svg/fraxtal.svg'

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
  MODE,
  FRAXTAL
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

const DECENTRALIZED_ENDPOINT = 'https://gateway-arbitrum.network.thegraph.com/api/' + PERSONAL_GRAPH_KEY + '/subgraphs/id/'

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
  gaugeClientUri: 'https://api.studio.thegraph.com/query/75376/balancer-gauges/version/latest',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + 'C4ayEZP2yTXRAB8vSaTrgN4m9anTe9Mdm2ViyiAuV9TV',
  blockClientUri: DECENTRALIZED_ENDPOINT + '9A6bkprqEG2XsZUYJ5B2XXp6ymz9fNcn4tVPxMWDztYC',
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
  gaugeClientUri: 'https://api.studio.thegraph.com/query/75376/balancer-gauges-arbitrum/version/latest',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + '/subgraphs/id/98cQDy6tufTJtshDCuhh9z2kWXsQWBHVh2bqnLHsGAeS',
  blockClientUri: DECENTRALIZED_ENDPOINT + 'JBnWrv9pvBvSi2pUZzba3VweGBTde6s44QvsDABP47Gt',
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
  gaugeClientUri: 'https://api.studio.thegraph.com/query/75376/balancer-gauges-polygon/version/latest',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + '/subgraphs/id/H9oPAbXnobBRq1cB3HDmbZ1E8MWQyJYQjT1QDJMrdbNp',
  blockClientUri: DECENTRALIZED_ENDPOINT + 'DMnXZnphMTkcFiK5NHm6LzwhJ7yUy7seVnZuNkNsXLHp',
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
  v3NetworkID: 'ZKEVM',
  coingeckoId: 'polygon-zkevm',
  debankId: 'pze',
  balAddress: '0x120eF59b80774F02211563834d8E3b72cb1649d6',
  feeCollectorThreshold: 5000,
  route: 'zkevm',
  name: 'Polygon zkEVM',
  startTimeStamp: 1685990897,
  appUri: 'https://app.balancer.fi/#/zkevm/',
  clientUri: 'https://api.studio.thegraph.com/query/24660/balancer-polygon-zk-v2/version/latest',
  gaugeClientUri: 'https://api.studio.thegraph.com/query/24660/balancer-gauges-polygon-zk/version/latest',
  decentralicedClientUri: 'https://api.studio.thegraph.com/query/24660/balancer-polygon-zk-v2/version/latest',
  blockClientUri: '',
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
  gaugeClientUri: 'https://api.studio.thegraph.com/query/75376/balancer-gauges-gnosis-chain/version/latest',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + '/subgraphs/id/EJezH1Cp31QkKPaBDerhVPRWsKVZLrDfzjrLqpmv6cGg',
  blockClientUri: DECENTRALIZED_ENDPOINT + '8ZD25Ff1efVjqHkGmPdgn7oevwe3FkSB7WFygyNEsAco',
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
  gaugeClientUri: 'https://api.studio.thegraph.com/query/75376/balancer-gauges-avalanche/version/latest',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + '/subgraphs/id/7asfmtQA1KYu6CP7YVm5kv4bGxVyfAHEiptt2HMFgkHu',
  blockClientUri: DECENTRALIZED_ENDPOINT + '97YH6dMhGcXoTvVwDAML6GxYm9hBh7PCz6WPscUkrFhv',
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
  gaugeClientUri: 'https://api.studio.thegraph.com/query/24660/balancer-gauges-base/version/latest',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + '/subgraphs/id/98cQDy6tufTJtshDCuhh9z2kWXsQWBHVh2bqnLHsGAeS',
  blockClientUri: '',
  alchemyRPCUrl: 'https://base.publicnode.com',
  alchemyKey: '',
  bgColor: '#0030a6',
  primaryColor: '#0027a2',
  secondaryColor: '#005094',
  imageURL: BASE_LOGO_URL,
  blurb: 'Beta',
}

export const ModeNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.MODE,
  chainId: '34443',
  v3NetworkID: 'MODE',
  coingeckoId: 'mode',
  debankId: 'mode',
  balAddress: '0xd08a2917653d4e460893203471f0000826fb4034',
  feeCollectorThreshold: 5000,
  route: 'mode',
  name: 'Mode',
  startTimeStamp: 1718834400,
  appUri: 'https://app.balancer.fi/#/mode/',
  clientUri: 'https://api.studio.thegraph.com/query/75376/balancer-mode-v2/version/latest',
  gaugeClientUri: 'https://api.studio.thegraph.com/query/75376/balancer-gauges-mode/version/latest',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + '',
  blockClientUri: '',
  alchemyRPCUrl: 'https://mainnet.mode.network/',
  alchemyKey: '',
  bgColor: '#b7ff00',
  primaryColor: '#84b501',
  secondaryColor: '#415900',
  imageURL: MODE_LOGO_URL,
  blurb: 'Beta',
}

export const FraxtalNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.FRAXTAL,
  chainId: '252',
  v3NetworkID: 'FRAXTAL',
  coingeckoId: 'fraxtal',
  debankId: 'fraxtal',
  balAddress: '0x2fc7447f6cf71f9aa9e7ff8814b37e55b268ec91',
  feeCollectorThreshold: 5000,
  route: 'fraxtal',
  name: 'Fraxtal',
  startTimeStamp: 1718834400,
  appUri: 'https://app.balancer.fi/#/fraxtal/',
  clientUri: 'https://api.goldsky.com/api/public/project_clwhu1vopoigi01wmbn514m1z/subgraphs/balancer-fraxtal-v2/1.0.0/gn',
  gaugeClientUri: 'https://api.goldsky.com/api/public/project_clwhu1vopoigi01wmbn514m1z/subgraphs/balancer-gauges-fraxtal/1.0.0/gn',
  decentralicedClientUri: DECENTRALIZED_ENDPOINT + '',
  blockClientUri: '',
  alchemyRPCUrl: 'https://mainnet.mode.network/',
  alchemyKey: '',
  bgColor: '#8a8a8a',
  primaryColor: '#656565',
  secondaryColor: '#3c3c3c',
  imageURL: FRAXTAL_LOGO_URL,
  blurb: 'Beta',
}

export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [
  EthereumNetworkInfo,
  ArbitrumNetworkInfo,
  PolygonNetworkInfo,
  PolygonZkEVMNetworkInfo,
  GnosisNetworkInfo,
  AvalancheNetworkInfo,
  BaseNetworkInfo,
  ModeNetworkInfo,
  FraxtalNetworkInfo
]
