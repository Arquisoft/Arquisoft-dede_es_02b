import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from "../logo.png"

const LoginNavBar:React.FC= ()=> {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component="div"
            aria-label='DeDe'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, maxWidth:"100%", maxHeight:"100%", width:"70px", height:"70px"}}
          >
            <img src={logo} alt=""></img>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default LoginNavBar;
