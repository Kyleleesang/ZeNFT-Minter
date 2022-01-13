<<<<<<< HEAD
import './App.css';
import React, { Component }  from 'react';
import Minter from './Minter'

function App() {
  return (
    <div className="App">
      <Minter></Minter>
    </div>
=======
import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Profile from './Profile';
import TestComponent from './TestComponent';
import { Container } from "react-bootstrap"
import {Route,Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import Search from './Search';
import UpdateProfile from "./UpdateProfile";
import NFT from "./NFT";
import NFTProfile from './NFTProfile';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



function App() {
  
  return (
    
    
    <div >
      
            <PrivateRoute exact path="/Profile" component={Profile} />
            <PrivateRoute path="/UpdateProfile" component={UpdateProfile} />
            <PrivateRoute path="/NFT" component={NFT} />
            <Route exact path='/TestComponent' component={TestComponent}/>
            <Route exact path='/Login' component={Login}/>
            <Route exact path='/Search' component={Search}/>
      <Route exact path='/Signup' component={Signup}/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/NFTProfile' component={NFTProfile}/>
     
         
    </div>

    
    
   
>>>>>>> 5a37ff0fa0e88095dc4635700089534dae0dd253
  );
}

export default App;
