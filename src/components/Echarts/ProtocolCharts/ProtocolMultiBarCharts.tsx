import ReactEcharts from 'echarts-for-react';
import { formatDollarAmount, formatNumber } from '../../../utils/numbers';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import CustomLinearProgress from '../../Progress/CustomLinearProgress';

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

interface ProtocolBarChartProps {
    mainnetData: number[],
    arbitrumData: number[],
    polygonData: number[],
    gnosisData: number[],
    xAxis: string[],
    isUSD: boolean,
}



export default function ProtocolMultiBarCharts({mainnetData, arbitrumData, polygonData, gnosisData, xAxis, isUSD}: ProtocolBarChartProps) {

    const theme = useTheme();

    const option = {
        color: ['#00DDFF','#80FFA5', '#37A2FF', '#0d8e74'],
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
            data: ['Mainnet', 'Arbitrum', 'Polygon', 'Gnosis'],
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
                        return isUSD ? formatDollarAmount(d) : formatNumber(d);
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
                        return isUSD ? formatDollarAmount(value) : formatNumber(value);
                    }
                },
                data: mainnetData
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
                        return isUSD ? formatDollarAmount(value) : formatNumber(value);
                    }
                },
                data: arbitrumData
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
                        return isUSD ? formatDollarAmount(value) : formatNumber(value);
                    }
                },
                data: polygonData
            },
            {
                name: 'Gnosis',
                type: 'bar',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                itemStyle: {
                    opacity: 0.95,
                    color: 'rgb(13, 142, 116)'
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return isUSD ? formatDollarAmount(value) : formatNumber(value);
                    }
                },
                data: gnosisData
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
        mainnetData.length > 1 && arbitrumData.length > 1 && polygonData.length > 1 && xAxis ?
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