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
import {IconButton, InputBase} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {visuallyHidden} from '@mui/utils';
import TokensWhite from '../../../assets/svg/tokens_white.svg';
import TokensBlack from '../../../assets/svg/tokens_black.svg';
import {useTheme} from '@mui/material/styles'
import ArbitrumLogo from '../../../assets/svg/arbitrum.svg'
import EtherLogo from '../../../assets/svg/ethereum.svg'
import PolygonLogo from '../../../assets/svg/polygon.svg'
import GnosisLogo from '../../../assets/svg/gnosis.svg'
import OpLogo from '../../../assets/svg/optimism.svg'
import {SimplePoolData} from "../../../data/balancer/balancerTypes";
import {formatDollarAmount, formatNumber} from "../../../utils/numbers";
import ClearIcon from '@mui/icons-material/Clear';
import { HiddenHandData } from '../../../data/hidden-hand/hiddenHandTypes';



interface Data {
    title: string,
    totalVotes: number,
    votingIncentives: number,
    totalRewards: number,
}

function createData(
    title: string,
    totalVotes: number,
    votingIncentives: number,
    totalRewards: number,
): Data {
    return {
        title,
        totalVotes,
        votingIncentives,
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
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Gauge',
        isMobileVisible: true,
    },
    {
        id: 'totalRewards',
        numeric: true,
        disablePadding: false,
        label: 'Rewards',
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
                        sx={{display: {xs: headCell.isMobileVisible ? 'table-cell' : 'none', md: 'table-cell'}}}
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

export default function HistoricalIncentivesTable({gaugeDatas}: {
    gaugeDatas: HiddenHandData[],
}) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('totalRewards');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);



    const originalRows = gaugeDatas.map(el =>
        createData(
            el.title,
            el.voteCount ? el.voteCount : 0,
            el.valuePerVote ? el.valuePerVote : 0,
            el.totalValue ? el.totalValue : 0,

        )
    )
        .sort((a, b) => b.totalRewards - a.totalRewards);


    const [rows, setRows] = useState<Data[]>([]);
    const [searched, setSearched] = useState<string>("");

    useEffect(() => {
        const originalRows = gaugeDatas.map(el =>
            createData(
                el.title,
                el.voteCount ? el.voteCount : 0,
                el.valuePerVote ? el.valuePerVote : 0,
                el.totalValue ? el.totalValue : 0,

            )
        )
            .sort((a, b) => b.totalRewards - a.totalRewards);

        setRows(originalRows)

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
            const hasPartialMatchinTitle = row.title.toLowerCase().includes(lowerCaseSearchedVal);
            return hasPartialMatchinTitle
        });
        setRows(filteredRows);
        setSearched(searchedVal)
    };
    const clearSearch = (): void => {
        setSearched("");
        setRows(originalRows)
    };

    interface NetworkLogoMap {
        [networkNumber: number]: string;
    }

    const networkLogoMap: NetworkLogoMap = {
        1: EtherLogo,
        10: OpLogo,
        137: PolygonLogo,
        100: GnosisLogo,
        42161: ArbitrumLogo
    };


    //Table generation

    return (
        <Box sx={{width: '100%'}}>
            <Paper
                component="form"
                sx={{ mb: '10px', p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 500 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for Gauge"
                    inputProps={{ 'aria-label': 'search Balancer gauges' }}
                    value={searched}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => requestSearch(event.target.value)}
                />
                <IconButton onClick={clearSearch} type="button" sx={{ p: '10px' }} aria-label="search">
                    {searched !== "" ? <ClearIcon /> : <SearchIcon />}
                </IconButton>
            </Paper>
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
                                            key={row.title + Math.random() * 10}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell sx={{maxWidth: '10px'}}>
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatDollarAmount(Number(row.totalRewards ? row.totalRewards : 0),  3)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatNumber(Number(row.totalVotes ? row.totalVotes : 0),  3)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatDollarAmount(Number(row.votingIncentives ? row.votingIncentives : 0),  3)}
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
                                    <TableCell colSpan={6}/>
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

