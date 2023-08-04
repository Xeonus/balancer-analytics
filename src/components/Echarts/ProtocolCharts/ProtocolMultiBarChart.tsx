import React from 'react';
import { Card, Grid, Box } from '@mui/material';
import CustomLinearProgress from '../../Progress/CustomLinearProgress';
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
    polygonZkEVMProtocolData: BalancerChartDataItem[],
    gnosisProtocolData: BalancerChartDataItem[],
    avalancheProtocolData: BalancerChartDataItem[],
    baseProtocolData: BalancerChartDataItem[],
    isUSD : boolean
}



export default function ProtocolMultiBarChart({mainnetProtocolData,
                                                  arbitrumProtocolData,
                                                  polygonProtocolData,
                                                  polygonZkEVMProtocolData,
                                                  gnosisProtocolData,
                                                  avalancheProtocolData,
                                                  baseProtocolData,
                                                  isUSD}: ProtocolAreaChartProps) {

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

    let polygonZkEVMData = polygonZkEVMProtocolData.map(el => Number(el.value.toFixed(2)));

    if (mainnetData && polygonZkEVMData) {
        const diffSize = mainnetData.length - polygonZkEVMData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        polygonZkEVMData = zeroArray.concat(polygonZkEVMData);
    }

    let gnosisData = gnosisProtocolData.map(el => Number(el.value.toFixed(2)));

    if (mainnetData && gnosisData) {
        const diffSize = mainnetData.length - gnosisData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        gnosisData = zeroArray.concat(gnosisData);
    }

    let avalancheData = avalancheProtocolData.map(el => Number(el.value.toFixed(2)));

    if (mainnetData && avalancheData) {
        const diffSize = mainnetData.length - avalancheData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        avalancheData = zeroArray.concat(avalancheData);
    }

    let baseData = baseProtocolData.map(el => Number(el.value.toFixed(2)));

    if (mainnetData && baseData) {
        const diffSize = mainnetData.length - baseData.length;
        const zeroArray = mainnetData.slice(0, diffSize).map(el => 0);
        baseData = zeroArray.concat(baseData);
    }

    //Generic x-Axis
    const mainnetxAxisData = mainnetProtocolData.map(el => el.time);

    //---Hooks for custom time ranges---
    const [timeRange, setTimeRange] = React.useState('365');
    //data state
    const [rangedMainnetData, setrangedMainnetData] = React.useState(mainnetData)
    const [rangedArbitrumData, setrangedArbitrumData] = React.useState(arbitrumData);
    const [rangedPolygonData, setrangedPolygonData] = React.useState(polygonData);
    const [rangedPolygonZkEVMData, setrangedPolygonZkEVMData] = React.useState(polygonData);
    const [rangedGnosisData, setrangedGnosisnData] = React.useState(gnosisData);
    const [rangedAvalancheData, setrangedAvalanchenData] = React.useState(avalancheData);
    const [rangedBaseData, setRangedBasenData] = React.useState(baseData);
    const [rangedxAxis, setRangedxAxis] = React.useState(mainnetxAxisData);

    React.useEffect(() => {
        if (mainnetData.length < Number(timeRange) || timeRange === '0') {
            setrangedMainnetData(mainnetData);
            setrangedArbitrumData(arbitrumData);
            setrangedPolygonData(polygonData);
            setrangedPolygonZkEVMData(polygonZkEVMData)
            setrangedGnosisnData(gnosisData)
            setrangedAvalanchenData(avalancheData)
            setRangedBasenData(baseData)
            setRangedxAxis(mainnetxAxisData)
        } else {
            setrangedMainnetData(mainnetData.slice(mainnetData.length - Number(timeRange)))
            setrangedArbitrumData(arbitrumData.slice(arbitrumData.length - Number(timeRange)))
            setrangedPolygonData(polygonData.slice(polygonData.length - Number(timeRange)))
            setrangedPolygonZkEVMData(polygonZkEVMData.slice(polygonZkEVMData.length - Number(timeRange)))
            setrangedGnosisnData(gnosisData.slice(gnosisData.length - Number(timeRange)))
            setrangedAvalanchenData(avalancheData.slice(avalancheData.length - Number(timeRange)))
            setRangedBasenData(baseData.slice(baseData.length - Number(timeRange)))
            setRangedxAxis(mainnetxAxisData.slice(mainnetxAxisData.length - Number(timeRange)))
        }
    }, [timeRange]);

    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as string);
        if (mainnetData.length < Number(event.target.value) || event.target.value === '0') {
            setrangedMainnetData(mainnetData);
            setrangedArbitrumData(arbitrumData);
            setrangedPolygonData(polygonData);
            setrangedPolygonZkEVMData(polygonZkEVMData)
            setrangedGnosisnData(gnosisData);
            setRangedBasenData(baseData)
            setrangedAvalanchenData(avalancheData)
        } else if (mainnetData.length >= Number(event.target.value)) {
            setrangedMainnetData(mainnetData.slice(mainnetData.length - Number(event.target.value)))
            setrangedArbitrumData(arbitrumData.slice(arbitrumData.length - Number(event.target.value)))
            setrangedPolygonData(polygonData.slice(polygonData.length - Number(event.target.value)))
            setrangedPolygonZkEVMData(polygonZkEVMData.slice(polygonZkEVMData.length - Number(event.target.value)))
            setrangedGnosisnData(gnosisData.slice(gnosisData.length - Number(event.target.value)))
            setrangedAvalanchenData(avalancheData.slice(avalancheData.length - Number(event.target.value)))
            setRangedBasenData(baseData.slice(baseData.length - Number(event.target.value)))
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
                        <MenuItem value={'7'}> 7 days</MenuItem>
                        <MenuItem value={'30'}> 30 days</MenuItem>
                        <MenuItem value={'90'}>90 days</MenuItem>
                        <MenuItem value={'180'}>180 days</MenuItem>
                        <MenuItem value={'365'}>365 days</MenuItem>
                        <MenuItem value={'0'}>All time</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            <ProtocolMultiBarCharts  
                mainnetData={rangedMainnetData} 
                arbitrumData={rangedArbitrumData} 
                polygonData={rangedPolygonData}
                polygonZkEVMData={rangedPolygonZkEVMData}
                gnosisData={rangedGnosisData}
                avalancheData={rangedAvalancheData}
                baseData={rangedBaseData}
                xAxis={rangedxAxis}
                isUSD={isUSD}
                />
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