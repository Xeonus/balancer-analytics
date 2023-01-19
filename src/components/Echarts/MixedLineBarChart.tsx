import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { BalancerChartDataItem } from '../../data/balancer/balancerTypes';
import { formatDollarAmount } from '../../utils/numbers';
import { pink, blue } from '@mui/material/colors';

export interface GenericBarChartProps {
    barChartData: BalancerChartDataItem[],
    barChartName: string,
    lineChartData: BalancerChartDataItem[],
    lineChartName: string,
    rotateAxis?: boolean
}

export default function MixedLineBarChart({ barChartData, barChartName, lineChartData, lineChartName, rotateAxis = false}: GenericBarChartProps) {

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
            data: [barChartName, lineChartName]
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
                interval: 0, 
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
                    }
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
                type: 'bar',
                itemStyle: {
                    color: theme.palette.secondary.main
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
                data: yDataLine,
                type: 'line',
                itemStyle: {
                    color: theme.palette.primary.main
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