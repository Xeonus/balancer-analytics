import {BalancerChartDataItem} from "../data/balancer/balancerTypes";

/**
 * gets the amoutn difference plus the % change in change itself (second order change)
 * @param {*} valueNow
 * @param {*} value24HoursAgo
 * @param {*} value48HoursAgo
 */
export const get2DayChange = (valueNow: string, value24HoursAgo: string, value48HoursAgo: string): [number, number] => {
    // get volume info for both 24 hour periods
    const currentChange = parseFloat(valueNow) - parseFloat(value24HoursAgo);
    const previousChange = parseFloat(value24HoursAgo) - parseFloat(value48HoursAgo);
    const adjustedPercentChange = ((currentChange - previousChange) / previousChange) * 100;
    if (isNaN(adjustedPercentChange) || !isFinite(adjustedPercentChange)) {
        return [currentChange, 0];
    }
    return [currentChange, adjustedPercentChange];
};

/**
 * get standard percent change between two values
 * @param {*} valueNow
 * @param {*} value24HoursAgo
 */
export const getPercentChange = (valueNow: string | undefined, value24HoursAgo: string | undefined): number => {
    if (valueNow && value24HoursAgo) {
        const change = ((parseFloat(valueNow) - parseFloat(value24HoursAgo)) / parseFloat(value24HoursAgo)) * 100;
        if (isFinite(change)) return change;
    }
    return 0;
};

export function smoothData(data: BalancerChartDataItem[], outlierThreshold: number): BalancerChartDataItem[] {
    const smoothedData: BalancerChartDataItem[] = [];

    for (let i = 0; i < data.length; i++) {
        const currentItem = data[i];
        const prevItem = data[i - 1];
        const nextItem = data[i + 1];

        // Check if currentItem is an outlier
        if (currentItem.value > outlierThreshold * (prevItem?.value || 0) && currentItem.value > outlierThreshold * (nextItem?.value || 0)) {
            // Replace the outlier with the average of the previous and next items
            const smoothedValue = (prevItem?.value || 0 + nextItem?.value || 0) / 2;
            smoothedData.push({ value: smoothedValue, time: currentItem.time });
        } else {
            // If not an outlier, keep the original item
            smoothedData.push(currentItem);
        }
    }

    return smoothedData;
}