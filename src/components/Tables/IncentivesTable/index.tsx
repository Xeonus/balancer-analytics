import * as React from 'react';
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Avatar, Button, Grid, IconButton, InputBase} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {visuallyHidden} from '@mui/utils';
import PoolCurrencyLogo from '../../PoolCurrencyLogo';
import TokensWhite from '../../../assets/svg/tokens_white.svg';
import TokensBlack from '../../../assets/svg/tokens_black.svg';
import {useTheme} from '@mui/material/styles'
import ArbitrumLogo from '../../../assets/svg/arbitrum.svg'
import EtherLogo from '../../../assets/svg/ethereum.svg'
import PolygonLogo from '../../../assets/svg/polygon.svg'
import GnosisLogo from '../../../assets/svg/gnosis.svg'
import OpLogo from '../../../assets/svg/optimism.svg'
import AvalancheLogo from '../../../assets/svg/avalancheLogo.svg'
import BaseLogo from '../../../assets/svg/base.svg'
import ZkEVMLogo from '../../../assets/svg/zkevm.svg'
import {BalancerStakingGauges, SimplePoolData} from "../../../data/balancer/balancerTypes";
import {formatDollarAmount, formatNumber} from "../../../utils/numbers";
import GaugeComposition from "../../GaugeComposition";
import ClearIcon from '@mui/icons-material/Clear';
import {CSVLink} from "react-csv";
import {Download} from "@mui/icons-material";
import {unixToDate} from "../../../utils/date";

interface DownloadData {
    network: string;
    poolName: string,
    votes: number,
    $vlAura: string,
    totalDeposited: number,
    directedRewards: number,
}
interface Data {
    gaugeAddress: string;
    network: string;
    isKilled: boolean;
    poolData: SimplePoolData,
    totalVotes: number,
    votingIncentives: number,
    totalDeposited: number,
    totalRewards: number,
}

