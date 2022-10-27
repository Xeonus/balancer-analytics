import { createAction } from '@reduxjs/toolkit'
import { NetworkInfo } from '../../constants/networks'

export type PopupContent = {
  listUpdate: {
    listUrl: string
    auto: boolean
  }
}

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  MENU,
}

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber')
export const updateSubgraphStatus = createAction<{
  available: boolean | null
  syncedBlock: number | undefined
  headBlock: number | undefined
}>('application/updateSubgraphStatus')
export const updateActiveNetworkVersion = createAction<{ activeNetworkVersion: NetworkInfo }>(
  'application/updateActiveNetworkVersion'
)