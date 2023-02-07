import * as React from 'react';
import Box from '@mui/material/Box';
import TableSortLabel from '@mui/material/TableSortLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { CircularProgress } from '@mui/material';
import { formatDollarAmount } from '../../../utils/numbers';
import TokensWhite from '../../../assets/svg/tokens_white.svg';
import TokensBlack from '../../../assets/svg/tokens_black.svg';
import { useTheme } from '@mui/material/styles'
import { useActiveNetworkVersion } from '../../../state/application/hooks';
import { green, red } from '@mui/material/colors';
import { formatTime } from "../../../utils/date";
import StyledExternalLink from "../../StyledExternalLink";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import JoinExitChip, { JoinExitChipProps } from "../JoinExitsTable/JoinExitChip";
import { TransactionHistory, Send2, TokenDict } from "../../../data/debank/debankTypes";
import { getSPWalletName } from "../../../constants/wallets";


interface Data {
    action: string,
    sendReceiveProps: JoinExitChipProps,
    target: string
    value: number,
    time: number,
    txId: string,
}

function createData(
    action: string,
    sendReceiveProps: JoinExitChipProps,
    target: string,
    value: number,
    time: number,
    txId: string,
): Data {
    return {
        action,
        sendReceiveProps,
        target,
        value,
        time,
        txId
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
    a: { [key in Key]: number | string | JoinExitChipProps },
    b: { [key in Key]: number | string | JoinExitChipProps },
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
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Operation',
        isMobileVisible: true,
    },
    {
        id: 'sendReceiveProps',
        numeric: false,
        disablePadding: false,
        label: 'Details',
        isMobileVisible: false,
    },
    {
        id: 'target',
        numeric: false,
        disablePadding: false,
        label: 'Wallet',
        isMobileVisible: false,
    },
    {
        id: 'value',
        numeric: true,
        disablePadding: false,
        label: 'Value',
        isMobileVisible: true,
    },
    {
        id: 'time',
        numeric: true,
        disablePadding: false,
        label: 'Time',
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

export default function TreasuryTransactionTable({ txnHistory }:
    { txnHistory: TransactionHistory }) {

    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('time');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [activeNetwork] = useActiveNetworkVersion();

    if (!txnHistory) {
        return <CircularProgress />;
    }

    if (txnHistory.history_list.length < 1) {
        return (
            <Grid>
                <CircularProgress />
            </Grid>
        );
    }

    //Helper functions
    function obtainSendReceives(sends: Send2[], receives: any[]) {
        const sendReceiveProps = {} as JoinExitChipProps
        if (sends.length > 0) {
            sendReceiveProps.amounts = sends.map(el => el.amount.toString())
            sendReceiveProps.size = 25
            sendReceiveProps.tokenList = sends.map(el => el.token_id)
        } else {
            sendReceiveProps.amounts = receives.map(el => el.amount.toString())
            sendReceiveProps.size = 25
            sendReceiveProps.tokenList = receives.map(el => el.token_id)
        }
        return sendReceiveProps;
    }

    function obtainSPsSendsReceives(sends: Send2[], receives: any[]) {
        if (sends.length > 0) {
            const addresses = sends.map(send => send.to_addr);
            const SPs = addresses.filter(address => getSPWalletName(address) !== '-');
            return SPs[0] ? SPs[0] : '-'
        }
        if (receives.length > 0) {
            const addresses = receives.map(receive => receive.from_addr);
            const SPs = addresses.filter(address => getSPWalletName(address) !== '-');
            return SPs[0] ? SPs[0] : '-'
        }
        return '-';
    }

    function obtainValue(sends: Send2[], receives: any[], token_dict : TokenDict) {
        let value = 0
        if (sends.length > 0) {
            sends.forEach(send => {
                    const price = token_dict[send.token_id] ? token_dict[send.token_id].price : 0
                    value += send.amount * price;

            })
        } else {
            receives.forEach(receive => {
                //const token = token_dict.find(dict => dict.eth.id === receive.token_id)
                const price = token_dict[receive.token_id] ? token_dict[receive.token_id].price : 0
                    value += receive.amount * price;

            })
        }

        return value;

    }

    //Create Rows
    const rows = txnHistory.history_list.map(el =>
        createData(
            el.cate_id === 'receive' ? 'Receive' : 'Send', 
            obtainSendReceives(el.sends, el.receives), 
            el.sends.length > 0 && el.receives.length > 0 ? 'Multicall' : getSPWalletName(obtainSPsSendsReceives(el.sends, el.receives)),
            obtainValue(el.sends, el.receives, txnHistory.token_dict), 
            el.time_at, 
            el.id)

    ).filter(row => row.value > 0)

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

    //Table generation

    return (
        <Box sx={{ width: '100%' }}>
            <Paper elevation={1} sx={{ mb: 2, boxShadow: 3}}>
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
                                            key={row.txId + Math.random() * 10}
                                        >
                                            <TableCell>
                                                <Box display='flex' alignItems='center' alignContent='center'>
                                                    <Box mr={1}>
                                                {row.action === 'Receive' ? <LoginIcon fontSize='small' color='success' /> : <LogoutIcon fontSize='small' color='error' />} 
                                                </Box>
                                                <Typography variant='body1' color={row.action === 'Send' ? red[500] : green[500]}>
                                                    {row.action}
                                                </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ display: {xs: 'none', md: 'table-cell' }}}
                                            >
                                                <JoinExitChip key={row.value + row.txId} amounts={row.sendReceiveProps.amounts} tokenList={row.sendReceiveProps.tokenList} size={35} />
                                            </TableCell>
                                            <TableCell
                                            sx={{ display: {xs: 'none', md: 'table-cell' }}}
                                            >
                                                {row.target}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.value ? formatDollarAmount(row.value) : '-'}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Box display='flex' alignItems='center' alignContent='center' justifyContent='flex-end'>
                                                    {formatTime(`${row.time}`)}
                                                    <Box ml={1}>
                                                        <StyledExternalLink address={row.txId} type={'transaction'} activeNetwork={activeNetwork} />
                                                    </Box>
                                                </Box>
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
                <Box display="flex" alignItems="center" justifyContent={"space-between"}>
                    <Box m={1} display="flex" justifyContent={"flex-start"}>
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
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

