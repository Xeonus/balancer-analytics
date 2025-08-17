export function calculateAPR(bribeValue: number, poolTotalValue: number, emissionPerVote: number, incentivePerVote: number) {
    let APR = 0.0;
    
    if (Number(bribeValue) && Number(incentivePerVote)) {
        const weeklyEmissions = emissionPerVote * bribeValue / incentivePerVote;
        // 52 weeks per year for weekly emissions
        APR = weeklyEmissions / poolTotalValue * 52 * 100;
    }

    return Number(APR).toFixed(2);
}

export function calculateBribeValue(targetAPR: number, poolTotalValue: number, emissionPerVote: number, incentivePerVote: number) {
    let bribeValue = 0.0;
    
    if (Number(targetAPR) && Number(emissionPerVote)) {
        // 52 weeks per year for weekly emissions
        bribeValue = (targetAPR / (52 * 100) * poolTotalValue * incentivePerVote) / emissionPerVote;
    }

    return Number(bribeValue).toFixed(2);
}