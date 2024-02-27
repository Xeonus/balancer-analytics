import * as React from 'react';
import {useState} from "react";
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
import {
    Avatar,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {visuallyHidden} from '@mui/utils';
import {formatDollarAmount, formatNumber} from '../../../utils/numbers';

import TokensWhite from '../../../assets/svg/tokens_white.svg';
import TokensBlack from '../../../assets/svg/tokens_black.svg';
import {useTheme} from '@mui/material/styles'
import {useNavigate} from 'react-router-dom';

import {NetworkFees, PoolFeeRecord} from "../../../data/maxis/maxiStaticTypes";
import EtherLogo from "../../../assets/svg/ethereum.svg";

import PolygonLogo from "../../../assets/svg/polygon.svg";
import GnosisLogo from "../../../assets/svg/gnosis.svg";
import ArbitrumLogo from "../../../assets/svg/arbitrum.svg";
import BaseLogo from  "../../../assets/svg/base.svg"
import AvaxLogo from  "../../../assets/svg/avalancheLogo.svg"
import ZkevmLogo from "../../../assets/svg/zkevm.svg"


import {BalancerPieChartDataItem, TokenFilters} from "../../../data/balancer/balancerTypes";



interface Data {
    network: string;
    earnedFees: number;
    sweptFees: number;
    difference: number;
}

function createData(
    network: string,
    earnedFees: number,
    sweptFees: number,
    difference: number,
): Data {
    return {
        network,
        earnedFees,
        sweptFees,
        difference,
    };
}

interface SelectionState {
    tokenType: keyof TokenFilters | null;
    poolType: string | null;
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
        id: 'network',
        numeric: false,
        disablePadding: false,
        label: 'Chain',
        isMobileVisible: true,
    },
    {
        id: 'earnedFees',
        numeric: true,
        disablePadding: true,
        label: 'Earned Core Pool Fees',
        isMobileVisible: true,
    },
    {
        id: 'sweptFees',
        numeric: true,
        disablePadding: false,
        label: 'Total Fees Swept',
        isMobileVisible: true,
    },
    {
        id: 'difference',
        numeric: true,
        disablePadding: false,
        label: 'Diff Ratio (Swept/Earned)',
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
                                     width="25"/> :
                                <Typography variant='body2' sx={{fontWeight: 'bold'}}>{headCell.label}</Typography>}
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

export default function CorePoolEarnedVsSweptTable({
                                          networkData,
                                          historicalCollectedNetworkFees,
                                      }: {
    networkData: BalancerPieChartDataItem[],
    historicalCollectedNetworkFees: NetworkFees,
}) {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Data>('earnedFees');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(25);




    let navigate = useNavigate();

    if (!networkData && !historicalCollectedNetworkFees) {
        return <CircularProgress/>;
    }

    if ((!networkData || !historicalCollectedNetworkFees) || (networkData.length === 0 || historicalCollectedNetworkFees.mainnet === 0)) {
        return (
            <Grid>
                <CircularProgress/>
            </Grid>
        );
    }


    //Create rows
    const rows = networkData.map(item => {
        const networkLowerCase = item.name.toLowerCase();
        const earnedFees = item.value;
        // Accessing dynamic property names in TypeScript, ensure historicalCollectedNetworkFees is properly typed or use any as a fallback
        const sweptFees = historicalCollectedNetworkFees[networkLowerCase as keyof NetworkFees] ?? 0;
        const difference = sweptFees > 0 ? ((sweptFees / earnedFees)) : 0;

        return createData(item.name, earnedFees, sweptFees, difference);
    }, [] as Data[]);

    //const totalPercent = rows.reduce((acc,row) => acc + row.contribution, 0)
    //console.log("totalPercent", totalPercent)

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
        [networkNumber: string]: string;
    }

    const networkLogoMap: NetworkLogoMap = {
        MAINNET: EtherLogo,
        POLYGON: PolygonLogo,
        GNOSIS: GnosisLogo,
        ARBITRUM: ArbitrumLogo,
        AVALANCHE: AvaxLogo,
        BASE: BaseLogo,
        ZKEVM: ZkevmLogo,
    };








    //Table generation

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{mb: 2, boxShadow: 3}}>
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
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => {
                                                navigate(`${row.network.toUpperCase()}/`);
                                            }}
                                            role="number"
                                            tabIndex={-1}
                                            key={row.network}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell sx={{width: '10px'}}>
                                                <Avatar
                                                    sx={{
                                                        height: 20,
                                                        width: 20
                                                    }}
                                                    src={networkLogoMap[row.network.toUpperCase()]}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatDollarAmount(row.earnedFees)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatDollarAmount(row.sweptFees)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {formatNumber(row.difference, 4)}
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
