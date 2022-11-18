import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { BalancerChartDataItem} from '../../data/balancer/balancerTypes';
import GenericBarChart from "../Echarts/GenericBarChart";
import TvlAreaChart from "../Echarts/TvlAreaChart";

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface PoolChartProps {
    tvlData: BalancerChartDataItem[],
    volumeData: BalancerChartDataItem[],
    feesData: BalancerChartDataItem[],
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

export default function PoolChart({tvlData, volumeData, feesData} : PoolChartProps) {

    const [value, setValue] = React.useState(0);
    const [timeRange, setTimeRange] = React.useState('0');

    React.useEffect(() => {
        if (tvlData.length < Number(timeRange) || timeRange == '0') {
            setRangedTvlData(tvlData);
            setRangedVolumeData(volumeData);
            setRangedFeesData(feesData);
        } else {
            setRangedTvlData(tvlData.slice(tvlData.length - Number(timeRange)))
            setRangedVolumeData(volumeData.slice(volumeData.length - Number(timeRange)))
            setRangedFeesData(feesData.slice(feesData.length - Number(timeRange)))
        }
    }, [tvlData, timeRange]);

    //data state
    const [rangedTvlData, setRangedTvlData] = React.useState(tvlData)
    const [rangedVolumeData, setRangedVolumeData] = React.useState(volumeData);
    const [rangedFeesData, setRangedFeesData] = React.useState(feesData);

    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);
        if (tvlData.length < Number(event.target.value) || event.target.value == '0') {
            setRangedTvlData(tvlData);
            setRangedVolumeData(volumeData);
            setRangedFeesData(volumeData);
        } else if (tvlData.length >= Number(event.target.value)) {
            setRangedTvlData(tvlData.slice(tvlData.length - Number(event.target.value)))
            setRangedVolumeData(volumeData.slice(volumeData.length - Number(event.target.value)))
            setRangedFeesData(feesData.slice(feesData.length - Number(event.target.value)))
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    return (

        <Box >
            <Box m={1} display="flex" justifyContent="left"  sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTabChange} aria-label="graph tab">
                    <Tab label="Volume" {...a11yProps(0)} />
                    <Tab label="TVL" {...a11yProps(1)} />
                    <Tab label="Fees" {...a11yProps(2)} />
                </Tabs>
                <FormControl size="small">
                <Select
                sx={{
                    backgroundColor: "background.paper",
                    boxShadow: 2,
                    borderRadius: 2,
                    borderColor: 0,
                }}
                color="primary"
                labelId="timeRangeSelectLabel"
                id="timeRangeSelect"
                onChange={handleChange}
                value={timeRange}
                inputProps={{
                    name: 'timeRange',
                    id: 'timeRangeId-native-simple',
                }}
            >
                    <MenuItem disabled={true} dense={true}>Time range:</MenuItem>
                    <Divider />
                    <MenuItem value={30}> 30 days</MenuItem>
                    <MenuItem value={90}>90 days</MenuItem>
                    <MenuItem value={180}>180 days</MenuItem>
                    <MenuItem value={365}>365 days</MenuItem>
                    <MenuItem value={0}>All time</MenuItem>
                </Select>
            </FormControl>
            </Box>
            <TabPanel value={value} index={0}>
                <GenericBarChart data={rangedVolumeData}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TvlAreaChart tvlData={rangedTvlData} />
            </TabPanel>
            <TabPanel value={value} index={2}>
            <   GenericBarChart data={rangedFeesData}/>
            </TabPanel>
        </Box>

    );
}