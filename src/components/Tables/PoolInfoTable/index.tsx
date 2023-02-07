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
import { Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { CircularProgress } from '@mui/material';
import { formatDollarAmount, formatPercentageAmount } from '../../../utils/numbers';
import TokensWhite from '../../../assets/svg/tokens_white.svg';
import TokensBlack from '../../../assets/svg/tokens_black.svg';
import { useTheme } from '@mui/material/styles'
import { PoolData, } from '../../../data/balancer/balancerTypes'
import { STABLE_POOLS } from '../../../constants';
import dayjs from 'dayjs';

interface Data {
    attribute: string;
    value: string;
}

function createData(
    attribute: string,
    value: string,
): Data {
    return {
        attribute,
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
    a: { [key in Key]: string },
    b: { [key in Key]: string },
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
}

const headCells: readonly HeadCell[] = [
    {
        id: 'attribute',
        numeric: false,
        disablePadding: false,
        label: 'Attribute',
    },
    {
        id: 'value',
        numeric: false,
        disablePadding: false,
        label: 'Details',
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

export default function PoolInfoTable({
    poolData,
}: {
    poolData?: PoolData
}) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('attribute');
    if (!poolData) {
        return <CircularProgress />;
    }


    console.log("poolData", poolData)
    //Statically create data elements
    const rows = [
        createData('Pool Name', poolData.name),
        createData('Pool Symbol', poolData.symbol),
        createData('Pool Type', poolData.poolType),
        createData('Holders count', poolData.holdersCount.toString()),
        createData('Swap Fee', formatPercentageAmount(poolData.swapFee * 100) + '%'),
        createData('Pool Owner', poolData.owner),
        createData('Contract address', poolData.address),
        createData('Creation Time', dayjs.unix(poolData.createTime).format('DD.MM.YYYY hh:mm:ss')),
        createData('Pool factory', poolData.factory),
        createData('Price per BPT ($)', formatDollarAmount(poolData.tvlUSD / poolData.totalShares))
    ];
    //Add amp factor if it is a stable pool type
    if (STABLE_POOLS.includes(poolData.poolType)) {
        rows.push(
            createData('Amp Factor', poolData.amp.toString()),
        )
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'desc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    //Table generation

    return (
        <Box sx={{ width: '100%' }}>
            <Paper elevation={1} sx={{ boxShadow: 3 }}>
                <TableContainer>
                    <Table
                        //sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="number"
                                            tabIndex={-1}
                                            key={row.attribute}
                                        >
                                            <TableCell align="left">
                                                <Typography
                                                    sx={{
                                                        fontWeight: 'bold'
                                                    }}>
                                                    {row.attribute}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                            >
                                                <Box
                                                sx={{
                                                    overflow: 'auto', 
                                                    maxWidth: {xs: '250px', md: '900px'} }}
                                                
                                                >
                                                    <Typography
                                                        variant='body2'
                                                    >
                                                        {row.value}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

