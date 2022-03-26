import React from 'react';
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
