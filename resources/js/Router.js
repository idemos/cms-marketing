import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";

import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import UserList from "./components/User/List";
import UserCreate from "./components/User/Create";

// User is LoggedIn
import PrivateRoute from "./PrivateRoute";


class App extends React.Component {

    render() {
        return(
        <Switch>
            {/*User might LogIn*/}
            <Route exact path="/" component={Home} />
            {/*User will LogIn*/}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/user" component={UserList} />
            <Route path="/useredit/:id" component={UserCreate} />
            {/* User is LoggedIn*/}
            {/*Page Not Found*/}
        </Switch>
        )
    }
}


export default App;
