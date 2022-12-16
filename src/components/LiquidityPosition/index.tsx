import { Avatar, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from '@mui/material/styles'
import { ChainPortfolio, PortfolioItemList, SupplyTokenList } from "../../data/debank/debankTypes";
import { formatDollarAmount } from "../../utils/numbers";

interface LiquidityPositionProps {
    position: ChainPortfolio
}

export default function LiquidityPosition({position} : LiquidityPositionProps) {

    const theme = useTheme();

    function getPostionUsdValue(items : PortfolioItemList[]) {
        return items.reduce((acc, el) => acc + el.stats.net_usd_value, 0);

    }

    const poolPostion = (supplyTokens: SupplyTokenList[]) => {
        <Box>
            {supplyTokens.map(token => 
            <Typography>{token.amount}</Typography> 
            )}
        </Box>
    }

    return (
        <Grid>
            {getPostionUsdValue(position.portfolio_item_list) > 0 ?
            <Grid item >
            <Box display="flex" alignItems="center" justifyContent="space-between">
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
                            <Typography variant="h6">{position.name}</Typography>
                    </Box>
                </Box>
                <Typography variant="h6">{formatDollarAmount(getPostionUsdValue(position.portfolio_item_list))}</Typography>
            </Box>  
            </Grid> : undefined }
            <Grid item >
                <Card>
                    
                </Card>
            </Grid>
            </Grid>         
    );
}