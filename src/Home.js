import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './Invert.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link, useHistory} from 'react-router-dom';
import { getDatabase, ref, child, get } from "firebase/database";


function Home() {
    const dbRef = ref(getDatabase());
    const[search,setSearch] = useState(" ");
    const history = useHistory();
    const[nav,setNav] = useState("nav-link");
    const[navy,setNavy] = useState("nav-button");
    const[logo,setLogo] = useState("App-logo");
    const[header,setHeader] = useState("App-header");

    const[inv,setInv] = useState("uninv");

    function playAudio() {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play()
        console.log("playing audio")
        window.scrollTo(0, window.innerHeight)
       
      }
      function playAudio1() {
        const audioEl1 = document.getElementsByClassName("audio-element1")[0]
        audioEl1.play()
        console.log("playing audio")
        window.scrollTo(0, 1300)
       
      }
      function TakeMeAway(){
          window.location.href = "https://www.notion.so/zenft/zeNFT-Careers-b539820637e74b4eb5922d8e9f4f54ab";
      }
      function invert(){
         if(inv === "uninv"){
            setNavy("nav-button-inverted");
            setNav("nav-link-inverted");
           // setLogo("App-logo-inverted");
            setHeader("App-header-inverted");
            console.log("running the invert function");
            setInv("inv");
            localStorage.inverted = true;
         }
         else{
            setNavy("nav-button");
            setNav("nav-link");
           // setLogo("App-logo");
            setHeader("App-header");
            console.log("running the invert function");
            setInv("uninv");
            localStorage.inverted = false;

         }

      }
      function playAudio2(){
        window.scrollTo(0, 0)
        
      }
      const searchterm = event => {
        setSearch(event.target.value);
      };
      function gosearch(){
          localStorage.searchvalue = search;
          history.push("/Search")


      }
    return (
        <div className="App"> 
    
      
      <div className="App-header1" >
      
      
      <button onClick={playAudio} className={navy} >
         Investors
         </button>
         <button onClick={playAudio1}   className={navy}>
         Creators
         </button>
         
         <button onClick = {TakeMeAway} className={navy} href = "youtube.com">
         Careers
         </button>
         <button onClick = {invert} className={navy} >
         Invert colors
         </button>
         
         <form action="/Search" method="get" onSubmit = {gosearch} className = "search-field">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
        onChange={searchterm}
        type="text"
        id="header-search"
        placeholder="Search NFTs"
        name="s" 
        className = "search-field1"
        />
     
    </form>
    <Link className="linker" to='signup'>
         <button className={nav}>
         Sign up
         </button>
         </Link>
         <Link className="linker" to='login'>
         <button className={nav}>
         Login
         </button>
         </Link>
         <Link className="linker" to='profile'>
         <button className={nav}>
         Profile
         </button>
         </Link>
      </div>
  
        <header className={header}>
      
          <img src="yinyang.png"className={logo} alt="logo" />
          <p className="paragraph">
          zeNFT is an early-stage startup developing a platform for discovery, creation, and exchange of NFTs. We are looking for motivated individuals interested in transforming the NFT ecosystem by making it easier to understand and more accessible to everyday people. We are building a platform for the next wave of of NFTs that is as easy as searching on Google, posting on Instagram, and buying an app in the app store.
  
  Entirely self-funded, we are now seeking seed investors to complete and launch our MVP and continue to innovate. We have customers in hand.
          </p>
          
          
        </header>
        <header className={header}>
      
          <img src="yinyang.png"className={logo} alt="logo" />
          <p className="paragraph">
          We have many investors beating down the door to get in on the action.  NFTs are one of the hottest items in the financial markets and 
          we're nowhere near mass adoption.  There is certainly money to be made now and in the distant future but those who get in earliest will reap 
          the biggest rewards. 
          </p>
          
          
        </header>
        <header className={header}>
          
        <div className="card">
    <img src="robert.jpg" alt="Avatar" />
    <div className="container">
      <h4><b>Robert Beit</b></h4> 
      <p>Front-End Web Developer</p> 
    </div>
  </div>
  <div className="card">
    <img src="kyle.jpg" alt="Avatar" />
    <div className="container">
      <h4><b>Kyle Leesang</b></h4> 
      <p>Blockchain Developer</p> 
    </div>
  </div>
          
          
          
        </header>
        <audio className="audio-element">
            <source src="sweetvictory.mp3"></source>
            
          </audio>
          <audio className="audio-element1">
            
            <source src="lotr1.mp3"></source>
          </audio>
        
      
    </div>
    );


}

export default Home;