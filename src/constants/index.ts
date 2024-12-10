import { BigNumber } from '@ethersproject/bignumber';
import { SupportedChainId, Token, WETH9 } from '@uniswap/sdk-core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import process from "process";
import { TokenFilters } from '../data/balancer/balancerTypes'

const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default function isDev(): boolean
{
    return development;
}

export const TOKEN_FILTERS: TokenFilters = {
    LSTs: ['wstETH', 'rETH', 'sfrxETH', 'cbETH', 'ankrETH', 'mevETH'],
    Stables: ['USDC', 'USDT', 'USDC.e', 'sDAI', 'GHO'],
    LRTs: ['ezETH', 'weETH', 'rswETH', 'rsETH', 'ETHx', 'vETH']
};

export const POOL_TYPE_FILTERS: string[] = [
    'META_STABLE',
    'WEIGHTED',
    'COMPOSABLE_STABLE',
    'GYROE'
];

export const POOL_TYPE_FILTERS_SUBGRAPH: string[] = [
    'Stable',
    'MetaStable',
    'Weighted',
    'ComposableStable',
    'GyroE',
    'Managed'
];

export const RAINBOW_COLORS = [
    'rgb(32, 129, 240)',   // Blue
    'rgb(255, 204, 0)',    // Yellow
    'rgb(126, 217, 87)',   // Green
    'rgb(255, 87, 87)',    // Red
    'rgb(140, 82, 255)',   // Purple
    'rgb(255, 150, 0)',    // Orange
    'rgb(75, 192, 192)',   // Cyan
    'rgb(255, 64, 129)',   // Pink
    'rgb(0, 201, 167)',    // Teal
    'rgb(241, 58, 19)',    // Vermillion
    'rgb(178, 102, 255)'   // Lavender
];


export const POOL_TYPE_DISPLAY_NAMES: { [key: string]: string } = {
    META_STABLE: 'Metastable',
    WEIGHTED: 'Weighted',
    COMPOSABLE_STABLE: 'Composable Stable',
    GYROE: 'Gyro',
};

export const POOL_TYPE_DISPLAY_NAMES_SUBGRAPH: { [key: string]: string } = {
    Stable: 'Stable',
    MetaStable: 'Metastable',
    Weighted: 'Weighted',
    ComposableStable: 'Composable Stable',
    GyroE: 'Gyro',
    Managed: 'Managed'
};