function createData(
    gaugeAddress: string,
    network: string,
    isKilled: boolean,
    poolData: SimplePoolData,
    totalVotes: number,
    votingIncentives: number,
    totalDeposited: number,
    totalRewards: number,
): Data {
    return {
        gaugeAddress,
        network,
        isKilled,
        poolData,
        totalVotes,
        votingIncentives,
        totalDeposited,
        totalRewards,
    };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string | SimplePoolData | boolean },
    b: { [key in Key]: number | string | SimplePoolData | boolean },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    isMobileVisible: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'network',
        numeric: false,
        disablePadding: false,
        label: 'Chain',
        isMobileVisible: true,
    },
    {
        id: 'poolData',
        numeric: false,
        disablePadding: false,
        label: '',
        isMobileVisible: false,
    },
    {
        id: 'totalDeposited',
        numeric: true,
        disablePadding: false,
        label: 'Total Deposited',
        isMobileVisible: false,
    },
    {
        id: 'totalRewards',
        numeric: true,
        disablePadding: false,
        label: 'Directed',
        isMobileVisible: true,
    },
    {
        id: 'totalVotes',
        numeric: true,
        disablePadding: false,
        label: 'Votes',
        isMobileVisible: false,
    },
    {
        id: 'votingIncentives',
        numeric: true,
        disablePadding: false,
        label: '$/veBAL',
        isMobileVisible: true,
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    const theme = useTheme()

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            display: {
                                xs: headCell.isMobileVisible ? 'table-cell' : 'none', md: 'table-cell'
                            },
                            paddingLeft: '16px',
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label === '' ?
                                <img src={(theme.palette.mode === 'dark') ? TokensWhite : TokensBlack} alt="Theme Icon"
                                     width="25"/> : headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function IncentivesTable({gaugeDatas, currentRound}: {
    gaugeDatas: BalancerStakingGauges[],
    currentRound: number
}) {
    const theme = useTheme();
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('totalRewards');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const seen = new Set();
    const filteredPoolDatas = gaugeDatas.filter((x) => {
        return !!x && !x.isKilled && !seen.has(x.address) && seen.add(x.pool.address);
    });

    const originalRows = filteredPoolDatas.map(el =>
        createData(
            el.address,
            el.network,
            el.isKilled,
            el.pool,
            el.voteCount ? el.voteCount : 0,
            el.valuePerVote ? el.valuePerVote : 0,
            el.totalDeposited ? el.totalDeposited : 0,
            el.totalRewards ? el.totalRewards : 0,
        )
    )
        .sort((a, b) => b.totalRewards - a.totalRewards);


    const [rows, setRows] = useState<Data[]>([]);
    const [searched, setSearched] = useState<string>("");
    const [downloadData, setDownloadData] = useState<DownloadData[]>([]);

    useEffect(() => {
        const seen = new Set();
        const filteredPoolDatas = gaugeDatas.filter((x) => {
            return !!x && !x.isKilled && !seen.has(x.address) && seen.add(x.pool.address);
        });

        const originalRows = filteredPoolDatas.map(el =>
            createData(
                el.address,
                el.network,
                el.isKilled,
                el.pool,
                el.voteCount ? el.voteCount : 0,
                el.valuePerVote ? el.valuePerVote : 0,
                el.totalDeposited ? el.totalDeposited : 0,
                el.totalRewards ? el.totalRewards : 0,
            )
        )
            .sort((a, b) => b.totalRewards - a.totalRewards);
        setRows(originalRows)

        const downloadRows= originalRows.map(data => ({
            poolName: data.poolData.symbol,
            network: networkStringMap[data.network],
            totalDeposited: parseFloat(data.totalDeposited.toFixed(3)),
            directedRewards: parseFloat(data.totalRewards.toFixed(3)),
            votes: parseFloat(data.totalVotes.toFixed(3)),
            $vlAura: "$" + parseFloat(data.votingIncentives.toFixed(3))
        }));
        setDownloadData(downloadRows)
    }, [gaugeDatas])


    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const requestSearch = (searchedVal: string) => {
        const filteredRows = originalRows.filter((row) => {
            const lowerCaseSearchedVal = searchedVal.toLowerCase();
            const hasPartialMatchInAddress = row.poolData.address.toLowerCase().includes(lowerCaseSearchedVal);
            const hasPartialMatchInSymbol = row.poolData.symbol.toLowerCase().includes(lowerCaseSearchedVal);
            const hasPartialMatchInTokens = row.poolData.tokens.some((token) => token.symbol.toLowerCase().includes(lowerCaseSearchedVal));
            return hasPartialMatchInAddress || hasPartialMatchInSymbol || hasPartialMatchInTokens;
        });
        setRows(filteredRows);
        setSearched(searchedVal)
    };
    const clearSearch = (): void => {
        setSearched("");
        setRows(originalRows)
    };

    interface NetworkLogoMap {
        [networkNumber: string]: string;
    }

    const networkLogoMap: NetworkLogoMap = {
        MAINNET: EtherLogo,
        OPTIMISM: OpLogo,
        POLYGON: PolygonLogo,
        GNOSIS: GnosisLogo,
        ARBITRUM: ArbitrumLogo,
        AVALANCHE: AvalancheLogo,
        ZKEVM: ZkEVMLogo,
        BASE: BaseLogo,
    };

    const networkStringMap :NetworkLogoMap = {
        MAINNET: "Ethereum",
        OPTIMISM: "Optimism",
        POLYGON: "Polygon",
        GNOSIS: "Gnosis",
        ARBITRUM: "Arbitrum",
        AVALANCHE: "Avalanche",
        ZKEVM: "ZkEVM",
        BASE: "Base"
    };

    let filename = "Balancer-VotingIncentives-" + unixToDate(currentRound) + ".csv";
    //Table generation

    return (
        <Box sx={{width: '100%'}}>
            <Grid
                container
                columns={{xs: 4, sm: 8, md: 12}}
                sx={{justifyContent: {md: 'space-between', xs: 'center'}, alignContent: 'center'}}
            >
                <Box>
                    <Paper
                        component="form"
                        sx={{mb: '10px', p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 500, minWidth: 300}}
                    >
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Search for Gauge"
                            inputProps={{'aria-label': 'search Balancer gauges'}}
                            value={searched}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value)}
                        />
                        <IconButton onClick={clearSearch} type="button" sx={{p: '10px'}} aria-label="search">
                            {searched !== "" ? <ClearIcon/> : <SearchIcon/>}
                        </IconButton>

                    </Paper>
                </Box>
                <Box>
                    <CSVLink data={downloadData} filename={filename} >
                        <Button sx={{
                            backgroundColor: "background.paper",
                            boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",
                        }}>
                            <Download/> CSV</Button>
                    </CSVLink>
                </Box>
            </Grid>
            <Paper sx={{mb: 2, boxShadow: 3}}>

                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="number"
                                            tabIndex={-1}
                                            key={row.gaugeAddress + Math.random() * 10}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell sx={{width: '10px'}}>
                                                <Avatar
                                                    sx={{
                                                        height: 20,
                                                        width: 20
                                                    }}
                                                    src={networkLogoMap[row.network]}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                sx={{display: {xs: 'none', md: 'table-cell'}}}
                                            >
                                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                    <Box mr={1}>
                                                        <PoolCurrencyLogo
                                                            tokens={row.poolData.tokens.map(token => ({address: token.address ? token.address.toLowerCase() : ''}))}
                                                            size={'25px'}/>
                                                    </Box>
                                                    <Box>
                                                        <GaugeComposition poolData={row.poolData}/>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right" sx={{display: {xs: 'none', md: 'table-cell'}}}>
                                                {formatDollarAmount(Number(row.totalDeposited ? row.totalDeposited : 0), 3)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatDollarAmount(Number(row.totalRewards ? row.totalRewards : 0), 3)}
                                            </TableCell>
                                            <TableCell align="right" sx={{display: {xs: 'none', md: 'table-cell'}}}>
                                                {formatNumber(Number(row.totalVotes ? row.totalVotes : 0), 3)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatDollarAmount(Number(row.votingIncentives ? row.votingIncentives : 0), 3)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={7}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" alignItems="center" justifyContent={"space-between"}>
                    <Box m={1} display="flex" justifyContent={"flex-start"}>
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense}/>}
                            label="Compact view"
                        />
                    </Box>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Paper>

        </Box>
    );
}

