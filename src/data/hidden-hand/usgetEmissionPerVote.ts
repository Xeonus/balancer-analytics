import {useState, useEffect} from 'react';
import balancerTokenAdminAbi from '../../constants/abis/balancerTokenAdmin.json';
import erc20Abi from '../../constants/abis/erc20.json';
import { BALANCER_TIMESTAMPS } from "./constants";
import {useGetHiddenHandVotingIncentives} from "./useGetHiddenHandVotingIncentives";
import {ethers} from "ethers";
import {useActiveNetworkVersion} from "../../state/application/hooks";
import useGetSimpleTokenPrices from "../balancer-api-v3/useGetSimpleTokenPrices";
import useGetHistoricalTokenPrice from "../balancer-api-v3/useGetHistoricalTokenPrice";
import {GqlChain} from "../../apollo/generated/graphql-codegen-generated";
import {unixToDate} from "../../utils/date";


const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
export const useGetEmissionPerVote = (timestampCurrentRound: number) => {
    const timestamps = BALANCER_TIMESTAMPS;
    const indexOfCurrent = timestamps.indexOf(timestampCurrentRound);
    const timestampPreviousRound = timestamps[indexOfCurrent - 1]
    const [activeNetwork] = useActiveNetworkVersion()
    // If a round is currently active we need to set the appropriate pattern

    const [emissionValuePerVote, setEmissionValuePerVote] = useState(0);
    const [emissionsPerDollarSpent, setEmissionsPerDollarSpent] = useState(0)
    const coinData = useGetSimpleTokenPrices([balAddress], activeNetwork.chainId);
    const { data: historicalBALCoinData } = useGetHistoricalTokenPrice(balAddress, 'MAINNET')
    const hiddenHandDataCurrent = useGetHiddenHandVotingIncentives(timestampCurrentRound === 0 ? '' : String(timestampCurrentRound));
    const hiddenHandDataPrevious = useGetHiddenHandVotingIncentives(String(timestampPreviousRound));

    useEffect(() => {
        const fetchData = async () => {
            try {
                if ((timestampCurrentRound === 0 || timestampCurrentRound) && coinData  && hiddenHandDataCurrent.incentives && hiddenHandDataPrevious.incentives) {
                    const DAY = 86400;
                    const WEEK = 604800;
                    const currentTime = Date.now() ;

                    const balTsPrice = historicalBALCoinData?.find(el => el.time === unixToDate(timestampCurrentRound) ? el.value : 0)
                    const provider = new ethers.providers.JsonRpcProvider('https://rpc.mevblocker.io/fast');
                    const balPrice = balTsPrice ? balTsPrice.value : coinData.data[balAddress].price
                    console.log("BAL price: ", balPrice)
                    const balTokenAdminAddress = '0xf302f9F50958c5593770FDf4d4812309fF77414f';

                    const balTokenAdmin = new ethers.Contract(
                        balTokenAdminAddress,
                        balancerTokenAdminAbi,
                        provider
                    );

                    // Simple BAL emission map based on https://dune.com/balancer/bal-supply
                    const weeklyBalEmission = (await balTokenAdmin.rate()).mul(WEEK);
                    let weeklyBalEmissionFormatted = 145000
                    if (timestampCurrentRound < 1711975297 && timestampCurrentRound > 1680180097) {
                        weeklyBalEmissionFormatted = 121929.98
                    } else {
                        weeklyBalEmissionFormatted = parseFloat(ethers.utils.formatEther(weeklyBalEmission))
                    }

                    console.log("Weekly BAL emission: ", weeklyBalEmissionFormatted)

                    // Calculate Aura's voting power in Balancer
                    const veBalAddress = '0xc128a9954e6c874ea3d62ce62b468ba073093f25';
                    const veBal = new ethers.Contract(
                        veBalAddress,
                        erc20Abi,
                        provider
                    );
                    const auraVoterProxy = '0xaf52695e1bb01a16d33d7194c28c42b10e0dbec2';
                    const auraVotingPower = await veBal.balanceOf(auraVoterProxy);
                    const totalVotingPower = await veBal.totalSupply();
                    //Calculate veBAL voting power as a fraction of auraBAL power
                    const veBALShare = (parseFloat(ethers.utils.formatEther(totalVotingPower))- parseFloat(ethers.utils.formatEther(auraVotingPower))) / parseFloat(ethers.utils.formatEther(totalVotingPower));

                    let totalVotesCurrent = 0;
                    let totalVotesPrevious = 0;
                    let totalVotesOnEmissions = 0;
                    let totalEmissionsCurrent = 0;
                    if (hiddenHandDataPrevious.incentives.data.length > 1 && hiddenHandDataCurrent.incentives.data.length > 1) {
                        hiddenHandDataCurrent.incentives.data.forEach((item) => {
                            totalVotesCurrent += item.voteCount;
                            if (item.totalValue > 0) {
                                totalVotesOnEmissions += item.voteCount;
                            }
                            totalEmissionsCurrent += item.totalValue;
                        });
                        hiddenHandDataPrevious.incentives.data.forEach((item) => {
                            totalVotesPrevious += item.voteCount;
                        });
                    }
                    let approximateTotalVote = 0;
                    // Use the largest of the vote count between the last 2 rounds in the beginning
                    // But use actual current vote near the end
                    if (timestampCurrentRound !== 0 && (
                        !hiddenHandDataPrevious ||
                        currentTime >= timestampCurrentRound ||
                        timestampCurrentRound - currentTime < DAY
                    )) {
                        approximateTotalVote = totalVotesCurrent;
                    } else {
                        approximateTotalVote =
                            totalVotesCurrent > totalVotesPrevious ? totalVotesCurrent : totalVotesPrevious;
                    }

                    console.log("approximateTotalVote", approximateTotalVote)

                    const biweeklyBalEmissionPerAura =
                        (weeklyBalEmissionFormatted * veBALShare) /
                        approximateTotalVote;



                    const emissionValuePerVote =
                        biweeklyBalEmissionPerAura * balPrice ;
                    setEmissionValuePerVote(emissionValuePerVote);

                    // Approximate emissions / $ spent
                    const dollarPerveBAL = totalEmissionsCurrent / totalVotesOnEmissions;
                    const emissionDollars = 1 / (dollarPerveBAL / emissionValuePerVote)
                    setEmissionsPerDollarSpent(emissionDollars)
                }

            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        };

        fetchData();
    }, [coinData, hiddenHandDataCurrent, hiddenHandDataPrevious]);

    return{
        emissionValuePerVote: emissionValuePerVote,
        emissionsPerDollarSpent: emissionsPerDollarSpent,
    };
};