export const YIELD_BEARING_TOKENS = [
    '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0', //wstETH
    '0x5979d7b546e38e414f7e9822514be443a4800529', //wstETH (Arb)
    '0xa13a9247ea42d743238089903570127dda72fe44', //bb-a-USD
    '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de', //a-USDC
    '0x2f4eb100552ef93840d5adc30560e5513dfffacb', //bb-a-USDT
    '0x82698aecc9e28e9bb27608bd52cf57f704bd1b83', //bb-a-USDC
    '0xae37d54ae477268b9997d4161b96b8200755935c', //bb-a-DAI
    '0x3c640f0d3036ad85afa2d5a9e32be651657b874f', //bb-e-USDT
    '0xd4e7c1f3da1144c9e2cfd1b015eda7652b4a4399', //bb-e-USDC
    '0xeb486af868aeb3b6e53066abc9623b1041b42bc0', //bb-e-DAI
    '0x50cf90b954958480b8df7958a9e965752f627124', //bb-e-USD-BPT
    '0x4a82b580365cff9b146281ab72500957a849abdc', //bb-g-USDC
    '0xe03af00fabe8401560c1ff7d242d622a5b601573', //bb-g-DAI
    '0x5bae72b75caab1f260d21bc028c630140607d6e8', //bb-rf-USDC
    '0x894c82800526e0391e709c0983a5aea3718b7f6d', //bb-rf-USDT
    '0xe1fb90d0d3b47e551d494d7ebe8f209753526b01', //bb-rf-DAI
    '0x178e029173417b1f9c8bc16dcec6f697bc323746', //bb-am-DAI
    '0xf93579002dbe8046c43fefe86ec78b1112247bb8', //bb-am-USDC
    '0xff4ce5aaab5a627bf82f4a571ab1ce94aa365ea6', //bb-am-USDT
    '0x2ff1a9dbdacd55297452cfd8a4d94724bc22a5f7', //bb-i-USDT
    '0xbc0f2372008005471874e426e86ccfae7b4de79d', //bb-i-USDC
    '0xdba274b4d04097b90a72b62467d828cefd708037', //bb-i-DAI
    '0x7966c5bae631294d7cffcea5430b78c2f76db6fa', //sAPE
    '0x126e7643235ec0ab9c103c507642dc3f4ca23c66', //bb-s-stkAPE
    '0xae78736cd615f374d3085123a210448e74fc6393', //rETH
    '0xac3e018457b222d93114458476f3e3416abbe38f', //sfrxETH
    '0xbe9895146f7af43049ca1c1ae358b0541ea49704', //cbETH
    '0x93ef1ea305d11a9b2a3ebb9bb4fcc34695292e7d', //qETH
    '0x48e6b98ef6329f8f0a30ebb8c7c960330d648085', //bb-am-USD
    '0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4', //stMatic
    '0xfa68fb4628dff1028cfec22b4162fccd0d45efb6', //MaticX
    '0xfedb19ec000d38d92af4b21436870f115db22725', //bb-ag-USD
    '0x41211bba6d37f5a74b22e667533f080c7c7f3f13', //bb-ag-XDAI
    '0xd16f72b02da5f51231fde542a8b9e2777a478c88', //bb-ag-USDT
    '0xe7f88d7d4ef2eb18fcf9dd7216ba7da1c46f3dd6', //bb-ag-USDC
    '0xffff76a3280e95dc855696111c2562da09db2ac0', //bb-ag-GNO
    '0xbb9cd48d33033f5effbedec9dd700c7d7e1dcf50', //bb-ag-WETH
    '0xd4015683b8153666190e0b2bec352580ebc4caca', //bb-ag-WBTC
    '0xb23c20efce6e24acca0cef9b7b7aa196b84ec942', //rETH zkevm
    '0x5d8cff95d7a57c0bf50b30b43c7cc0d52825d4a9', //wstETH zkevm
    '0x16c9a4d841e88e52b51936106010f27085a529ec', //bbo-USDC
    '0x4b718e0e2fea1da68b763cd50c446fba03ceb2ea', //bbo-USDT
    '0xe274c9deb6ed34cfe4130f8d0a8a948dea5bb286', //bbo-USD
    '0x3a6789fc7c05a83cfdff5d2f9428ad9868b4ff85', //woUSDC
    '0x550d3bb1f77f97e4debb45d4f817d7b9f9a1affb', //woUSDT
    '0x2b2c81e08f1af8835a78bb2a90ae924ace0ea4be', //sAVAX
    '0x7275c131b1f67e8b53b4691f92b0e35a4c1c6e22', //bb-a-WAVAX
    '0xa25eaf2906fa1a3a13edac9b9657108af7b703e3', //ggAVAX
    '0xf7d9281e8e363584973f946201b82ba72c965d27', //yyAVAX
    '0xea67626e1f0b59e0d172a04f5702ef90bcdf440c', // bb-a-USDT AVAX
    '0xeb496161099d45b3ea4892408ef745c6182eb56e', // bb-a-USDC AVAX
    '0xeb466342c4d449bc9f53a865d5cb90586f405215', //axlUSDC BASE
    '0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22', //cbETH BASE
    '0xb6fe221fe9eef5aba221c348ba20a1bf5e73624c', //rETH BASE
]

export const CORE_POOLS_MAINNET = [
    '0x41503c9d499ddbd1dcdf818a1b05e9774203bf46000000000000000000000594', //wstETH/bbaweth
    '0x1e19cf2d73a72ef1332c882f20534b6519be0276000200000000000000000112', //rETH/weth
    '0xae8535c23afedda9304b03c68a3563b75fc8f92b0000000000000000000005a0', //swETH
    '0x4c81255cc9ed7062180ea99962fe05ac0d57350b0000000000000000000005a3', //cbETH/bbaweth
    '0x42ed016f826165c2e5976fe5bc3df540c5ad0af700000000000000000000058b', //sfrxETH
    '0xf16aee6a71af1a9bc8f56975a4c2705ca7a782bc0002000000000000000004bb', //alcx
    '0xb08885e6026bab4333a80024ec25a1a3e1ff2b8a000200000000000000000445', //stafi rETH
    '0xc2b021133d1b0cf07dba696fd5dd89338428225b000000000000000000000598', //gho/bbaUSD
    '0xdfe6e7e18f6cc65fa13c8d8966013d4fda74b6ba000000000000000000000558', //ankreth/wstETH
    '0x5f1f4e50ba51d723f12385a8a9606afc3a0555f5000200000000000000000465', //LDO/wstETH
    '0x1ee442b5326009bb18f2f472d3e0061513d1a0ff000200000000000000000464', //badger/reth
    '0x9f9d900462492d4c21e9523ca95a7cd86142f298000200000000000000000462', //reth/rpl
    '0x639883476960a23b38579acfd7d71561a0f408cf000200000000000000000505', //stg
    '0x2e848426aec6dbf2260535a5bea048ed94d9ff3d000000000000000000000536', //wstETH/wbeth
    '0x36be1e97ea98ab43b4debf92742517266f5731a3000200000000000000000466', //acx
]

