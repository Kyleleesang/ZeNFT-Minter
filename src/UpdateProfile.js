import logo from './logo.svg';
import './App.css';
import './Invert.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link, useHistory} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,signOut } from "firebase/auth";
import fire from './fire';
import React,{useState}  from 'react';
import Tabs from "./Tabs";
import { getDatabase, ref, child, get,set,update } from "firebase/database";
import {storage} from "./fire"
import { getStorage,ref as storRef,uploadBytes,getDownloadURL } from "firebase/storage";



function UpdateProfile(){
    const [name, setName] = useState(" ");
    const [pass, setPass] = useState(" ");
    const [username, setUser] = useState(" ");
    const[navy,setNavy] = useState("nav-button");
    const[inv,setInv] = useState("uninv");
    const history = useHistory();
    const db = getDatabase(fire);
    const storage = getStorage();
    let userid = localStorage.currentUser;
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [image2, setImage2] = useState({ preview: "", raw: "" });
    const [url, setUrl] = useState("");
    const[twitter,setTwitter] = useState(" ");
    const[instagram,setInstagram] = useState(" ");

  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        name:e.target.files[0].name
      });
      console.log(e.target.files[0].name);
    }
  };
  const handleChange2 = e => {
    if (e.target.files.length) {
      setImage2({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        name:e.target.files[0].name
      });
      console.log(e.target.files[0].name);
    }
  };
  function invert(){
      if(inv === "uninv"){
        setNavy("nav-button-inverted");
        setInv("inv");
      }
      else{
          setNavy("nav-button");
          setInv("uninv");

      }
  }

  const handleUpload = async e => {
    e.preventDefault();
    
    const storageRef = storRef(storage, 'images/'+userid+"profile");
    uploadBytes(storageRef, image.raw).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(storageRef)
  .then((url) => {
      console.log(url);
    // Insert url into an <img> tag to "download"
  })
  .catch((error) => {
    console.log("errors happening");
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
      });
      

  };
  const handleUpload2 = async e => {
    e.preventDefault();
    const storageRef2 = storRef(storage, 'images/'+userid+"background");
    uploadBytes(storageRef2, image2.raw).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    
  };

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
    
    
    let email = "rbeit508@gmail.com"
    const handleInput1 = event => {
      setName(event.target.value);
      
    };
  
    const handleInput2 = event => {
        setPass(event.target.value);
      };
      const handleInput3 = event => {
        setUser(event.target.value);
        console.log(username)
        
      };
      const handleInput4 = event => {
        setTwitter(event.target.value);
        console.log(twitter)
        
      };
      const handleInput5 = event => {
        setInstagram(event.target.value);
        console.log(instagram)
        
      };
    const Update = () => {
        console.log(userid)
        const updates = {

        }
        if(username !== " "){
            updates['users/'+userid+"/"+"email"] = username
            
        }
        if(pass !== " "){
            updates['users/'+userid+"/"+"bio"] = pass
            
        }
        if(name !== " "){
            updates['users/'+userid+"/"+"username"] = name
            
        }
        if(twitter !== " "){
            updates['users/'+userid+"/"+"twitter"] = twitter
            
        }
        if(instagram !== " "){
            updates['users/'+userid+"/"+"instagram"] = instagram
            
        }
        updates['users/'+userid+ "/"  +"inverted"] = inv;
        
        update(ref(db),updates)
        /* set(ref(db, 'users/' + userid), {
            email: username,
            bio:pass,
            username:name,
            
            
          }); */

    }
     
    return(
<div>
<div className="App-header1" >
      
      
     
         <Link className="linker" to='/'>
         <button  className="nav-link">
         Home
         </button>
         </Link>
         <Link className="linker" to='profile'>
         <button className="nav-link">
         Profile
         </button>
         </Link>
         
         <button className="nav-button" onClick = {LogOut} >Logout</button>
      </div>
<header className="App-header">
    <div>
<div> 
      <img src="yinyang.png"className="App-logo" alt="logo" />
      <div>
      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="300" height="300" />
        ) : (
          <>
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x" />
              <i className="fas fa-store fa-stack-1x fa-inverse" />
            </span>
            <h5 className="text-center">Update your profile photo</h5>
          </>
        )}
      </label>
    
     
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleUpload} className="nav-button">Upload</button>
      <input
        type="file"
        className="nav-button"
        
        onChange={handleChange}
      />
    </div>
      </div>
      <div> 
      <img src="yinyang.png"className="App-logo" alt="logo" />
      <div>
      <label htmlFor="upload-button">
        {image2.preview ? (
          <img src={image2.preview} alt="dummy" width="300" height="300" />
        ) : (
          <>
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x" />
              <i className="fas fa-store fa-stack-1x fa-inverse" />
            </span>
            <h5 className="text-center">Update your background photo</h5>
          </>
        )}
      </label>
    
     
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange2}
      />
      <br />
      <button onClick={handleUpload2} className="nav-button">Upload</button>
      <input
        type="file"
        className="nav-button"
        
        onChange={handleChange2}
      />
    </div>
      </div>
      
    
      
      <div className = "inputdiv3">
      <div className = "inputdiv2"> 
      <input className = "input4"  onChange={handleInput1} placeholder="Change Username"/>
      </div>
      <div className = "inputdiv2"> 
      <textarea className = "input4"  onChange={handleInput2} />
      </div>
      <div className = "inputdiv2"> 
      <input className = "input4"  onChange={handleInput3} placeholder="Enter Email"/>
      </div>
      <div className = "inputdiv2"> 
      <input className = "input4"  onChange={handleInput4} placeholder="Enter Twitter"/>
      </div>
      <div className = "inputdiv2"> 
      <input className = "input4"  onChange={handleInput5} placeholder="Enter Instagram"/>
      </div>
      <div className="container">
      <button onClick = {invert} className={navy} >
         Invert colors
         </button>
  <button className="nav-button2" onClick={Update}>Update Profile</button>
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

export default UpdateProfile;