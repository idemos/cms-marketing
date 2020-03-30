import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import FlashMessage from 'react-flash-message';

import MyGlobleSetting from '../../components/MyGlobleSetting';
import MyStorage from '../../components/MyStorage';
import SecureLs from 'secure-ls';

class LoginContainer extends Component {

  state = {
      email: '',
      password: '',
      isLoggedIn: false,
      error: '',
      formSubmitting: false,
      user: {},
      isLoggedIn: false,
      //redirect: props.redirect,
  };

  componentWillMount() {
    /*
    let state = MyStorage[MyGlobleSetting.ls_name];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
    }
    */

    let AppState = MyStorage.get(MyGlobleSetting.ls_name);
    if (AppState) {
      this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
    }
  }

  componentDidMount() {
/*
    const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/dashboard' } };
    if (prevLocation && this.state.isLoggedIn) {
      return this.props.history.push(prevLocation);
    }
    */

  }

  handleSubmit = (e) => {

    e.preventDefault();
    this.setState({formSubmitting: true});
    let userData = this.state.user;
    var that = this;
    
    axios.post("/api/auth/login", userData).then(response => {
      return response;
    }).then(json => {
      
      if (json.data.success) {
      
        let userData = {
           id: json.data.id,
           name: json.data.name,
           email: json.data.email,
           access_token: json.data.access_token,
        };
      
        let appState = {
           isLoggedIn: true,
           user: userData
        };
         
        //localStorage["appState"] = JSON.stringify(appState);
        //console.table(appState);
        //console.error(MyGlobleSetting.ls_name);
        MyStorage.set(MyGlobleSetting.ls_name, appState);
      
        //document.location.reload();
        that.props.history.push('/users');
      
      } else {
        alert(`Our System Failed To Register Your Account!`);
      }

    }).catch(error => {

      that.setError(error);

    }).finally(this.setState({error: ''}));
}

setError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    let err = error.response.data;
    
    this.setState({
      error: err.message,
      errorMessage: err.errors,
      formSubmitting: false
    });
  
  } else if (error.request) {
    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
    let err = error.request;
    
    this.setState({
      error: err,
      formSubmitting: false
    });

  } else {
   // Something happened in setting up the request that triggered an Error
   let err = error.message;
   
   this.setState({
     error: err,
     formSubmitting: false
   });

  }
}

handleChange = (e) => {
  e.persist();
  console.log(e.target.name);
  this.setState(prevState => ({
    user: {
      ...prevState.user, [e.target.name]: e.target.value
    }
  }));
}


render() {
  //const { state = {} } = this.state.redirect;
  const { error } = this.state;

  if (this.state.isLoggedIn) {
    return <Redirect to="/users" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
          <h2 className="text-center mb30">Log In To Your Account</h2>
          
          {this.state.isLoggedIn ? <FlashMessage duration={60000} persistOnHover={true}>

          <h5 className="alert alert-success">Login successful, redirecting...</h5></FlashMessage> : ''}
          
          {this.state.error ? <FlashMessage duration={100000} persistOnHover={true}>
          
          <h5 className="alert alert-danger">Error: {this.state.error}</h5></FlashMessage> : ''}
          
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group">
              <input id="email" type="email" name="email" placeholder="E-mail" className="form-control" required onChange={(e) => this.handleChange(e)}/>
            </div>
            <div className="form-group">
              <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={(e) => this.handleChange(e)}/>
            </div>
            
            <button disabled={this.state.formSubmitting} type="submit" name="singlebutton" className="btn btn-block btn-success"> 
              {this.state.formSubmitting ? "Logging You In..." : "Log In"} 
            </button>
          
          </form>
          
          <p className="text-black">Don't have an account? 
            <Link to="/register" className="btn btn-block btn-info"> Register</Link>
            <Link to="/" className="btn btn-block btn-warning">Back to Index</Link>
          </p>
        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(LoginContainer);