export const CORE_POOLS_ARBITRUM = [
    '0xbe0f30217be1e981add883848d0773a86d2d2cd4000000000000000000000471', //rETH
    '0x36bf227d6bac96e2ab1ebb5492ecec69c691943f000200000000000000000316', //wstETH/weth
    '0x4a2f6ae7f3e5d715689530873ec35593dc28951b000000000000000000000481', //cbETH
    '0xc6eee8cb7643ec2f05f46d569e9ec8ef8b41b389000000000000000000000475', //bbaUSD
    '0x32df62dc3aed2cd6224193052ce665dc181658410002000000000000000003bd', //rdnt/weth
    '0x45c4d1376943ab28802b995acffc04903eb5223f000000000000000000000470', //wsteth/bbaweth
    '0x9cebf13bb702f253abf1579294694a1edad00eaa000000000000000000000486', //usdc/usdce
]

export const CORE_POOLS_POLYGON = [
    '0x03090a9811181a2afe830a3a0b467698ccf3a8b1000000000000000000000bf5', //bbausd
    '0x9321e2250767d79bab5aa06daa8606a2b3b7b4c5000000000000000000000bf4', //bbtUSD
    '0xac2cae8d2f78a4a8f92f20dbe74042cd0a8d5af3000000000000000000000be2', //stMATIC
    '0x402cfdb7781fa85d52f425352661128250b79e12000000000000000000000be3 ', //maticX
    '0xab269164a10fab22bc87c39946da06c870b172d6000000000000000000000bfc', //wstETH
]

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MAX_UINT128 = BigNumber.from(2).pow(128).sub(1);

export const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

export const STABLE_POOLS = ['Stable', 'ComposableStable', 'ComposableMetaStable', 'MetaStable'];

export const WETH_ADDRESSES = [WETH_ADDRESS, '0x82af49447d8a07e3bd95bd0d56f35241523fbab1'];

