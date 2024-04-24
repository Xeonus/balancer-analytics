import {Box, Card, CardContent, Grid, Tooltip, Typography} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { formatDollarAmount, formatNumber } from '../../../utils/numbers';
import { green } from '@mui/material/colors';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export type CoinCardProps = {
  mainMetric: number;
  mainMetricInUSD: boolean;
  mainMetricUnit?: string;
  mainMetricChange?: number;
  mainMetricChangeRange?: string;
  metricName: string;
  metricDecimals?: number;
  MetricIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  svgContent?: string;
  toolTipText?: string;

};

const MetricsCard = ({
                       mainMetric,
                       mainMetricInUSD,
                       mainMetricUnit,
                       mainMetricChange,
                       mainMetricChangeRange,
                       metricName,
                       metricDecimals,
                       MetricIcon,
                       svgContent,
                       toolTipText,
                     }: CoinCardProps) => {
  const metricUnit = mainMetricUnit ? mainMetricUnit : '';


  return (
      <Card sx={{
          minHeight: '110px',
          maxWidth: '275px',
          boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",
      }}>
        <CardContent sx={{pl: '10px', pr: '10px', pt: '10px', paddingBottom: '0px !important'}}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography color="textSecondary" sx={{fontSize: '18px',}}
                          gutterBottom>
                {metricName}
              </Typography>
              <Typography   sx={{fontSize: '22px'}}>
                {mainMetricInUSD ? formatDollarAmount(mainMetric, metricDecimals) : formatNumber(mainMetric, metricDecimals) + metricUnit}
                {toolTipText && (
                    <Tooltip title={toolTipText}>
                      <HelpOutlineIcon sx={{ ml: 1, fontSize: 'small' }} />
                    </Tooltip>
                )}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {mainMetricChange && mainMetricChange > 0 ? (
                    <ArrowUpwardIcon fontSize="small" sx={{ color: green[500] }} />
                ) : mainMetricChange ? (
                    <ArrowDownwardIcon fontSize="small" color="error" />
                ) : null}
                {mainMetricChange ? (
                    <Typography color={mainMetricChange > 0 ? 'green' : 'error'} sx={{ mr: 1 }} variant="caption">
                      {Number(mainMetricChange).toFixed(2)} %
                    </Typography>
                ) : null}
                {mainMetricChange ? (
                    <Typography variant="caption">
                      {mainMetricChangeRange ? mainMetricChangeRange : '(24h)'}
                    </Typography>
                ) : null}
              </Box>
            </Grid>
            <Grid item>{svgContent ? <Box ml={1}><img src={svgContent} alt="Svg Icon" width="30" /></Box> :
                <Box ml={1}>
                  <MetricIcon />
                </Box>}
            </Grid>
          </Grid>

        </CardContent>
      </Card>
  );
};

export default MetricsCard;
