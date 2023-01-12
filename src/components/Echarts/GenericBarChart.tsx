import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { BalancerChartDataItem } from '../../data/balancer/balancerTypes';
import { formatDollarAmount } from '../../utils/numbers';
import { pink } from '@mui/material/colors';

export interface GenericBarChartProps {
    data: BalancerChartDataItem[],
}

export default function GenericBarChart({ data }: GenericBarChartProps) {

    const theme = useTheme();
    let xData = data.map(el => el.time);
    let yData = data.map(el => el.value);

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xData
        },
        yAxis: [
            {
                type: 'value',
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
                data: yData,
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
        ]
    };

    return (
        data.length > 1 ?
            <ReactEcharts
                option={option}
                style={{ height: '350px', width: '100%' }}
                className={'react_for_echarts'}
            /> : <CircularProgress />
    );
}