import {HiddenHandRewards} from "./hiddenHandTypes";
import {useEffect, useState} from "react";
import axios from "axios";

export const useGetHiddenHandRewards = (address: string): HiddenHandRewards | null => {
    const [rewards, setRewards] = useState<HiddenHandRewards | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.hiddenhand.finance/reward/0/${address}`);
                const data: HiddenHandRewards = response.data;
                setRewards(data);
            } catch (error) {
                console.error('Error fetching HiddenHand rewards:', error);
            }
        };

        if (address) {
            fetchData();
        }
    }, [address]);

    return rewards;
};