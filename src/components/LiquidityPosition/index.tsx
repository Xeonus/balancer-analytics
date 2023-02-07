import { Avatar, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from '@mui/material/styles'
import { ChainPortfolio, PortfolioItemList } from "../../data/debank/debankTypes";
import { formatDollarAmount, formatNumber } from "../../utils/numbers";
import PoolCurrencyLogo from "../PoolCurrencyLogo";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface LiquidityPositionProps {
    position: ChainPortfolio
}

export default function LiquidityPosition({ position }: LiquidityPositionProps) {

    const theme = useTheme();

    function getPostionUsdValue(items: PortfolioItemList[]) {
        return items.reduce((acc, el) => acc + el.stats.net_usd_value, 0);

    }

    //Table component
    function createTableData(
        tokens: { address: string }[],
        balances: number[],
        totalAmount: number,
    ) {
        return { tokens, balances, totalAmount };
    }

    const poolPosition = (portfolioItemList: PortfolioItemList[]) => {

        const rows = portfolioItemList.map(item => {
            return {
                names: item.detail.supply_token_list.reduce((accumulator: string[], currentValue) => {
                    accumulator.push(
                        currentValue.symbol
                    );
                    return accumulator;
                }, []),
                tokens: item.detail.supply_token_list.reduce((accumulator: { address: string }[], currentValue) => {
                    accumulator.push({
                        address: currentValue.id
                    });
                    return accumulator;
                }, []),
                balances: item.detail.supply_token_list.reduce((accumulator: number[], currentValue) => {
                    accumulator.push(currentValue.amount);
                    return accumulator;
                }, []),
                totalAmount: item.detail.supply_token_list.reduce((acc, el) => acc + el.amount * el.price, 0),
                description: item.detail.description ? item.detail.description : '',
            }
        })

        return (

            <TableContainer >
                <Table size={'small'} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pool</TableCell>
                            <TableCell 
                                align="right"
                                sx={{ display: {xs: 'none', md: 'table-cell' }}}
                                >
                                    Balances
                                </TableCell>
                            <TableCell align="right">USD Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.totalAmount + row.description}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ maxWidth: '50px' }} align="right">
                                    <Box display="flex" alignItems="center">
                                        <PoolCurrencyLogo tokens={row.tokens} />
                                        <Box ml={1}
                                            sx={{display: {xs: 'none', md: 'table-cell' }}}
                                        >
                                            <Typography variant="body2" fontWeight={"bold"}>
                                                {row.description ? row.description : row.names.join(" + ")}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    sx={{ maxWidth: '100px', display: {xs: 'none', md: 'table-cell' }}}
                                    align="right"
                                >
                                    <Box alignItems="row" >
                                        {row.balances.map(balance =>
                                            <Typography
                                                variant="body2"
                                            >
                                                {formatNumber(balance)} {row.names[row.balances.indexOf(balance)]}
                                            </Typography>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="right">
                                    {formatDollarAmount(row.totalAmount)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <Grid>
            {getPostionUsdValue(position.portfolio_item_list) > 0 ?
                <Grid item >
                    <Box mt={2} mb={2} display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems={"center"} >
                            <Avatar
                                sx={{
                                    height: '30px',
                                    width: '30px',
                                    backgroundColor: theme.palette.mode === 'dark' ? 'white' : 'rgb(226, 232, 240)',
                                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                                    fontSize: '15px',
                                }}
                                src={position.logo_url} />
                            <Box ml={1}>
                                <Typography variant="body1" fontWeight="bold" >{position.name}</Typography>
                            </Box>
                        </Box>
                        <Typography variant="body1" fontWeight="bold" >{formatDollarAmount(getPostionUsdValue(position.portfolio_item_list))}</Typography>

                    </Box>
                    <Card>
                        <Box >
                            {poolPosition(position.portfolio_item_list)}
                        </Box>
                    </Card>
                </Grid> : undefined}
        </Grid>
    );
}