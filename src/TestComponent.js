
import logo from './images/logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link} from 'react-router-dom';
import React, { useState } from "react";
import {storage} from "./fire"
import { getStorage, ref,uploadBytes } from "firebase/storage";

function TestComponent(){
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [url, setUrl] = useState("");
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

  const handleUpload = async e => {
    e.preventDefault();
    const storage = getStorage();
    const storageRef = ref(storage, 'images/'+image.name);
    uploadBytes(storageRef, image.raw).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

  };

  return (
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
            <h5 className="text-center">Upload your photo</h5>
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
  );

}

export default TestComponent;