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
import {Avatar, IconButton, InputBase, Typography} from '@mui/material';
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
//import zkevmLogo from '../../../assets/svg/zkevm.svg'
import OpLogo from '../../../assets/svg/optimism.svg'

import {formatDollarAmount, formatNumber} from "../../../utils/numbers";

import ClearIcon from '@mui/icons-material/Clear';
import { HiddenHandRewards } from '../../../data/hidden-hand/hiddenHandTypes';
import CurrencyLogo from "../../CurrencyLogo";



interface Data {
    network: number,
    token: string,
    decimals: number,
    claimable: number,
    value: number,
}

function createData(
    network: number,
    token: string,
    decimals: number,
    claimable: number,
    value: number,
): Data {
    return {
        network,
        token,
        decimals,
        claimable,
        value,
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
    a: { [key in Key]: number | string  },
    b: { [key in Key]: number | string  },
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
        label: 'Network',
        isMobileVisible: true,
    },
    {
        id: 'token',
        numeric: false,
        disablePadding: false,
        label: 'Token',
        isMobileVisible: true,
    },
    {
        id: 'claimable',
        numeric: true,
        disablePadding: false,
        label: 'Claimable Amount',
        isMobileVisible: true,
    },
    {
        id: 'value',
        numeric: true,
        disablePadding: false,
        label: 'Value ($)',
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

export default function HiddenHandAddressRewards({rewardData}: {
    rewardData: HiddenHandRewards[],
}) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('value');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);


    const [rows, setRows] = useState<Data[]>([]);

    useEffect(() => {
        const originalRows = rewardData
            .filter(el => el.protocol === "aura")
            .map(el => createData(el.chainId, el.token, el.decimals, Number(el.claimable), el.value))
            .sort((a, b) => b.value - a.value);

        setRows(originalRows)

    }, [rewardData])



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
            {rows.length === 0 ?
                <Box mb={2}>
                    <Typography>No unclaimed rewards found for this address</Typography>
                </Box>
                    :
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
                                            key={row.token + Math.random() * 10}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell sx={{maxWidth: '10px'}}>
                                                <Avatar
                                                    sx={{
                                                        height: 20,
                                                        width: 20
                                                    }}
                                                    src={networkLogoMap[Number(row.network)]}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <CurrencyLogo address={row.token} />
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatNumber(Number(row.claimable),  3)}
                                            </TableCell>

                                            <TableCell align="right">
                                                {formatDollarAmount(Number(row.value),  2)}
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
            }

        </Box>
    );
}

