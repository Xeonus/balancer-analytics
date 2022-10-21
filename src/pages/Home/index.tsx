import * as React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Budget } from '../../components/MetricsCard';
import EchartsArea from '../../components/echarts/EchartsArea';


function Home() {

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Budget/>
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <Budget/>
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <Budget/>
                    </Grid>
                    <Grid
                        item
                        xl={3}
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <Budget/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <EchartsArea/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        Element6
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        Element7
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        Element8
                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
}
export default Home;




