import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { graphic } from 'echarts'
import { useBalancerChainProtocolData } from '../../data/balancer/useAggregatedProtocolData';
import { ArbitrumNetworkInfo, EthereumNetworkInfo, PolygonNetworkInfo } from '../../constants/networks';
import { arbitrumClient, arbitrumBlockClient, polygonClient, polygonBlockClient } from '../../apollo/client';
import { formatDollarAmount } from '../../utils/numbers';
import { CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles'

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



export default function EchartsArea() {

    const theme = useTheme();

    const protocolData = useBalancerChainProtocolData(EthereumNetworkInfo.clientUri, EthereumNetworkInfo.startTimeStamp);
    const arbitrumProtocolData = useBalancerChainProtocolData(ArbitrumNetworkInfo.clientUri, ArbitrumNetworkInfo.startTimeStamp, arbitrumBlockClient, arbitrumClient);
    const polygonProtocolData = useBalancerChainProtocolData(PolygonNetworkInfo.clientUri, PolygonNetworkInfo.startTimeStamp, polygonBlockClient, polygonClient);

    const mainnetData = protocolData.tvlData.map(el => Number(el.value.toFixed(2)));
    let arbitrumData = arbitrumProtocolData.tvlData.map(el => Number(el.value.toFixed(2)));
    //add proceeding zero values based on mainnet size
    if (mainnetData && arbitrumData) {
        const diffSize = mainnetData.length - arbitrumData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        arbitrumData = zeroArray.concat(arbitrumData);
    }


    let polygonData = polygonProtocolData.tvlData.map(el => Number(el.value.toFixed(2)));

    if (mainnetData && polygonData) {
        const diffSize = mainnetData.length - polygonData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        polygonData = zeroArray.concat(polygonData);
    }


    const mainnetxAxisData = protocolData.tvlData.map(el => el.time);

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
            textStlye: {
                color: theme.palette.mode === 'dark' ? '#00DDFF' : 'black',
            }
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
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(0, 221, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(77, 119, 255)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: mainnetData
            },
            {
                name: 'Arbitrum',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: arbitrumData
            },
            {
                name: 'Polygon',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(55, 162, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(116, 21, 219)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: polygonData
            },
        ]
    };

    return (
        polygonData.length > 10 ?
            <ReactEcharts
                option={option}
                style={{ height: '300px', width: '100%' }}
                className={'react_for_echarts'}
            /> : <CircularProgress />
    )
}