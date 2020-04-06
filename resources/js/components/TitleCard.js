import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import MyStorage from './MyStorage';
import MyGlobleSetting from './MyGlobleSetting';

export default class TitleCard extends Component {

    logout(e){
        e.preventDefault();
        
        let ls = MyGlobleSetting.ls_name;
        MyStorage.unset(ls);
        window.location.href="/login";
    }


    render() {
        return (
        <div style={{width:"100%",backgroundColor:"#343a40"}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark container">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Gestisce Customers
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link to="/customeredit" className="dropdown-item">Create Customer</Link>
                        <Link to="/customers" className="dropdown-item">List Customers</Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Gestisce Admins
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link to="/useredit" className="dropdown-item">Create Admin</Link>
                        <Link to="/users" className="dropdown-item">List Admin</Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.logout(e)}>LogOut</a>
                  </li>
                </ul>
              </div>
            </nav>
        </div>
        );
    }
}