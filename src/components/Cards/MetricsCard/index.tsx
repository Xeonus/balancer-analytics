import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { formatDollarAmount, formatNumber } from '../../../utils/numbers';
import { green } from '@mui/material/colors';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type CoinCardProps = {
  mainMetric: number,
  mainMetricInUSD: boolean,
  mainMetricUnit? : string,
  mainMetricChange?: number,
  metricName: string,
  MetricIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

const MetricsCard = ({
  mainMetric,
  mainMetricInUSD,
  mainMetricUnit,
  mainMetricChange,
  metricName,
  MetricIcon }: CoinCardProps) => {

  const metricUnit = mainMetricUnit ? mainMetricUnit : '';

  return (
    <Card
    sx={{
      maxWidth: '275px',
      minWidth: '250px',
      maxHeight: '150px',
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
              {mainMetricInUSD ? formatDollarAmount(mainMetric) : formatNumber(mainMetric, 0) + metricUnit}
            </Typography>
          </Grid>
          <Grid item>
           <MetricIcon />
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
            color={mainMetricChange > 0 ? 'green' : 'error'}
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
export default MetricsCard;