export const DAI = new Token(
    SupportedChainId.MAINNET,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    18,
    'DAI',
    'Dai Stablecoin',
);
export const USDC = new Token(SupportedChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C');
export const USDT = new Token(SupportedChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD');
export const COMP = new Token(SupportedChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound');
export const MKR = new Token(SupportedChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker');
export const SWAPR = new Token(42161, '0x2e9a6Df78E42a30712c10a9Dc4b1C8656f8F2879', 18, 'SWAPR', 'Swapr');
export const AMPL = new Token(SupportedChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth');
export const WBTC = new Token(SupportedChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC');

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 12;
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320;
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS;

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in SupportedChainId]?: string } = {
    [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
};


/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in SupportedChainId]?: { [tokenAddress: string]: Token[] } } = {
    [SupportedChainId.MAINNET]: {
        [AMPL.address]: [DAI, WETH9[SupportedChainId.MAINNET]],
    },
};

export const NETWORK_ONLY = {
    fetchPolicy: 'network-only',
};

// temporary! fixing USD accounting on subgraph - open issue if urgent
export const TOKEN_HIDE = ['0xd46ba6d942050d489dbd938a2c909a5d5039a161', '0x7dfb72a2aad08c937706f21421b15bfc34cba9ca', '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58'];
export const POOL_HIDE = [
    '0x9210f1204b5a24742eba12f710636d76240df3d00000000000000000000000fc',
    '0x10a2f8bd81ee2898d7ed18fb8f114034a549fa59000200000000000000000090',
    '0x90ca5cef5b29342b229fb8ae2db5d8f4f894d6520002000000000000000000b5',
    '0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c0000000000000000000000fd',
    '0x4db9024fc9f477134e00da0da3c77de98d9836ac000200000000000000000086',
    '0x787546bf2c05e3e19e2b6bde57a203da7f682eff00020000000000000000007c',
    '0x804cdb9116a10bb78768d3252355a1b18067bf8f0000000000000000000000fb',
    '0x9210f1204b5a24742eba12f710636d76240df3d00000000000000000000000fc',

];

export const PINNED_PAIRS: { readonly [chainId in SupportedChainId]?: [Token, Token][] } = {
    [SupportedChainId.MAINNET]: [
        [
            new Token(SupportedChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
            new Token(SupportedChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin'),
        ],
        [USDC, USDT],
        [DAI, USDT],
    ],
};

//Tokens to be included in the fee collector view even if they are below sweep threshold:
export const DEFAULT_FEE_TOKENS = [
    '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    '0x040d1edc9569d4bab2d15287dc5a4f10f56a56b8',
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
]

export const DEFAULT_FEE_SYMBOLS = [
    'BAL',
    'USDC',
    'wstETH',
    'WETH',
    'YFI',
]

export interface WalletInfo {
    connector?: AbstractConnector;
    name: string;
    iconName: string;
    description: string;
    href: string | null;
    color: string;
    primary?: true;
    mobile?: true;
    mobileOnly?: true;
}

export const NetworkContextName = 'NETWORK';

export const HISTORICAL_VEBAL_PRICE = [
    {
        "value": 32.05,
        "time": "2022-04-21"
    },
    {
        "value": 28.62,
        "time": "2022-05-05"
    },
    {
        "value": 16.62,
        "time": "2022-05-19"
    },
    {
        "value": 9.85,
        "time": "2022-06-02"
    },
    {
        "value": 9.62,
        "time": "2022-06-16"
    },
    {
        "value": 9.25,
        "time": "2022-06-30"
    },
    {
        "value": 10.51,
        "time": "2022-07-14"
    },
    {
        "value": 11.08,
        "time": "2022-07-28"
    },
    {
        "value": 12.74,
        "time": "2022-08-11"
    },
    {
        "value": 12.32,
        "time": "2022-08-25"
    },
    {
        "value": 14.40,
        "time": "2022-09-08"
    },
    {
        "value": 10.60,
        "time": "2022-09-22"
    },
    {
        "value": 10.40,
        "time": "2022-10-06"
    },
    {
        "value": 11.05,
        "time": "2022-10-20"
    },
    {
        "value": 13.16,
        "time": "2022-11-03"
    },
    {
        "value": 10.26,
        "time": "2022-11-17"
    },
    {
        "value": 12.59,
        "time": "2022-12-01"
    },
    {
        "value": 10.29,
        "time": "2022-12-15"
    },
    {
        "value": 12.51,
        "time": "2022-12-29"
    },
    {
        "value": 13.76,
        "time": "2023-01-12"
    },
    {
        "value": 17.37,
        "time": "2023-01-26"
    },
    {
        "value": 18.53,
        "time": "2023-02-09"
    },
    {
        "value": 17.82,
        "time": "2023-02-23"
    },
    {
        "value": 15.17,
        "time": "2023-03-09"
    },
    {
        "value": 16.08,
        "time": "2023-03-23"
    },
    {
        "value": 18.95,
        "time": "2023-04-06"
    },
    {
        "value": 16.40,
        "time": "2023-04-20"
    },
    {
        "value": 16.29,
        "time": "2023-05-04"
    },
    {
        "value": 14.59,
        "time": "2023-05-18"
    },
    {
        "value": 14.24,
        "time": "2023-06-01"
    },
    {
        "value": 12.56,
        "time": "2023-06-15"
    },
    {
        "value": 12.65,
        "time": "2023-06-29"
    },
    {
        "value": 12.19,
        "time": "2023-07-13"
    },
    {
        "value": 12.62,
        "time": "2023-07-27"
    },
    {
        "value": 11.86,
        "time": "2023-08-10"
    },
    {
        "value": 10.18,
        "time": "2023-08-24"
    },
    {
        "value": 9.64,
        "time": "2023-09-07"
    },
    {
        "value": 9.57,
        "time": "2023-09-21"
    },
    {
        "value": 8.48,
        "time": "2023-10-05"
    },
    {
        "value": 9.57,
        "time": "2023-10-19"
    },
    {
        "value": 10.61,
        "time": "2023-11-02"
    },
    {
        "value": 11.52,
        "time": "2023-11-16"
    },
    {
        "value": 9.03,
        "time": "2023-11-30"
    },
    {
        "value": 11.54,
        "time": "2023-12-14"
    },
    {
        "value": 13.53,
        "time": "2023-12-28"
    },
    {
        "value": 12.22,
        "time": "2024-01-11"
    },
    {
        "value": 12.32,
        "time": "2024-01-15"
    },
    {
        "value": 11.29,
        "time": "2024-02-08"
    },
    {
        "value": 12.45,
        "time": "2024-02-22"
    },
    {
        "value": 15.49,
        "time": "2024-03-07"
    },
    ]
