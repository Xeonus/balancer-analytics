import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider, Typography } from '@mui/material';
import { BalancerChartDataItem } from '../../data/balancer/balancerTypes';
import GenericBarChart from "../Echarts/GenericBarChart";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface ChanFeeChartProps {
    feesData: BalancerChartDataItem[],
}

export default function ChainFeeChart({feesData }: ChanFeeChartProps) {

    const [startDate, setStartDate] = React.useState(dayjs().subtract(7, 'day').valueOf());
    const [startIndex, setStartIndex] = React.useState(0);
    const [endIndex, setEndIndex] = React.useState(0);
    const [showDate, setShowDate] = React.useState(false);
    const [endDate, setEndDate] = React.useState(dayjs().valueOf());
    const [timeRange, setTimeRange] = React.useState('30');
    //data state
    const [rangedFeesData, setRangedFeesData] = React.useState(feesData);

    React.useEffect(() => {
        if (feesData.length < Number(timeRange) || timeRange === '0') {
            setRangedFeesData(feesData);
        } else {
            setRangedFeesData(feesData.slice(feesData.length - Number(timeRange)))
        }
        if (showDate) {
            if (startIndex === 0 && endIndex === 0) {
                setInitialDateIndices(startDate, endDate);
            }
            setRangedFeesData(feesData.slice(startIndex, endIndex))
        }
    }, [feesData, timeRange, startIndex, endIndex]);

    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);
        if (feesData.length < Number(event.target.value) || event.target.value === '0') {
            setRangedFeesData(feesData);
        } else if (feesData.length >= Number(event.target.value)) {
            setRangedFeesData(feesData.slice(feesData.length - Number(event.target.value)))
        }
        if (event.target.value === '1000') {
            setShowDate(true);
        } else {
            setShowDate(false);
        }
    };

    const handleStartDateChange = (value: number | null, keyboardInputValue?: string | undefined) => {
        if (value) {
            setStartDate(value);
            //Find index of selected date and slice accordingly
            const date = dayjs(value).format('YYYY-MM-DD')
            const hit = feesData.find(el => el.time === date)
            if (hit) {
                setStartIndex(feesData.indexOf(hit))

            }
        }
    };

    const handleEndDateChange = (value: number | null, keyboardInputValue?: string | undefined) => {
        if (value) {
            setEndDate(value);
            //Find index of selected date and slice accordingly
            const date = dayjs(value).format('YYYY-MM-DD')
            const hit = feesData.find(el => el.time === date)
            if (hit) {
                setEndIndex(feesData.indexOf(hit) + 1)
            }
        }
    };

    function setInitialDateIndices(startDate: number | null, endDate: number | null) {
        if (startDate) {
            //Find index of selected date and slice accordingly
            const start = dayjs(startDate).format('YYYY-MM-DD')
            const hit = feesData.find(el => el.time === start)
            if (hit) {
                setEndIndex(feesData.indexOf(hit) + 1)
            }
        }
        if (endDate) {
            //Find index of selected date and slice accordingly
            const end = dayjs(endDate).format('YYYY-MM-DD')
            const hit = feesData.find(el => el.time === end)
            if (hit) {
                setEndIndex(feesData.indexOf(hit) + 1)
            }
        }
    }



    return (

        <Box >
            <Box m={1} display="flex" alignItems="center" justifyContent="left" sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                        <MenuItem value={'30'}> 30 days</MenuItem>
                        <MenuItem value={'90'}>90 days</MenuItem>
                        <MenuItem value={'180'}>180 days</MenuItem>
                        <MenuItem value={'365'}>365 days</MenuItem>
                        <MenuItem value={'0'}>All time</MenuItem>
                        <MenuItem value={'1000'}> Custom </MenuItem>
                    </Select>
                </FormControl>

                {showDate ?
                    <Box p={0.5} display="flex" justifyContent="left" >
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
                <   GenericBarChart data={rangedFeesData} />
        </Box>

    );
}