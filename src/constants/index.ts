import { BigNumber } from '@ethersproject/bignumber';
import { SupportedChainId, Token, WETH9 } from '@uniswap/sdk-core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import process from "process";

const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default function isDev(): boolean
{
    return development;
}

export const YIELD_BEARING_TOKENS = [
    '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0', //wstETH
    '0x5979d7b546e38e414f7e9822514be443a4800529', //wstETH (Arb)
    '0xa13a9247ea42d743238089903570127dda72fe44', //bb-a-USD
    '0x2f4eb100552ef93840d5adc30560e5513dfffacb', //bb-a-USDT
    '0x82698aecc9e28e9bb27608bd52cf57f704bd1b83', //bb-a-USDC
    '0xae37d54ae477268b9997d4161b96b8200755935c', //bb-a-DAI
    '0xae78736cd615f374d3085123a210448e74fc6393', //rETH
    '0xac3e018457b222d93114458476f3e3416abbe38f', //sfrxETH
    '0x48e6b98ef6329f8f0a30ebb8c7c960330d648085', //bb-am-USD
    '0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4', //stMatic
    '0xfa68fb4628dff1028cfec22b4162fccd0d45efb6', //MaticX


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
