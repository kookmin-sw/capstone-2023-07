import logo from './logo.svg';
import Mainpage from './app/main_page';
import SearchFailed from './app/searchFailed';
import User from './app/user';
import Header from './app/header';
import OpenProfile from './app/openProfile'
import './App.css';

import {BrowserRouter, Routes, Route } from "react-router-dom"

// Get-NetTCPConnection| Where-Object {$_.LocalPort -eq 8000 -and $_.State -eq 'Listen'}| selec
// t-object -ExpandProperty owningprocess

function App() {
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username')

  return (
    <BrowserRouter>
      <Header username={username} />
      <Routes> 
        <Route path="/" element={<Mainpage/>}/>
        <Route path="/SearchFailed" element={<SearchFailed username={username}/>}/>
        <Route path="/user" element={<User username={username}/>}/>
        <Route path="/openProfile" element={<OpenProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
