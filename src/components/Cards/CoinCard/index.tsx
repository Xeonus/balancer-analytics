import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CurrencyLogo from '../../CurrencyLogo';
import { formatDollarAmount } from '../../../utils/numbers';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useActiveNetworkVersion } from '../../../state/application/hooks';
import { NetworkInfo } from "../../../constants/networks";
import { networkPrefix } from '../../../utils/networkPrefix';

export type CoinCardProps = {
  tokenPrice: number,
  tokenPriceChange: number,
  tokenName: string,
  tokenAddress: string,
}

const getLink = (activeNetwork: NetworkInfo, id: string) => {
  return networkPrefix(activeNetwork) + 'tokens/' + id;
}

const CoinCard = ({
                    tokenPrice,
                    tokenPriceChange,
                    tokenName,
                    tokenAddress }: CoinCardProps) => {

  let navigate = useNavigate();

  const [activeNetwork] = useActiveNetworkVersion()
  return (
      <Card
          sx={{
            maxWidth: '275px',
            minWidth: '200px',
            minHeight: '110px',
            cursor: 'pointer',
            pb: '0px',
            boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",
          }}
      >
        <CardActionArea
            onClick={() => { navigate(`${getLink(activeNetwork, tokenAddress)}/`); }}
        >
          <CardContent sx={{p: '10px', pb: '0px'}}>
            <Grid
                container
                spacing={1}
                sx={{ justifyContent: 'space-between' }}
            >
              <Grid item>
                <Typography
                    gutterBottom
                    sx={{fontSize: '18px',}}
                >
                  {tokenName} Price
                </Typography>
                <Typography
                    color="textPrimary"
                    sx={{fontSize: '22px',}}
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
        </CardActionArea>
      </Card>
  );
}
export default CoinCard;
