import React from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import MyGlobleSetting from './components/MyGlobleSetting';
import MyStorage from './components/MyStorage';


// 3.1
let ls = MyGlobleSetting.ls_name;
let AppStateStorage = MyStorage.get(ls);

if (!AppStateStorage){
  let appState = {
    isLoggedIn: false,
    user: {}
  };
  
  //localStorage[ls] = JSON.stringify(appState);
  AppStateStorage.set(ls, appState);
}

// let state = localStorage[ls];
// let AppState = JSON.parse(state);
let AppState = AppStateStorage.get(ls);

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