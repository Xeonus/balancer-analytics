import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CurrencyLogo from '../../CurrencyLogo';
import { formatDollarAmount } from '../../../utils/numbers';
import { green } from '@mui/material/colors';

export type CoinCardProps = {
  tokenPrice: number,
  tokenPriceChange: number,
  tokenName: string,
  tokenAddress: string,
}

const CoinCard = ({
  tokenPrice,
  tokenPriceChange,
  tokenName,
  tokenAddress }: CoinCardProps) => {

  return (
    <Card
    sx={{
      maxWidth: '275px',
      minWidth: '250px',
      maxHeight: '150px'
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
              {tokenName}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              {formatDollarAmount(tokenPrice)}
            </Typography>
          </Grid>
          <Grid item>
            <CurrencyLogo address={tokenAddress} size='30px' />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {tokenPriceChange > 0 ? 
            <ArrowUpwardIcon fontSize="small" sx={{color: green[500]}} /> 
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
        </Box>
      </CardContent>
    </Card>
  );
}
export default CoinCard;