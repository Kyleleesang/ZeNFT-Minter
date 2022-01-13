import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import './NFTProfile.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link, useHistory} from 'react-router-dom';
import { getDatabase, ref, child, get,query, orderByChild,orderByValue } from "firebase/database";
import { FaBeer } from 'react-icons/fa';
import { AiFillAlert,AiFillTag,AiOutlineUp,AiFillPayCircle } from "react-icons/ai";

          
          
import { Card, Button, CardBlock,CardDeck,CardTitle,CardImg,CardSubtitle,CardText,ButtonGroup,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,Col,CardBody,CardLink,Row,CardGroup,CardColumns } from 'reactstrap';
import Masonry from 'react-masonry-css';
import { getStorage,ref as storRef,uploadBytes,getDownloadURL } from "firebase/storage";
import PopUp from "./PopUp";


function NFTProfile() {

    
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 2,
        500: 1
      };
    
    const db = getDatabase();

    const refer = query(ref(db, 'NFTS'), orderByChild('Price'));
    const refer2 = query(ref(db, 'NFTS'));
    const[search,setSearch] = useState(" ");
    const [res,setRes] = useState(["hello"]);
    console.log("these are the results")
    console.log(JSON.stringify(refer2));
    const history = useHistory();
    const dbRef = ref(getDatabase());
    const [prevent,setPrevent] = useState(0);
    const storage = getStorage();
    const [image,setImage] = useState(" ");
    const [name,setName] =useState(" hello kitty");
    const [owner,setOwner] = useState("Frodo");
    const[price,setPrice] = useState("200");
    const[label,setLabel] = useState("label2");
    const[otherlab,setOtherLab] = useState("label2");
    const[lab1,setLab1] = useState("label4");
    const[lab2,setLab2] = useState("label4");
    const[lab3,setLab3] = useState("label4");

    
    console.log(prevent);
    console.log(res);
    if( prevent < 1){
        console.log("running");
        get(child(dbRef,`NFTS/${localStorage.NFTname}`)).then((snapshot) => {
        console.log("get is running")
            if (snapshot.exists()) {
              
              let records = snapshot.val();
              console.log("these are the records");
              console.log(records);
              setImage(records.Url);
            setName(records.Name);
            setOwner(records.Owner);
            setPrice(records.Price);
              console.log(records.Url);
            
               setPrevent(prevent+1);
               console.log(prevent);
              console.log("this is the snapshot")
             
            } else {
                console.log("there is no snapshot")
              
            }
          }).catch((error) => {
            console.error(error);
            console.log("throwing an error")
          });

    }
      
      
    
       
     
        

  
    //const[refer1,setRefer1] = useState("pinapple");
    function offer(){

    }
    
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
      function playAudio2(){
        window.scrollTo(0, 0)
        
      }
      function getNFT(){

      }
      function appear1(){
          console.log("the change is running");
          if(label == "label2"){
              setLabel("label3");
          }
          else{
              setLabel("label2");
          }
      }
      function appear2(){
        console.log("the change is running");
        
        if(otherlab == "label2"){
            setOtherLab("label3");
        }
        else{
            setOtherLab("label2");
        }
    }
    function appear3(){
        console.log("the change is running");
       
        if(lab1 == "label4"){
           setLab1("label4a");
        }
        else{
            setLab1("label4");
        }
    }
    function appear4(){
        console.log("the change is running");
        if(lab2 == "label4"){
            setLab2("label4a");
        }
        else{
           setLab2("label4");
        }
    }
    function appear5(){
        console.log("the change is running");
        if(lab3 == "label4"){
            setLab3("label4a");
        }
        else{
           setLab3("label4");
        }
    }
      const searchterm = event => {
        setSearch(event.target.value);
        console.log("this is res");
        console.log(res);
      };
      function gosearch(){
          localStorage.searchvalue = search;
          console.log("this is res too");
          console.log(res);
         


      }
    return (
        <div className="App"> 
    
      
      <div className="App-header1" >
      <Link  className="linker" to='/'>
         <button  className="nav-link">
         Home
         </button>
         </Link>
      
      
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
         <button className="nav-link">
         Sign up
         </button>
         </Link>
         <Link className="linker" to='login'>
         <button className="nav-link">
         Login
         </button>
         </Link>
         <Link className="linker" to='profile'>
         <button className="nav-link">
         Profile
         </button>
         </Link>
      </div>
  
     
        <header className="App-header7">
        <Card className = "nft-image" >
        <CardTitle className ="NFTName">{name}</CardTitle>
        <CardImg className ="eddiehall1" src = {image} />
        
          
          <CardSubtitle></CardSubtitle>
          <CardText className ="NFTName">By {owner}</CardText>
          
          
          
      
      </Card>
     
     
      
      <Card className = "card-class">
      <CardText className ="NFTName">Current Price {price}</CardText>
      <ButtonGroup vertical >
              
              <Button className = "nft-button"  > Buy Now</Button>
              <Button className = "nft-button"  onClick = {() => offer()}   > Make an offer</Button>
              
            
          </ButtonGroup>
          
      </Card>
      <PopUp/>
      
      
      
     
              
              <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid1"
  columnClassName="my-masonry-grid_column1">
      
      
      <Card className = "nft-image" >
        <CardTitle className ="NFTName">
       <AiFillTag className = "labelimage4" />
       
           Listings

           
        <AiOutlineUp className="labelimage5" onClick = {() => appear2()}/>
        
        </CardTitle>
        <div className = {otherlab}>This is the  offers they are verry nice offers
          </div> 
        
       
          
          
          
          
      
      </Card>
      <Card className = "nft-image"   >
        <CardTitle className ="NFTName">
        <AiFillPayCircle className = "labelimage4"/>
            Offers 



            <AiOutlineUp className="labelimage3" onClick = {() => appear1()}/>
        </CardTitle>
        <div className = {label}>This is the  offers they are verry nice offers
          </div> 
       
       
      
          
          
          
          
      
      </Card>
      
     
      
     
      
  
</Masonry>
<div classname = "pdiv">
   



<div className = "labela">Description
          <AiOutlineUp className="labelimage5" onClick = {() => appear3()}/>
          
           
          </div> 
        
          
          



          <div className = "labelc">About
          <AiOutlineUp className="labelimage3" onClick = {() => appear4()}/>
          </div> 
          <div className = "labelb">Details
          <AiOutlineUp className="labelimage3" onClick = {() => appear5()}/>
          </div> 
          </div>
          <div className = {lab1}>This is the  offers they are verry nice offers
          </div>
          <div className = {lab2}>This is the  offers they are verry nice offers
          </div>
          <div className = {lab3}>This is the  offers they are verry nice offers
          </div>
<Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid1"
  columnClassName="my-masonry-grid_column1">
      
      
      
  
</Masonry>



            

         
    
 

  


     


     

      
     
      
   
         
          
          
        </header>
       
        <div className="App-header7" >
            
        
    
       
  
        
        
          
          
          
        </div>
        <audio className="audio-element">
            <source src="sweetvictory.mp3"></source>
            
          </audio>
          <audio className="audio-element1">
            
            <source src="lotr1.mp3"></source>
          </audio>
        
      
    </div>
    );


}

export default NFTProfile;