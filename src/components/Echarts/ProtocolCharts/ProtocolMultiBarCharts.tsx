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
    polygonZkEVMData: number [],
    avalancheData: number[],
    gnosisData: number[],
    baseData: number[],
    modeData: number[],
    fraxtalData: number[],
    xAxis: string[],
    isUSD: boolean,
}



export default function ProtocolMultiBarCharts({mainnetData, arbitrumData, polygonData, polygonZkEVMData, gnosisData,
                                                   avalancheData, baseData, modeData, fraxtalData, xAxis, isUSD}: ProtocolBarChartProps) {

    const theme = useTheme();

    const option = {
        color: [
            '#0047AB',
            '#66CCCC',
            '#8B00FF',
            '#3a0f5d',
            '#0d8e74',
            '#F01B36',
            '#0021a2',
            '#b7ff00',
            '#8a8a8a'],
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
            data: ['Mainnet', 'Arbitrum', 'Polygon', 'Polygon zkEVM', 'Gnosis', 'Avalanche', 'Base', 'Mode', 'Fraxtal'],
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
                    color: 'rgb(0,71,171)'

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
                    color: 'rgb(102,204,204)'

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
                    color: 'rgb(139,0,255)'
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
                name: 'Polygon zkEVM',
                type: 'bar',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                itemStyle: {
                    opacity: 0.95,
                    color: 'rgb(58,15,93)'
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return isUSD ? formatDollarAmount(value) : formatNumber(value);
                    }
                },
                data: polygonZkEVMData
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
                    color: 'rgb(13,142,116)'
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
            {
                name: 'Avalanche',
                type: 'bar',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                itemStyle: {
                    opacity: 0.95,
                    color: 'rgb(240, 27, 57)'
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return isUSD ? formatDollarAmount(value) : formatNumber(value);
                    }
                },
                data: avalancheData
            },
            {
                name: 'Base',
                type: 'bar',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                itemStyle: {
                    opacity: 0.95,
                    color: 'rgb(0,25,178)'
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return isUSD ? formatDollarAmount(value) : formatNumber(value);
                    }
                },
                data: baseData
            },
            {
                name: 'Mode',
                type: 'bar',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                itemStyle: {
                    opacity: 0.95,
                    color: 'rgb(183,255,0)'
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return isUSD ? formatDollarAmount(value) : formatNumber(value);
                    }
                },
                data: modeData
            },
            {
                name: 'Fraxtal',
                type: 'bar',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                itemStyle: {
                    opacity: 0.95,
                    color: 'rgb(138,138,138)'
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return isUSD ? formatDollarAmount(value) : formatNumber(value);
                    }
                },
                data: fraxtalData
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
