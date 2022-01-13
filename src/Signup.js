import React,{useState, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link,useHistory} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import fire from './fire';
import { getDatabase,ref,child, set,get } from "firebase/database";
import {Form, Button, Card} from 'react-bootstrap';


function Signup() {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const db = getDatabase(fire);
    const dbRef = ref(getDatabase());
    const [name, setName] = useState(" ");
    const [pass, setPass] = useState(" ");
    const [username, setUser] = useState(" ");
    const[check,setCheck] = useState(false);
    const[check2,setCheck2] = useState(false);
    const [role,setRole] = useState(" ");
    const history = useHistory()
    const handleInput = event => {
      setName(event.target.value);
    };
  
    const handleInput2 = event => {
        setPass(event.target.value);
        console.log(check)
        console.log(check === true);
      };
      const handleInput3 = event => {
        setUser(event.target.value);
        console.log(role);
        
      };
      const handleInput4 = event => {
        setCheck(event.target.checked);
        
        console.log(check)
       
      };
      const handleInput5 = event => {
        setRole(event.target.value);
        
        console.log(role)
       
      };
      const handleInput6 = event => {
        setCheck2(event.target.checked);
        
        console.log(role)
       
      };
  
    const logValue = () => {
      console.log(name);
      console.log(pass);
      console.log(username);
      if(name.indexOf("@") === -1){
          alert("please enter a valid email address");
          return;
      }
      if(pass.length < 20){
          alert("enter a password with at least 20 characters");
          return;
      }
      const auth = getAuth();
if(check2 == true){
    createUserWithEmailAndPassword(auth, name, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    let userid = user.uid;
    let email = user.email;
    console.log('success');
    let date = new Date()

let year = date.getFullYear()

    console.log(dbRef);
if(check === true){
   
    if(role === "Collector"){
        get(child(dbRef, `otheremail/collectors`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              let emails = snapshot.val();
              console.log(emails);
              let emails_new = emails+ "-" + email;
              set(ref(db, 'otheremail' ), {
                collectors:emails_new
                
              });
              
              
              
            } else {
              console.log("No data available");
             console.log(localStorage.currentUser)
            }
          }).catch((error) => {
            console.error(error);
          });

    }
    if(role === "Creator"){
        get(child(dbRef, `emaillist/creators`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              let emails = snapshot.val();
              console.log(emails);
              let emails_new = emails+ "-" + email;
              set(ref(db, 'emaillist'), {
                creators:emails_new
                
              });
              
              
              
            } else {
              console.log("No data available");
             console.log(localStorage.currentUser)
            }
          }).catch((error) => {
            console.error(error);
          });

    }
}




let month  =date.getMonth()
let month2 = months[month]
let joined = month2 +" "+  year
    set(ref(db, 'users/' + userid), {
        email: email,
        NFTs:[],
        username:username,
        joined:joined
        
      });
    // ...
    history.push("/login");
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}//end of if

else{
    alert("please agree to terms of service")
}
    }// end of function;
  
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
        <div className = "inputdiv"><input className = "input1"  onChange={handleInput} placeholder="Enter Email"/></div>
        <div className = "inputdiv"><input className = "input3"  onChange={handleInput3} placeholder="Enter User Name"/></div>
        <div className = "inputdiv"><input type = "password" className = "input2"  onChange={handleInput2} placeholder="Enter Password"/></div>
        <div className = "inputdiv"><label>
          Check here to subscribe to email updates based on your role
          <input
            name="isGoing"
            type="checkbox"
            
            onChange={handleInput4} />
        </label></div>
        <div className = "inputdiv"><label>
          Check to Agree to terms and conditions
          <input
            name="isGoing"
            type="checkbox"
            
            onChange={handleInput6} />
        </label></div>

        <div className = "inputdiv"><label>
          Select your role
          <select  onChange={handleInput5}>
            <option value="Collector">Collector</option>
            <option value="Creator">Creator</option>
            
          </select>
        </label>
        </div>
      
  <div className="container">
  <button className="nav-button2" onClick={logValue}>Sign up</button>
  </div>
  </div>
  </header>
  </div>
    );

    
}

export default Signup;