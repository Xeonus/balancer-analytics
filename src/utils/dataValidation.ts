import { BalancerChartDataItem } from '../data/balancer/balancerTypes';

// === Constants ===
// Hack occurred on November 3rd, 2025
export const HACK_TIMESTAMP = 1730592000; // Nov 3, 2025 00:00:00 UTC

// Any value above this threshold is considered corrupted data from the hack
export const MAX_VALID_VALUE = 10_000_000_000; // $10B

// === Validation Functions ===

/**
 * Check if a numeric value is within valid bounds (not corrupted by hack)
 */
export const isValidValue = (value: number): boolean => {
    return !isNaN(value) && isFinite(value) && value >= 0 && value < MAX_VALID_VALUE;
};

// === Scalar Value Sanitization ===

/**
 * Sanitize a single numeric value, returning fallback if invalid
 */
export const sanitizeScalarValue = (
    value: number | undefined,
    fallback: number = 0
): number => {
    if (value === undefined || !isValidValue(value)) {
        return fallback;
    }
    return value;
};

// === Chart Data Sanitization ===

/**
 * Calculate 7-day rolling average from valid data points
 * Looks backward first, then forward if no historical data available
 */
const calculate7DayAverage = (
    data: BalancerChartDataItem[],
    currentIndex: number
): number => {
    const windowSize = 7;
    let sum = 0;
    let count = 0;

    // Look back up to 7 valid data points
    for (let i = currentIndex - 1; i >= 0 && count < windowSize; i--) {
        if (isValidValue(data[i].value)) {
            sum += data[i].value;
            count++;
        }
    }

    // If no valid historical data, look forward
    if (count === 0) {
        for (let i = currentIndex + 1; i < data.length && count < windowSize; i++) {
            if (isValidValue(data[i].value)) {
                sum += data[i].value;
                count++;
            }
        }
    }

    return count > 0 ? sum / count : 0;
};

/**
 * Sanitize chart data array by replacing invalid values with 7-day rolling average
 */
export const sanitizeChartData = (
    data: BalancerChartDataItem[]
): BalancerChartDataItem[] => {
    if (!data || data.length === 0) return data;

    return data.map((item, index) => {
        if (isValidValue(item.value)) {
            return item;
        }
        // Replace corrupted value with 7-day rolling average
        const avg = calculate7DayAverage(data, index);
        return { ...item, value: avg };
    });
};

// === Pool/Token Data Sanitization ===

/**
 * Sanitize pool-level metrics object
 * Used for individual pool data sanitization
 */
export const sanitizePoolMetrics = <T extends {
    tvl?: number;
    volume?: number;
    fees?: number;
    feesEpoch?: number;
    protcolFeesEpoch?: number;
    swapCount?: number;
}>(metrics: T, fallbacks?: Partial<T>): T => {
    return {
        ...metrics,
        tvl: sanitizeScalarValue(metrics.tvl, fallbacks?.tvl ?? 0),
        volume: sanitizeScalarValue(metrics.volume, fallbacks?.volume ?? 0),
        fees: sanitizeScalarValue(metrics.fees, fallbacks?.fees ?? 0),
        feesEpoch: sanitizeScalarValue(metrics.feesEpoch, fallbacks?.feesEpoch ?? 0),
        protcolFeesEpoch: sanitizeScalarValue(metrics.protcolFeesEpoch, fallbacks?.protcolFeesEpoch ?? 0),
        swapCount: sanitizeScalarValue(metrics.swapCount, fallbacks?.swapCount ?? 0),
    };
};

/**
 * Sanitize fee snapshot data fields
 */
export const sanitizeFeeSnapshotFields = (data: {
    swapFees: number;
    totalSwapFee: number;
    totalProtocolFee: number;
    totalProtocolFeePaidInBPT: number;
    swapVolume: number;
    liquidity: number;
    protocolFee: number;
}): typeof data => {
    return {
        swapFees: sanitizeScalarValue(data.swapFees, 0),
        totalSwapFee: sanitizeScalarValue(data.totalSwapFee, 0),
        totalProtocolFee: sanitizeScalarValue(data.totalProtocolFee, 0),
        totalProtocolFeePaidInBPT: sanitizeScalarValue(data.totalProtocolFeePaidInBPT, 0),
        swapVolume: sanitizeScalarValue(data.swapVolume, 0),
        liquidity: sanitizeScalarValue(data.liquidity, 0),
        protocolFee: sanitizeScalarValue(data.protocolFee, 0),
    };
};
