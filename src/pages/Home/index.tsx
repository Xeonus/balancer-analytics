import { Card, Grid, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { Budget } from '../../components/MetricsCard';
import EchartsArea from '../../components/echarts/EchartsArea';
import CoinCard from '../../components/Cards/CoinCard';
import { useCoinGeckoSimpleTokenPrices } from '../../data/coingecko/useCoinGeckoSimpleTokenPrices';


function Home() {

    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    const coinData = useCoinGeckoSimpleTokenPrices([balAddress]);

    return (
        <Typography>Loaded Home element</Typography>
    )
}
export default Home;




