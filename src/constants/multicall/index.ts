import { ChainId } from '@uniswap/sdk-core';
import MULTICALL_ABI from './abi.json';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
    [ChainId.ARBITRUM_GOERLI]: '',
    [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
    [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
    [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
    [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
    [ChainId.GOERLI]: '',
    [ChainId.ARBITRUM_ONE]: '',
    [ChainId.ARBITRUM_RINKEBY]: '',
    [ChainId.CELO]: '',
    [ChainId.CELO_ALFAJORES]: '',
    [ChainId.OPTIMISM]: '',
    [ChainId.OPTIMISM_GOERLI]: '',
    [ChainId.POLYGON]: '',
    [ChainId.POLYGON_MUMBAI]: '',
    [ChainId.BSC]: '',


};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
