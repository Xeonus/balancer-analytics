import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { BalancerChartDataItem } from '../../../data/balancer/balancerTypes';
import { formatDollarAmount, formatNumber } from '../../../utils/numbers';
import { pink, blue } from '@mui/material/colors';

export interface MultiBarChartProps {
    data1: BalancerChartDataItem[],
    data2: BalancerChartDataItem[],
    dataTitle1: string,
    dataTitle2: string,
    height: string,
    unit?: string
}

export default function IncomeVsSpendingMultiBarChart({ data1, data2, dataTitle1, dataTitle2, height,  unit}: MultiBarChartProps) {

    const theme = useTheme();
    let xData1 = data1.map(el => el.time);
    let xData2 = data2.map(el => el.time);
    const xData = xData1.length > xData2.length ? xData1 : xData2
    //console.log("xData", xData)

    let yData1 = xData.map(time => {
        let match = data1.find(e => e.time === time);
        return match ? match : {time: time, value: 0};
      }).map(el => el.value);

    let yData2 = xData.map(time => {
        let match = data2.find(e => e.time === time);
        return match ? match : {time: time, value: 0};
      }).map(el => - el.value);


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
                        return unit? formatNumber(d) + ' ' + unit : formatDollarAmount(d);
                    }
                },
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        legend: {
            data: [dataTitle1, dataTitle2],
            inactiveColor: "red",
            textStyle: {
                color: theme.palette.mode === 'dark' ? 'white' : 'black'
            },
          },
        series: [
            {
                name: dataTitle1,
                data: yData1,
                type: 'bar',
                itemStyle: {
                    color: theme.palette.secondary.main
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return unit? formatNumber(value) + ' ' + unit : formatDollarAmount(value);
                    }
                },
            },
            {
                name: dataTitle2,
                data: yData2,
                type: 'bar',
                itemStyle: {
                    color: theme.palette.mode === 'dark' ? blue[900] : blue["A700"]
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return unit? formatNumber(value) + ' ' + unit : formatDollarAmount(value);
                    }
                },
            },
        ]
    };

    return (
        data1.length > 1 ?
            <ReactEcharts
                option={option}
                style={{ height: height, width: '100%' }}
                className={'react_for_echarts'}
                theme={"shine"}
            /> : <CircularProgress />
    );
}