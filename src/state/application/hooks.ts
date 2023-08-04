import {ApolloClient, NormalizedCacheObject} from '@apollo/client'
import {
    arbitrumBlockClient,
    arbitrumClient, avalancheBlockClient, avalancheClient, baseBlockClient, baseClient,
    blockClient,
    client,
    gnosisBlockClient,
    gnosisClient,
    polygonBlockClient,
    polygonClient,
    polygonZKEVMBlockClient,
    polygonZKEVMClient,
} from '../../apollo/client'
import {NetworkInfo, SupportedNetwork} from '../../constants/networks'
import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useActiveWeb3React} from '../../hooks'
import {AppState} from '../index'
import {updateActiveNetworkVersion, updateSubgraphStatus,} from './actions'

export function useBlockNumber(): number | undefined {
    const {chainId} = useActiveWeb3React()

    return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}


// returns a function that allows adding a popup
export function useSubgraphStatus(): [
    {
        available: boolean | null
        syncedBlock: number | undefined
        headBlock: number | undefined
    },
    (available: boolean | null, syncedBlock: number | undefined, headBlock: number | undefined) => void
] {
    const dispatch = useDispatch()
    const status = useSelector((state: AppState) => state.application.subgraphStatus)

    const update = useCallback(
        (available: boolean | null, syncedBlock: number | undefined, headBlock: number | undefined) => {
            dispatch(updateSubgraphStatus({available, syncedBlock, headBlock}))
        },
        [dispatch]
    )
    return [status, update]
}

// returns a function that allows adding a popup
export function useActiveNetworkVersion(): [NetworkInfo, (activeNetworkVersion: NetworkInfo) => void] {
    const dispatch = useDispatch()
    const activeNetwork = useSelector((state: AppState) => state.application.activeNetworkVersion)
    const update = useCallback(
        (activeNetworkVersion: NetworkInfo) => {
            dispatch(updateActiveNetworkVersion({activeNetworkVersion}))
        },
        [dispatch]
    )
    return [activeNetwork, update]
}

// get the apollo client related to the active network
export function useDataClient(): ApolloClient<NormalizedCacheObject> {
    const [activeNetwork] = useActiveNetworkVersion()
    switch (activeNetwork.id) {
        case SupportedNetwork.ETHEREUM:
            return client
        case SupportedNetwork.ARBITRUM:
            return arbitrumClient
        case SupportedNetwork.POLYGON:
            return polygonClient
        case SupportedNetwork.ZKEVM:
            return polygonZKEVMClient
        case SupportedNetwork.GNOSIS:
            return gnosisClient
        case SupportedNetwork.AVALANCHE:
            return avalancheClient
        case SupportedNetwork.BASE:
            return baseClient
        default:
            return client
    }
}

// get the apollo client related to the active network for fetching blocks
export function useBlockClient(): ApolloClient<NormalizedCacheObject> {
    const [activeNetwork] = useActiveNetworkVersion()
    switch (activeNetwork.id) {
        case SupportedNetwork.ETHEREUM:
            return blockClient
        case SupportedNetwork.ARBITRUM:
            return arbitrumBlockClient
        case SupportedNetwork.POLYGON:
            return polygonBlockClient
        case SupportedNetwork.ZKEVM:
            return polygonZKEVMBlockClient
        case SupportedNetwork.GNOSIS:
            return gnosisBlockClient
        case SupportedNetwork.AVALANCHE:
            return avalancheBlockClient
        case SupportedNetwork.BASE:
            return baseBlockClient
        default:
            return blockClient
    }
}

// Get all required subgraph clients
export function useClients(): {
    dataClient: ApolloClient<NormalizedCacheObject>
    blockClient: ApolloClient<NormalizedCacheObject>
} {
    const dataClient = useDataClient()
    const blockClient = useBlockClient()
    return {
        dataClient,
        blockClient,
    }
}