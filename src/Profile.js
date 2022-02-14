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
import {storage} from "./fire"
import { getStorage,ref as storRef,uploadBytes,getDownloadURL } from "firebase/storage";
import Masonry from 'react-masonry-css';
import { Card, Button, CardBlock,CardDeck,CardTitle,CardImg,CardSubtitle,CardText } from 'reactstrap';



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
    const [res,setRes] = useState(["hello"]);
    const [created,setCreated] = useState(["sup"]);
    const[favorited,setFavorited] = useState(["lift bro"]);
    const [prevent,setPrevent] = useState(0);
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 2,
        500: 1
      };

      const render_data = res.map((res1) =>
    <Card className = "yugi" >
        <CardImg className ="eddiehall" src = {res1.Url} />
        
          <CardTitle>{res1.Owner}</CardTitle>
          <CardSubtitle>{res1.Name}</CardSubtitle>
          <CardText>{}</CardText>
          <Button className = "nav-button3"onClick = {() => getNFT(res1.Name, res.indexOf(res1))}  >Get Info</Button>
        
      </Card>

    );
    const creative = created.map((res2) =>
    <Card className = "yugi" >
        <CardImg className ="eddiehall" src = {res2.Url} />
        
          <CardTitle>{res2.Owner}</CardTitle>
          <CardSubtitle>{res2.Name}</CardSubtitle>
          <CardText>{}</CardText>
          <Button className = "nav-button3"onClick = {() => getNFT(res2.Name, res.indexOf(res2))}  >Get Info</Button>
        
      </Card>

    );
    const favor = favorited.map((res1) =>
    <Card className = "yugi" >
        <CardImg className ="eddiehall" src = {res1.Url} />
        
          <CardTitle>{res1.Owner}</CardTitle>
          <CardSubtitle>{res1.Name}</CardSubtitle>
          <CardText>{}</CardText>
          <Button className = "nav-button3"onClick = {() => getNFT(res1.Name, res.indexOf(res1))}  >Get Info</Button>
        
      </Card>

    );
    

    const storage = getStorage();
const[bio,setBio] = useState("collector started with bananas");
const dbRef = ref(getDatabase());
function getNFT(name,res){
    console.log("get nft is running");
    localStorage.NFTname = name;
    localStorage.NFTid = res;
    console.log(name);
   history.push("/NFTProfile");

}




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
    if(prevent < 1){
        console.log("running");
        get(child(dbRef,'NFTS')).then((snapshot) => {
        
            if (snapshot.exists()) {
              
              let records = snapshot.val();
              console.log(records);
              
               let result = Object.values(records).filter(record =>  record.Owner == user_data.username)
               let result1 = Object.values(records).filter(record =>  record.Creator == user_data.username)
               //let result2 = Object.values(records).filter(record => record.Favoritors.indexOf(user_data.username) != -1 )
               let result2 = Object.values(records).filter(record => record.Creator == user_data.username )
               
              console.log(result2);
               console.log("these are the records"); 
               console.log(records);
               
               
               
                
               
               setRes(result);
               setCreated(result1);
               setFavorited(result2);
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
      } //end of prevent
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
<header className="App-headera"  >
    <div>
<div> 
      <img src={image}className="App-logo" alt="logo" />
      </div>
      <div> <Link to ={instagram}>
      <img  className = "insta" src="images/instagram.png" />
      </Link>
      <Link to ={twitter}>
      <img className ="twitt" src="images/twitter.png" />
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
       
  
     <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {render_data}
</Masonry>
   </div>
   <div label="Created">
    
     <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {creative}
</Masonry>
   </div>
   <div label="Favorited">

<Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {favor}
</Masonry>
   </div>
   <div label="Activity">
 
  <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {render_data}
</Masonry>
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