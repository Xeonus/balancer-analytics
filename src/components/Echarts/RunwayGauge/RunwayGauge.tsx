import ReactEcharts from 'echarts-for-react';
import { CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles'

export interface RunwayGaugeProps {
    runwayInMonths: number,
    dataTitle: string,
    height?: string,

}


export default function RunwayGauge({ runwayInMonths, dataTitle, height = '400px' }: RunwayGaugeProps) {

    const theme = useTheme()


    const option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '90%',
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#FF6E76'],
                            [0.5, '#FDDD60'],
                            [0.75, '#58D9F9'],
                            [1, '#7CFFB2']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 20,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: 'inherit'
                    }
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'inherit',
                        width: 1
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: theme.palette.mode === 'dark' ? 'white' : 'black',
                        width: 3
                    }
                },
                axisLabel: {
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    fontSize: 15,
                    distance: -50,
                    rotate: 'tangential',
                    formatter: function (value: number) {
                        if (value === 0.875) {
                            return '>18 Months';
                        } else if (value === 0.625) {
                            return '>12 Months';
                        } else if (value === 0.375) {
                            return '>6 Months';
                        } else if (value === 0.125) {
                            return '<6 Months';
                        }
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '-10%'],
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    fontSize: 18
                },
                detail: {
                    fontSize: 18,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value: number) {
                        return Math.round(value * 24) + ' months';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        value: runwayInMonths / 24,
                        name: dataTitle
                    }
                ]
            }
        ]
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