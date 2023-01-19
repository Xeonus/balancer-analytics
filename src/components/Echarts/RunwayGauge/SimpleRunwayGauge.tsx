import ReactEcharts from 'echarts-for-react';
import { CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles'

export interface RunwayGaugeProps {
    runwayInMonths: number,
    dataTitle: string,
    height?: string,

}


export default function SimpleRunwayGauge({ runwayInMonths, dataTitle, height = '400px' }: RunwayGaugeProps) {

    const theme = useTheme()

    function hexToRGB(hex: string, alpha: string) {

        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
      
        if (alpha) {
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return `rgb(${r}, ${g}, ${b})`;
      }

    let gaugeColor = '#757575'
    if (runwayInMonths < 6) {
        gaugeColor = '#FF6E76'
    } else if (runwayInMonths <= 12) {
        gaugeColor = '#FDDD60'
    } else if (runwayInMonths <= 18) {
        gaugeColor = '#58D9F9'
    } else {
        gaugeColor = '#7CFFB2'
    }

    const option = {
        series: [
          {
            type: 'gauge',
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 24,
            splitNumber: 4,
            itemStyle: {
              color: gaugeColor,
              shadowColor: hexToRGB(gaugeColor, '0.45'),
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18,
            },
            pointer: {
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
              length: '75%',
              width: 10,
              offsetCenter: [0, '5%']
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 18,
              },
              color: '#757575'
            },
            
            axisTick: {
              splitNumber: 2,
              lineStyle: {
                width: 2,
                color: '#757575'
              }
            },
            splitLine: {
              length: 12,
              lineStyle: {
                width: 3,
                color: '#757575'
              }
            },
            axisLabel: {
              distance: 30,
              color: '#757575',
              fontSize: 20
            },
            title: {
                offsetCenter: [0, '40%'],
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
                fontSize: 18,
                show: false
            },
            detail: {
                fontSize: 18,
                offsetCenter: [0, '40%'],
                valueAnimation: true,
                formatter: function (value: number) {
                    return Math.round(value) + ' months';
                },
                color: 'inherit'
            },
            data: [
                {
                    value: runwayInMonths,
                    name: dataTitle
                }
            ]
          }
        ],
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }
      };



    return (
        runwayInMonths ?
            <ReactEcharts
                option={option}
                style={{ height: height, width: '100%' }}
                className={'react_for_echarts'}
            /> : <CircularProgress />
    );
}