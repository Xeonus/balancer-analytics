import * as React from "react";
import Box from '@mui/material/Box';
import {
    FormControl,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    Autocomplete,
    Card,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Divider,
} from '@mui/material';
import { balEmissions } from "@balancer-labs/sdk";
import { useActiveNetworkVersion } from "../../state/application/hooks";
import MetricsCard from "../../components/Cards/MetricsCard";
import { useBalancerPools } from "../../data/balancer/usePools";
import { useEffect, useState } from "react";
import CoinCard from "../../components/Cards/CoinCard";
import CircularProgress from "@mui/material/CircularProgress";
import PoolComposition from "../../components/PoolComposition";
import { formatDollarAmount, formatNumber } from "../../utils/numbers";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { calculateAPR, calculateBribeValue } from "./bribeHelpers";
import PoolCurrencyLogo from "../../components/PoolCurrencyLogo";
import Switch from "@mui/material/Switch";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useGetEmissionPerVote } from "../../data/votemarket/useGetEmissionPerVote";
import { useGetVoteMarketIncentives, getTotalVotesFromAnalytics, getTotalIncentivesUSD } from "../../data/votemarket/useGetVoteMarketIncentives";
import { AddShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import useGetCurrentTokenPrices from "../../data/balancer-api-v3/useGetCurrentTokenPrices";

interface TableData {
    parameter: string;
    value: string;
}


type Pool = {
    name: string;
    address: string;
    tvlUSD: number;
};

export default function IncentiveSimulator() {
    const [activeNetwork] = useActiveNetworkVersion();
    const balAddress = "0xba100000625a3754423978a60c9317c58a424e3d";
    const pools = useBalancerPools();


    const [useNewPoolValue, setUseNewPoolValue] = useState(false);
    const [customPoolValue, setCustomPoolValue] = useState<number>(0);
    const [hidePoolSelect, setHidePoolSelect] = useState<boolean>(false);

    const [customLPValue, setCustomLPValue] = useState<number>(0);

    const [isPOL, setIsPOL] = useState<boolean>(false);

    const { data: currentPrices } = useGetCurrentTokenPrices(["MAINNET"]);
    const balPriceData = currentPrices?.find(token => token.address.toLowerCase() === balAddress.toLowerCase());
    const now = Math.round(new Date().getTime() / 1000);
    const weeklyEmissions = balEmissions.weekly(now);

    // Vote Market data (current round)
    const { analytics: voteMarketAnalytics, loading: vmLoading } = useGetVoteMarketIncentives();
    const { emissionValuePerVote, emissionsPerDollarSpent } = useGetEmissionPerVote();

    const [selectedPoolId, setSelectedPoolId] = useState<string>("");
    const [targetAPR, setTargetAPR] = useState<number>(0);
    const [incentivePerVote, setIncentivePerVote] = useState<number>(0);
    const [bribeValue, setBribeValue] = useState<number>(0);

    const getOptionLabel = (pool: Pool) => {
        return `${pool.name} - TVL: ${formatDollarAmount(pool.tvlUSD, 2)}`;
    };

    const handlePoolChange = (
        event: React.SyntheticEvent<Element, Event>,
        newValue: Pool | null
    ) => {
        setSelectedPoolId(newValue ? newValue.address : "");
        setBribeValue(0);
        setTargetAPR(0);
    };

    const handleTargetAPRChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTargetAPR(parseFloat(event.target.value));
        let bribeValue = calculateBribeValue(
            Number(event.target.value),
            customPoolValue,
            emissionValuePerVote,
            incentivePerVote
        );
        setBribeValue(Number(bribeValue));
    };

    const handleBribeValueChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setBribeValue(parseFloat(event.target.value));
        let newTargetAPR = calculateAPR(
            Number(event.target.value),
            customPoolValue,
            emissionValuePerVote,
            incentivePerVote
        );
        setTargetAPR(Number(newTargetAPR));
    };

    const handleUseNewPoolValueChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUseNewPoolValue(event.target.checked);
        setHidePoolSelect(event.target.checked);
    };

    const handlePOLValueChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsPOL(event.target.checked);
    };

    const handlePoolValueChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newCustomPoolValue = parseFloat(event.target.value);
        setCustomPoolValue(isNaN(newCustomPoolValue) ? 0 : newCustomPoolValue);
        setTargetAPR(0);
        setBribeValue(0);
    };

    const handleLPValueChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newCustomLPValue = parseFloat(event.target.value);
        setCustomLPValue(isNaN(newCustomLPValue) ? 0 : newCustomLPValue);
    };


    useEffect(() => {
        if (voteMarketAnalytics && !vmLoading) {
            if (!useNewPoolValue && selectedPoolId) {
                const selectedPool = pools.find((pool) => pool.address === selectedPoolId);
                if (selectedPool) {
                    setCustomPoolValue(selectedPool.tvlUSD);
                }
            }

            // Get totals from Vote Market analytics
            const totalVotes = getTotalVotesFromAnalytics(voteMarketAnalytics);
            const totalValue = getTotalIncentivesUSD(voteMarketAnalytics);

            const incentiveEfficiency = totalVotes > 0 ? totalValue / totalVotes : 0;
            setIncentivePerVote(incentiveEfficiency);
        }
    }, [voteMarketAnalytics, vmLoading, useNewPoolValue, selectedPoolId, pools]);

    const selectedPool = pools.find((pool) => pool.address === selectedPoolId);

    const votingIncentiveRows: TableData[] = [
        { parameter: 'Incentive Budget (weekly)', value: formatDollarAmount(bribeValue) },
        { parameter: 'Pool size ($)', value: useNewPoolValue ? formatDollarAmount(customPoolValue) : formatDollarAmount(selectedPool ? selectedPool.tvlUSD : 0) },
        { parameter: 'Voting incentive cost per veBAL', value: '$' + formatNumber(incentivePerVote, 3) },
        { parameter: 'veBAL votes', value: formatNumber(bribeValue / incentivePerVote) },
        { parameter: 'Emission per veBAL', value: formatDollarAmount(emissionValuePerVote) },
        // Divide by 4: /2 for bi-weekly voting periods, /2 for veBAL emission distribution
        { parameter: 'Total BAL Emission (weekly)', value: formatDollarAmount(emissionValuePerVote * bribeValue / incentivePerVote / 4) },
        { parameter: 'Target APR', value: targetAPR.toString() + '%' },
    ];

    const lpRows: TableData[] = [
        { parameter: 'Position Value ($)', value: formatDollarAmount(customLPValue) },
        { parameter: 'Target APR', value: targetAPR.toString() + '%' },
        { parameter: 'Return (weekly)', value: formatDollarAmount(customLPValue * targetAPR / 100 / 52) },
        { parameter: 'Annual return', value: formatDollarAmount(customLPValue * targetAPR / 100) },
    ];

    const polRows: TableData[] = [
        { parameter: 'POL Position Value ($)', value: formatDollarAmount(customLPValue) },
        { parameter: 'Pool size ($)', value: useNewPoolValue ? formatDollarAmount(customPoolValue) : formatDollarAmount(selectedPool ? selectedPool.tvlUSD : 0) },
        { parameter: 'Target APR', value: targetAPR.toString() + '%' },
        { parameter: 'Return (weekly)', value: formatDollarAmount(customLPValue * targetAPR / 100 / 52) },
        { parameter: 'Annual return', value: formatDollarAmount(customLPValue * targetAPR / 100) },
        { parameter: 'LP size to breakeven (pool %)', value: formatNumber(bribeValue / (emissionValuePerVote * bribeValue / incentivePerVote) * 100) + '%' },
        { parameter: 'Incentives True Cost (weekly)', value: formatDollarAmount(bribeValue - (customLPValue * targetAPR / 100 / 52)) },
        { parameter: 'Incentives True Cost (yearly)', value: formatDollarAmount(bribeValue * 52 - (customLPValue * targetAPR / 100)) },
        { parameter: 'Cost reduction, current LP (%)', value: formatNumber((1 - (bribeValue * 52 - (customLPValue * targetAPR / 100)) / (bribeValue * 52)) * 100) + '%' },
    ];

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={11} md={9}>
                    <Typography variant={"h4"}>
                        Balancer Voting Incentive Placement Simulator
                    </Typography>
                </Grid>
                <Grid item xs={11} md={9}>
                    <Typography variant={"h5"}>BAL Tokenomics</Typography>
                </Grid>
                <Grid item xs={11} md={9}>
                    <Grid
                        container
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{
                            justifyContent: { md: "flex-start", xs: "center" },
                            alignContent: "center",
                        }}
                    >
                        {balPriceData && balPriceData.price ? (
                            <Box m={{ xs: 0, sm: 1 }}>
                                <CoinCard
                                    tokenAddress={balAddress}
                                    tokenName="BAL"
                                    tokenPrice={balPriceData.price}
                                    tokenPriceChange={0}
                                />
                            </Box>
                        ) : (
                            <CircularProgress />
                        )}
                        <Box m={{ xs: 0, sm: 1 }}>
                            <MetricsCard
                                mainMetric={weeklyEmissions}
                                mainMetricInUSD={false}
                                metricName={'Weekly BAL Emissions'}
                                MetricIcon={ShowChartIcon}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={11} md={9}>
                    <Typography variant={"h5"}>Vote Market Metrics (Current Round)</Typography>
                </Grid>
                <Grid item xs={11} md={9}>
                    <Grid
                        container
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{
                            justifyContent: { md: "flex-start", xs: "center" },
                            alignContent: "center",
                        }}
                    >
                        <Box m={{ xs: 0, sm: 1 }}>
                            {emissionValuePerVote ?
                                <MetricsCard mainMetric={emissionValuePerVote} metricName={"Emission $/Vote"}
                                    metricDecimals={4}
                                    mainMetricInUSD={true} MetricIcon={ShoppingCartCheckout} />
                                : <CircularProgress />}
                        </Box>
                        <Box m={{ xs: 0, sm: 1 }}>
                            {emissionsPerDollarSpent ?
                                <MetricsCard
                                    mainMetric={emissionsPerDollarSpent}
                                    metricName={"Emissions per $1"} mainMetricInUSD={true}
                                    metricDecimals={4}
                                    MetricIcon={AddShoppingCart} />
                                : <CircularProgress />}
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={11} md={9}>
                    <Divider />
                </Grid>
                <Grid item xs={11} md={9}>
                    <Typography fontWeight={'bold'} variant={'h5'}>Pool Parameter Selection</Typography>
                </Grid>
                <Grid item xs={11} md={9}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={useNewPoolValue}
                                onChange={handleUseNewPoolValueChange}
                            />
                        }
                        label="Use custom value as pool TVL ($)"
                    />
                </Grid>
                {!hidePoolSelect && (
                    <Grid item xs={11} md={9}>
                        {pools && pools.length > 1 ?
                            <FormControl sx={{ marginBottom: '10px' }}>
                                <Autocomplete
                                    options={pools as Pool[]}
                                    getOptionLabel={getOptionLabel}
                                    value={pools.find((pool) => pool.address === selectedPoolId) || null}
                                    onChange={(event, newValue) => {
                                        handlePoolChange(event, newValue);
                                    }}
                                    sx={{
                                        minWidth: "500px",
                                        maxWidth: "500px"
                                    }}
                                    slotProps={{
                                        paper: {
                                            sx: {
                                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 1,
                                                boxShadow: 3,
                                                opacity: 1,
                                                backdropFilter: 'none',
                                                '& .MuiAutocomplete-listbox': {
                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                                                    opacity: 1,
                                                    '& .MuiAutocomplete-option': {
                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                                                        color: 'text.primary',
                                                        opacity: 1,
                                                        '&:hover': {
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#333333' : '#f5f5f5',
                                                            opacity: 1,
                                                        },
                                                        '&.Mui-focused': {
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#444444' : '#e0e0e0',
                                                            opacity: 1,
                                                        },
                                                        '&[aria-selected="true"]': {
                                                            backgroundColor: 'primary.main',
                                                            color: 'primary.contrastText',
                                                            opacity: 1,
                                                        },
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Select a Pool" size="small" />}
                                />
                            </FormControl> :
                            <Box>
                                <CircularProgress />
                                <Typography>Loading pools...</Typography>
                            </Box>}
                        {!hidePoolSelect && selectedPool ?
                            <Card
                                sx={{
                                    minWidth: '100px',
                                    maxWidth: '900px',
                                    border: '1px solid grey',
                                }}
                            >
                                <Box m={1}>
                                    <Typography variant={'h6'}>Selected Pool</Typography>
                                </Box>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pool Composition</TableCell>
                                            <TableCell>TVL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box mr={1}>
                                                        <PoolCurrencyLogo tokens={selectedPool.tokens} />
                                                    </Box>
                                                    <Box>
                                                        <PoolComposition poolData={selectedPool} />
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{formatDollarAmount(selectedPool.tvlUSD)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Card>
                            : null}
                    </Grid>
                )}
                {useNewPoolValue && (
                    <Grid item xs={11} md={9}>
                        <TextField
                            size="small"
                            label="Theoretical Pool Value ($)"
                            type="number"
                            value={customPoolValue}
                            onChange={handlePoolValueChange}
                        />
                    </Grid>
                )}
                <Grid item xs={11} md={9}>
                    <Typography fontWeight={'bold'} variant={'h5'}>Target APR vs. Voting Incentive Amount</Typography>
                </Grid>
                <Grid item xs={11} md={9}>
                    <Grid
                        container
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{
                            justifyContent: { md: "space-between", xs: "center" },
                            alignContent: "center",
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box mr={1}>
                                <TextField
                                    size="small"
                                    label="Target APR (%)"
                                    type="number"
                                    value={targetAPR}
                                    onChange={handleTargetAPRChange}
                                />
                            </Box>
                            <Box m={1}>
                                <CompareArrowsIcon />
                            </Box>
                            <Box m={1}>
                                <TextField
                                    size="small"
                                    label="Bribe Value ($)"
                                    type="number"
                                    value={bribeValue}
                                    onChange={handleBribeValueChange}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={11} md={9}>
                    <Typography fontWeight={'bold'} variant={'h5'}>Liquidity Provider (LP) Inputs</Typography>
                </Grid>
                <Grid item xs={11} md={9}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isPOL}
                                onChange={handlePOLValueChange}
                            />
                        }
                        label="Protocol Owned Liquidity (POL)"
                    />
                </Grid>
                <Grid item xs={11} md={9}>
                    <TextField
                        size="small"
                        label="LP TVL ($)"
                        type="number"
                        value={customLPValue}
                        onChange={handleLPValueChange}
                    />
                </Grid>
                <Grid item xs={11} md={9}>
                    <Divider />
                </Grid>
                <Grid item xs={11} md={9}>
                    <Typography variant={'h5'}>Voting Incentive Metrics</Typography>
                </Grid>
                <Grid item xs={11} md={9} mb={2}>
                    {bribeValue || targetAPR ?
                        <TableContainer component={Paper}>
                            <Table aria-labelledby="tableTitle"
                                size={'small'}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Parameter</TableCell>
                                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {votingIncentiveRows.map((row) => (
                                        <TableRow key={row.parameter}>
                                            <TableCell component="th" scope="row">
                                                {row.parameter}
                                            </TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> : <Typography>Set parameters</Typography>}
                </Grid>
                {!isPOL ?
                    <Grid item xs={11} md={9}>
                        <Typography variant={'h5'}>LP Metrics</Typography>
                    </Grid> : null}
                {!isPOL ?
                    <Grid item xs={11} md={9} mb={2}>
                        {customLPValue || targetAPR ?
                            <TableContainer component={Paper}>
                                <Table aria-labelledby="tableTitle"
                                    size={'small'}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 'bold' }}>Parameter</TableCell>
                                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Value</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {lpRows.map((row) => (
                                            <TableRow key={row.parameter}>
                                                <TableCell component="th" scope="row">
                                                    {row.parameter}
                                                </TableCell>
                                                <TableCell align="right">{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> : <Typography>Set parameters</Typography>}
                    </Grid> : null}
                {isPOL ?
                    <Grid item xs={11} md={9}>
                        <Typography variant={'h5'}>POL Metrics</Typography>
                    </Grid> : null}
                {isPOL ?
                    <Grid item xs={11} md={9} mb={2}>
                        {bribeValue ?
                            <TableContainer component={Paper}>
                                <Table aria-labelledby="tableTitle"
                                    size={'small'}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 'bold' }}>Parameter</TableCell>
                                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Value</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {polRows.map((row) => (
                                            <TableRow key={row.parameter}>
                                                <TableCell component="th" scope="row">
                                                    {row.parameter}
                                                </TableCell>
                                                <TableCell align="right">{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> : <Typography>Set parameters</Typography>}
                    </Grid> : null}
            </Grid>
        </Box>
    );
}
