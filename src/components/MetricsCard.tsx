import { Avatar, Box, Card, CardContent, Grid, SxProps, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTheme } from '@mui/material/styles'
import BalancerLogoWhite from '../assets/svg/logo-light.svg'
import BalancerLogoBlack from '../assets/svg/logo-dark.svg'
import { grey } from '@mui/material/colors';
import CurrencyLogo from './CurrencyLogo';




export function Budget() {
  const theme = useTheme();
  const bal = '0xba100000625a3754423978a60c9317c58a424e3D';
  return (
  <Card
    sx={{ height: '100%' }}
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
            variant="h5"
          >
            BAL
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            $6.75
          </Typography>
        </Grid>
        <Grid item>
         <CurrencyLogo address={bal} size='30px'/>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
}