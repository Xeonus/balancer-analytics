import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { formatDollarAmount } from '../../../utils/numbers';
import { green } from '@mui/material/colors';
import PoolCurrencyLogo from "../../PoolCurrencyLogo";
import { PoolTokenData } from '../../../data/balancer/balancerTypes'

interface PoolMetricsCardProps {
    mainMetric: number,
    mainMetricInUSD: boolean,
    mainMetricUnit? : string,
    mainMetricChange?: number,
    metricName: string,
    poolTokenData: PoolTokenData[]
}

export default function PoolMetricsCard({
    mainMetric,
    mainMetricInUSD,
    mainMetricUnit,
    mainMetricChange,
    metricName,
    poolTokenData }: PoolMetricsCardProps){

    const metricUnit = mainMetricUnit ? mainMetricUnit : '';

    return (
        <Card
        sx={{
          maxWidth: '275px',
          minWidth: '250px',
          boxShadow: 3,
        }}
        >
          <CardContent>
            <Grid
              container
              spacing={1}
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="h6"
                >
                  {metricName}
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h6"
                >
                  {mainMetricInUSD ? formatDollarAmount(mainMetric) : Number(mainMetric).toFixed(0) + metricUnit}
                </Typography>
              </Grid>
              <Grid item>
              <PoolCurrencyLogo tokens={poolTokenData} />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {mainMetricChange && mainMetricChange > 0 ? 
                <ArrowUpwardIcon fontSize="small" sx={{color: green[500]}} /> 
                : 
                mainMetricChange ? <ArrowDownwardIcon fontSize="small" color="error" /> : null}
              {mainMetricChange ?
              <Typography
                color={mainMetricChange && mainMetricChange > 0 ? 'green' : 'error'}
                sx={{
                  mr: 1
                }}
                variant="body2"
              >
                {Number(mainMetricChange).toFixed(2)} %
              </Typography> : null }
              {mainMetricChange ?
              <Typography
                color="textSecondary"
                variant="caption"
              >
                (24h)
              </Typography> : null }
            </Box>
          </CardContent>
        </Card>
      );
}