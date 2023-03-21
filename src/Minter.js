import { useEffect, useState } from "react";
import React, { Component }  from 'react';
import { connectWallet, getCurrentWalletConnected,Interact ,mintNFT //import here
} from "./utils/interact.js";
import logo from './logo.svg';
import './App.css';
import {createVoucher} from "./lib/LazyMinter";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link, useHistory} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,signOut } from "firebase/auth";
import fire from './fire';
import './css/minter.css'
import Tabs from "./Tabs";
import { getDatabase, ref, child, get,set,update } from "firebase/database";
import {storage} from "./fire"
import { getStorage,ref as storRef,uploadBytes,getDownloadURL } from "firebase/storage";

import { pinJSONToIPFS } from './utils/pinata';



const Minter = (props) => {
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uri, setURI] = useState("");
  const[price,setPrice] = useState(0);
  const[tags,setTags] = useState([]);
  const[royalties,setRoyalties] = useState(0); 
  const[image,setImage] = useState("");
  const[url,setUrl] = useState("");
  const[user,setUser] = useState(" ");
  const [lazy,setLazy] = useState(false);
  const [collection,setCollection] = useState(false);
  const dbRef = ref(getDatabase());
  const[ minted ,setMinted] = useState("yes");
  const[creator,setCreator] = useState("");
  const db = getDatabase(fire);

  

  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);
    addWalletListener(); 
}, []);

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

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
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
    const updates = {

    }
    updates['NFTS/'+name+"/"+"Creator"] = creator;
        updates['NFTS/'+name+"/"+"Owner"] = creator;
        updates['NFTS/'+name+"/"+"favoritors"] = [creator];
        updates['NFTS/'+name+"/"+"Minted"] = minted;
        updates['NFTS/'+name+"/"+"Price"] = price;
        updates['NFTS/'+name+"/"+"Tags"] = tags;
        updates['NFTS/'+name+"/"+"Name"] = name;
        updates['NFTS/'+name+"/"+"Url"] = url;
   
    
      
      
  
    if(url !== ""){
        updates['NFTS/'+name+"/"+"Url"] = url;
        
    }
    if(collection === true){
        updates['NFTS/'+name+"/"+"Collection"] = "Yes";
    }
    else{
        updates['NFTS/'+name+"/"+"Collection"] = "No";
    }
    
    update(ref(db),updates)
    /* set(ref(db, 'users/' + userid), {
        email: username,
        bio:pass,
        username:name,
      }); */

  };
  const onMintPressed = async () => {
    const { status } = await mintNFT(uri, name, description);
    console.log(status);
    setStatus(status);
};

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        setStatus("👆🏽 Write a message in the text-field above.");
      } else {
        setWallet("");
        setStatus("🦊 Connect to Metamask using the top right button.");
      }
    });
  } else {
    setStatus(
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.
        </a>
      </p>
    );
  }
}

  return (
    <div className="Minter">
    <div className="Minter1">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ ZeNFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
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
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
        <h2>🏷️ Tags </h2>
        <input
          type="text"
          placeholder="Enter some tags so people can find your NFT(separate by commmas)"
          onChange={(event) => setTags(event.target.value)}
        />
        <h2>💵 Price </h2>
        <input
          type="text"
          placeholder="Enter a price to list your NFT for"
          onChange={(event) => setPrice(event.target.value)}
        />
        <h2>💰 Royalties </h2>
        <input
          type="text"
          placeholder="Enter Royalties"
          onChange={(event) => setRoyalties(event.target.value)}
        />
        <h2>💰 Make this part of a collection </h2>
        <input
          type="checkbox"
          placeholder="Enter Royalties"
          onChange={(event) => setCollection(event.target.value)}
        />
        <h2>💰 Lazy Mint </h2>
        <input
          type="checkbox"
          placeholder="Enter Royalties"
          onChange={(event) => setLazy(event.target.value)}
        />
      </form>
      
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
    </div>
  );
};

export default Minter;

