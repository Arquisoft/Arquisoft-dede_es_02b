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
import { Badge } from '@mui/material';
import { Navigate, Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [logueado, setLogueado] = useState(sessionStorage.getItem("emailUsuario"));

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
        <Button key="logout" onClick={logOutUser} sx={{ my: 1, color: anchorElNav===null?'white':'blue', display: 'block' }}>
          Log Out
        </Button>
      );
    }
    else
      return <Navigate to="/login" />;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            DeDe
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              <Link to={"/pedidos"}>
              <Typography key="pedidos" sx={{ my: 1, color: 'blue', textAlign:"center", display: 'block' }}>
                Pedidos
              </Typography>
            </Link>
              <Link to={"/Products"}>
                <MenuItem key={"Products"}>
                  <Typography sx={{ my: 1, color: 'blue', textAlign:"center", display: 'block' }}>Productos</Typography>
                </MenuItem>
              </Link>
              <MenuItem key="logout"> {logOut()}</MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            key="dede"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Dede
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to={"/Products"}>
              <Button
                key={"Products"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Productos
              </Button>
            </Link>
            <Link to={"/pedidos"}>
              <Button key="pedidos" sx={{ my: 2, color: 'white', display: 'block' }}>
                Pedidos
              </Button>
            </Link>
            {logOut()}
          </Box>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Carrito">
              <Link to="/carrito">
                <IconButton sx={{ p: 0, color: 'white' }}>
                  <Badge badgeContent={sessionStorage.length - 1} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
