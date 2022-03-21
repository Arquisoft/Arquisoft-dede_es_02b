import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import LoginNavBar from './LoginNavBar';

const LoginScreen:React.FC=() =>{

  return (
    <>
        <LoginNavBar/>
        <Login/>
    </>
  );
}

export default LoginScreen;
