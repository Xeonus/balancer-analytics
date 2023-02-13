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
import { isMobile } from 'react-device-detect'
import NavCrumbs from '../../components/NavCrumbs';
import { NavElement } from '../../components/NavCrumbs';


export default function Tokens() {

    const [activeNetwork] = useActiveNetworkVersion();

    //Navigation
    const homeNav: NavElement = {
        name: 'Home',
        link: ''
    }
    const poolNav: NavElement = {
        name: 'Chain',
        link: 'chain'
    }
    const tokenNav: NavElement = {
        name: 'Tokens',
        link: 'tokens'
    }
    const navCrumbs: NavElement[] = new Array()
    navCrumbs.push(homeNav)
    navCrumbs.push(poolNav);
    navCrumbs.push(tokenNav)



    let tokenDatas = useBalancerTokens();
    tokenDatas = tokenDatas.filter(x => x.tvlUSD < 10000000000)

    const sortedTokenDats = tokenDatas.sort(function (a, b) {
        return b.tvlUSD - a.tvlUSD;
    });


    //Create bar chart data for token distribution
    const tokenBarChartData: BalancerChartDataItem[] = [];
    sortedTokenDats.map((token) =>
        tokenBarChartData.push(
            {
                value: token.tvlUSD,
                time: token.symbol,
            }
        )
    )

    //Only get top 20 pools
    const filteredPoolBarChartData = tokenBarChartData.slice(0, 19);
    const filteredPieChartData: BalancerPieChartDataItem[] = tokenBarChartData.map(({ value, time }) => ({
        value: value,
        name: time,
    }))

    const tokenLineChartData: BalancerChartDataItem[] = [];
    sortedTokenDats.slice(0, 19).map((token) =>
        tokenLineChartData.push(
            {
                value: token.volumeUSD,
                time: token.symbol,
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
                <Grid item mt={2} xs={11}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <NavCrumbs crumbSet={navCrumbs} destination={activeNetwork.name} />
                    </Box>
                </Grid>
                {filteredPoolBarChartData.length ?
                    <Grid
                        item
                        xs={11}
                    >
                        <Typography variant='h5'>Top 20 Tokens by TVL</Typography>
                    </Grid> : null}
                {filteredPoolBarChartData.length > 1 ?
                    <Grid
                    container
                    sx={{ 
                        direction: { xs: 'column', sm: 'row' } 
                    }}
                    justifyContent="center"
                    alignItems="left"
                    alignContent="left"
                    spacing={2}
                >

                        {filteredPoolBarChartData.length > 1 ?
                            <Grid
                            item
                            xs={10}
                            md={5}
                        >
                                
                                    <Card
                                        sx={{ boxShadow: 3 }}
                                    >
                                        < MixedLineBarChart
                                            barChartData={filteredPoolBarChartData}
                                            barChartName={'TVL'}
                                            lineChartData={tokenLineChartData}
                                            lineChartName={'Trading Fees 24h'}
                                            rotateAxis={true} />
                                    </Card>
                                

                            </Grid> : null}
                        <Grid
                            item
                            xs={10}
                            md={5}

                        >
                            <Card
                                sx={{ boxShadow: 3 }}
                            >
                                <GenericPieChart data={filteredPieChartData} height='350px' />
                            </Card>

                        </Grid>
                    </Grid> : null}
                <Grid item xs={11} mt={1}>
                    <Typography variant="h5" mb={1}>Tokens Overview ({activeNetwork.name})</Typography>
                </Grid>
                {tokenDatas.length > 10 ?
                    <Grid item xs={11}>
                        <TokenTable tokenDatas={tokenDatas} />
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