import logo from './images/logo.svg';
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
import {Interact, mintNFT} from './utils/interact';
import { pinJSONToIPFS } from './utils/pinata';




function NFT(){
    const [name, setName] = useState(" ");
    const[tags,setTags] = useState([]);
    const [price, setPrice] = useState("0");
    const[user,setUser] = useState(" ");
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
    const[minprice,setMinPrice] = useState(0);
    const[creator,setCreator] = useState(" ");
    const[prevent,setPrevent] = useState(0);
    const[minted,setMinted] = useState("yes");
    const[description,setDescription] = useState(" ")

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


  if(prevent<1){
    get(child(dbRef, `users/${localStorage.currentUser}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let user_data = snapshot.val();
        setCreator(user_data.username);
        
      } else {
        console.log("No data available");
       console.log(localStorage.currentUser)
      }
    }).catch((error) => {
      console.error(error);
    });
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
        
        let tagger = event.target.value.split(",");
        setTags(tagger);
        console.log(tags);
      };
      const handleInput3 = event => {
        setPrice(event.target.value);
        console.log(price)
        
      };
      const handleInput4 = event => {
        setTwitter(event.target.value);
        console.log(twitter)
        
      };
      const handleInput5 = event => {
        setDescription(event.target.value);
        console.log(description)
        
      };
      const handleInput6 = event => {
        setCheck(event.target.checked);
        
        console.log(check)
        
      };
      const handleInput7 = event => {
        if(event.target.checked){
          setMinted("no")
        }
        
        
      };
    const Update = () => {
        console.log(userid)
        const updates = {

        }
        if(name !== " "){
            updates['NFTS/'+name+"/"+"Name"] = name
            
        }
        if(tags !== []){
            updates['NFTS/'+name+"/"+"Tags"] = tags;
            
        }
        if(price !== "0"){
            updates['NFTS/'+name+"/"+"Price"] = price;
            
        }
        if(creator !== " "){
            updates['NFTS/'+name+"/"+"Creator"] = creator;
            updates['NFTS/'+name+"/"+"Owner"] = creator;
            updates['NFTS/'+name+"/"+"favoritors"] = [creator];
            updates['NFTS/'+name+"/"+"Minted"] = minted
            
        }
        
          
          
      
        if(url !== ""){
            updates['NFTS/'+name+"/"+"Url"] = url;
            
        }
        if(check === true){
            updates['NFTS/'+name+"/"+"Collection"] = "Yes";
        }
        else{
            updates['NFTS/'+name+"/"+"Collection"] = "No";
        }
        mintNFT(name, description,image);
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
      <input className = "input4"  onChange={handleInput5} placeholder="Set a description"/>
      </div>
      <div className = "inputdiv2"><label>
          Make this a part of a collection
          <input
          className = "input4"
            name="isGoing"
            type="checkbox"
            
            onChange={handleInput6} />
        </label></div>
        <div className = "inputdiv2"><label>
          Lazy Mint
          <input
          className = "input4"
            name="isGoing"
            type="checkbox"
            
            onChange={handleInput7} />
        </label></div>
      <div className="container">
  <button className="nav-button2" onClick={Update}>Mint</button>
  
  </div>
      </div>

      </div>
    </header>
</div>
    );
}

export default NFT;