import ReactEcharts from 'echarts-for-react';
import { graphic } from 'echarts';
import { CircularProgress } from '@mui/material';
import { BalancerChartDataItem} from '../../data/balancer/balancerTypes';
import { formatDollarAmount } from '../../utils/numbers';

export interface TvlAreaProps {
    tvlData: BalancerChartDataItem[],
}


export default function TvlAreaChart({tvlData}: TvlAreaProps) {

    let xData = tvlData.map(el => el.time);
    let yData = tvlData.map(el => el.value);

    const option = {
        color: ['#2c5364'],
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
                boundaryGap: false,
                data: xData
            }
        ],
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
        series: [
            {
                name: 'TVL',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 2,
                    color: new graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#737373' }, // Brighter color
                        { offset: 1, color: '#c5c5c5' }, // Darker color
                    ]),
                    shadowColor: 'rgba(194,194,194,0.5)',
                    shadowBlur: 10,
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.95,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(70,70,70)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(44,83,100)'
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
        tvlData.length > 1 ?
            <ReactEcharts
                option={option}
                style={{ height: '350px', width: '100%' }}
                className={'react_for_echarts'}
            /> : <CircularProgress />
    );
}