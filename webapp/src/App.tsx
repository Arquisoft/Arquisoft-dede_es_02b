import React, { useState, useEffect } from 'react';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import './App.css';
import HomeNavBar from './components/HomeNavBar';
import Login from './components/Login';

function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <>
      <HomeNavBar/>
      <Login/>
    </>
  );
}

export default App;
