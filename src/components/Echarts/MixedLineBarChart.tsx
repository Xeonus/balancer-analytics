import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { BalancerChartDataItem } from '../../data/balancer/balancerTypes';
import { formatDollarAmount } from '../../utils/numbers';
import { pink, blue } from '@mui/material/colors';
import {RAINBOW_COLORS} from "../../constants";

export interface GenericBarChartProps {
    barChartData: BalancerChartDataItem[],
    barChartName: string,
    lineChartData: BalancerChartDataItem[],
    lineChartName: string,
    rotateAxis?: boolean
    noRainbowColors?: boolean
}

export default function MixedLineBarChart({ barChartData, barChartName, lineChartData, lineChartName, rotateAxis = false, noRainbowColors=false}: GenericBarChartProps) {

    const theme = useTheme();
    let xData = barChartData.map(el => el.time);
    let yDataBar = barChartData.map(el => el.value);
    let yDataLine = lineChartData.map(el => el.value);

    let maxEntry = lineChartData.reduce(function(prev, current) {
        return (prev.value > current.value) ? prev : current})
    const lineMax = maxEntry.value + maxEntry.value * 1.25

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        legend: {
            data: [barChartName, lineChartName],
            textStyle: {
                color: theme.palette.secondary
            }
          },
        grid: {
            left: '10%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xData,
            axisLabel: { 
                interval: 'auto',
                rotate: rotateAxis ? 30 : 0,
                fontSize: 10 
            }
        },
        yAxis: [
            {
                type: 'value',
                name: barChartName,
                axisLabel: {
                    formatter: function (d: number) {
                        return formatDollarAmount(d);
                    }
                }
            },
            {
                type: 'value',
                position: 'right',
                alignTicks: true,
                min: 0,
                max: lineMax,
                name: lineChartName,
                axisLabel: {
                    formatter: function (d: number) {
                        return formatDollarAmount(d);
                    },
                }
            }
        ],
        series: [
            {
                emphasis: {
                    itemStyle: {
                        color: pink[500]
                    }
                },
                data: yDataBar,
                name: barChartName,
                type: 'bar',
                itemStyle: {
                    color: noRainbowColors ? theme.palette.secondary : function (params: any) {
                        // Use the rainbowColors array to set colors based on the index
                        const colorIndex = params.dataIndex % RAINBOW_COLORS.length;
                        return RAINBOW_COLORS[colorIndex];
                    },
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
                    }
                },
            },
            {
                emphasis: {
                    itemStyle: {
                        color: blue[500]
                    }
                },
                yAxisIndex: 1,
                name: lineChartName,
                data: yDataLine,
                type: 'line',
                smooth: true,
                itemStyle: {
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    borderWidth: 2,
                },
                symbol: 'circle',
                symbolSize: 3,
                showSymbol: true,
                areaStyle: {
                    normal: {
                        color: theme.palette.primary.main,
                        opacity: 0.1
                    }
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
                    }
                },
            },
        ],
       
    };

    return (
        yDataBar.length > 1 ?
            <ReactEcharts
                option={option}
                style={{ height: '350px', width: '100%' }}
                className={'react_for_echarts'}
            /> : <CircularProgress />
    );
}