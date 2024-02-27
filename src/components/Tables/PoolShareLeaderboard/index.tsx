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
import { Avatar, Grid, Link } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { CircularProgress } from '@mui/material';
import {formatAmount, formatDollarAmount} from '../../../utils/numbers';
import TokensWhite from '../../../assets/svg/tokens_white.svg';
import TokensBlack from '../../../assets/svg/tokens_black.svg';
import { useTheme } from '@mui/material/styles'
import { useActiveNetworkVersion } from '../../../state/application/hooks';
import { getEtherscanLink } from "../../../utils";
import { deepPurple } from '@mui/material/colors';
import { generateIdenticon } from '../../../utils/generateIdenticon';
import {ethers} from "ethers";
import {UserPoolAndGaugeShares} from "../../../data/balancer/useGetPoolUserBalances";


interface Data {
    id: number,
    accountId: string,
    amountBPT: number,
    amount: number,
    fraction: number,
}

function createData(
    id: number,
    accountId: string,
    amountBPT: number,
    amount: number,
    fraction: number,
): Data {
    return {
        id,
        accountId,
        amountBPT,
        amount,
        fraction,
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
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
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
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: '#',
        isMobileVisible: true,
    },
    {
        id: 'accountId',
        numeric: false,
        disablePadding: false,
        label: 'Account',
        isMobileVisible: true,
    },
    {
        id: 'amountBPT',
        numeric: true,
        disablePadding: false,
        label: 'Shares (BPT)',
        isMobileVisible: false,
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Shares Worth ($)',
        isMobileVisible: false,
    },
    {
        id: 'fraction',
        numeric: true,
        disablePadding: false,
        label: 'Relative Share',
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
                        sx={{ display: { xs: headCell.isMobileVisible ? 'table-cell' : 'none', md: 'table-cell' } }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            //sx={{ display: {xs: headCell.isMobileVisible ? 'block' : 'none', md: 'table-cell' }}}
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

export default function PoolShareLeaderboard({ leaderboardInfo, pricePerBPT }: { leaderboardInfo: UserPoolAndGaugeShares[], pricePerBPT: number }) {

    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('fraction');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [activeNetwork] = useActiveNetworkVersion();
    const ensDict: { [key: string]: string | null } = {};
    const [localEnsMap, setLocalEnsMap] = React.useState(ensDict);

    React.useEffect(() => {
        if (leaderboardInfo && leaderboardInfo.length > 0) {
            const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');

            const updateENSMap = async () => {
                const ensLocalMap = { ...localEnsMap };

                for (let x = page * rowsPerPage; x <= page * rowsPerPage + rowsPerPage - 1; x++) {
                    let account = leaderboardInfo[x].userAddress;
                    //Resolve known protocols
                    if (account === '0xaF52695E1bB01A16D33D7194C28C42b10e0Dbec2'.toLowerCase()) {
                        ensLocalMap[account] = 'AURA Protocol'
                    } else if (account === '0x76ba3eC5f5adBf1C58c91e86502232317EeA72dE'.toLowerCase()) {
                        ensLocalMap[account] = 'RADIANT Protocol'
                    } else if (account && localEnsMap[account] === undefined) {
                        const response = await provider.lookupAddress(account);
                        ensLocalMap[account] = response;
                    }
                }

                setLocalEnsMap(ensLocalMap);
            };

            updateENSMap();
        }
    }, [leaderboardInfo.length, page]);

    console.log(localEnsMap);



    if (!leaderboardInfo) {
        return <CircularProgress />;
    }

    if (leaderboardInfo.length < 1) {
        return (
            <Grid>
                <CircularProgress />
            </Grid>
        );
    }


    const sortedLeaderboardInfo = leaderboardInfo.sort(function (a, b) {
        return b.balance - a.balance;
    });

    const totalBalance: number = sortedLeaderboardInfo
        .reduce((sum, share) => sum + share.balance, 0);

    const rows = sortedLeaderboardInfo.map(el =>
        createData(sortedLeaderboardInfo.indexOf(el) + 1, el.userAddress, el.balance, el.balance, 100 / totalBalance * el.balance)

    )

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
            <Paper elevation={1} sx={{ mb: 2, boxShadow: 3 }}>
                <TableContainer>
                    <Table
                        //sx={{ minWidth: 750 }}
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
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="number"
                                            tabIndex={-1}
                                            key={row.accountId}
                                        >
                                            <TableCell align="left">
                                                {row.id}
                                            </TableCell>
                                            <TableCell
                                                sx={{ display: { xs: 'none', md: 'table-cell' } }}
                                            >
                                                <Box display="flex" alignItems="center" alignContent="center">
                                                    <Box mr={1}>
                                                        <Avatar
                                                            sx={{
                                                                bgcolor: deepPurple[500],
                                                                height: 25,
                                                                width: 25,
                                                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
                                                            }}
                                                            src={generateIdenticon(row.accountId)}
                                                        />
                                                    </Box>
                                                    <Link href={getEtherscanLink(row.accountId, 'address', activeNetwork)}
                                                          target='_blank'>     {localEnsMap[row.accountId] ? localEnsMap[row.accountId] : row.accountId}</Link>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ display: { xs: 'none', md: 'table-cell' } }}
                                            >
                                                {formatAmount(row.amountBPT, 4)}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ display: { xs: 'none', md: 'table-cell' } }}
                                            >
                                                {formatDollarAmount(row.amount * pricePerBPT, 2)}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ display: { xs: 'none', md: 'table-cell' } }}
                                            >
                                                {formatAmount(row.fraction, 2) + ' %'}
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

