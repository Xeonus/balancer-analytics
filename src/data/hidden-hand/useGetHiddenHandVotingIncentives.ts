import axios from 'axios';
import { useState, useEffect } from 'react';
import { HiddenHandIncentives } from './hiddenHandTypes';

const API_URL = 'https://api.hiddenhand.finance/proposal/balancer';
// get current time in seconds
const now = Math.floor(Date.now() / 1000);
export const ONE_WEEK = 7 * 24 * 60 * 60;

export const useGetHiddenHandVotingIncentives = (timestamp =''): { incentives: HiddenHandIncentives | null } => {
    const [incentives, setIncentives] = useState<HiddenHandIncentives | null>(null);
    //fetch last active round if it is within 1 week
    if (Number(timestamp) > now - ONE_WEEK) {
        timestamp = ''
    }
    const requestURL = timestamp ? API_URL + '/' + timestamp : API_URL
    useEffect(() => {
        const fetchBalancerIncentives = () => {
            axios
                .get(requestURL)
                .then((response) => {
                    const json: HiddenHandIncentives = response.data;
                    setIncentives(json);
                })
                .catch((error) => {
                    console.error(error);
                    setIncentives(null);
                });
        };
        fetchBalancerIncentives();
    }, [requestURL, timestamp]);

    return { incentives };
};
