import React from 'react';
import { ProtocolData } from '../../../data/balancer/useProtocolDataWithClientOverride';
import { Card, Grid, Box } from '@mui/material';
import CustomLinearProgress from '../../Progress/CustomLinearProgress';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider } from '@mui/material';
import ProtocolTVLCharts from './ProtocolTVLCharts';

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
    mainnetProtocolData: ProtocolData,
    arbitrumProtocolData: ProtocolData,
    polygonProtocolData: ProtocolData,
    gnosisProtocolData: ProtocolData,
}



export default function ProtocolMultiAreaChart({mainnetProtocolData, arbitrumProtocolData, polygonProtocolData, gnosisProtocolData}: ProtocolAreaChartProps) {

    const mainnetData = mainnetProtocolData.tvlData.map(el => Number(el.value.toFixed(2)));
    let arbitrumData = arbitrumProtocolData.tvlData.map(el => Number(el.value.toFixed(2)));
    
    
    //add preceeding zero values based on mainnet size to later deployed chains
    if (mainnetData && arbitrumData) {
        const diffSize = mainnetData.length - arbitrumData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        arbitrumData = zeroArray.concat(arbitrumData);
    }

    let polygonData = polygonProtocolData.tvlData.map(el => Number(el.value.toFixed(2)));

    if (mainnetData && polygonData) {
        const diffSize = mainnetData.length - polygonData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        polygonData = zeroArray.concat(polygonData);
    }

    let gnosisData = gnosisProtocolData.tvlData.map(el => Number(el.value.toFixed(2)));

    if (mainnetData && gnosisData) {
        const diffSize = mainnetData.length - gnosisData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        gnosisData = zeroArray.concat(gnosisData);
    }

    const mainnetxAxisData = mainnetProtocolData.tvlData.map(el => el.time);


    //---Hooks for custom time ranges---
    const [timeRange, setTimeRange] = React.useState('365');
    //data state
    const [rangedMainnetData, setrangedMainnetData] = React.useState(mainnetData)
    const [rangedArbitrumData, setrangedArbitrumData] = React.useState(arbitrumData);
    const [rangedPolygonData, setrangedPolygonData] = React.useState(polygonData);
    const [rangedGnosisData, setrangedGnosisData] = React.useState(gnosisData);
    const [rangedxAxis, setRangedxAxis] = React.useState(mainnetxAxisData);

    React.useEffect(() => {
        if (mainnetData.length < Number(timeRange) || timeRange === '0') {
            setrangedMainnetData(mainnetData);
            setrangedArbitrumData(arbitrumData);
            setrangedPolygonData(polygonData);
            setrangedGnosisData(gnosisData)
            setRangedxAxis(mainnetxAxisData)
        } else {
            setrangedMainnetData(mainnetData.slice(mainnetData.length - Number(timeRange)))
            setrangedArbitrumData(arbitrumData.slice(arbitrumData.length - Number(timeRange)))
            setrangedPolygonData(polygonData.slice(polygonData.length - Number(timeRange)))
            setrangedGnosisData(gnosisData.slice(gnosisData.length - Number(timeRange)))
            setRangedxAxis(mainnetxAxisData.slice(mainnetxAxisData.length - Number(timeRange)))
        }
    }, [timeRange]);

    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);
        if (mainnetData.length < Number(event.target.value) || event.target.value === '0') {
            setrangedMainnetData(mainnetData);
            setrangedArbitrumData(arbitrumData);
            setrangedPolygonData(polygonData);
            setrangedGnosisData(gnosisData);
        } else if (mainnetData.length >= Number(event.target.value)) {
            setrangedMainnetData(mainnetData.slice(mainnetData.length - Number(event.target.value)))
            setrangedArbitrumData(arbitrumData.slice(arbitrumData.length - Number(event.target.value)))
            setrangedPolygonData(polygonData.slice(polygonData.length - Number(event.target.value)))
            setrangedGnosisData(gnosisData.slice(gnosisData.length - Number(event.target.value)))
        }
    };

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
                        <MenuItem value={'30'}> 30 days</MenuItem>
                        <MenuItem value={'90'}>90 days</MenuItem>
                        <MenuItem value={'180'}>180 days</MenuItem>
                        <MenuItem value={'365'}>365 days</MenuItem>
                        <MenuItem value={'0'}>All time</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            <ProtocolTVLCharts  
                mainnetData={rangedMainnetData} 
                arbitrumData={rangedArbitrumData} 
                polygonData={rangedPolygonData} 
                gnosisData={rangedGnosisData}
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