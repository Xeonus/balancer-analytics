import { Box, Grid, Typography, Link } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from '@mui/material/styles'
import { formatDollarAmount } from '../../../utils/numbers';
import { green } from '@mui/material/colors';
import GenericAreaChart from '../../Echarts/GenericAreaChart';
import CurrencyLogo from '../../CurrencyLogo';
import { CoingeckoSnapshotPriceData } from '../../../data/balancer/useTokens';
import { unixToDate } from '../../../utils/date';
import CoingeckoColor from '../../../assets/svg/coingecko-color.svg'


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
    return (<Typography>Coingecko API: No data</Typography>)
  }

  let price = 0
  let tokenPriceChange = 0
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

  if (balancerChartData.length > 2) {
    price = balancerChartData[balancerChartData.length - 1].value ? balancerChartData[balancerChartData.length - 1].value : 0;
    tokenPriceChange = 100 / balancerChartData[balancerChartData.length - 2].value * balancerChartData[balancerChartData.length - 1].value - 100
  }


  return (
    balancerChartData && balancerChartData.length > 2 ?
      <Box>
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Grid item>
            <Box display="flex" justifyContent='space-between'>
            <Box>
            <Box display='flex' alignItems='center'>
              <Box mr={1} >
                <CurrencyLogo address={tokenAddress} size='30px' />
              </Box>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                {formatDollarAmount(price)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {tokenPriceChange > 0 ?
                <ArrowUpwardIcon fontSize="small" sx={{ color: green[500] }} />
                :
                <ArrowDownwardIcon fontSize="small" color="error" />}
              <Typography
                color={tokenPriceChange > 0 ? 'green' : 'error'}
                sx={{
                  mr: 1
                }}
                variant="body2"
              >
                {Number(tokenPriceChange).toFixed(2)} %
              </Typography>
              <Typography
                color="textSecondary"
                variant="caption"
              >
                (24h)
              </Typography>
            </Box >
            </Box>
            <Box>
            <Link 
              color={theme.palette.mode === 'dark' ? 'white' : 'black'} 
              target="_blank" rel="noopener noreferrer" 
              variant="caption" 
              display="block" 
              underline="none" 
              href={"https://coingecko.com/en/coins/" + tokenAddress}>
            <Box
              sx={{ display: { xs: 'none', md: 'flex' }, ml: 1 }} >
              <img src={CoingeckoColor} alt="Coingecko Logo" width="30" />
            </Box>
            </Link>
            </Box>
            </Box>
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
      </Box> : <Typography>No data available from pricing provider</Typography>
  );
}