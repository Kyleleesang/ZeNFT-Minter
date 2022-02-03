import React,{useState,useEffect} from 'react';
import logo from './images/logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {Route,Link, useHistory} from 'react-router-dom';
import { getDatabase, ref, child, get,query, orderByChild,orderByValue } from "firebase/database";
import { Card, Button, CardBlock,CardDeck,CardTitle,CardImg,CardSubtitle,CardText } from 'reactstrap';
import Masonry from 'react-masonry-css';
import { getStorage,ref as storRef,uploadBytes,getDownloadURL } from "firebase/storage";


function Search() {
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
    const render_data = res.map((res1) =>
    <Card className = "yugi" >
        <CardImg className ="eddiehall" src = {res1.Url} />
        
          <CardTitle>{res1.Owner}</CardTitle>
          <CardSubtitle>{res1.Name}</CardSubtitle>
          <CardText>{}</CardText>
          <Button className = "nav-button3"onClick = {() => getNFT(res1.Name, res.indexOf(res1))}  >Get Info</Button>
        
      </Card>

    );
    console.log(prevent);
    console.log(res);
      if(prevent < 1){
        console.log("running");
        get(child(dbRef,'NFTS')).then((snapshot) => {
        
            if (snapshot.exists()) {
              
              let records = snapshot.val();
              console.log(records);
              
               let result = Object.values(records).filter(record => record.Tags.indexOf(localStorage.searchvalue) != -1 || record.Owner == localStorage.searchvalue)
               console.log(result[0]["Name"]);
               console.log("this is the type of result");
               console.log(typeof result);
                
               
               setRes(result);
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
    function getNFT(name,res){
        console.log("get nft is running");
        localStorage.NFTname = name;
        localStorage.NFTid = res;
        console.log(name);
       history.push("/NFTProfile");

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
  
     
        <header className="App-header">
      
          
          <div >
              
              <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {render_data}
</Masonry>

            

          </div>
          
          
        </header>
        <header className="App-header">
          
        
          
          
          
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

export default Search;