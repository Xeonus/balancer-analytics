import React from 'react';
import { ProtocolData } from '../../../data/balancer/useProtocolDataWithClientOverride';
import { Card, Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import CustomLinearProgress from '../../Progress/CustomLinearProgress';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider } from '@mui/material';
import ProtocolMultiBarCharts from './ProtocolMultiBarCharts';
import { BalancerChartDataItem } from '../../../data/balancer/balancerTypes';

export interface Normal {
    color: string;
}

export interface ItemStyle {
    normal: Normal;
}

export interface echartsData {
    name: number;
    type: string;
    itemStyle: ItemStyle;
}

export interface ToolTipParams {
  value: string;
  data: echartsData;
}

interface ProtocolAreaChartProps {
    mainnetProtocolData: BalancerChartDataItem[],
    arbitrumProtocolData: BalancerChartDataItem[],
    polygonProtocolData: BalancerChartDataItem[],
}



export default function ProtocolMultiBarChart({mainnetProtocolData, arbitrumProtocolData, polygonProtocolData}: ProtocolAreaChartProps) {

    const theme = useTheme();

    const mainnetData = mainnetProtocolData.map(el => Number(el.value.toFixed(2)));
    let arbitrumData = arbitrumProtocolData.map(el => Number(el.value.toFixed(2)));
    //add preceeding zero values based on mainnet size to later deployed chains
    if (mainnetData && arbitrumData) {
        const diffSize = mainnetData.length - arbitrumData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        arbitrumData = zeroArray.concat(arbitrumData);
    }

    let polygonData = polygonProtocolData.map(el => Number(el.value.toFixed(2)));

    if (mainnetData && polygonData) {
        const diffSize = mainnetData.length - polygonData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        polygonData = zeroArray.concat(polygonData);
    }

    //Generic x-Axis
    const mainnetxAxisData = mainnetProtocolData.map(el => el.time);

    //---Hooks for custom time ranges---
    const [value, setValue] = React.useState(0);
    const [startDate, setStartDate] = React.useState(dayjs().subtract(7, 'day').valueOf());
    const [startIndex, setStartIndex] = React.useState(0);
    const [endIndex, setEndIndex] = React.useState(0);
    const [showDate, setShowDate] = React.useState(false);
    const [endDate, setEndDate] = React.useState(dayjs().valueOf());
    const [timeRange, setTimeRange] = React.useState('0');
    //data state
    const [rangedMainnetData, setrangedMainnetData] = React.useState(mainnetData)
    const [rangedArbitrumData, setrangedArbitrumData] = React.useState(arbitrumData);
    const [rangedPolygonData, setrangedPolygonData] = React.useState(polygonData);
    const [rangedxAxis, setRangedxAxis] = React.useState(mainnetxAxisData);

    React.useEffect(() => {
        if (mainnetData.length < Number(timeRange) || timeRange == '0') {
            setrangedMainnetData(mainnetData);
            setrangedArbitrumData(arbitrumData);
            setrangedPolygonData(polygonData);
            setRangedxAxis(mainnetxAxisData)
        } else {
            setrangedMainnetData(mainnetData.slice(mainnetData.length - Number(timeRange)))
            setrangedArbitrumData(arbitrumData.slice(arbitrumData.length - Number(timeRange)))
            setrangedPolygonData(polygonData.slice(polygonData.length - Number(timeRange)))
            setRangedxAxis(mainnetxAxisData.slice(mainnetxAxisData.length - Number(timeRange)))
        }
        if (showDate) {
            if (startIndex === 0 && endIndex === 0) {
                setInitialDateIndices(startDate, endDate);
            }
            setrangedMainnetData(mainnetData.slice(startIndex, endIndex))
            setrangedArbitrumData(arbitrumData.slice(startIndex, endIndex))
            setrangedPolygonData(polygonData.slice(startIndex, endIndex))
            setRangedxAxis(mainnetxAxisData.slice(startIndex, endIndex))
        }
    }, [timeRange, startIndex, endIndex]);

    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);
        if (mainnetData.length < Number(event.target.value) || event.target.value == '0') {
            setrangedMainnetData(mainnetData);
            setrangedArbitrumData(arbitrumData);
            setrangedPolygonData(polygonData);
        } else if (mainnetData.length >= Number(event.target.value)) {
            setrangedMainnetData(mainnetData.slice(mainnetData.length - Number(event.target.value)))
            setrangedArbitrumData(arbitrumData.slice(arbitrumData.length - Number(event.target.value)))
            setrangedPolygonData(polygonData.slice(polygonData.length - Number(event.target.value)))
        }
        if (event.target.value == '1000') {
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
            const hit = mainnetxAxisData.indexOf(date)
            if (hit) {
                setStartIndex(mainnetData.indexOf(hit))

            }
        }
    };

    const handleEndDateChange = (value: number | null, keyboardInputValue?: string | undefined) => {
        if (value) {
            setEndDate(value);
            //Find index of selected date and slice accordingly
            const date = dayjs(value).format('YYYY-MM-DD')
            const hit = mainnetxAxisData.indexOf(date)
            if (hit) {
                setEndIndex(mainnetData.indexOf(hit) + 1)
            }
        }
    };

    function setInitialDateIndices(startDate: number | null, endDate: number | null) {
        if (startDate) {
            //Find index of selected date and slice accordingly
            const start = dayjs(startDate).format('YYYY-MM-DD')
            const hit = mainnetxAxisData.indexOf(start)
            if (hit) {
                setEndIndex(mainnetData.indexOf(hit) + 1)
            }
        }
        if (endDate) {
            //Find index of selected date and slice accordingly
            const end = dayjs(endDate).format('YYYY-MM-DD')
            const hit = mainnetxAxisData.indexOf(end)
            if (hit) {
                setEndIndex(mainnetData.indexOf(hit) + 1)
            }
        }
    }

    return (
        polygonData.length > 10 ?
        <Card sx={{boxShadow: 3}}>
            <Box m={1}>
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
            <ProtocolMultiBarCharts  
                mainnetData={rangedMainnetData} 
                arbitrumData={rangedArbitrumData} 
                polygonData={rangedPolygonData} 
                xAxis={rangedxAxis}/>
            </Card> : <Grid
            container
            spacing={2}
            mt='10%'
            mb='10%'
            sx={{ justifyContent: 'center' }}
        >
            <CustomLinearProgress />
        </Grid>
    )
}