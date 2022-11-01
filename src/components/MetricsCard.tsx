import { Avatar, Box, Card, CardContent, Grid, SxProps, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import { useTheme } from '@mui/material/styles'
import BalancerLogoWhite from '../assets/svg/logo-light.svg'
import BalancerLogoBlack from '../assets/svg/logo-dark.svg'
import { grey } from '@mui/material/colors';




export function Budget() {
  const theme = useTheme();
  return (
  <Card
    sx={{ height: '100%' }}
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
            variant="overline"
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
          <Avatar
            sx={{
              backgroundColor: grey[400],
              height: 56,
              width: 56
            }}
          >
            <img src={(theme.palette.mode === 'dark') ? BalancerLogoBlack : BalancerLogoWhite} alt="Balancer Logo" width="30" />
          </Avatar>
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