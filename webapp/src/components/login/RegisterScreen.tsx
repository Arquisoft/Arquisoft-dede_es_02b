import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import LoginNavBar from './LoginNavBar';
import Register from './Register';

export default function RegisterScreen() {

  return (
    <>
        <LoginNavBar/>
        <Register />
    </>
  );
}
