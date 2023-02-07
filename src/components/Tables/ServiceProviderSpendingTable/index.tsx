import { BalancerJoinExitFragment } from "../../../apollo/generated/graphql-codegen-generated";
import * as React from 'react';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { CircularProgress } from '@mui/material';
import { formatDollarAmount, formatNumber } from '../../../utils/numbers';
import TokensWhite from '../../../assets/svg/tokens_white.svg';
import TokensBlack from '../../../assets/svg/tokens_black.svg';
import { useTheme } from '@mui/material/styles'
import { CoingeckoRawData } from "../../../data/balancer/useTokens";


export interface Data {
    spName: string,
    quarterlyUSDC: number,
    quarterlyBAL: number,
    quarterlyBALVested: number,
    quarterlyTotal: number;
}

export function createData(
    spName: string,
    quarterlyUSDC: number,
    quarterlyBAL: number,
    quarterlyBALVested: number,
    quarterlyTotal: number,
): Data {
    return {
        spName,
        quarterlyUSDC,
        quarterlyBAL,
        quarterlyBALVested,
        quarterlyTotal
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
    a: { [key in Key]: number | string | BalancerJoinExitFragment },
    b: { [key in Key]: number | string | BalancerJoinExitFragment },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
        id: 'spName',
        numeric: false,
        disablePadding: false,
        label: 'Service Provider',
        isMobileVisible: true,
    },
    {
        id: 'quarterlyUSDC',
        numeric: true,
        disablePadding: false,
        label: 'USDC',
        isMobileVisible: false,
    },
    {
        id: 'quarterlyBAL',
        numeric: true,
        disablePadding: false,
        label: 'BAL',
        isMobileVisible: false,
    },
    {
        id: 'quarterlyBALVested',
        numeric: true,
        disablePadding: false,
        label: 'Vested BAL',
        isMobileVisible: false,
    },
    {
        id: 'quarterlyTotal',
        numeric: true,
        disablePadding: false,
        label: 'Total ($)',
        isMobileVisible: true,
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
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
                        sx={{ display: {xs: headCell.isMobileVisible ? 'table-cell' : 'none', md: 'table-cell' }}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label === '' ? <img src={(theme.palette.mode === 'dark') ? TokensWhite : TokensBlack} alt="Theme Icon" width="25" /> : headCell.label}
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

interface ServiceProviderSpendingTable {
    spRows: Data[],
    year: number,
    quarter: number,
    balPriceData: CoingeckoRawData,
}

export default function ServiceProviderSpendingTable({ spRows, year, quarter, balPriceData }:
    ServiceProviderSpendingTable) {

    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('quarterlyTotal');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    if (!spRows) {
        return <CircularProgress />;
    }

    if (spRows.length < 1) {
        return (
            <Grid>
                <CircularProgress />
            </Grid>
        );
    }


    const rows = spRows.filter((row) => row.quarterlyTotal > 0);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    //Table generation

    return (
        <Box sx={{ width: '100%' }}>
            <Paper elevation={1} sx={{ mb: 2, boxShadow: 3 }}>
                <TableContainer >
                    <Table
                        //sx={{ minWidth: 750 }}
                        sx={{ mb: 2 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="number"
                                            tabIndex={-1}
                                            key={row.spName + Math.random() * 10}
                                        >
                                            <TableCell>
                                                <Typography variant="body2" fontWeight={"bold"}>
                                                {row.spName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{ display: {xs: 'none', md: 'table-cell' }}}
                                                align="right"
                                            >
                                                {formatDollarAmount(row.quarterlyUSDC)}
                                            </TableCell>
                                            <TableCell 
                                                sx={{ display: {xs: 'none', md: 'table-cell' }}}
                                                align="right"
                                            >
                                                {formatNumber(row.quarterlyBAL, 0)}
                                            </TableCell>

                                            <TableCell 
                                                sx={{ display: {xs: 'none', md: 'table-cell' }}}
                                                align="right"
                                            >
                                                {formatNumber(row.quarterlyBALVested, 0)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatDollarAmount(row.quarterlyTotal)}
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
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </Box>
    );
}

