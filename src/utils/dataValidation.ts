import { BalancerChartDataItem } from '../data/balancer/balancerTypes';

// === Constants ===
// Hack #1 occurred on November 3rd, 2025
export const HACK_TIMESTAMP_1 = 1730592000; // Nov 3, 2025 00:00:00 UTC
// Hack #2 (internal) occurred on November 30th, 2025
export const HACK_TIMESTAMP_2 = 1732924800; // Nov 30, 2025 00:00:00 UTC

// Metric-specific thresholds - values above these are considered corrupted
export const MAX_VALID_TVL = 3_000_000_000; // $3B
export const MAX_VALID_VOLUME = 3_000_000_000; // $3B
export const MAX_VALID_FEES = 1_000_000; // $1M per day
export const MAX_VALID_PROTOCOL_FEES = 1_000_000; // $1M per day
export const MAX_VALID_SWAPS = 100_000; // 100k swaps per day

// Default fallback threshold
export const MAX_VALID_VALUE = 3_000_000_000; // $3B

// Metric types for type-safe threshold selection
export type MetricType = 'tvl' | 'volume' | 'fees' | 'protocolFees' | 'swaps' | 'default';

// Get threshold for specific metric type
export const getThresholdForMetric = (metricType: MetricType): number => {
    switch (metricType) {
        case 'tvl':
            return MAX_VALID_TVL;
        case 'volume':
            return MAX_VALID_VOLUME;
        case 'fees':
            return MAX_VALID_FEES;
        case 'protocolFees':
            return MAX_VALID_PROTOCOL_FEES;
        case 'swaps':
            return MAX_VALID_SWAPS;
        default:
            return MAX_VALID_VALUE;
    }
};

// === Validation Functions ===

/**
 * Check if a numeric value is within valid bounds (not corrupted by hack)
 * @param value - The value to check
 * @param metricType - Optional metric type for metric-specific threshold
 */
export const isValidValue = (value: number, metricType: MetricType = 'default'): boolean => {
    const threshold = getThresholdForMetric(metricType);
    return !isNaN(value) && isFinite(value) && value >= 0 && value < threshold;
};

// === Scalar Value Sanitization ===

/**
 * Sanitize a single numeric value, returning fallback if invalid
 * @param value - The value to sanitize
 * @param fallback - Fallback value if invalid (default: 0)
 * @param metricType - Optional metric type for metric-specific threshold
 */
export const sanitizeScalarValue = (
    value: number | undefined,
    fallback: number = 0,
    metricType: MetricType = 'default'
): number => {
    if (value === undefined || !isValidValue(value, metricType)) {
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
    currentIndex: number,
    metricType: MetricType = 'default'
): number => {
    const windowSize = 7;
    let sum = 0;
    let count = 0;

    // Look back up to 7 valid data points
    for (let i = currentIndex - 1; i >= 0 && count < windowSize; i--) {
        if (isValidValue(data[i].value, metricType)) {
            sum += data[i].value;
            count++;
        }
    }

    // If no valid historical data, look forward
    if (count === 0) {
        for (let i = currentIndex + 1; i < data.length && count < windowSize; i++) {
            if (isValidValue(data[i].value, metricType)) {
                sum += data[i].value;
                count++;
            }
        }
    }

    return count > 0 ? sum / count : 0;
};

/**
 * Sanitize chart data array by replacing invalid values with 7-day rolling average
 * @param data - Chart data array to sanitize
 * @param metricType - Optional metric type for metric-specific threshold
 */
export const sanitizeChartData = (
    data: BalancerChartDataItem[],
    metricType: MetricType = 'default'
): BalancerChartDataItem[] => {
    if (!data || data.length === 0) return data;

    return data.map((item, index) => {
        if (isValidValue(item.value, metricType)) {
            return item;
        }
        // Replace corrupted value with 7-day rolling average
        const avg = calculate7DayAverage(data, index, metricType);
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
