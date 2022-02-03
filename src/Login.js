import React,{useState} from 'react';
import logo from './images/logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link, useHistory} from 'react-router-dom';
import fire from './fire';
import { getAuth, signInWithEmailAndPassword, } from "firebase/auth";
import { getDatabase } from "firebase/database";

import { Form, Button, Card, Alert } from "react-bootstrap"


function Login() {
    const database = getDatabase(fire);
    const [name, setName] = useState(" ");
    const [pass, setPass] = useState(" ");
    const history = useHistory()
    const handleInput = event => {
      setName(event.target.value);
    };
    const handleInput2 = event => {
        setPass(event.target.value);
      };
  
    const logValue = () => {
      console.log(name);
      console.log(pass);
      const auth = getAuth();
      if(name.indexOf("@") === -1){
alert("please enter valid email address")
      }
      else if(pass.length < 20){
        alert("please enter a password with 20 characters or more")
      }
      else{
        signInWithEmailAndPassword(auth, name, pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          localStorage.currentUser = userCredential.user.uid;
          localStorage.loggedin = true;
          console.log(userCredential.user.uid);
          console.log(userCredential.user.email);
          history.push("/Profile");
          console.log('success')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      }

      
    };
  
    return (
        <div>
            <div className="App-header1" >
      
      
      <button className="nav-button" >
         Investors
         </button>
         <button className="nav-button">
         Creators
         </button>
         <button className="nav-button">
         Careers
         </button>
         <Link to='/'>
         <button  className="nav-button">
         Home
         </button>
         </Link>
         
         
        
      </div>
        <header className="App-header3">
          <div className="card1">
          <div className = "inputdiv"><input className = "input1"  onChange={handleInput} placeholder="Enter email address"/></div>
          <div className = "inputdiv"><input type = "password"  className = "input2"  onChange={handleInput2} placeholder="Enter password"/></div>
        
    <div className="container">
    <button className="nav-button2" onClick={logValue}>Login</button>
    </div>
    </div>
    </header>
    </div>
    );


}

export default Login;
