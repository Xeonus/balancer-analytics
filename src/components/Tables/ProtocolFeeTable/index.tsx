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
import {Avatar, CircularProgress, Grid, Typography} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {visuallyHidden} from '@mui/utils';
import {PoolFeeData} from '../../../data/balancer/balancerTypes';
import {formatAmount, formatDollarAmount} from '../../../utils/numbers';
import {POOL_HIDE} from '../../../constants'
import TokensWhite from '../../../assets/svg/tokens_white.svg';
import TokensBlack from '../../../assets/svg/tokens_black.svg';
import {useTheme} from '@mui/material/styles'
import {useNavigate} from 'react-router-dom';
import {networkPrefix} from '../../../utils/networkPrefix';
import {useActiveNetworkVersion} from '../../../state/application/hooks';
import {
    ArbitrumNetworkInfo, AvalancheNetworkInfo, BaseNetworkInfo,
    EthereumNetworkInfo,
    GnosisNetworkInfo,
    NetworkInfo,
    PolygonNetworkInfo, PolygonZkEVMNetworkInfo
} from '../../../constants/networks';
import {PoolDataUnified, PoolTokenDataUnified} from "../../../data/balancer-api-v3/balancerUnifiedTypes";
import PoolCompositionUnified from "../../PoolCompositionUnified";
import PoolCurrencyLogoUnified from "../../PoolCurrencyLogoUnified";
import {PoolFeeRecord} from "../../../data/maxis/maxiStaticTypes";
import EtherLogo from "../../../assets/svg/ethereum.svg";
import PolygonLogo from "../../../assets/svg/polygon.svg";
import GnosisLogo from "../../../assets/svg/gnosis.svg";
import ArbitrumLogo from "../../../assets/svg/arbitrum.svg";
import BaseLogo from  "../../../assets/svg/base.svg"
import AvaxLogo from  "../../../assets/svg/avalancheLogo.svg"
import PoolCompositionFeeData from "../../PoolCompositionFeeData";


interface Data {
    network: string;
    name: string;
    poolTokens: PoolTokenDataUnified[];
    poolData: PoolFeeData;
    earnedFees: number;
    tvl: number;
    isCore: boolean;
}

function createData(
    network: string,
    name: string,
    poolTokens: PoolTokenDataUnified[],
    poolData: PoolFeeData,
    earnedFees: number,
    tvl: number,
    isCore: boolean,
): Data {
    return {
        network,
        name,
        poolTokens,
        poolData,
        earnedFees,
        tvl,
        isCore
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
    a: { [key in Key]: number | boolean | string | PoolTokenDataUnified[] | PoolFeeData },
    b: { [key in Key]: number | boolean | string | PoolTokenDataUnified[] | PoolFeeData },
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
        id: 'poolTokens',
        numeric: false,
        disablePadding: false,
        label: '',
        isMobileVisible: true,
    },
    {
        id: 'isCore',
        numeric: false,
        disablePadding: false,
        label: 'Core Pool',
        isMobileVisible: true,
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Pool Composition',
        isMobileVisible: false,
    },
    {
        id: 'tvl',
        numeric: true,
        disablePadding: false,
        label: 'TVL',
        isMobileVisible: true,
    },
    {
        id: 'earnedFees',
        numeric: true,
        disablePadding: false,
        label: 'Earned Protocol Fees',
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

export default function ProtocolFeeTable({
                                          poolDatas,
                                          corePools,
                                      }: {
    poolDatas: PoolFeeData[],
    corePools: PoolFeeRecord[],
}) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('earnedFees');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [activeNetwork] = useActiveNetworkVersion();
    let navigate = useNavigate();

    if (!poolDatas && !corePools) {
        return <CircularProgress/>;
    }

    if ((!poolDatas || !corePools) || (corePools.length === 0 || poolDatas.length === 0)) {
        return (
            <Grid>
                <CircularProgress/>
            </Grid>
        );
    }

    //Create rows
    const rows = poolDatas.reduce((acc, poolData) => {
        // Check the necessary conditions before processing.
        if (poolData && poolData.poolType !== 'LIQUIDITY_BOOTSTRAPPING' &&
            !POOL_HIDE.includes(poolData.id) && poolData.liquidity > 100) {
            // Find the matching core pool record.
            const corePoolRecord = corePools.find(c => c.poolId === poolData.id);


                // Parse 'earned_fees' as a float to ensure numeric sorting.
                //const earnedFeesNumeric = parseFloat(corePoolRecord.earned_fees);
                // If a match is found, create the row data and accumulate it.
                const rowData = createData(
                    activeNetwork.name,
                    poolData.name,
                    poolData.tokens,
                    poolData,
                    poolData.protocolFee,
                    poolData.liquidity,
                    false,
                );
            if (corePoolRecord) {
                rowData.isCore = true
            }
                acc.push(rowData);

        }
        return acc;
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

    const getLink = (activeNetwork: NetworkInfo, id: string) => {
        return networkPrefix(activeNetwork) + 'pools/' + id;
    }

    interface NetworkLogoMap {
        [networkNumber: string]: string;
    }

    interface NetworkInfoMap {
        [networkNumber: string]: NetworkInfo;
    }

    const networkLogoMap: NetworkLogoMap = {
        MAINNET: EtherLogo,
        POLYGON: PolygonLogo,
        GNOSIS: GnosisLogo,
        ARBITRUM: ArbitrumLogo,
        AVALANCHE: AvaxLogo,
        BASE: BaseLogo,
    };

    const networkStringMap :NetworkLogoMap = {
        MAINNET: "Ethereum",
        POLYGON: "Polygon",
        GNOSIS: "Gnosis",
        ARBITRUM: "Arbitrum",
        AVALANCHE: "Avalanche",
        BASE: "Base",
    };

    const networkInfos: NetworkInfoMap = {
        MAINNET: EthereumNetworkInfo,
        POLYGON: PolygonNetworkInfo,
        GNOSIS: GnosisNetworkInfo,
        ARBITRUM: ArbitrumNetworkInfo,
        AVALANCHE: AvalancheNetworkInfo,
        BASE: BaseNetworkInfo,
    }


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
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => {
                                                navigate(`${getLink(networkInfos[activeNetwork.id], row.poolData.id)}/`);
                                            }}
                                            role="number"
                                            tabIndex={-1}
                                            key={row.poolData.address}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell sx={{width: '10px'}}>
                                                <Avatar
                                                    sx={{
                                                        height: 20,
                                                        width: 20
                                                    }}
                                                    src={networkLogoMap[activeNetwork.id]}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <PoolCurrencyLogoUnified tokens={row.poolTokens} size={'25px'}/>
                                            </TableCell>
                                            <TableCell>
                                                {row.isCore ? 'CORE' : 'Non-Core'}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                sx={{display: {xs: 'none', md: 'table-cell'}}}
                                            >
                                                <PoolCompositionFeeData key={row.poolData.id}
                                                                        poolData={row.poolData} size={35}/>
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.tvl > 0 ?
                                                    formatDollarAmount(row.tvl) :
                                                    0
                                                }
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.earnedFees > 0 ?
                                                    formatDollarAmount(row.earnedFees) :
                                                    0
                                                }
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
