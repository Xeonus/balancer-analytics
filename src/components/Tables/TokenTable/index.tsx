import * as React from 'react';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { CircularProgress } from '@mui/material';
import { formatDollarAmount, formatPercentageAmount } from '../../../utils/numbers';
import TokensWhite from '../../../assets/svg/tokens_white.svg';
import TokensBlack from '../../../assets/svg/tokens_black.svg';
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom';
import { networkPrefix } from '../../../utils/networkPrefix';
import { useActiveNetworkVersion } from '../../../state/application/hooks';
import { NetworkInfo } from '../../../constants/networks';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { TokenData } from '../../../data/balancer/balancerTypes'
import CurrencyLogo from '../../CurrencyLogo';
import { green } from '@mui/material/colors';


interface Data {
    token: TokenData;
    price: number,
    priceChange: number,
    volume24: number,
    tvl: number;
}

function createData(
    token: TokenData,
    price: number,
    priceChange: number,
    volume24: number,
    tvl: number,
): Data {
    return {
        token,
        price,
        priceChange,
        volume24,
        tvl,
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
    a: { [key in Key]: number | string | TokenData },
    b: { [key in Key]: number | string | TokenData },
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
        id: 'token',
        numeric: false,
        disablePadding: false,
        label: 'Token',
        isMobileVisible: true,
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
        isMobileVisible: true,
    },
    {
        id: 'priceChange',
        numeric: false,
        disablePadding: true,
        label: 'Price Change',
        isMobileVisible: false,
    },
    {
        id: 'volume24',
        numeric: true,
        disablePadding: false,
        label: 'Volume 24h',
        isMobileVisible: false,
    },
    {
        id: 'tvl',
        numeric: true,
        disablePadding: false,
        label: 'TVL',
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

export default function TokenTable({
    tokenDatas
}: {
    tokenDatas?: TokenData[]
}) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('tvl');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [activeNetwork] = useActiveNetworkVersion();
    let navigate = useNavigate();

    if (!tokenDatas) {
        return <CircularProgress />;
    }

    if (tokenDatas.length < 10) {
        return (
            <Grid>
                <CircularProgress />
            </Grid>
        );
    }

    const filteredTokenDatas = tokenDatas.filter(x => x.address.toLowerCase() !== '0x1aafc31091d93c3ff003cff5d2d8f7ba2e728425');

    const sortedTokenDats = filteredTokenDatas.sort(function (a, b) {
        return b.tvlUSD - a.tvlUSD;
    });

    const rows = sortedTokenDats.map(el =>
        createData(el, el.priceUSD, isNaN(el.priceUSDChange) ? 0 : el.priceUSDChange, el.volumeUSD, el.tvlUSD)

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

    const getLink = (activeNetwork: NetworkInfo, id: string) => {
        return networkPrefix(activeNetwork) + 'tokens/' + id;
    }


    //Table generation

    return (
        <Box sx={{ width: '100%' }}>
            <Paper elevation={3} sx={{ mb: 2, boxShadow: 3 }}>
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
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => { navigate(`${getLink(activeNetwork, row.token.address)}/`); }}
                                            role="number"
                                            tabIndex={-1}
                                            key={row.token.address}
                                        >
                                            <TableCell >
                                                <Box display="flex" alignItems="center">
                                                    <Box mr={1}>
                                                        <CurrencyLogo address={row.token.address} size={'25px'} />
                                                    </Box>
                                                    <Box mr={1}>
                                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{row.token.symbol}</Typography>
                                                    </Box>
                                                    <Typography variant="caption" >({row.token.name})</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">{formatDollarAmount(row.price)}</TableCell>
                                            <TableCell 
                                                align="right"
                                                sx={{ display: {xs: 'none', md: 'table-cell' }}}
                                            >
                                                <Box display="flex" alignItems="center">
                                                    {row.priceChange > 0 ?

                                                        <ArrowUpwardIcon fontSize="small" sx={{ color: green[500] }} />
                                                        :
                                                        <ArrowDownwardIcon fontSize="small" color="error" />}
                                                    <Typography
                                                        color={Number(formatPercentageAmount(row.priceChange)) > 0 ? 'green' : 'error'}
                                                        sx={{
                                                            mr: 1
                                                        }}
                                                        variant="body2"
                                                    >
                                                        {Number(formatPercentageAmount(row.priceChange)).toFixed(2)} %
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell 
                                                align="right"
                                                sx={{ display: {xs: 'none', md: 'table-cell' }}}
                                                >
                                                    {formatDollarAmount(row.volume24)}
                                                </TableCell>
                                            <TableCell align="right">{formatDollarAmount(row.tvl)}</TableCell>
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

