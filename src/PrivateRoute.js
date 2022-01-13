import React from "react"
import { Route, Redirect } from "react-router-dom"


export default function PrivateRoute({ component: Component, ...rest }) {
  
if(localStorage.loggedin == "true"){
    console.log('undefined ran')
    
    return (
        <Route
          {...rest}
          render={props => {
            return localStorage.currentUser ? <Component {...props} /> : <Redirect to="/login" />
          }}
        ></Route>
        

    )
}
else{
    console.log('normal ran')

    console.log(localStorage.currentUser)
    console.log(localStorage.loggedin); 
    console.log(localStorage.loggedin == true);
    return (
        <Route
        {...rest}
        render={props => {
          return  <Redirect to="/login" />
        }}
      ></Route>
      )

}
  
}