import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import { BalancerPieChartDataItem } from '../../data/balancer/balancerTypes';
import { formatDollarAmount } from '../../utils/numbers';

export interface GenericPieChartWithVerticalLegendProps {
    data: BalancerPieChartDataItem[],
    height: string
}

export interface ToolTipParams {
    name: string;
    data: BalancerPieChartDataItem;
}

export default function GenericPieChartWithVerticalLegend({ data, height }: GenericPieChartWithVerticalLegendProps) {

    const theme = useTheme()
    let dataNames = data.map(a => a.name);
    const sum = data.reduce((el, a) => a.value + el, 0);

    //Chart options
    const option = {
        tooltip: {
            trigger: "item",
            formatter: function (params: ToolTipParams) {
                return `
                 
                ${formatDollarAmount(params.data.value)} <br />`
            }
        },
        legend: {
            orient: 'horizontal',
            type: 'scroll',
            top: '80%',
            right: '10%',
            align: 'left',
            data: dataNames,
            show: true,
            textStyle: {
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
            },
            
            formatter: (name : string) => {
                  var value = data.filter(row => row.name === name)[0].value;
                  return name + ': \t ' + formatDollarAmount(value);
            },
        },

        calculable: true,
        series: [
            {
                name: 'Total asset fraction',
                type: 'pie',
                data: data,
                //center: ['40%', '50%'],
                center: ['50%', '35%'],
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                label: {
                    position: 'center',
                    show: true,
                    textStyle: {
                        color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    },
                    fontSize: 16,
                    fontWeight: 'bold',
                    formatter: (value: string) => {
                        return formatDollarAmount(sum)
                    }
                    
                },
                emphasis: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
            }],
       grid: {
        containLabel: true,
       },


    };

    return (
        <ReactEcharts
            option={option}
            style={{ height: height, width: '100%' }}
            className="pie-chart"
        />
    );
}