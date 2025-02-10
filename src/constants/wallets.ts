import { ArbitrumNetworkInfo, EthereumNetworkInfo, PolygonNetworkInfo } from "./networks";

//Mainnet fee collector address
export const FEE_COLLECTOR_ADDRESS = '0xce88686553686da562ce7cea497ce749da109f9f';

export const FEE_STREAMER = '0xe649b71783d5008d10a96b6871e3840a398d4f06';

export const FEE_STREAMER_2 = '0x7c68c42de679ffb0f16216154c996c354cf1161b';

export const CANTINA_CONTEST = '0x3Dcb7CFbB431A11CAbb6f7F2296E2354f488Efc2';

//Service Providers
export const SERVICE_PROVIDER_WALLETS = [
    {
        name: 'Orb Collective Gnosis Safe',
        walletId: '0x3b8910f378034fd6e103df958863e5c684072693',
    },
    {
        name: 'Balancer Grants Gnosis Safe',
        walletId: '0xE2c91f3409Ad6d8cE3a2E2eb330790398CB23597',
    },
    {
        name: 'Balancer Maxis Gnosis Safe',
        walletId: '0x166f54F44F271407f24AA1BE415a730035637325',
    },
    {
        name: 'Fjord Proxy',
        walletId: '0x9a74cbff3f36ff1e433ef88d0ec1cdcd1eb79afa'
    },
    {
        name: 'Fjord Proxy v2',
        walletId: '0xA5033A6BDb31E52Ce6ba9c67Bff7331aC2686e72'
    },
    {
        name: 'Ribbon Vault',
        walletId: '0x2a6b048eb15c7d4ddca27db4f9a454196898a0fe'
    },
    {
        name: 'Fee Collector Relayer',
        walletId: '0xe649B71783d5008d10a96b6871e3840a398d4F06'
    },
    {
        name: 'DAO Fee Sweeper',
        walletId: '0x7c68c42De679ffB0f16216154C996C354cF1161B'
    },
    {
        name: 'Aave Collector V2',
        walletId: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c'
    },
    {
        name: 'Beethoven-X DAO',
        walletId: '0x811912c19eEF91b9Dc3cA52fc426590cFB84FC86'
    },
    {
        name: 'Balancer OpCo Gnosis Safe',
        walletId: '0x3B8910F378034FD6E103Df958863e5c684072693',
    },
    {
        name: 'BD Unit',
        walletId: '0x5ca24e2a586834a7b96216d68b26a82405e3dc15'
    },
    {
        name: 'Cantina Contest',
        walletId: '0x3Dcb7CFbB431A11CAbb6f7F2296E2354f488Efc2'
    },
    {
        name: 'CoW Protocol: Transation',
        walletId: '0x9008D19f58AAbD9eD0D60971565AA8510560ab41'
    }
]

export function getSPWalletName(walletId: string) {
    const targetWallet = SERVICE_PROVIDER_WALLETS.find(wallet => wallet.walletId.toLowerCase() === walletId)
    return targetWallet ? targetWallet.name : '-';
}

//Treasury addresses
const TREASURY_ADDRESS_MAINNET = '0x10a19e7ee7d7f8a52822f6817de8ea18204f2e4f';
const TREASURY_ADDRESS_ARBITRUM = '0xaf23dc5983230e9eeaf93280e312e57539d098d0';
const TREASURY_ADDRESS_POLYGON = '0xee071f4b516f69a1603da393cde8e76c40e5be85';
//Copper proxy contracts
const COPPER_LAUNCH_PROXY_MAINNET = '0x9a74cbff3f36ff1e433ef88d0ec1cdcd1eb79afa';
const COPPER_LAUNCH_PROXY_ARBITRUM = '0x22D15E202538e90d6fDaE5044A4D6a28453aA4C5';
const COPPER_LAUNCH_PROXY_POLYGON ='0x7388feB5a04990bb4c7570e68F1b37aB06C1aafD';
export const DAO_FEE_MULTISIG  = '0xe649b71783d5008d10a96b6871e3840a398d4f06';
export const KARPATKEY_SAFE = '0x0EFcCBb9E2C09Ea29551879bd9Da32362b32fc89';

export const OPCO_SAFE = '0x3B8910F378034FD6E103Df958863e5c684072693';

export const TREASURY_ADDRESS_CONFIG = [
    {
        chainID: EthereumNetworkInfo.chainId,
        treasury: TREASURY_ADDRESS_MAINNET,
        copper: COPPER_LAUNCH_PROXY_MAINNET,
    },
    {
        chainID: ArbitrumNetworkInfo.chainId,
        treasury: TREASURY_ADDRESS_ARBITRUM,
        copper: COPPER_LAUNCH_PROXY_ARBITRUM,
    },
    {
        chainID: PolygonNetworkInfo.chainId,
        treasury: TREASURY_ADDRESS_POLYGON,
        copper: COPPER_LAUNCH_PROXY_POLYGON,
    }
];

export function getTreasuryConfig(chainID: string) {
    const TREASURY_CONFIG = TREASURY_ADDRESS_CONFIG.find((t) => t.chainID === chainID);
    if (TREASURY_CONFIG) {
        return TREASURY_CONFIG;
    }
    return TREASURY_ADDRESS_CONFIG[0];

}
