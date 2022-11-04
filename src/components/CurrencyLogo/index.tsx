import React, { useMemo } from 'react';
import { useActiveNetworkVersion } from "../../state/application/hooks";
import { EthereumNetworkInfo, SupportedNetwork } from "../../constants/networks";
import useHttpLocations from "../../hooks/useHttpLocations";
import { isAddress } from '../../utils';
import { Avatar } from '@mui/material';


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
        default:
            return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
    }
}

export default function CurrencyLogo({
    address,
    size = '24px',
}: {
    address?: string
    size?: string
}) {

    const [activeNetwork] = useActiveNetworkVersion()

    //Balancer coin repository asset location
    let assetLoc = 'master';
    if (activeNetwork !== EthereumNetworkInfo) {
        assetLoc = 'refactor-for-multichain'
    }

    //Secondary assets are loaded through Balancer
    const tempSources: { [address: string]: string } = useMemo(() => {
        return {
            [`${address}`]:
                `https://raw.githubusercontent.com/balancer-labs/assets/${assetLoc}/assets/${address}.png`,
        }
    }, [])

    //Token image sources
    const srcs: string[] = useMemo(() => {
        const checkSummed = isAddress(address)
    
    
        if (checkSummed && address) {
          const override = tempSources[address]
          return [getTokenLogoURL(checkSummed, activeNetwork.id), override]
        }
        return []
      }, [address, tempSources])

      return <Avatar
      sx={{
          height: size,
          width: size
      }}
      src={srcs[0] ? srcs[0] : srcs[1]}
  />

}