import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from "@mui/material/styles";
import {formatDollarAmount, formatNumber} from "../../../utils/numbers";

// Interfaces to properly type the data and props
export interface RoundChainFees {
    date: string;
    chains: {
        [key: string]: number;
    };
}

export interface ChainFeesChartProps {
    sortedRounds: RoundChainFees[];
}

// Custom type for transformed data that includes dynamic keys for each chain
interface TransformedDataItem {
    date: string;
    [key: string]: number | string; // Allow dynamic keys with number values
}

// Function to map chain names to color codes
const getChainColor = (chain: string): string => {
    const chainColors: { [key: string]: string } = {
        mainnet: '#0047AB',
        arbitrum: '#66CCCC',
        polygon: '#8B00FF',
        zkevm: '#3a0f5d',
        gnosis: '#0d8e74',
        avalanche: '#F01B36',
        base: '#0021a2'
    };
    return chainColors[chain.toLowerCase()] || '#808080'; // Default gray if not defined
};

export function AggregateChainFeesPerRound({ sortedRounds }: ChainFeesChartProps) {
    const theme = useTheme();
    let height = '350px';

    const chains = ['MAINNET', 'ARBITRUM', 'POLYGON',  'ZKEVM', 'GNOSIS', 'AVALANCHE', 'BASE'];
    const transformedData: TransformedDataItem[] = sortedRounds.map(round => ({
        date: round.date,
        ...chains.reduce((obj, chain) => ({
            ...obj,
            [chain]: round.chains[chain.toLowerCase()] || 0 // Ensure zero if undefined
        }), {} as { [key: string]: number })
    }));

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                }
            },


        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: chains,
            textStyle: {
                color: theme.palette.mode === 'dark' ? 'white' : 'black'
            },
        },
        xAxis: {
            type: 'category',
            data: transformedData.map(item => item.date)
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: function(d: number) {
                        return formatDollarAmount(d);
                    }
                }
            }
        ],
        series: chains.map(chain => ({
            name: chain,
            type: 'bar',
            stack: 'total',
            data: transformedData.map(item => item[chain] as number), // Assert as number to satisfy TypeScript
            itemStyle: {
                color: getChainColor(chain)
            },
            tooltip: {
                valueFormatter: function (value: number) {
                    return formatDollarAmount(value);
                }
            },
        })),
    };

    return (
        <ReactEcharts
            option={option}
            style={{ height: height, width: '100%' }}
            className={'react_for_echarts'}
        />
    );
};
