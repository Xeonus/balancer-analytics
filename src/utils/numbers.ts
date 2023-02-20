import numbro from 'numbro';

// using a currency library here in case we want to add more in future
export const formatDollarAmount = (num: number | undefined, digits = 2, round = true) => {
    if (num === 0) return '$0.00';
    if (!num) return '-';
    if (num < 0.001 && digits <= 3 && num > 0) {
        return '<$0.001';
    }
    if (num > 100000000000) {
        return '-'
    }

    return numbro(num).formatCurrency({
        average: round,
        mantissa: num > 1000 ? 2 : digits,
        abbreviations: {
            million: 'M',
            billion: 'B',
        },
    });
};

// using a currency library here in case we want to add more in future
export const formatAmount = (num: number | undefined, digits = 2) => {
    if (num === 0) return '0';
    if (!num) return '-';
    if (num < 0.001) {
        return '<0.001';
    }
    if (num > 1000000000) {
        return '-'
    }

    return numbro(num).format({
        average: true,
        mantissa: num > 1000 ? 2 : digits,
        abbreviations: {
            million: 'M',
            billion: 'B',
        },
    });
};

export const formatNumber = (num: number | undefined, digits = 2) => {
    if (num === 0) return '0';
    if (!num) return '-';
    if (num < 0.001) {
        return '<0.001';
    }
    if (num > 1000000000) {
        return '-'
    }

    return numbro(num).format({
        thousandSeparated: true,
        mantissa: digits,
    });
};

// Format percentage ranges
export const formatPercentageAmount = (num: number | undefined) => {
    if (num === 0) return '0';
    if (!num) return '-';
    if (num > 1000000000) {
        return '-'
    }

    return numbro(num).format({
            mantissa: num < 0.01 ? 3 : 2
        })
}
