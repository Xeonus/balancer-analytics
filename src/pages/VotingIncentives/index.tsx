import {Box, Card, Grid, MenuItem, Select, Typography} from "@mui/material";
import IntelligentLoadingIndicator from '../../components/Progress/IntelligentLoadingIndicator';
import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import NavCrumbs, {NavElement} from "../../components/NavCrumbs";
import DashboardOverviewChart from "../../components/Echarts/VotingIncentives/DashboardOverviewChart";
import {unixToDate} from "../../utils/date";
import MetricsCard from "../../components/Cards/MetricsCard";
import {AddShoppingCart, CurrencyExchange, ShoppingCartCheckout} from "@mui/icons-material";
import SingleRoundBarChart from "../../components/Echarts/VotingIncentives/SingleRoundBarChart";
import {useGetHiddenHandVotingIncentives} from "../../data/hidden-hand/useGetHiddenHandVotingIncentives";
import {HiddenHandIncentives} from "../../data/hidden-hand/hiddenHandTypes";
import {useGetHiddenHandHistoricalIncentives} from "../../data/hidden-hand/useGetHiddenHandHistoricalIncentives";
import {BALANCER_TIMESTAMPS} from "../../data/hidden-hand/constants";
import { BalancerStakingGauges } from "../../data/balancer/balancerTypes";
import {
    decorateGaugesWithIncentives,
    decorateGaugesWithVoteMarketIncentives,
    extractVoteMarketPoolRewards
} from "./helpers";
import IncentivesTable from "../../components/Tables/IncentivesTable";
import HistoricalIncentivesTable from "../../components/Tables/HistoricalIncentivesTable";
import HiddenHandCard from "../../components/Cards/HiddenHandCard";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import useGetBalancerV3StakingGauges from "../../data/balancer-api-v3/useGetBalancerV3StakingGauges";
import PaladinQuestsCard from "../../components/Cards/PaladinQuestsCard";
import useGetHistoricalTokenPrice from "../../data/balancer-api-v3/useGetHistoricalTokenPrice";
import VeBALIncentiveAPRChart from "../../components/Echarts/VotingIncentives/veBALIncentiveAPRChart";
import {HISTORICAL_VEBAL_PRICE} from "../../constants";
import {ethers} from "ethers";
import {useGetPaladinHistoricalQuests} from "../../data/paladin/useGetPaladinHistoricalQuests";
import {
    getTokenPriceAtTimestamp,
    useGetHistoricalTokenPricesAggregated
} from "../../data/balancer-api-v3/useGetHistoricalTokenPricesAggregated";
import VoteMarketCard from "../../components/Cards/VoteMarketCard";
// Vote Market imports
import {
    useGetVoteMarketIncentives,
    getTotalVotesFromAnalytics,
    getTotalIncentivesUSD
} from "../../data/votemarket/useGetVoteMarketIncentives";
import { useGetVoteMarketHistoricalIncentives } from "../../data/votemarket/useGetVoteMarketHistoricalIncentives";
import { useGetEmissionPerVote } from "../../data/votemarket/useGetEmissionPerVote";

// Helper functions to parse data types to Llama model
const extractPoolRewards = (data: HiddenHandIncentives | null): PoolReward[] => {
    const poolRewards: PoolReward[] = [];

    if (data) {
        data.data.forEach((item) => {
            const {title, bribes} = item;

            if (bribes.length > 0) {
                const poolReward: PoolReward = {pool: title};
                bribes.forEach((bribe) => {
                    const {symbol, value} = bribe;
                    const tokenKey = `${symbol.toUpperCase()}`;

                    if (!poolReward[tokenKey]) {
                        poolReward[tokenKey] = value;
                    } else {
                        const existingValue = poolReward[tokenKey];
                        poolReward[tokenKey] = typeof existingValue === 'number' ? existingValue + value : value;
                    }
                });

                poolRewards.push(poolReward);
            }
        });
    }
    return poolRewards;
};

// Type for Paladin historical data state
type CombinedIncentiveData = {
    dollarPerVlAssetData: number[];
    totalAmountDollarsData: number[];
    xAxisData: string[];
    totalAmountDollarsSum: number;
};

