import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import BalancerLogoWhite from '../src/assets/svg/logo-light.svg'
import BalancerLogoBlack from '../src/assets/svg/logo-dark.svg'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CoingeckoColor from './assets/svg/coingecko-color.svg'
import MoonIcon from './assets/svg/MoonIcon.svg';
import SunIcon from './assets/svg/SunIcon.svg';
import { getThemeDesignTokens } from './assets/theme';
import Home from './pages/Home';
import NetworkSelector from './components/NetworkSelector';
import Polling from './components/Header/Polling'




interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

//Color mode
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const MainContent = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

//Custom Appbar settings
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//Styled Drawer settings
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {

  //Drawer logic
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //Color mode handler
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createTheme(getThemeDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          
          <AppBar position="fixed" open={open} enableColorOnDark sx={{ background: "rgba(255, 255, 255, 0.2)", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)" }}>
            <Toolbar>
            
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Box display="flex" alignItems="center" alignContent="center" justifyContent='flex-end'>
                <Box
                  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                  <img src={(mode === 'dark') ? BalancerLogoBlack : BalancerLogoWhite} alt="Balancer Logo" width="30" />
                </Box>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    textDecoration: 'none',
                    color: (mode === 'dark') ? 'white' : 'black',
                  }}
                >
                  Analytics
                </Typography>
                <Box position="absolute" right="5px" >
                  <Box display="flex" alignItems="center" alignContent="center" justifyContent='flex-end'>
                  <Polling/>
                  <IconButton
                    sx={{
                      mr: 1,
                      animationDuration: 2,
                      width: 40,
                      height: 35,
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                      boxShadow: 2,
                    }}
                    onClick={colorMode.toggleColorMode}>
                    <img src={(mode === 'dark') ? MoonIcon : SunIcon} alt="Theme Icon" width="25" />
                  </IconButton>
                  <NetworkSelector />
                  </Box>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
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
              {['Pool', 'Token', 'Fees', 'Treasury'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Service Providers', 'BAL', 'veBAL'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <Grid position="absolute" alignItems="center" justifyContent="center" direction="column" bottom="2px">
              <Typography>Powered by</Typography>
              <Box
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                <img src={CoingeckoColor} alt="Balancer Logo" width="30" />
              </Box>
            </Grid>
          </Drawer>
          <MainContent open={open}>
            <DrawerHeader />
            <Container maxWidth="xl">
            </Container>
            <Home />
          </MainContent>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;

