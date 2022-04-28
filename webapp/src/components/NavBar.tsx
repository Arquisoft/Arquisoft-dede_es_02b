import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ShoppingCart } from '@mui/icons-material';
import { Avatar, Badge } from '@mui/material';
import { Navigate, Link } from 'react-router-dom';
import logo from "./logo.png"

const NavBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [logueado, setLogueado] = useState(sessionStorage.getItem("usuario"));
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function logOut(): JSX.Element {
    const logOutUser = () => {
      sessionStorage.clear();

      setLogueado("");
    };

    if (logueado) {
      return (
        <Button key="logout" onClick={logOutUser} sx={{ my: 1, color: '#1976d2', display: 'block' }}>
          Log Out
        </Button>
      );
    }
    else
      return <Navigate to="/" />;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, maxWidth: "100%", maxHeight: "100%", width: "70px", height: "70px" }}
            >
              <img src={logo} alt=""></img>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, maxWidth:'50%' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              key="menu"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to={"/pedidos"} style={{textDecoration:'none'}}>
                <Typography key="pedidos" sx={{ my: 1, color: '#1976d2', textAlign: "center", display: 'block' }}>
                  Pedidos
                </Typography>
              </Link>
              <Link to={"/Products"} style={{textDecoration:'none'}}>
                <MenuItem key={"Products"}>
                  <Typography sx={{ my: 1, color: '#1976d2', textAlign: "center", display: 'block' }}>Productos</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Box sx={{marginRight:'20%'}}>
          <Link to="/" >
            <Typography
              key="dede"
              
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, maxWidth: "100%", maxHeight: "100%", width: "70px", height: "70px"}}
            >
              <img src={logo} alt=""></img>
            </Typography>
          </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to={"/Products"} style={{textDecoration:'none'}}>
              <Button
                key={"Products"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Productos
              </Button>
            </Link>
            <Link to={"/pedidos"} style={{textDecoration:'none'}}>
              <Button key="pedidos" sx={{ my: 2, color: 'white', display: 'block' }}>
                Pedidos
              </Button>
            </Link>

          </Box>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Carrito">
              <Link to="/carrito" style={{textDecoration:'none'}}>
                <IconButton sx={{ p: 0, color: 'white' }}>
                  <Badge badgeContent={sessionStorage.length - 1} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="editUser">
                <Link to="/editUser" style={{textDecoration:'none'}}>
                <Button key="editUser"  sx={{ my: 1, color: '#1976d2', display: 'block' }}>
                  Editar Usuario
                </Button>
                </Link>
              </MenuItem>
              <MenuItem key="logout"> {logOut()}</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