export type PoolReward = {
    pool: string;
    [token: string]: string | number; // this represents any number of token properties with their corresponding `amountDollars` value
};
// Loading state interface for better tracking
interface LoadingState {
    name: string;
    loading: boolean;
    completed: boolean;
    error?: string | null;
}

export default function VotingIncentives() {
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const navCrumbs: NavElement[] = []
    navCrumbs.push(homeNav)

    // Timestamps for epoch selector
    const timestamps = BALANCER_TIMESTAMPS;
    const [currentRoundNew, setCurrentRoundNew] = useState<number>(0); // 0 = current round
    const [bribeRewardsNew, setBribeRewardsNew] = useState<PoolReward[]>([]);
    const [xAxisDataRoundNew, setXAxisDataRoundNew] = useState<string[]>([]);
    const [incentivePerVote, setIncentivePerVote] = useState<number>(0);
    const [roundIncentives, setRoundIncentives] = useState<number>(0);
    const [emissionVotesTotal, setEmissionVotesTotal] = useState<number>(0);
    const [decoratedGauges, setDecoratedGagues] = useState<BalancerStakingGauges[]>([]);
    const [paladinHistoricalData, setPaladinHistoricalData] = useState<CombinedIncentiveData | null>(null);

    // Vote Market data (primary source for current round)
    const {
        campaigns: voteMarketCampaigns,
        analytics: voteMarketAnalytics,
        loading: voteMarketLoading
    } = useGetVoteMarketIncentives();

    // Vote Market historical data
    const {
        data: voteMarketHistoricalData,
        loading: voteMarketHistoricalLoading
    } = useGetVoteMarketHistoricalIncentives();

    // Hidden Hand data (for historical rounds before Jan 2025)
    const hiddenHandData = useGetHiddenHandVotingIncentives(currentRoundNew === 0 ? '' : String(currentRoundNew));

    // Gauge data
    const gaugeData = useGetBalancerV3StakingGauges();

    // Emission per vote calculation (uses Vote Market data)
    const { emissionValuePerVote, emissionsPerDollarSpent } = useGetEmissionPerVote();

    // Historical price data
    const priceData = HISTORICAL_VEBAL_PRICE;
    const { data: veBALHistoricalPrice } = useGetHistoricalTokenPrice('0x5c6ee304399dbdb9c8ef030ab642b10820db8f56', 'MAINNET');

    //Paladin data
    const { questData, loading: questsLoading } = useGetPaladinHistoricalQuests();
    const questTimestamps = useMemo(() => {
        if (!questData) return [];
        return Array.from(new Set(questData.quests.map(q => q.timestamp)));
    }, [questData]);

    // Use the new hook for historical price data
    const {
        priceData: historicalTokenPrices,
        loading: pricesLoading
    } = useGetHistoricalTokenPricesAggregated(
        questData ? Array.from(questData.tokenAddresses) : [],
        questTimestamps
    );

    // Historical data - moved here to fix variable hoisting issue
    const historicalData = useGetHiddenHandHistoricalIncentives();

    useEffect(() => {
        // Only process when we have both quest data and token prices
        if (!questData || !historicalTokenPrices || questsLoading || pricesLoading) {
            return;
        }

        // Get current timestamp to filter out future periods
        const now = Math.floor(Date.now() / 1000);
        // Only process historical data (up to 1 year ago from now to avoid missing price data)
        const oneYearAgo = now - (365 * 24 * 60 * 60);

        const processedData = questData.quests
            // Filter out future timestamps and very recent ones without price data
            .filter(questPeriod => questPeriod.timestamp <= now && questPeriod.timestamp >= oneYearAgo)
            .map(questPeriod => {
                let periodTotalValue = 0;
                let totalRewardPerVote = 0;
                let validQuestCount = 0;

                questPeriod.data.forEach(quest => {
                    // Validate all required fields exist
                    if (!quest.rewardToken || !quest.rewardDistributed || !quest.rewardPerVote) {
                        return;
                    }

                    try {
                        // Get historical price for this token at this timestamp
                        const tokenPrice = getTokenPriceAtTimestamp(
                            historicalTokenPrices,
                            quest.rewardToken,
                            questPeriod.timestamp
                        );

                        // Silently skip if no price found (common for newer tokens or missing data)
                        if (tokenPrice === 0) {
                            return;
                        }

                        // Calculate value using historical token price
                        const rewardDistributedEther = Number(ethers.utils.formatEther(quest.rewardDistributed || '0'));
                        const rewardValueUSD = rewardDistributedEther * tokenPrice;
                        periodTotalValue += rewardValueUSD;

                        // Calculate reward per vote in USD
                        const questRewardPerVote = Number(ethers.utils.formatEther(quest.rewardPerVote || '0'));
                        const rewardPerVoteUSD = questRewardPerVote * tokenPrice;
                        totalRewardPerVote += rewardPerVoteUSD;
                        validQuestCount++;
                    } catch {
                        // Silently skip failed quests
                        return;
                    }
                });

                return {
                    totalValue: periodTotalValue,
                    valuePerVote: validQuestCount > 0 ? totalRewardPerVote / validQuestCount : 0,
                    xAxis: unixToDate(questPeriod.timestamp)
                };
            });

        // Filter out periods with no valid data and sort chronologically
        const validProcessedData = processedData
            .filter(data => data.totalValue > 0)
            .sort((a, b) => new Date(a.xAxis).getTime() - new Date(b.xAxis).getTime());

        const totalValueList = validProcessedData.map(result => result.totalValue);
        const valuePerVoteList = validProcessedData.map(result => result.valuePerVote);
        const xAxisData = validProcessedData.map(result => result.xAxis);
        const totalAmountDollarsSum = totalValueList.reduce((acc, curr) => acc + curr, 0);

        setPaladinHistoricalData({
            dollarPerVlAssetData: valuePerVoteList,
            totalAmountDollarsData: totalValueList,
            totalAmountDollarsSum,
            xAxisData
        });
    }, [JSON.stringify(questData), JSON.stringify(historicalTokenPrices), questsLoading, pricesLoading]);

    // Process current round data from Vote Market OR historical data from Hidden Hand
    useEffect(() => {
        // Current round (0) uses Vote Market data
        if (currentRoundNew === 0 && voteMarketAnalytics && !voteMarketLoading) {
            // Extract pool rewards from Vote Market campaigns
            // Note: incentiveDirectedUSD from analytics already accounts for Aura's veBAL share
            const vmPoolRewards = extractVoteMarketPoolRewards(voteMarketCampaigns, voteMarketAnalytics, gaugeData);
            setBribeRewardsNew(vmPoolRewards);
            setXAxisDataRoundNew(vmPoolRewards.map((el) => el.pool));

            // Calculate metrics from Vote Market analytics
            // incentiveDirectedUSD already accounts for Aura's share
            const totalVotes = getTotalVotesFromAnalytics(voteMarketAnalytics);
            const totalIncentives = getTotalIncentivesUSD(voteMarketAnalytics);

            setRoundIncentives(totalIncentives);
            setEmissionVotesTotal(totalVotes);
            setIncentivePerVote(totalVotes > 0 ? totalIncentives / totalVotes : 0);

            // Decorate gauges with Vote Market analytics and filter to only show gauges with incentives
            const fullyDecoratedGauges = decorateGaugesWithVoteMarketIncentives(gaugeData, voteMarketAnalytics);
            const gaugesWithIncentives = fullyDecoratedGauges.filter(gauge => gauge.totalRewards && gauge.totalRewards > 0);
            setDecoratedGagues(gaugesWithIncentives);
        }
        // Historical rounds use Hidden Hand data
        else if (currentRoundNew !== 0 && hiddenHandData.incentives && hiddenHandData.incentives.data.length > 1) {
            const data = extractPoolRewards(hiddenHandData.incentives);
            setBribeRewardsNew(data);
            setXAxisDataRoundNew(data.map((el) => el.pool));

            // Calculate metrics from Hidden Hand data
            let totalVotes = 0;
            let totalValue = 0;
            let emissionVotes = 0;
            hiddenHandData.incentives.data.forEach((item) => {
                totalValue += item.totalValue;
                totalVotes += item.voteCount;
                if (item.totalValue > 0) {
                    emissionVotes += item.voteCount;
                }
            });

            setEmissionVotesTotal(emissionVotes);
            setIncentivePerVote(totalVotes > 0 ? totalValue / totalVotes : 0);
            setRoundIncentives(totalValue);

            // Decorate gauges and filter to only show gauges with incentives
            const fullyDecoratedGauges = decorateGaugesWithIncentives(gaugeData, hiddenHandData.incentives);
            const gaugesWithIncentives = fullyDecoratedGauges.filter(gauge => gauge.totalRewards && gauge.totalRewards > 0);
            setDecoratedGagues(gaugesWithIncentives);
        }
    }, [currentRoundNew, JSON.stringify(gaugeData), hiddenHandData.incentives, voteMarketAnalytics, voteMarketCampaigns, voteMarketLoading]);

    const handleEpochChange = (event: SelectChangeEvent<number>) => {
        setCurrentRoundNew(Number(event.target.value));
    };

    // LLAMA API - Memoize the processed historical data
    const { dollarPerVlAssetData, totalAmountDollarsData, xAxisData, totalAmountDollarsSum } = useMemo(() => {
        if (!historicalData) {
            return {
                dollarPerVlAssetData: [],
                totalAmountDollarsData: [],
                xAxisData: [],
                totalAmountDollarsSum: 0
            };
        }

        let newDollarPerVlAssetData = [];
        let newTotalAmountDollarsData = [];
        let newXAxisData = [];

        for (let i = 0; i < historicalData.dollarPerVlAssetData.length; i += 2) {
            if (i + 1 < historicalData.dollarPerVlAssetData.length) {
                newDollarPerVlAssetData.push(historicalData.dollarPerVlAssetData[i + 1]); // Taking latter value
                newTotalAmountDollarsData.push(historicalData.totalAmountDollarsData[i + 1]); // Taking latter value
                newXAxisData.push(historicalData.xAxisData[i + 1]); // Taking latter x-axis value
            } else if (i < historicalData.dollarPerVlAssetData.length) {
                // Handling odd-length arrays, keeping the last element if present
                newDollarPerVlAssetData.push(historicalData.dollarPerVlAssetData[i]);
                newTotalAmountDollarsData.push(historicalData.totalAmountDollarsData[i]);
                newXAxisData.push(historicalData.xAxisData[i]);
            }
        }

        return {
            dollarPerVlAssetData: newDollarPerVlAssetData,
            totalAmountDollarsData: newTotalAmountDollarsData,
            totalAmountDollarsSum: historicalData.totalAmountDollarsSum,
            xAxisData: newXAxisData
        };
    }, [historicalData]);



    // Combine Hidden Hand and Vote Market data for APR chart
    // Use HH data before 2026-01-08, VM data from 2026-01-08 onwards
    const { combinedXAxisData, combinedDollarPerVlAssetData } = useMemo(() => {
        const voteMarketStartDate = '2026-01-08';
        const vmStartTime = new Date(voteMarketStartDate).getTime();

        // Start with Hidden Hand data (before Vote Market primary date)
        const combinedX: string[] = [];
        const combinedDollarPerVote: number[] = [];

        // Add HH data for dates before VM start
        if (xAxisData && dollarPerVlAssetData) {
            xAxisData.forEach((date, index) => {
                const dateTime = new Date(date).getTime();
                if (dateTime < vmStartTime) {
                    combinedX.push(date);
                    combinedDollarPerVote.push(dollarPerVlAssetData[index]);
                }
            });
        }

        // Add Vote Market data for dates from VM start onwards
        if (voteMarketHistoricalData && voteMarketHistoricalData.xAxisData) {
            voteMarketHistoricalData.xAxisData.forEach((date, index) => {
                const dateTime = new Date(date).getTime();
                if (dateTime >= vmStartTime) {
                    combinedX.push(date);
                    combinedDollarPerVote.push(voteMarketHistoricalData.dollarPerVlAssetData[index]);
                }
            });
        }

        // Sort by date
        const sorted = combinedX
            .map((date, i) => ({ date, value: combinedDollarPerVote[i] }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return {
            combinedXAxisData: sorted.map(s => s.date),
            combinedDollarPerVlAssetData: sorted.map(s => s.value)
        };
    }, [xAxisData, dollarPerVlAssetData, voteMarketHistoricalData]);

    // APR chart: memoize the APR and price calculations
    const { historicalAPR, historicalPrice } = useMemo(() => {
        if (!combinedXAxisData || combinedXAxisData.length === 0 || !combinedDollarPerVlAssetData) {
            return { historicalAPR: [], historicalPrice: [] };
        }

        const aprData = combinedXAxisData.map((el, index) => {
            const price = priceData.find(price => el === price.time);
            const fallbackPrice = veBALHistoricalPrice ? veBALHistoricalPrice.find(price => el === price.time) : null;

            if (price && price.value) {
                return combinedDollarPerVlAssetData[index] * 52 / price.value;
            } else if (fallbackPrice && fallbackPrice.value) {
                return combinedDollarPerVlAssetData[index] * 52 / fallbackPrice.value;
            }
            return 0; // Fallback value
        });

        const priceHistory = combinedXAxisData.map((el) => {
            const price = priceData.find(price => el === price.time);
            const fallbackPrice = veBALHistoricalPrice ? veBALHistoricalPrice.find(price => el === price.time) : null;
            if (price && price.value) {
                return price.value;
            } else if (fallbackPrice && fallbackPrice.value) {
                return fallbackPrice.value;
            }
            return 0; // Fallback value
        });

        return { historicalAPR: aprData, historicalPrice: priceHistory };
    }, [combinedXAxisData, combinedDollarPerVlAssetData, priceData, veBALHistoricalPrice]);

    // Add Paladin data preparation with memoization
    const { paladinDollarPerVlAssetData, paladinTotalAmountDollarsData, paladinXAxisData } = useMemo(() => {
        if (!paladinHistoricalData) {
            return {
                paladinDollarPerVlAssetData: [],
                paladinTotalAmountDollarsData: [],
                paladinXAxisData: []
            };
        }
        return {
            paladinDollarPerVlAssetData: paladinHistoricalData.dollarPerVlAssetData,
            paladinTotalAmountDollarsData: paladinHistoricalData.totalAmountDollarsData,
            paladinXAxisData: paladinHistoricalData.xAxisData
        };
    }, [paladinHistoricalData]);

    // Create loading states array for better tracking
    const loadingStates: LoadingState[] = useMemo(() => [
        {
            name: 'Vote Market Data',
            loading: voteMarketLoading,
            completed: !voteMarketLoading && !!voteMarketAnalytics,
        },
        {
            name: 'Vote Market Historical',
            loading: voteMarketHistoricalLoading,
            completed: !voteMarketHistoricalLoading && !!voteMarketHistoricalData,
        },
        {
            name: 'Historical Data (HH)',
            loading: !historicalData,
            completed: !!historicalData,
        },
        {
            name: 'Bribe Rewards',
            loading: bribeRewardsNew.length < 1 && !voteMarketLoading,
            completed: bribeRewardsNew.length >= 1,
        },
        {
            name: 'Paladin Quests',
            loading: questsLoading,
            completed: !questsLoading && !!questData,
        },
        {
            name: 'Token Prices',
            loading: pricesLoading,
            completed: !pricesLoading && !!historicalTokenPrices,
        },
    ], [voteMarketLoading, voteMarketAnalytics, voteMarketHistoricalLoading, voteMarketHistoricalData, historicalData, bribeRewardsNew.length, questsLoading, questData, pricesLoading, historicalTokenPrices]);

    // Check if any data is still loading
    const isStillLoading = loadingStates.some(state => state.loading)

    return (<>
            {isStillLoading ? (
                <Grid
                    container
                    spacing={2}
                    mt='10%'
                    sx={{justifyContent: 'center'}}
                >
                    <Grid item xs={12}>
                        <IntelligentLoadingIndicator
                            loadingStates={loadingStates}
                            title="Loading Voting Incentives Data"
                        />
                    </Grid>
                </Grid>
            ) : (
                <Box sx={{flexGrow: 2}}>
                    <Grid
                        container
                        spacing={2}
                        sx={{justifyContent: 'center'}}
                    >
                        <Grid item xs={11} sm={9}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <NavCrumbs crumbSet={navCrumbs} destination={'Voting Incentives'}/>
                            </Box>
                        </Grid>
                        <Grid item xs={11} sm={9}>
                            <Grid
                                container
                                spacing={2}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                                sx={{
                                    justifyContent: { md: 'space-between', xs: 'center' },
                                    mb: 2
                                }}
                            >
                                <Grid item>
                                    <MetricsCard
                                        mainMetric={(totalAmountDollarsSum || 0) + (voteMarketHistoricalData?.totalAmountDollarsSum || 0) + (paladinHistoricalData?.totalAmountDollarsSum || 0)}
                                        metricName="All time incentives"
                                        mainMetricInUSD={true}
                                        MetricIcon={CurrencyExchange}
                                    />
                                </Grid>
                                <Grid item>
                                    <MetricsCard
                                        mainMetric={voteMarketHistoricalData && voteMarketHistoricalData.dollarPerVlAssetData.length > 0
                                            ? voteMarketHistoricalData.dollarPerVlAssetData[voteMarketHistoricalData.dollarPerVlAssetData.length - 1]
                                            : (dollarPerVlAssetData && dollarPerVlAssetData.length > 0 ? dollarPerVlAssetData[dollarPerVlAssetData.length - 1] : 0)}
                                        metricName="Last round $/veBAL"
                                        mainMetricInUSD={true}
                                        MetricIcon={CurrencyExchange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                spacing={2}  // Consistent spacing
                                columns={{ xs: 4, sm: 8, md: 12 }}
                                sx={{
                                    justifyContent: { md: 'space-between', xs: 'center' }
                                }}
                            >
                                <Grid item xs={12} sm={6} md={4}>
                                    <VoteMarketCard />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <PaladinQuestsCard />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <HiddenHandCard />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={11} sm={9}>
                            <Typography sx={{fontSize: '24px'}}>Voting Markets: Historical Overview</Typography>
                        </Grid>
                        <Grid item xs={11} sm={9}>
                            <Typography sx={{fontSize: '15px'}}>Votemarket: Historical Performance</Typography>
                        </Grid>
                        {voteMarketHistoricalData && voteMarketHistoricalData.xAxisData.length > 0 &&
                            <Grid item xs={11} sm={9}>
                                <Card sx={{boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",}}>
                                    <DashboardOverviewChart
                                        dollarPerVlAssetData={voteMarketHistoricalData.dollarPerVlAssetData}
                                        totalAmountDollarsData={voteMarketHistoricalData.totalAmountDollarsData}
                                        xAxisData={voteMarketHistoricalData.xAxisData}
                                        height="400px"
                                    />
                                </Card>
                            </Grid>
                        }
                        <Grid item xs={11} sm={9}>
                            <Typography sx={{fontSize: '15px'}}>Paladin Quests: Historical Performance</Typography>
                        </Grid>
                        {paladinDollarPerVlAssetData && paladinDollarPerVlAssetData.length > 0 && paladinTotalAmountDollarsData && paladinXAxisData && paladinXAxisData.length > 0 &&
                            <Grid item xs={11} sm={9}>
                                <Card sx={{boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",}}>
                                    <DashboardOverviewChart
                                        dollarPerVlAssetData={paladinDollarPerVlAssetData}
                                        totalAmountDollarsData={paladinTotalAmountDollarsData}
                                        xAxisData={paladinXAxisData}
                                        height="400px"
                                    />
                                </Card>
                            </Grid>
                        }
                        <Grid item xs={11} sm={9}>
                            <Typography sx={{fontSize: '15px'}}>Hidden Hand: Historical Performance (Legacy)</Typography>
                        </Grid>
                        {dollarPerVlAssetData && dollarPerVlAssetData.length > 0 && totalAmountDollarsData && xAxisData && xAxisData.length > 0 &&
                            <Grid item xs={11} sm={9}>
                                <Card sx={{boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",}}>
                                    <DashboardOverviewChart
                                        dollarPerVlAssetData={dollarPerVlAssetData}
                                        totalAmountDollarsData={totalAmountDollarsData}
                                        xAxisData={xAxisData}
                                        height="400px"
                                    />
                                </Card>
                            </Grid>
                        }
                        <Grid item xs={11} sm={9}>
                            <Typography sx={{fontSize: '24px'}}>Historical veBAL Price vs. Incentive APR</Typography>
                        </Grid>
                        {historicalPrice && historicalPrice.length > 0 && historicalAPR && historicalAPR.length > 0 &&
                            <Grid item xs={11} sm={9}>
                                <Card sx={{boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",}}>
                                    <VeBALIncentiveAPRChart
                                        auraPrice={historicalPrice}
                                        auraAPR={historicalAPR}
                                        xAxisData={combinedXAxisData}
                                        height={"400px"}/>
                                </Card>
                            </Grid>
                        }
                        <Grid item xs={11} sm={9} mt={1}>
                            <Typography sx={{fontSize: '24px'}} mb={1}>
                                {currentRoundNew === 0 ? 'Votemarket: Current Round Metrics' : 'Historical Round Metrics'}
                            </Typography>
                        </Grid>
                        <Grid item xs={11} sm={9}>
                            <Box>
                                <Select
                                    sx={{
                                        backgroundColor: "background.paper",
                                        boxShadow: 2,
                                        borderRadius: 2,
                                        borderColor: 0,
                                    }}
                                    color="primary"
                                    value={currentRoundNew}
                                    onChange={handleEpochChange}
                                    displayEmpty
                                >
                                    {timestamps.map((roundNumber, index) => (
                                        <MenuItem
                                            value={roundNumber}
                                            key={index}>{roundNumber === 0 ? 'Current' : unixToDate(roundNumber)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        </Grid>
                        <Grid item xs={11} sm={9}>
                            <Grid
                                container
                                columns={{xs: 4, sm: 8, md: 12}}
                                sx={{justifyContent: {md: 'space-between', xs: 'center'}, alignContent: 'center'}}
                            >
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={roundIncentives || 0}
                                        metricName={"Total Incentives"}
                                        mainMetricInUSD={true}
                                        MetricIcon={CurrencyExchange}
                                    />
                                </Box>
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={emissionVotesTotal || 0}
                                        metricName={"Total Incentive Votes"}
                                        mainMetricInUSD={false}
                                        MetricIcon={HowToVoteIcon}
                                    />
                                </Box>
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={incentivePerVote || 0}
                                        metricName={"Incentive $/Vote"}
                                        metricDecimals={4}
                                        mainMetricInUSD={true}
                                        MetricIcon={CurrencyExchange}
                                    />
                                </Box>
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={emissionValuePerVote || 0}
                                        metricName={"Emission $/Vote"}
                                        metricDecimals={4}
                                        mainMetricInUSD={true}
                                        MetricIcon={ShoppingCartCheckout}
                                        toolTipText={'Emission value generated per veBAL'}
                                    />
                                </Box>
                                <Box mr={1} mb={1}>
                                    <MetricsCard
                                        mainMetric={emissionsPerDollarSpent || 0}
                                        metricName={"Emissions per $1"}
                                        mainMetricInUSD={true}
                                        metricDecimals={4}
                                        MetricIcon={AddShoppingCart}
                                        toolTipText={'BAL emissions received for 1$ spent in incentives'}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        {hiddenHandData.incentives && bribeRewardsNew.length > 0 && xAxisDataRoundNew.length > 0 &&
                            <Grid item mt={1} xs={11} sm={9}>
                                <Card sx={{boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",}}>
                                    <SingleRoundBarChart
                                        rewardData={bribeRewardsNew}
                                        xAxisData={xAxisDataRoundNew}
                                        height="500px"
                                    />
                                </Card>
                            </Grid>
                        }

                        <Grid item xs={11} sm={9}>
                            {currentRoundNew < 1689019200 && currentRoundNew !== 0 && hiddenHandData.incentives !== null ? (
                                <HistoricalIncentivesTable
                                    key={currentRoundNew}
                                    gaugeDatas={hiddenHandData.incentives.data} />
                            ) : decoratedGauges && decoratedGauges.length > 0 && (
                                <IncentivesTable gaugeDatas={decoratedGauges} currentRound={currentRoundNew} />
                            )}
                        </Grid>
                        {/*<Grid item xs={11} sm={9}>
                            <Typography variant="h5" mb={1}>Unclaimed Personal Rewards</Typography>
                        </Grid>
                         <Grid item xs={11} sm={9}>
                            {address && addressRewards && addressRewards.data ?
                            <HiddenHandAddressRewards rewardData={addressRewards?.data} /> :
                                <Card sx={{
                                    maxWidth: '250px',
                                    minHeight: '100px'
                                }}><CardContent>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        height="100%"
                                    >
                                        <SelfImprovementIcon sx={{ fontSize: 48 }} />
                                        <Typography variant="subtitle1" align="center">
                                            Please connect your Wallet
                                        </Typography>
                                    </Box>
                                </CardContent>
                                </Card>}
                        </Grid> */}
                    </Grid>
                </Box>
            )}
        </>
    );
}
