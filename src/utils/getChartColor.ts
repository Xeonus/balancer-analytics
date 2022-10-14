import { ALTERNATIVE_COLORS, TOKEN_COLORS, CHAIN_COLORS, INCOME_SOURCE_COLORS } from "constants/tokenColorList";


export default function getChartColor(tokenName: string, index: number) {
    //First try to find the color of the token. If that one is not in the static list, choose a random alternative color
    const randomIndex = Math.floor(Math.random() * (5 - 0 + 1) + 0)
    const tokenColorEntry = TOKEN_COLORS.find((el) => el.shortName == tokenName);
    const chainColorEntry = CHAIN_COLORS.find((el) => el.name == tokenName);
    const incomeColorEntry = INCOME_SOURCE_COLORS.find((el) => el.name == tokenName);
    if (tokenColorEntry) {
        return tokenColorEntry.color;
    } else if (chainColorEntry) {
        return chainColorEntry.color;
    } else if (incomeColorEntry) {
        return incomeColorEntry.color;
    } else {
        return ALTERNATIVE_COLORS[index];
    }
}