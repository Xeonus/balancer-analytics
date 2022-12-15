import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles';
import { Drawer, Box, Link } from "@mui/material"
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LinkIcon from '@mui/icons-material/Link';
import WavesIcon from '@mui/icons-material/Waves';
import TokenIcon from '@mui/icons-material/Token';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DiscordIconLight from '../../assets/svg/discord-light.svg'
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CoingeckoColor from '../../assets/svg/coingecko-color.svg'
import Polling from '../Header/Polling';
import { NavLink } from "react-router-dom";
import { EthereumNetworkInfo, NetworkInfo } from '../../constants/networks';
import { networkPrefix } from '../../utils/networkPrefix';

export type MenuDrawerProps = {
    drawerWidth: number,
    open: boolean,
    handleDrawerClose: any,
    activeNetwork: NetworkInfo,
}

const MenuDrawer = ({
    drawerWidth,
    open,
    handleDrawerClose,
    activeNetwork }: MenuDrawerProps) => {

    const theme = useTheme();


    //Styled Drawer settings
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const route = activeNetwork === EthereumNetworkInfo ? '' : activeNetwork.route + '/';

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                //backgroundColor: {
                //    opacity: 0.5,
               // }
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem button key={'Protocol Metrics'} disablePadding component={NavLink} to={'/'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Protocol Metrics'} />
                    </ListItemButton>
                </ListItem>
                <ListItem button key={'Chain Metrics'} disablePadding component={NavLink} to={networkPrefix(activeNetwork) + 'chain'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LinkIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Chain Metrics'} />
                    </ListItemButton>
                </ListItem>
                <ListItem button key={'Liquidity Pools'} disablePadding component={NavLink} to={networkPrefix(activeNetwork) + 'pools'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <WavesIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Liquidity Pools'} />
                    </ListItemButton>
                </ListItem>
                <ListItem button key={'Tokens'} disablePadding component={NavLink} to={'/' + route + 'tokens'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <TokenIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Tokens'} />
                    </ListItemButton>
                </ListItem>
                <ListItem button key={'Fees'} disablePadding component={NavLink} to={networkPrefix(activeNetwork) + 'fees'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Protocol Revenue'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={'DAO Treasury'} disablePadding component={NavLink} to={networkPrefix(activeNetwork) + 'treasury'} >
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBalanceWalletIcon />
                        </ListItemIcon>
                        <ListItemText primary={'DAO Treasury'} />
                    </ListItemButton>
                </ListItem>
                <ListItem button key={'Service Providers'} disablePadding component={NavLink} to={networkPrefix(activeNetwork) + 'serviceProviders'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HandshakeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Service Providers'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <Divider />
            <Box position={"fixed"} bottom="0" maxWidth={drawerWidth}>
            <Box display="flex" justifyContent="space-between" paddingX={drawerWidth/6 + 'px'}>
                <Polling />
            </Box>
            <Box display="flex" justifyContent="space-between" paddingX={drawerWidth/6 + 'px'} paddingY="10px">
                <Link href="https://github.com/Xeonus" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon />
                </Link>
                <Link href="https://twitter.com/Xeonusify" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon />
                </Link>
                <Link href="https://discord.balancer.fi" target="_blank" rel="noopener noreferrer">
                    <img src={DiscordIconLight} alt="Discord Icon" width="25" />
                </Link>
            </Box>
            <Box display="flex" justifyContent="space-evenly" paddingX={drawerWidth/6 + 'px'} paddingY="10px">
                <IconButton
                    sx={{
                        ml: 1,
                        animationDuration: 2,
                        height: 30,
                        borderRadius: 1,
                    }}>
                    <Link 
                        color={theme.palette.mode === 'dark' ? 'white' : 'black'} 
                        target="_blank" rel="noopener noreferrer" 
                        variant="caption" display="block" 
                        underline="none" 
                        href="https://coingecko.com">
                        <Box display="flex" alignItems="center" alignContent="center">
                            <Typography variant="caption" >Powered by</Typography>
                            <Box
                                sx={{ display: { xs: 'none', md: 'flex' }, ml: 1 }} >
                                <img src={CoingeckoColor} alt="Coingecko Logo" width="20" />
                            </Box>
                        </Box>
                    </Link>
                </ IconButton>
            </Box>
            </Box>
        </Drawer>
    );
}
export default MenuDrawer;