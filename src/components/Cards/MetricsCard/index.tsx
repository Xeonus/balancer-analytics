import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTheme } from '@mui/material/styles'
import { formatDollarAmount } from '../../../utils/numbers';
import { green } from '@mui/material/colors';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type CoinCardProps = {
  mainMetric: number,
  mainMetricInUSD: boolean,
  mainMetricChange: number,
  metricName: string,
  MetricIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

const MetricsCard = ({
  mainMetric,
  mainMetricInUSD,
  mainMetricChange,
  metricName,
  MetricIcon }: CoinCardProps) => {

  const theme = useTheme();

  return (
    <Card
    sx={{maxWidth: '275px'}}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {metricName}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              {mainMetricInUSD ? formatDollarAmount(mainMetric) : Number(mainMetric).toFixed(0)}
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
          {mainMetricChange > 0 ? 
            <ArrowUpwardIcon fontSize="small" sx={{color: green[500]}} /> 
            : 
            <ArrowDownwardIcon fontSize="small" color="error" />}
          <Typography
            color={mainMetricChange > 0 ? 'green' : 'error'}
            sx={{
              mr: 1
            }}
            variant="body2"
          >
            {Number(mainMetricChange).toFixed(2)} %
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            (24h)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
export default MetricsCard;