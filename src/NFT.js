import logo from './logo.svg';
import './App.css';
import {createVoucher} from "./lib/LazyMinter";
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
import Interact from './interact.js';
import { pinJSONToIPFS } from './utils/pinata';



function NFT(){
    const [name, setName] = useState(" ");
    const [pass, setPass] = useState(" ");
    const [username, setUser] = useState(" ");
    const history = useHistory();
    const db = getDatabase(fire);
    const storage = getStorage();
    let userid = localStorage.currentUser;
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [image2, setImage2] = useState({ preview: "", raw: "" });
    const [url, setUrl] = useState(" ");
    const[twitter,setTwitter] = useState(" ");
    const[instagram,setInstagram] = useState(" ");
    const[check,setCheck] = useState(false);

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

//puts image into json with name and desctiption
  function JSONMaker (name, description, image){
    const metadata = new Object();
    metadata.name = name;
    metadata.image = image;
    metadata.description = description;
    //should return the uri
    let uri = pinJSONToIPFS(metadata); 
    //only URI declared right now
    createVoucher(tokenID, uri, minPrice);
  }

  const handleUpload = async e => {
    e.preventDefault();
    const storageRef = storRef(storage, 'images/'+name);
    uploadBytes(storageRef, image.raw).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(storageRef)
  .then((url) => {
      console.log(url);
      setUrl(url);
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
      const handleInput6 = event => {
        setCheck(event.target.checked);
        
        console.log(check)
        
      };
    const Update = () => {
        console.log(userid)
        const updates = {

        }
        if(name !== " "){
            updates['NFTS/'+name+"/"+"Name"] = name
            
        }
        if(pass !== " "){
            updates['NFTS/'+name+"/"+"Tags"] = pass.split(",");
            
        }
        if(name !== " "){
            updates['NFTS/'+name+"/"+"Price"] = username;
            
        }
        if(twitter !== " "){
            updates['NFTS/'+name+"/"+"Royalties"] = twitter
            
        }
        if(instagram !== " "){
            updates['NFTS/'+name+"/"+"instagram"] = instagram
            
        }
        if(url !== " "){
            updates['NFTS/'+name+"/"+"Url"] = url;
            
        }
        if(check === true){
            updates['NFTS/'+name+"/"+"Collection"] = "Yes";
        }
        else{
            updates['NFTS/'+name+"/"+"Collection"] = "No";
        }
let description = instagram
        JSONMaker(name, description,image);
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
            <h5 className="text-center">Choose the file that you want to mint</h5>
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
     
    
      
      <div className = "inputdiv3">
      <div className = "inputdiv2"> 
      <input className = "input4"  onChange={handleInput1} placeholder="What would you like to name your NFT"/>
      </div>
      <div className = "inputdiv2"> 
      <textarea className = "input4"  onChange={handleInput2} placeholder="Give your NFT some Tags so other collectors can find it" />
      </div>
      <div className = "inputdiv2"> 
      <input className = "input4"  onChange={handleInput3} placeholder="Enter a price you would like to display"/>
      </div>
      <div className = "inputdiv2"> 
      <input className = "input4"  onChange={handleInput4} placeholder="Enter Royalties if any"/>
      </div>
      <div className = "inputdiv2"> 
      <input className = "input4"  onChange={handleInput5} placeholder="Enter Instagram"/>
      </div>
      <div className = "inputdiv2"><label>
          Make this a part of a collection
          <input
          className = "input4"
            name="isGoing"
            type="checkbox"
            
            onChange={handleInput6} />
        </label></div>
      <div className="container">
  <button className="nav-button2" onClick={Update}>Mint</button>
  <button className="nav-button2" onClick={Update}>Mint</button>
  </div>
      </div>

      </div>
    </header>
</div>
    );
}

export default NFT;