import React, { useState, useEffect } from 'react';
import Login from './Login';
import LoginNavBar from './LoginNavBar';

export default function LoginScreen() {

  return (
    <>
        <LoginNavBar/>
        <Login />
    </>
  );
}
