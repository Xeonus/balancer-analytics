import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { PoolData } from '../../data/balancer/balancerTypes';
import { TabPanelProps } from '../PoolChart'
import CoinPriceCard from '../../components/Cards/CoinPriceCard'
import { CoingeckoSnapshotPriceData } from '../../data/balancer/useTokens';
import { Card } from '@mui/material';


interface PoolChartProps {
    poolData: PoolData
    tokenDatas: { tokenAddress: string, coingeckoRawData: CoingeckoSnapshotPriceData }[];
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PoolTokenChart({ poolData, tokenDatas }: PoolChartProps) {


    const [value, setValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Card
        sx={{maxWidth: '100%'
            }}
        >
        <Box>
            <Box m={1} display="flex" justifyContent="left" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={handleTabChange} aria-label="token tab">
                    {poolData.tokens.map((el, index) =>
                        <Tab key={"tab" + index.toString()} label={el.symbol} {...a11yProps(index)} />
                    )}
                </Tabs>
                
            </Box>
            {poolData.tokens.map((element, index) =>
                    <TabPanel value={value} index={index} >
                        <Box mr={1}>
                            {tokenDatas.filter(el => el.tokenAddress === element.address && tokenDatas.filter(el => el.tokenAddress === element.address)[0] 
                                &&  ! el.coingeckoRawData.error) ?
                                <CoinPriceCard
                                    key={element.address + index.toString()}
                                    mainMetric={0}
                                    mainMetricChange={0}
                                    chartData={tokenDatas.filter(el => el.tokenAddress === element.address)[0].coingeckoRawData}
                                    tokenAddress={element.address}
                                    tokenName={element.symbol} /> : null}
                        </Box>
                    </TabPanel>
                )}
        </Box>
        </Card>
    )
}