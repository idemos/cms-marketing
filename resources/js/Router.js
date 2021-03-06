import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";

import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import UserList from "./components/User/List";
import UserCreate from "./components/User/Create";
import CustomerList from "./components/Customer/List";
import CustomerCreate from "./components/Customer/Create";

// User is LoggedIn
import PrivateRoute from "./PrivateRoute";


class App extends React.Component {

    render() {
        return(
        <BrowserRouter>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/usercreate" component={UserCreate} />
            <Route path="/cutomercreate" component={CustomerCreate} />
            <PrivateRoute path="/customers" component={CustomerList} />
            <PrivateRoute path="/customeredit/:id?" component={CustomerCreate} />
            <PrivateRoute path="/users" component={UserList} />
            <PrivateRoute path="/useredit/:id?" component={UserCreate} />
        </BrowserRouter>
        )
    }
}


export default App;
