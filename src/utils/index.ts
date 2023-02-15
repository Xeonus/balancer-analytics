import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { SupportedChainId } from '@uniswap/sdk-core';
import { ArbitrumNetworkInfo, GnosisNetworkInfo, NetworkInfo, PolygonNetworkInfo } from './../constants/networks';


// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
    try {
        return getAddress(value);
    } catch {
        return false;
    }
}

export function getEtherscanLink(
    data: string,
    type: 'transaction' | 'token' | 'address' | 'block',
    networkVersion: NetworkInfo,
): string {
    let prefix = 'https://etherscan.io';

    if (networkVersion === ArbitrumNetworkInfo) {
        prefix = 'https://arbiscan.io';
        switch (type) {
            case 'transaction': {
                return `${prefix}/tx/${data}`;
            }
            case 'token': {
                return `${prefix}/address/${data}`;
            }
            case 'block': {
                return `${prefix}/block/${data}`;
            }
            case 'address':
            default: {
                return `${prefix}/address/${data}`;
            }
        }
    }

    if (networkVersion === PolygonNetworkInfo) {
        prefix = 'https://polygonscan.com/';
        switch (type) {
            case 'transaction': {
                return `${prefix}/tx/${data}`;
            }
            case 'token': {
                return `${prefix}/address/${data}`;
            }
            case 'block': {
                return `${prefix}/block/${data}`;
            }
            case 'address':
            default: {
                return `${prefix}/address/${data}`;
            }
        }
    }

    if (networkVersion === GnosisNetworkInfo) {
        prefix = 'https://gnosisscan.io/';
        switch (type) {
            case 'transaction': {
                return `${prefix}/tx/${data}`;
            }
            case 'token': {
                return `${prefix}/address/${data}`;
            }
            case 'block': {
                return `${prefix}/block/${data}`;
            }
            case 'address':
            default: {
                return `${prefix}/address/${data}`;
            }
        }
    }

    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`;
        }
        case 'token': {
            return `${prefix}/token/${data}`;
        }
        case 'block': {
            return `${prefix}/block/${data}`;
        }
        case 'address':
        default: {
            return `${prefix}/address/${data}`;
        }
    }
}

export const currentTimestamp = () => new Date().getTime();

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
    return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}
// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

//export function isTokenOnList(tokenAddressMap: TokenAddressMap, token?: Token): boolean {
//    return Boolean(token?.isToken && tokenAddressMap[token.chainId as ChainId]?.[token.address]);
//}

export function feeTierPercent(fee: number): string {
    return (fee / 10000).toPrecision(1) + '%';
}

export function swapFeePercent(swapFee: number): string {
    return (swapFee * 100).toFixed(2) + '%';
}

export function tokenWeightPercent(weight: number): string {
    return Math.round(weight * 100) + '%';
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

/**
 * Returns chain id if chain from chainId supports WETH
 * if not, return undefined
 * @param chainId
 */
export function supportedChainId(chainId: number): SupportedChainId | undefined {
    if (chainId in SupportedChainId) {
        return chainId;
    }
    return undefined;
}
