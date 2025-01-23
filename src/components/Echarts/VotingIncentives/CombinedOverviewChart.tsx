import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import { formatDollarAmount } from "../../../utils/numbers";

export interface BribesProps {
    dollarPerVlAssetData: number[],
    totalAmountDollarsData: number[],
    xAxisData: string[],
    height: string,
    isCombinedData?: boolean,
    paladinIncentivesData?: number[], // Optional Paladin specific data
}

interface TooltipParam {
    name: string;
    value: number;
    seriesName: string;
}

export default function CombinedOverviewChart({
                                                   dollarPerVlAssetData,
                                                   totalAmountDollarsData,
                                                   xAxisData,
                                                   height,
                                                   isCombinedData = false,
                                                   paladinIncentivesData
                                               }: BribesProps) {
    const theme = useTheme()

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                }
            },
            formatter: function (params: TooltipParam[]) {
                let res = params[0].name;
                params.forEach(param => {
                    if (param.seriesName === '$/veBAL') {
                        res += `<br/>${param.seriesName}: ${formatDollarAmount(param.value, 3)}`
                    } else if (param.seriesName === 'Hidden Hand Incentives') {
                        res += `<br/>${param.seriesName}: ${formatDollarAmount(param.value)}`
                    } else if (param.seriesName === 'Paladin Incentives') {
                        res += `<br/>${param.seriesName}: ${formatDollarAmount(param.value)}`
                    } else if (param.seriesName === 'Total Incentives') {
                        res += `<br/>${param.seriesName}: ${formatDollarAmount(param.value)}`
                    }
                })
                return res;
            }
        },
        legend: {
            data: isCombinedData ?
                ['$/veBAL', 'Hidden Hand Incentives', 'Paladin Incentives', 'Total Incentives'] :
                ['$/veBAL', 'Voting Incentives'],
            textStyle: {
                color: theme.palette.secondary
            }
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '$/veBAL',
                min: 0,
                max: Math.max(...dollarPerVlAssetData),
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: 'rgb(255, 204, 0)'
                    }
                },
                axisLabel: {
                    formatter: function (value: number) {
                        return formatDollarAmount(value);
                    },
                },
            },
            {
                type: 'value',
                name: isCombinedData ? 'Total Incentives' : 'Voting Incentives',
                min: 0,
                max: Math.max(...totalAmountDollarsData),
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: '#FFFFFF'
                    }
                },
                axisLabel: {
                    formatter: function (value: number) {
                        return formatDollarAmount(value);
                    },
                    color: '#FFFFFF'
                },
                splitLine: {
                    show: false
                }
            },
        ],
        series: isCombinedData ? [
            {
                name: '$/veBAL',
                type: 'line',
                itemStyle: {
                    color: 'rgb(255, 204, 0)'
                },
                data: dollarPerVlAssetData,
                yAxisIndex: 0,
            },
            {
                name: 'Hidden Hand Incentives',
                type: 'bar',
                stack: 'total',
                data: totalAmountDollarsData,
                yAxisIndex: 1,
                itemStyle: {
                    color: 'rgb(32, 129, 240)'
                },
            },
            {
                name: 'Paladin Incentives',
                type: 'bar',
                stack: 'total',
                data: paladinIncentivesData || new Array(totalAmountDollarsData.length).fill(0),
                yAxisIndex: 1,
                itemStyle: {
                    color: 'rgb(75, 192, 192)'
                },
            },
            {
                name: 'Total Incentives',
                type: 'line',
                data: totalAmountDollarsData.map((v, i) => v + (paladinIncentivesData?.[i] || 0)),
                yAxisIndex: 1,
                lineStyle: {
                    type: 'dashed',
                    color: '#FFFFFF'
                },
                symbol: 'none'
            }
        ] : [
            {
                name: '$/veBAL',
                type: 'line',
                itemStyle: {
                    color: 'rgb(255, 204, 0)'
                },
                data: dollarPerVlAssetData,
                yAxisIndex: 0,
            },
            {
                name: 'Voting Incentives',
                type: 'bar',
                data: totalAmountDollarsData,
                yAxisIndex: 1,
                itemStyle: {
                    color: 'rgb(32, 129, 240)'
                },
            }
        ]
    };

    return (
        <ReactEcharts
            option={option}
            style={{ height: height, width: '100%' }}
            className="graph"
        />
    );
}
