import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { BalancerChartDataItem } from '../../data/balancer/balancerTypes';
import GenericBarChart from "../Echarts/GenericBarChart";
import TvlAreaChart from "../Echarts/TvlAreaChart";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

export default function PoolChart({ tvlData, volumeData, feesData }: PoolChartProps) {

    const [value, setValue] = React.useState(0);
    const [startDate, setStartDate] = React.useState(dayjs().subtract(7, 'day').valueOf());
    const [startIndex, setStartIndex] = React.useState(0);
    const [endIndex, setEndIndex] = React.useState(0);
    const [showDate, setShowDate] = React.useState(false);
    const [endDate, setEndDate] = React.useState(dayjs().valueOf());
    const [timeRange, setTimeRange] = React.useState('30');
    //data state
    const [rangedTvlData, setRangedTvlData] = React.useState(tvlData)
    const [rangedVolumeData, setRangedVolumeData] = React.useState(volumeData);
    const [rangedFeesData, setRangedFeesData] = React.useState(feesData);

    React.useEffect(() => {
        if (tvlData.length < Number(timeRange) || timeRange === '0') {
            setRangedTvlData(tvlData);
            setRangedVolumeData(volumeData);
            setRangedFeesData(feesData);
        } else {
            setRangedTvlData(tvlData.slice(tvlData.length - Number(timeRange)))
            setRangedVolumeData(volumeData.slice(volumeData.length - Number(timeRange)))
            setRangedFeesData(feesData.slice(feesData.length - Number(timeRange)))
        }
        if (showDate) {
            if (startIndex === 0 && endIndex === 0) {
                setInitialDateIndices(startDate, endDate);
            }
            setRangedTvlData(tvlData.slice(startIndex, endIndex))
            setRangedVolumeData(volumeData.slice(startIndex, endIndex))
            setRangedFeesData(feesData.slice(startIndex, endIndex))
        }
    }, [tvlData, timeRange, startIndex, endIndex]);

    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);
        if (tvlData.length < Number(event.target.value) || event.target.value === '0') {
            setRangedTvlData(tvlData);
            setRangedVolumeData(volumeData);
            setRangedFeesData(feesData);
        } else if (tvlData.length >= Number(event.target.value)) {
            setRangedTvlData(tvlData.slice(tvlData.length - Number(event.target.value)))
            setRangedVolumeData(volumeData.slice(volumeData.length - Number(event.target.value)))
            setRangedFeesData(feesData.slice(feesData.length - Number(event.target.value)))
        }
        if (event.target.value === '1000') {
            setShowDate(true);
        } else {
            setShowDate(false);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

    };

    const handleStartDateChange = (value: number | null, keyboardInputValue?: string | undefined) => {
        if (value) {
            setStartDate(value);
            //Find index of selected date and slice accordingly
            const date = dayjs(value).format('YYYY-MM-DD')
            const hit = tvlData.find(el => el.time === date)
            if (hit) {
                setStartIndex(tvlData.indexOf(hit))

            }
        }
    };

    const handleEndDateChange = (value: number | null, keyboardInputValue?: string | undefined) => {
        if (value) {
            setEndDate(value);
            //Find index of selected date and slice accordingly
            const date = dayjs(value).format('YYYY-MM-DD')
            const hit = tvlData.find(el => el.time === date)
            if (hit) {
                setEndIndex(tvlData.indexOf(hit) + 1)
            }
        }
    };

    function setInitialDateIndices(startDate: number | null, endDate: number | null) {
        if (startDate) {
            //Find index of selected date and slice accordingly
            const start = dayjs(startDate).format('YYYY-MM-DD')
            const hit = tvlData.find(el => el.time === start)
            if (hit) {
                setEndIndex(tvlData.indexOf(hit) + 1)
            }
        }
        if (endDate) {
            //Find index of selected date and slice accordingly
            const end = dayjs(endDate).format('YYYY-MM-DD')
            const hit = tvlData.find(el => el.time === end)
            if (hit) {
                setEndIndex(tvlData.indexOf(hit) + 1)
            }
        }
    }



    return (

        <Box >
            <Box 
                m={1} 
                display="flex"
                alignItems={{ xs: 'center', sm: 'flex-start', md: "flex-start" }}
                justifyContent="flex-start" 
                sx={{ borderBottom: 1, borderColor: 'divider' }}
                flexDirection={{ xs: 'column', sm: 'row' }}
                >
                <Tabs value={value} onChange={handleTabChange} aria-label="graph tab">
                    <Tab label="Volume" {...a11yProps(0)} />
                    <Tab label="TVL" {...a11yProps(1)} />
                    <Tab label="Fees" {...a11yProps(2)} />
                </Tabs>
                <Box sx={{m:{xs: 1, mb: 0}}}>
                <FormControl size="small">
                    <Select
                        sx={{
                            backgroundColor: "background.paper",
                            boxShadow: 2,
                            borderRadius: 2,
                            borderColor: 0,
                            alignSelf: 'flex-end'
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
                        <MenuItem value={'30'}> 30 days</MenuItem>
                        <MenuItem value={'90'}>90 days</MenuItem>
                        <MenuItem value={'180'}>180 days</MenuItem>
                        <MenuItem value={'365'}>365 days</MenuItem>
                        <MenuItem value={'0'}>All time</MenuItem>
                        <MenuItem value={'1000'}> Custom </MenuItem>
                    </Select>
                </FormControl>
                </Box>

                {showDate ?
                    <Box p={0.5} display="flex" justifyContent="left" sx={{alignSelf: 'flex-end'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                maxDate={Date.now()}
                                value={startDate}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField size='small' sx={{ maxWidth: '150px' }} {...params} />}
                            />
                        </LocalizationProvider>
                        <Box p={1}>
                            <Typography>to</Typography>
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="End Date"
                                maxDate={Date.now()}
                                value={endDate}
                                onChange={handleEndDateChange}
                                renderInput={(params) => <TextField size='small' sx={{ maxWidth: '150px' }} {...params} />}
                            />
                        </LocalizationProvider>
                    </Box> : null}
            </Box>

            <TabPanel value={value} index={0}>
                <GenericBarChart data={rangedVolumeData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TvlAreaChart tvlData={rangedTvlData} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <   GenericBarChart data={rangedFeesData} />
            </TabPanel>
        </Box>

    );
}