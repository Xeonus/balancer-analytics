import { ServiceProvidersConfig } from '../../../types';
import ReactEcharts from 'echarts-for-react';
import { formatDollarAmount } from '../../../utils/numbers';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import CustomLinearProgress from '../../Progress/CustomLinearProgress';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

export interface Normal {
    color: string;
}

export interface ItemStyle {
    normal: Normal;
}

export interface echartsData {
    name: number;
    type: string;
    itemStyle: ItemStyle;
}

export interface ToolTipParams {
  value: string;
  data: echartsData;
}

interface QuarterlySpendingsBarChartProps {
    spData: ServiceProvidersConfig,
}


export default function ProtocolMultiBarChart({spData}: QuarterlySpendingsBarChartProps) {

    const theme = useTheme();

    //Create an array of quarters from today - 6 months
    const currentDate = dayjs();
    const xAxis = [];
    const quarters = [];
    const years = [];
    for (let i = 0; i < 6; i++) {
    const quarter = Math.floor((currentDate.month() / 3)) + 1;
    xAxis.push(`Q${quarter} ${currentDate.year()}`);
    quarters.push(quarter);
    years.push(currentDate.year())
    currentDate.subtract(3, 'month');
    }



   const yAxis = quarters.map(quarter => {
    spData.service_provider.find(el => el.budgets)
    }
    )

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
        legend: {
            inactiveColor: "red",
            textStyle:{
                color: theme.palette.mode === 'dark' ? 'white' : 'black'
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
                data: xAxis
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
                name: 'Mainnet',
                type: 'bar',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.95,
                    color: 'rgb(0, 221, 255)'
                    
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
                    }
                },
                //data: mainnetData
            },
            {
                name: 'Arbitrum',
                type: 'bar',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.95,
                    color: 'rgb(128, 255, 165)'
                    
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
                    }
                },
                //data: arbitrumData
            },
            {
                name: 'Polygon',
                type: 'bar',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                itemStyle: {
                    opacity: 0.95,
                    color: 'rgb(155, 10, 255)'
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
                    }
                },
                //data: polygonData
            },
        ]
    };

    const onChartHover = (params: any) => {
        console.log('Chart mouse trigger params:', params);
      };
    
      const onEvents = {
        mousemove: onChartHover,
      };

    return (
        xAxis ?
            <ReactEcharts
                option={option}
                theme='my_theme'
                style={{ height: '350px' }}
                className={'react_for_echarts'}
                //onEvents={onEvents}
            /> : <Grid
            container
            spacing={2}
            mt='10%'
            mb='10%'
            sx={{ justifyContent: 'center' }}
        >
            <CustomLinearProgress />
        </Grid>
    )
}