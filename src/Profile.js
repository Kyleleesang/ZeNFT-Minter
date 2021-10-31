import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link, useHistory} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,signOut } from "firebase/auth";
import fire from './fire';
import React,{useState}  from 'react';
import Tabs from "./Tabs";
import { getDatabase, ref, child, get } from "firebase/database";



function Profile(){
    const [user, setUser] = useState(" ");
    const [joined, setJoined] = useState(" ");
    const [name, setName] = useState(" ");
let collect_type = "collector started with bananas"
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${localStorage.currentUser}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    let user_data = snapshot.val();
    setUser(user_data.username);
    setJoined(user_data.joined);
  } else {
    console.log("No data available");
   console.log(localStorage.currentUser)
  }
}).catch((error) => {
  console.error(error);
});
const history = useHistory()
if(localStorage.currentUser === undefined){
    history.push("/");
    console.log("running ")
}
const LogOut = () =>{
    const auth = getAuth();
signOut(auth).then(() => {
    console.log("signed out");
    localStorage.currentUser = undefined
    localStorage.loggedin = false;
    console.log(localStorage.currentUser);
history.push("/Login")
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}
    return(
<div>
<header className="App-header">
    <div>
<div> 
      <img src="yinyang.png"className="App-logo" alt="logo" />
      </div>
    
      
      <div>
      <div> 
      <p className="paragraph">
      {user}
      </p>
      </div>
      <div> 
      <p className="paragraph">
      {collect_type}
      </p>
      </div>
      <div> 
      <p className="paragraph">
      {joined}
      </p>
      </div>
      </div>

      </div>
     
     
     
     
    





      
      
      
      
      <div>
      <button className="nav-button2" onClick={LogOut}>Logout</button>
      </div>
    </header>
    <div className = "App-header2">
    <Tabs >
   <div label="Collected">
     Collected
   </div>
   <div label="Created">
     Created
   </div>
   <div label="Favorited">
Favorited
   </div>
   <div label="Activity">
  Activity
   </div>
   <div label="Offers">
   Offers
   </div>
 </Tabs>
 </div>

   

</div>
    );
}

export default Profile;