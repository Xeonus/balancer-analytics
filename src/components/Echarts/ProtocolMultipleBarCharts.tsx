import ReactEcharts from 'echarts-for-react';
import { graphic, registerTheme } from 'echarts'
import { ProtocolData } from '../../data/balancer/useProtocolDataWithClientOverride';
import { formatDollarAmount } from '../../utils/numbers';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import CustomLinearProgress from '../Progress/CustomLinearProgress';

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
    mainnetProtocolData: ProtocolData,
    arbitrumProtocolData: ProtocolData,
    polygonProtocolData: ProtocolData
}



export default function ProtocolMultipleBarCharts({mainnetProtocolData, arbitrumProtocolData, polygonProtocolData}: ProtocolBarChartProps) {

    const theme = useTheme();

    const mainnetData = mainnetProtocolData.feeData.map(el => Number(el.value.toFixed(2)));
    let arbitrumData = arbitrumProtocolData.feeData.map(el => Number(el.value.toFixed(2)));
    //add proceeding zero values based on mainnet size
    if (mainnetData && arbitrumData) {
        const diffSize = mainnetData.length - arbitrumData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        arbitrumData = zeroArray.concat(arbitrumData);
    }


    let polygonData = polygonProtocolData.feeData.map(el => Number(el.value.toFixed(2)));

    if (mainnetData && polygonData) {
        const diffSize = mainnetData.length - polygonData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        polygonData = zeroArray.concat(polygonData);
    }

    // register theme object
    registerTheme('my_theme', {
    
  });


    const mainnetxAxisData = mainnetProtocolData.feeData.map(el => el.time);

    const option = {
        color: ['#00DDFF','#80FFA5', '#37A2FF'],
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
            data: ['Mainnet', 'Arbitrum', 'Polygon'],
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
                data: mainnetxAxisData
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
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
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
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(1, 191, 236)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(128, 255, 165)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
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
                areaStyle: {
                    opacity: 0.95,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(116, 21, 219)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(55, 162, 255)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return formatDollarAmount(value)
                    }
                },
                data: polygonData
            },
        ]
    };

    return (
        polygonData.length > 10 ?
            <ReactEcharts
                option={option}
                theme='my_theme'
                style={{ height: '300px' }}
                className={'react_for_echarts'}
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