import { useMemo } from 'react';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { useTheme } from '@mui/material/styles'
import { SupportedNetwork } from "../../constants/networks";
import { isAddress } from '../../utils';
import { Avatar } from '@mui/material';
import useGetTokenLists, {TokenList} from "../../data/balancer/useGetTokenList";


export const getTokenLogoURL = (address: string, networkId: SupportedNetwork) => {
    switch (networkId) {
        case SupportedNetwork.ETHEREUM:
            return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
        case SupportedNetwork.ARBITRUM:
            if (address === '0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8') {
                return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png`
            } else {
                return `https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/arbitrum/assets/${address}/logo.png`
            }
        case SupportedNetwork.POLYGON:
            if (address === '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3') {
                return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png`
            } else {
                return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/${address}/logo.png`
            }
        case SupportedNetwork.ZKEVM:
                return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygonzkevm/assets/${address}/logo.png`
        case SupportedNetwork.GNOSIS:
            if (address === '0x7eF541E2a22058048904fE5744f9c7E4C57AF717') {
                return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png`
            } else {
                return `https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/xdai/assets/${address}/logo.png`
            }
        default:
            return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
    }
}

const getLogoURIByAddressAndChainId = (
    tokenList: TokenList | undefined,
    address: string,
    chainId: number
): string  => {
    if (tokenList) {
        const foundToken = tokenList.tokens.find((token) => token.address === address);
        return foundToken?.logoURI ? foundToken?.logoURI : '';
    }
    return '';
};

export default function CurrencyLogo({
    address,
    size = '24px',
}: {
    address?: string
    size?: string
}) {

    const [activeNetwork] = useActiveNetworkVersion();
    const theme = useTheme();
    const tokenList = useGetTokenLists();

    //Secondary assets are loaded through Balancer
    const tempSources: { [address: string]: string } = useMemo(() => {
        return {
            [`${address}`]:
                `https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/${address}.png`,
        }
    }, [address])

    //Token image sources
    const srcs: string[] = useMemo(() => {
        const checkSummed = isAddress(address)


        if (checkSummed && address) {
            const override = tempSources[address]
            return [getLogoURIByAddressAndChainId(tokenList, checkSummed, activeNetwork.id), override]
        }
        return []
    }, [address, tempSources, tokenList, activeNetwork.id])

    //Return an avatar for the default source, or an avatar as a child if default source is empty!
    return <Avatar
        sx={{
            height: size,
            width: size,
            backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'rgb(226, 232, 240)',
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
            fontSize: '15px',
        }}
        src={srcs[1]}
        children={
            <Avatar
                sx={{
                    height: size,
                    width: size,
                    backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'rgb(226, 232, 240)',
                    color: 'black',
                    fontSize: '15px',
                }}
                src={srcs[0]}
                alt={'?'}
            />
        }
        alt={'?'}
    />

}
