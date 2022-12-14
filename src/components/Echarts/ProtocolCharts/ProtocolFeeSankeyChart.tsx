import ReactEcharts from 'echarts-for-react';
import { formatDollarAmount } from '../../../utils/numbers';
import { useTheme } from '@mui/material/styles'
import CustomLinearProgress from '../../Progress/CustomLinearProgress';
import { PoolData } from "../../../data/balancer/balancerTypes";
import { POOL_HIDE, YIELD_BEARING_TOKENS } from '../../../constants';

export default function ProtocolFeeSankeyChart({
    poolDatas,
    timeRange = 1,
    height = 350
}: {
    poolDatas?: PoolData[],
    timeRange?: number
    height?: number
}) {


    const theme = useTheme()

     //Helper function to calculate daily token yield
     function calculateTokenYieldInUsd(poolData: PoolData) {
        let income = 0
        if (poolData.aprSet) {
            poolData.tokens.forEach((token) => {
                let tokenYield = 0
                if (poolData.aprSet?.tokenAprs.breakdown[token.address]) {
                        tokenYield = poolData.aprSet?.tokenAprs.breakdown[token.address] / 100 / 100 * token.balance * token.price / 365 * timeRange
                        income += tokenYield
                }
            }
            )
        }
        return income
    }

    const filteredPoolDatas = poolDatas ? poolDatas.filter((x) => !!x && !POOL_HIDE.includes(x.id) && x.tvlUSD > 100) : [];
    //Obtain values
    //const totalRevenue = filteredPoolDatas.reduce((acc, el) => acc + calculateTokenYieldInUsd(el) * 0.25 + el.feesEpochUSD * 0.25, 0) * timeRange

    const swapRevenue = filteredPoolDatas.reduce((acc, el) => acc + el.feesEpochUSD * timeRange, 0) 

    const tokenYield = filteredPoolDatas.filter(
        pool =>pool.tokens.some(token => YIELD_BEARING_TOKENS.includes(token.address))).reduce(
            (acc, el) => acc + calculateTokenYieldInUsd(el), 0
            ) 


    const option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            valueFormatter: function (value: number) {
                return formatDollarAmount(value)
            }
          },
        series: {
          type: 'sankey',
          layout: 'none',
          emphasis: {
            focus: 'adjacency'
          },
          legend: {
            textStyle: {
                color: theme.palette.mode === 'dark' ? 'white' : 'black'
            },
        },
        edgeLabel: {
            color: theme.palette.mode === 'dark' ? 'white' : 'black'
        },
        lineStyle: {
            color: 'source',
            curveness: 0.5
          },
          data: [
            {
              name: 'Revenue'
            },
            {
              name: 'Token Yield'
            },
            {
              name: 'Swap Fees'
            },
            {
                name: 'Liquidity Providers'
            },
            {
                name: 'Fee Collector'
            },
            {
                name: 'Bribes'
            },
            {
              name: 'Revenue to veBAL holders'
            },
            {
              name: 'Revenue to the DAO'
            }
            
          ],
          links: [
            {
              source: 'Revenue',
              target: 'Token Yield',
              value: tokenYield
            },
            {
              source: 'Revenue',
              target: 'Swap Fees',
              value: swapRevenue
            },
            {
              source: 'Token Yield',
              target: 'Liquidity Providers',
              value: tokenYield * 0.5
            },
            {
              source: 'Token Yield',
              target: 'Fee Collector',
              value: tokenYield * 0.5
            },
            {
              source: 'Fee Collector',
              target: 'Revenue to the DAO',
              value: tokenYield * 0.5 * 0.25
            },
            {
                source: 'Fee Collector',
                target: 'Bribes',
                value: tokenYield * 0.5 * 0.75
            },
            {
              source: 'Swap Fees',
              target: 'Fee Collector',
              value: swapRevenue * 0.5
            },
            {
              source: 'Swap Fees',
              target: 'Liquidity Providers',
              value: swapRevenue * 0.5
            },
            {
              source: 'Fee Collector',
              target: 'Revenue to veBAL holders',
              value: swapRevenue * 0.5 * 0.75
            },
            {
                source: 'Fee Collector',
                target: 'Revenue to the DAO',
              value: swapRevenue * 0.5 * 0.25
            }
          ]
        }
      };



    return(
        poolDatas ?
            <ReactEcharts
                option={option}
                style={{ height: height, width: '100%' }}
                className={'react_for_echarts'}
            /> : <CustomLinearProgress />
    );
}