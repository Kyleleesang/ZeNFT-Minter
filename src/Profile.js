import logo from './images/logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link, useHistory} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,signOut } from "firebase/auth";
import fire from './fire';
import React,{useState}  from 'react';
import Tabs from "./Tabs";
import { getDatabase, ref, child, get } from "firebase/database";
import {storage} from "./fire"
import { getStorage,ref as storRef,uploadBytes,getDownloadURL } from "firebase/storage";
import Masonry from 'react-masonry-css';



function Profile(){
    const [user, setUser] = useState(" ");
    const [joined, setJoined] = useState(" ");
    const [name, setName] = useState(" ");
    const [image,setImage] = useState("yinyang.png");
    const [image2, setImage2] = useState("yinyang.png");
    const [twitter,setTwitter] = useState("");
    const [instagram,setInstagram] = useState("");
    const[nav,setNav] = useState("nav-link");
    const[navy,setNavy] = useState("nav-button");
    const[logo,setLogo] = useState("App-logo");
    const[header,setHeader] = useState("App-header");
    

    const storage = getStorage();
const[bio,setBio] = useState("collector started with bananas");
const dbRef = ref(getDatabase());


const starsRef = storRef(storage, 'images/'+localStorage.currentUser+"profile");
getDownloadURL(starsRef)
  .then((url) => {
    // Insert url into an <img> tag to "download"
    setImage(url);
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
  const starsRef2 = storRef(storage, 'images/'+localStorage.currentUser+"background");
getDownloadURL(starsRef2)
  .then((url) => {
    // Insert url into an <img> tag to "download"
    setImage2(url);
    console.log(url);
    
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });


get(child(dbRef, `users/${localStorage.currentUser}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    let user_data = snapshot.val();
    setUser(user_data.username);
    setJoined(user_data.joined);
    setBio(user_data.bio)
    setInstagram(user_data.instagram)
    setTwitter(user_data.twitter)
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
<div className="App-header1"  >
      
      
     
         <Link  className="linker" to='/'>
         <button  className="nav-link">
         Home
         </button>
         </Link>
         <Link  className="linker" to='updateprofile'>
         <button  className="nav-link">
         Update Profile
         </button>
         </Link>
         <Link  className="linker" to='NFT'>
         <button  className="nav-link">
         Mint
         </button>
         </Link>
         
         <button className="nav-button" onClick={LogOut}>Logout</button>
      </div>
<header className="App-header"  style ={{ backgroundImage: `url(/${image2})`}}>
    <div>
<div> 
      <img src={image}className="App-logo" alt="logo" />
      </div>
      <div> <Link to ={instagram}>
      <img  className = "insta" src="./instagram.png" />
      </Link>
      <Link to ={twitter}>
      <img className ="twitt" src="./twitter.png" />
      </Link>
      </div>
      
    
      
      <div>
          
      <div> 
      <p className="paragraph">
      {user}
      </p>
      </div>
      <div> 
      <p className="paragraph">
      {bio}
      </p>
      </div>
      <div> 
      <p className="paragraph">
      {joined}
      </p>
      </div>
      </div>

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