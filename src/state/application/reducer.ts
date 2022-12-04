import { createReducer } from '@reduxjs/toolkit'
import { NetworkInfo } from '../../constants/networks'
import {
  updateBlockNumber,
  updateSubgraphStatus,
  updateActiveNetworkVersion,
} from './actions'
import { EthereumNetworkInfo } from '../../constants/networks'


export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number }
  readonly subgraphStatus: {
    available: boolean | null
    syncedBlock: number | undefined
    headBlock: number | undefined
  }
  readonly activeNetworkVersion: NetworkInfo
}

const initialState: ApplicationState = {
  blockNumber: {},
  subgraphStatus: {
    available: null,
    syncedBlock: undefined,
    headBlock: undefined,
  },
  activeNetworkVersion: EthereumNetworkInfo,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(updateSubgraphStatus, (state, { payload: { available, syncedBlock, headBlock } }) => {
      state.subgraphStatus = {
        available,
        syncedBlock,
        headBlock,
      }
    })
    .addCase(updateActiveNetworkVersion, (state, { payload: { activeNetworkVersion } }) => {
      state.activeNetworkVersion = activeNetworkVersion
    })
)