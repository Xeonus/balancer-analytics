import { useEffect, useState } from 'react';
import axios from 'axios';
import {unixToDate} from "../../utils/date";

interface HiddenHandIncentives {
    data: {
        totalValue: number;
        voteCount: number;
    }[];
}

interface IncentiveData {
    dollarPerVlAssetData: number[];
    totalAmountDollarsData: number[];
    totalAmountDollarsSum: number;
    xAxisData: string[];
}

const API_URL = 'https://api.hiddenhand.finance/proposal/balancer';

export const useGetHiddenHandHistoricalIncentives = (): IncentiveData | null => {
    const [data, setData] = useState<IncentiveData | null>(null);

    useEffect(() => {
        const ONE_DAY = 60 * 60 * 24;
        const BIWEEKLY = ONE_DAY * 7;
        const startDate = 1649894400;
        const today = Math.floor(Date.now() / 1000);

        const timestamps: number[] = [];
        for(let i = startDate; i <= today; i += BIWEEKLY) {
            timestamps.push(i);
        }

        const fetchAndCalculateData = async () => {
            const results = await Promise.all(
                timestamps.map(async (timestamp: number) => {
                    const requestURL = API_URL + '/' + timestamp.toString();
                    try {
                        const response = await axios.get(requestURL);
                        const hiddenHandData: HiddenHandIncentives = response.data;

                        let totalValue = 0;
                        let totalVotes = 0;
                        hiddenHandData.data.forEach((item) => {
                            totalValue += item.totalValue;
                            if (item.totalValue > 0) {
                                totalVotes += item.voteCount;
                            }
                        });

                        const valuePerVote = totalVotes > 0 ? totalValue / totalVotes : 0;
                        return {
                            totalValue,
                            valuePerVote,
                            xAxis: unixToDate(timestamp),
                        };
                    } catch (error) {
                        console.error(error);
                        return null;
                    }
                }),
            );

            // Filter out any failed fetches (null results)
            const filteredResults = results.filter(
                (result): result is { totalValue: number; valuePerVote: number; xAxis: string } => result !== null,
            );

            const totalValueList = filteredResults.map(result => result.totalValue);
            const valuePerVoteList = filteredResults.map(result => result.valuePerVote);
            const totalAmountDollarsSum = totalValueList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const xAxisData = filteredResults.map(result => result.xAxis);

            setData({
                dollarPerVlAssetData: valuePerVoteList,
                totalAmountDollarsData: totalValueList,
                totalAmountDollarsSum: totalAmountDollarsSum,
                xAxisData: xAxisData,

            });
        };

        fetchAndCalculateData();
    }, []);

    return data;
};
