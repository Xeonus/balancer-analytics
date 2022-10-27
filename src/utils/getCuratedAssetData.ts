import { TokenData, AssetData, PoolDataUser } from "../data/balancer/balancerTypes";
import { getShortPoolName } from "./getShortPoolName";


export default function getCuratedAssetData(tokenDatas: TokenData[], externalTokenDatas: TokenData[], poolUserDatas: PoolDataUser[]) : {aggregatedAssetDatas:AssetData[], netWorth:number} {
    //Generate an AssetData array based on treasury assets
    //1. calculate entire asset net worth
    let netWorth = 0;
    tokenDatas.forEach((t) => netWorth += t.valueUSDCollected);
    externalTokenDatas.forEach((e) => netWorth += e.valueUSDCollected);
    poolUserDatas.forEach((p) => netWorth += p.userTVL);
    const aggregatedAssetDatas:AssetData[] = [];
    //1. Wallet tokens Tokens
    tokenDatas.forEach((token) => {
        const assetData:AssetData = {} as AssetData;
        assetData.name = token.symbol;
        assetData.relativeWeight = 100 / netWorth * token.valueUSDCollected;
        assetData.type = 'Token';
        assetData.valueUSD = token.valueUSDCollected;
        aggregatedAssetDatas.push(assetData);
    });
    //2. External tokens / positions
    externalTokenDatas.forEach((token) => {
        const assetData:AssetData = {} as AssetData;
        assetData.name = token.symbol;
        assetData.relativeWeight = 100 / netWorth * token.valueUSDCollected;
        assetData.type = '3rd Party';
        assetData.valueUSD = token.valueUSDCollected;
        aggregatedAssetDatas.push(assetData);
    });
    //3. BPTs
    poolUserDatas.forEach((pool) => {
        const assetData:AssetData = {} as AssetData;
        let shortName = getShortPoolName(pool);
        if (shortName.includes('bb-')) {
            shortName = 'Stab3l Boosted'
        }
        assetData.name = shortName;
        assetData.relativeWeight = 100 / netWorth * pool.userTVL;
        assetData.type = 'BPT';
        assetData.valueUSD = pool.userTVL;
        aggregatedAssetDatas.push(assetData); 
    })
    return {aggregatedAssetDatas, netWorth};
}