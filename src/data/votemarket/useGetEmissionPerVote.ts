import { useState, useEffect, useRef } from 'react';
import erc20Abi from '../../constants/abis/erc20.json';
import { ethers } from 'ethers';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import useGetSimpleTokenPrices from '../balancer-api-v3/useGetSimpleTokenPrices';
import useGetHistoricalTokenPrice from '../balancer-api-v3/useGetHistoricalTokenPrice';
import { useGetVoteMarketIncentives, getTotalVotesFromAnalytics, getTotalIncentivesUSD } from './useGetVoteMarketIncentives';

const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';

export interface EmissionPerVoteResult {
    emissionValuePerVote: number;
    emissionsPerDollarSpent: number;
    loading: boolean;
}

// Cache for veBAL data to avoid repeated RPC calls
interface VeBALCache {
    veBALShare: number;
    nonAuraVeBAL: number;
    timestamp: number;
}

let veBALCache: VeBALCache | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Shared provider instance
let sharedProvider: ethers.providers.JsonRpcProvider | null = null;

const getProvider = () => {
    if (!sharedProvider) {
        sharedProvider = new ethers.providers.JsonRpcProvider('https://rpc.mevblocker.io/fast');
    }
    return sharedProvider;
};

// Get veBAL data with caching
interface VeBALData {
    veBALShare: number;
    nonAuraVeBAL: number;
}

const getVeBALData = async (): Promise<VeBALData> => {
    const now = Date.now();
    if (veBALCache && (now - veBALCache.timestamp) < CACHE_DURATION) {
        return { veBALShare: veBALCache.veBALShare, nonAuraVeBAL: veBALCache.nonAuraVeBAL };
    }

    const provider = getProvider();
    const veBalAddress = '0xc128a9954e6c874ea3d62ce62b468ba073093f25';
    const veBal = new ethers.Contract(veBalAddress, erc20Abi, provider);
    const auraVoterProxy = '0xaf52695e1bb01a16d33d7194c28c42b10e0dbec2';

    const [auraVotingPower, totalVotingPower] = await Promise.all([
        veBal.balanceOf(auraVoterProxy),
        veBal.totalSupply()
    ]);

    const totalVeBAL = parseFloat(ethers.utils.formatEther(totalVotingPower));
    const auraVeBAL = parseFloat(ethers.utils.formatEther(auraVotingPower));
    const nonAuraVeBAL = totalVeBAL - auraVeBAL;

    const veBALShare = nonAuraVeBAL / totalVeBAL;

    veBALCache = { veBALShare, nonAuraVeBAL, timestamp: now };
    return { veBALShare, nonAuraVeBAL };
};

// Get weekly BAL emission based on governance schedule
const getWeeklyBalEmission = (timestamp: number): number => {
    if (timestamp > 1680127200 && timestamp < 1743030000) {
        return 102530.5;
    } else if (timestamp > 1743372000 && timestamp < 1774306800) {
        return 86217.5;
    } else if (timestamp > 1774652400 && timestamp < 1805929200) {
        return 72500;
    }
    // Default fallback
    return 72500;
};

// For current round using live Vote Market data
export const useGetEmissionPerVote = (): EmissionPerVoteResult => {
    const [activeNetwork] = useActiveNetworkVersion();
    const [emissionValuePerVote, setEmissionValuePerVote] = useState(0);
    const [emissionsPerDollarSpent, setEmissionsPerDollarSpent] = useState(0);
    const [loading, setLoading] = useState(true);
    const hasCalculated = useRef(false);

    const coinData = useGetSimpleTokenPrices([balAddress], activeNetwork.chainId);
    const { data: historicalBALCoinData } = useGetHistoricalTokenPrice(balAddress, 'MAINNET');
    const { analytics, loading: vmLoading } = useGetVoteMarketIncentives();

    useEffect(() => {
        const fetchData = async () => {
            // Only calculate once when all data is available
            if (vmLoading || !coinData || !analytics || hasCalculated.current) {
                return;
            }

            try {
                setLoading(true);

                // Get BAL price (use latest historical or current)
                const latestHistoricalPrice = historicalBALCoinData?.[historicalBALCoinData.length - 1];
                const balPrice = latestHistoricalPrice?.value ?? coinData.data[balAddress]?.price ?? 0;

                if (balPrice === 0) {
                    console.warn('BAL price not available');
                    setLoading(false);
                    return;
                }

                const effectiveTimestamp = Math.floor(Date.now() / 1000);
                const weeklyBalEmissionFormatted = getWeeklyBalEmission(effectiveTimestamp);

                // Get cached veBAL data (only one RPC call every 5 minutes)
                const { veBALShare, nonAuraVeBAL } = await getVeBALData();

                // Get vote totals from Vote Market analytics (for incentive efficiency only)
                const voteMarketVotes = getTotalVotesFromAnalytics(analytics);
                const totalIncentives = getTotalIncentivesUSD(analytics);

                // Debug logging
                console.log('=== Emission Per Vote Debug ===');
                console.log('BAL Price:', balPrice);
                console.log('Weekly BAL Emission:', weeklyBalEmissionFormatted);
                console.log('veBAL Share (non-Aura %):', veBALShare);
                console.log('Total non-Aura veBAL:', nonAuraVeBAL);
                console.log('Vote Market Votes:', voteMarketVotes);
                console.log('Total Incentives USD:', totalIncentives);

                if (nonAuraVeBAL === 0) {
                    console.warn('No veBAL voting power available');
                    setEmissionValuePerVote(0);
                    setEmissionsPerDollarSpent(0);
                    setLoading(false);
                    hasCalculated.current = true;
                    return;
                }

                // Calculate emission value per veBAL
                // Non-Aura veBAL controls veBALShare fraction of total emissions
                const balEmissionsForVeBAL = weeklyBalEmissionFormatted * veBALShare;
                const weeklyBalEmissionPerVeBAL = balEmissionsForVeBAL / nonAuraVeBAL;
                const calculatedEmissionValuePerVote = weeklyBalEmissionPerVeBAL * balPrice;

                console.log('BAL Emissions for veBAL voters:', balEmissionsForVeBAL);
                console.log('BAL Emission per veBAL (weekly):', weeklyBalEmissionPerVeBAL);
                console.log('Emission Value per Vote ($):', calculatedEmissionValuePerVote);

                setEmissionValuePerVote(calculatedEmissionValuePerVote);

                // Calculate emissions per dollar spent on Vote Market incentives
                // This shows the efficiency: how much emission value you get for $1 of incentives
                if (voteMarketVotes > 0 && totalIncentives > 0) {
                    const dollarPerVeBAL = totalIncentives / voteMarketVotes;
                    console.log('Dollar per veBAL (incentive $/vote):', dollarPerVeBAL);

                    if (dollarPerVeBAL > 0 && calculatedEmissionValuePerVote > 0) {
                        const emissionDollars = calculatedEmissionValuePerVote / dollarPerVeBAL;
                        console.log('Emissions per $1 Spent:', emissionDollars);
                        setEmissionsPerDollarSpent(emissionDollars);
                    } else {
                        setEmissionsPerDollarSpent(0);
                    }
                } else {
                    setEmissionsPerDollarSpent(0);
                }
                console.log('=== End Debug ===')

                hasCalculated.current = true;

            } catch (error) {
                console.error('Error calculating emission per vote:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [coinData, historicalBALCoinData, analytics, vmLoading]);

    return {
        emissionValuePerVote,
        emissionsPerDollarSpent,
        loading
    };
};

