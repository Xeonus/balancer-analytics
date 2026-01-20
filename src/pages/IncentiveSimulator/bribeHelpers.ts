export function calculateAPR(bribeValue: number, poolTotalValue: number, emissionPerVote: number, incentivePerVote: number) {
    let APR = 0.0;

    if (Number(bribeValue) && Number(incentivePerVote)) {
        // Divide by 4: /2 for bi-weekly voting periods, /2 for veBAL emission distribution
        const weeklyEmissions = emissionPerVote * bribeValue / incentivePerVote / 4;
        // 52 weeks per year for weekly emissions
        APR = weeklyEmissions / poolTotalValue * 52 * 100;
    }

    return Number(APR).toFixed(2);
}

export function calculateBribeValue(targetAPR: number, poolTotalValue: number, emissionPerVote: number, incentivePerVote: number) {
    let bribeValue = 0.0;

    if (Number(targetAPR) && Number(emissionPerVote)) {
        // Multiply by 4: inverse of calculateAPR division
        // 52 weeks per year for weekly emissions
        bribeValue = (targetAPR / (52 * 100) * poolTotalValue * incentivePerVote) / emissionPerVote * 4;
    }

    return Number(bribeValue).toFixed(2);
}
