import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import LoginNavBar from './LoginNavBar';

type LoginScreenProps = {
  setLogueado: (logueado: boolean) => void;
  logueado: boolean;
};


export default function LoginScreen(props: LoginScreenProps) {

  return (
    <>
        <LoginNavBar/>
        <Login 
        setLogueado={props.setLogueado} 
        logueado={props.logueado}/>
    </>
  );
}
