import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useBlocksFromTimestamps } from '../../hooks/useBlocksFromTimestamps';
import {
    useGetUserWalletPoolDataLazyQuery
} from '../../apollo/generated/graphql-codegen-generated';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useDeltaTimestamps } from '../../utils/queries';

export interface UserPoolData {
    share: number,
    relativeShare: number,
    poolId: string,
    timestamp: number,
}

export default function useUserPools (address: string, timeStamps?: number[]) {


    const [activeNetwork] = useActiveNetworkVersion();
    //TODOs
    //For a given set, if timestamps > 0, iterate through and batch query?
    //Timestamp of UserPoolData identifies share at given time
    const userShares:UserPoolData[] = [];
    const currentTimeStamps =[dayjs().unix()];



    const [t24, t48, tWeek] = useDeltaTimestamps();
    const { blocks, error: blockError } = useBlocksFromTimestamps([t24, t48, tWeek]);
    const [block24, block48, blockWeek] = blocks ?? [];

    let timeStampSet;
    //FIX
    if (timeStamps) {
        timeStampSet = timeStamps;
    } else {
        
        timeStampSet = currentTimeStamps;
    }
    const myBlocks = useBlocksFromTimestamps(timeStampSet)
    //Get current block
    let currentBlock = 0;
    //console.log("currentTimeStamp", currentTimeStamps)
    //console.log("blocks24", block24);
    if (myBlocks.blocks && myBlocks.error !== false) {
        currentBlock = myBlocks.blocks[0].number;
    }

    
    const [getUserData, { data }] = useGetUserWalletPoolDataLazyQuery();

    useEffect(() => {
        if (block24) {
            getUserData({
                variables: {
                    block: parseInt(block24.number),
                    userAddress: address,
                },
                context: {
                    uri: activeNetwork.clientUri,
                },
            });
        }
    }, [block24]);

    if (!data) {
        return [];
    }

        //Map data
    if (data && data.poolShares) {
        data.poolShares.forEach((poolShare) => {
        const userShare:UserPoolData = <UserPoolData>{};
       userShare.share = Number(poolShare.balance);
       userShare.relativeShare = Number (poolShare.balance)  / Number(poolShare.poolId.totalShares);
       userShare.poolId = poolShare.poolId.id;
       userShare.timestamp = currentTimeStamps[0]
       userShares.push(userShare);
    })
    }
    return userShares;
}