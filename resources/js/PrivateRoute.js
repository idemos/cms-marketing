import React from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';

import MyGlobleSetting from './components/MyGlobleSetting';
import MyStorage from './components/MyStorage';


// 3.1
var ls = MyGlobleSetting.ls_name;
var AppState = MyStorage.get(ls);

console.log('appstate', AppState);

if (typeof AppState === 'undefined' || !AppState){
  AppState = {
    isLoggedIn: false,
    user: {}
  };
  
  //localStorage[ls] = JSON.stringify(appState);
  MyStorage.set(ls, AppState);
}

// let state = localStorage[ls];
// let AppState = JSON.parse(state);
AppState = MyStorage.get(ls);
console.log('appstate',AppState);

// 3.2
const Auth = {
  isLoggedIn: AppState.isLoggedIn,
  user: AppState
};

// 3.3
const PrivateRoute = ({ component: Component, path, ...rest }) => (
<Route path={path}
       {...rest}
       render={props => Auth.isLoggedIn ? (
       <Component {...props} />) : (<Redirect to={{
       pathname: "/login",
       state: {
         prevLocation: path,
         error: "You need to login first!",
       },
      }}
      />
    )
  }
/>);
export default withRouter(PrivateRoute);