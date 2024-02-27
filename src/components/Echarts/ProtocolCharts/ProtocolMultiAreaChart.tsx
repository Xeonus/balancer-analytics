import React, { useState, useEffect, useMemo } from 'react';
import { ProtocolData } from '../../../data/balancer/useProtocolDataWithClientOverride';
import { Card, Grid, Box, MenuItem, FormControl, Select, Divider } from '@mui/material';
import CustomLinearProgress from '../../Progress/CustomLinearProgress';
import ProtocolTVLCharts from './ProtocolTVLCharts';
import {SelectChangeEvent} from "@mui/material/Select";
import {BalancerChartDataItem} from "../../../data/balancer/balancerTypes";

interface ProtocolAreaChartProps {
    mainnetProtocolData: ProtocolData,
    arbitrumProtocolData: ProtocolData,
    polygonProtocolData: ProtocolData,
    polygonZkEVMProtocolData: ProtocolData,
    gnosisProtocolData: ProtocolData,
    avalancheProtocolData: ProtocolData,
    baseProtocolData: ProtocolData,
}

const processData = (mainnetData: number[], protocolData: ProtocolData): number[] => {
    const processedData = protocolData.tvlData.map((el: BalancerChartDataItem) => Number(el.value.toFixed(2)));
    if (mainnetData.length > processedData.length) {
        const diffSize = mainnetData.length - processedData.length;
        const zeroArray = Array(diffSize).fill(0);
        return zeroArray.concat(processedData);
    }
    return processedData;
};

export default function ProtocolMultiAreaChart(props: ProtocolAreaChartProps) {
    const { mainnetProtocolData, arbitrumProtocolData, polygonProtocolData, polygonZkEVMProtocolData, gnosisProtocolData, avalancheProtocolData, baseProtocolData } = props;
    const mainnetData = useMemo(() => mainnetProtocolData.tvlData.map(el => Number(el.value.toFixed(2))), [mainnetProtocolData]);
    const mainnetxAxisData = useMemo(() => mainnetProtocolData.tvlData.map(el => el.time), [mainnetProtocolData]);

    const [timeRange, setTimeRange] = useState('365');
    const [chartData, setChartData] = useState({
        mainnetData,
        arbitrumData: processData(mainnetData, arbitrumProtocolData),
        polygonData: processData(mainnetData, polygonProtocolData),
        polygonZkEVMData: processData(mainnetData, polygonZkEVMProtocolData),
        gnosisData: processData(mainnetData, gnosisProtocolData),
        avalancheData: processData(mainnetData, avalancheProtocolData),
        baseData: processData(mainnetData, baseProtocolData),
        xAxis: mainnetxAxisData,
    });

    useEffect(() => {
        const newData = {
            mainnetData: processData(mainnetData, mainnetProtocolData),
            arbitrumData: processData(mainnetData, arbitrumProtocolData),
            polygonData: processData(mainnetData, polygonProtocolData),
            polygonZkEVMData: processData(mainnetData, polygonZkEVMProtocolData),
            gnosisData: processData(mainnetData, gnosisProtocolData),
            avalancheData: processData(mainnetData, avalancheProtocolData),
            baseData: processData(mainnetData, baseProtocolData),
            xAxis: mainnetxAxisData,
        };

        const updateDataForRange = (data: number[], timeRange: string): number[] => {
            const range = Number(timeRange) === 0 ? data.length : Number(timeRange);
            return data.slice(Math.max(data.length - range, 0));
        };

        // Assuming `xAxis` is an array of strings (dates or times) and `timeRange` is a string representing the number of elements to include from the end of the array.
        const updateXAxisForRange = (xAxis: string[], timeRange: string): string[] => {
            const range = Number(timeRange) === 0 ? xAxis.length : Number(timeRange);
            return xAxis.slice(Math.max(xAxis.length - range, 0));
        };



        if (newData.mainnetData.length >= Number(timeRange) || timeRange === '0') {
            setChartData({
                ...newData,
                mainnetData: updateDataForRange(newData.mainnetData, timeRange),
                arbitrumData: updateDataForRange(newData.arbitrumData, timeRange),
                polygonData: updateDataForRange(newData.polygonData, timeRange),
                polygonZkEVMData: updateDataForRange(newData.polygonZkEVMData, timeRange),
                gnosisData: updateDataForRange(newData.gnosisData, timeRange),
                avalancheData: updateDataForRange(newData.avalancheData, timeRange),
                baseData: updateDataForRange(newData.baseData, timeRange),
                xAxis: updateXAxisForRange(newData.xAxis, timeRange),
            });
        }
    }, [timeRange, mainnetProtocolData, arbitrumProtocolData, polygonProtocolData, polygonZkEVMProtocolData, gnosisProtocolData, avalancheProtocolData, baseProtocolData, mainnetData, mainnetxAxisData]);

    const handleChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value);
    };

    return (
        chartData.polygonData.length > 10 ? (
            <Card sx={{ pb: '0px', boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px" }}>
                <Box m={1}>
                    <FormControl size="small">
                        <Select
                            sx={{ backgroundColor: "background.paper", boxShadow: 2, borderRadius: 2, borderColor: 0 }}
                            color="primary"
                            labelId="timeRangeSelectLabel"
                            id="timeRangeSelect"
                            onChange={handleChange}
                            value={timeRange}
                            inputProps={{ name: 'timeRange', id: 'timeRangeId-native-simple' }}
                        >
                            <MenuItem disabled={true} dense={true}>Time range:</MenuItem>
                            <Divider />
                            <MenuItem value={'30'}>30 days</MenuItem>
                            <MenuItem value={'90'}>90 days</MenuItem>
                            <MenuItem value={'180'}>180 days</MenuItem>
                            <MenuItem value={'365'}>365 days</MenuItem>
                            <MenuItem value={'0'}>All time</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <ProtocolTVLCharts {...chartData} />
            </Card>
        ) : (
            <Grid container spacing={2} mt='10%' mb='10%' sx={{ justifyContent: 'center' }}>
                <CustomLinearProgress />
            </Grid>
        )
    );
}
