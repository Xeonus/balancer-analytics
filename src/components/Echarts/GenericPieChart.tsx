import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import { BalancerPieChartDataItem } from '../../data/balancer/balancerTypes';
import { formatDollarAmount, formatNumber } from '../../utils/numbers';

export interface GenericPieChartProps {
    data: BalancerPieChartDataItem[],
    height: string,
    isNotUSD?: boolean,
}

export interface ToolTipParams {
    name: string;
    data: BalancerPieChartDataItem;
}

export default function GenericPieChart({ data, height, isNotUSD = false }: GenericPieChartProps) {

    const theme = useTheme()

    data = data.filter(el => el.value > 0)
    let dataNames = data.map(a => a.name);

    //Chart options
    const option = {

        // Hover Tooltip
        // {a} = series:[{name:}]
        // {b} = series:[{data: [{name:}]}]
        // {c} = series:[{data: [{value:}]
        //formatter: "{a}<br/><strong>{b}</strong>: ${c}"
        tooltip: {
            trigger: "item",
            formatter: function (params: ToolTipParams) {
                return `
                 
                ${ isNotUSD ? formatNumber(params.data.value) : formatDollarAmount(params.data.value)} <br />`
            }
        },
        calculable: true,
        series: [
            {
                name: 'Total asset fraction',
                type: 'pie',
                data: data,
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                label: {
                    show: true,
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    formatter: '{b} ({d}%)',
                    fontSize: 10,
                    
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: '{b} ({d}%)',
                        fontSize: 12,
                        fontWeight: 'bold',
                        
                    }
                },
                labelLine: {
                    show: true
                },
            }],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
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