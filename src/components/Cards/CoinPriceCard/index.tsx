import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from '@mui/material/styles'
import { formatDollarAmount } from '../../../utils/numbers';
import { green } from '@mui/material/colors';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { BalancerChartDataItem } from '../../../data/balancer/balancerTypes';
import GenericAreaChart from '../../Echarts/GenericAreaChart';
import CurrencyLogo from '../../CurrencyLogo';
import { CoingeckoSnapshotPriceData } from '../../../data/balancer/useTokens';
import { unixToDate } from '../../../utils/date';

export type CoinPriceCardProps = {
  mainMetric: number,
  mainMetricChange: number,
  chartData: CoingeckoSnapshotPriceData,
  tokenName: string,
  tokenAddress: string,
}

export default function CoinPriceCard({ mainMetric, mainMetricChange, chartData, tokenName, tokenAddress }: CoinPriceCardProps) {

  const theme = useTheme();

  
  if (chartData.error) {
    return(<Typography>Coingecko API: No data</Typography>)
  }

  const balancerChartData = chartData.prices.map((price) => {
    if (price == null) {
      return {
        value: 0,
        time: '0'
      }
    }
    return {
      value: price[1] > 0 ? price[1] : 0,
      time: unixToDate(price[0] / 1000),
    }
  });


  return (
    balancerChartData && balancerChartData.length > 2 ? 
    <Box>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'flex-start' }}
        >
          
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {tokenName}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              {formatDollarAmount(balancerChartData[balancerChartData.length - 1].value ? balancerChartData[balancerChartData.length - 1].value : 0)}
            </Typography>
          </Grid>
          <Grid item>
            <CurrencyLogo address={tokenAddress} size='40px' />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <GenericAreaChart chartData={balancerChartData} dataTitle={tokenName} />
        </Box>
        </Box> : <Typography>No data</Typography>
  );
}