import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { BalancerChartDataItem } from '../../data/balancer/balancerTypes';
import { formatDollarAmount } from '../../utils/numbers';

export interface GenericPieChartProps {
    data: BalancerChartDataItem[],
}

export interface ToolTipParams {
    name: string;
    data: BalancerChartDataItem;
  }

export default function GenericBarChart({ data }: GenericPieChartProps) {  

    let dataNames = data.map(a => a.time);
    
    //Chart options
    const option = {
      backgroundColor: "rgb(43, 51, 59)",
      toolbox: {
        show: true,
        feature: {
          mark: {
            show: true
          },
          magicType: {
            show: true,
            type: ["pie", "funnel"]
          },
          restore: {
            show: true,
            title: "Restore"
          },
          saveAsImage: {
            show: true,
            title: "Save Image"
          }
        }
      },
      // Hover Tooltip
      // {a} = series:[{name:}]
      // {b} = series:[{data: [{name:}]}]
      // {c} = series:[{data: [{value:}]
      //formatter: "{a}<br/><strong>{b}</strong>: ${c}"
      tooltip: {
        trigger: "item",
        formatter: function (params: ToolTipParams) {
          return `
                 <b>${params.name}</b></br>
                ${formatDollarAmount(params.data.value)} <br />`
        }
      },
      calculable: true,
      legend: {
        icon: "circle",
        top: "bottom",
        data: dataNames,
        textStyle: {
          color: "#fff"
        }
      },
      series: [
          {
            name: 'Total asset fraction',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
  
    };
  
      return (
          <ReactEcharts 
          option={option} 
          className="pie-chart" 
          />
      );
}