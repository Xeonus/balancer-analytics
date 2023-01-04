import { Typography, Box, Card } from '@mui/material';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { useBalancerTokens } from '../../data/balancer/useTokens';
import TokenTable from '../../components/Tables/TokenTable';
import { Grid } from '@mui/material';
import CustomLinearProgress from '../../components/Progress/CustomLinearProgress';
import { BalancerChartDataItem, BalancerPieChartDataItem } from '../../data/balancer/balancerTypes';
import GenericBarChart from '../../components/Echarts/GenericBarChart';
import GenericPieChart from '../../components/Echarts/GenericPieChart';
import MixedLineBarChart from '../../components/Echarts/MixedLineBarChart';


export default function Tokens() {

    const [activeNetwork] = useActiveNetworkVersion();
    let tokenDatas = useBalancerTokens();
    tokenDatas = tokenDatas.filter(x => x.tvlUSD < 10000000000)

    const sortedTokenDats = tokenDatas.sort(function (a, b) {
        return b.tvlUSD - a.tvlUSD;
    });


     //Create bar chart data for token distribution
     const tokenBarChartData : BalancerChartDataItem[] = [];
     sortedTokenDats.map((token) => 
     tokenBarChartData.push(
             {
                 value: token.tvlUSD,
                 time: token.name,
             }
         )
     )
     
     //Only get top 20 pools
     const filteredPoolBarChartData = tokenBarChartData.slice(0,19);
     const filteredPieChartData: BalancerPieChartDataItem[] = tokenBarChartData.map(({value, time}) => ({
         value: value,
         name: time,
     }))

     const tokenLineChartData : BalancerChartDataItem[] = [];
     sortedTokenDats.slice(0,19).map((token) => 
     tokenLineChartData.push(
             {
                 value: token.volumeUSD,
                 time: token.name,
             }
         )
     )

    return (
        <Box sx={{ flexGrow: 2 }}>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'center' }}
            >
                {filteredPoolBarChartData.length > 1 ?
                <Grid item xs={10}>
                    <Typography variant='h5'>Top 20 Tokens by TVL</Typography>
                    <Box mb={1}>
                    <Card>
                    < MixedLineBarChart 
                            barChartData={filteredPoolBarChartData} 
                            barChartName={'TVL'} 
                            lineChartData={tokenLineChartData} 
                            lineChartName={'Trading Volume 24h'} 
                            rotateAxis={true} />
                    </Card>
                    </Box>
                    <Card>
                        <GenericPieChart data={filteredPieChartData} height='350px' />
                    </Card>
                </Grid> : null }
                <Grid item xs={10}>
                    <Typography variant="h5" mb={1}>Tokens Overview ({activeNetwork.name})</Typography>
                </Grid>
                    {tokenDatas.length > 10 ?
                        <Grid item xs={10}>
                            <Box mt={2}>
                                <TokenTable tokenDatas={tokenDatas} />
                            </Box>
                        </Grid>
                        :
                        <Grid
                            container
                            spacing={2}
                            mt='25%'
                            sx={{ justifyContent: 'center' }}
                        >
                            <CustomLinearProgress />
                        </Grid>
                    }
            </Grid>
        </Box>
    );
}