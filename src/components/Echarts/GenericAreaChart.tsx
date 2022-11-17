import ReactEcharts from 'echarts-for-react';
import { graphic } from 'echarts';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { BalancerChartDataItem} from '../../data/balancer/balancerTypes';
import { formatDollarAmount } from '../../utils/numbers';

export interface TvlAreaProps {
    chartData: BalancerChartDataItem[],
    dataTitle: string,
    backgroundColor?: string,
    height?: string,

}


export default function GenericAreaChart({chartData, dataTitle, backgroundColor = '#6a7985', height = '278px'}: TvlAreaProps) {
    const theme = useTheme();

    let xData = chartData.map(el => el.time);
    let yData = chartData.map(el => el.value);

    const option = {
        color: ['#00DDFF'],
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
        xAxis: [
            {
                type: 'category',
                show: true,
                boundaryGap: false,
                data: xData
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: true,
                axisLabel: {
                    formatter: function(d: number) {
                        return formatDollarAmount(d);
                    }
                }
            }
        ],
        series: [
            {
                name: dataTitle,
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.95,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(77, 119, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(0, 221, 255)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series',
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
                    }
                },
                data: yData
            },
        ]
    };

    return(
        chartData.length > 2 ?
            <ReactEcharts
                option={option}
                style={{ height: height, width: '100%' }}
                className={'react_for_echarts'}
            /> : <CircularProgress />
    );
}