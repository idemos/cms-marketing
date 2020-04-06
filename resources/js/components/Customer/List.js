import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import MyStorage from '../MyStorage';
import MyGlobleSetting from '../MyGlobleSetting';
import Navbar from '../Navbar';

export default class CustomerList extends Component {

    state = {value: '', users: ''};

    componentWillMount(){
        console.log('componentWillMount');
    }

    checkUserLogged() {
  
        let ls = MyGlobleSetting.ls_name;
        let AppState = MyStorage.get(ls);
        
        if (AppState) {
            // let AppState = JSON.parse(state);
            if(AppState.isLoggedIn === true){
                this.setState({isLoggedIn: AppState.isLoggedIn, customer: AppState});
                //return true;
            }
        }
        //document.location.href='/';
    }

    async componentDidMount(){
       
        this.fetchData();
    }

    async fetchData(){

        await axios.get(MyGlobleSetting.url + '/api/auth/customer')
        .then(response => {
            //console.dir(response.data);
            this.setState({ customers: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })

    }

    async handleClickDelete(e,obj){
        e.preventDefault();
        //console.log(obj.id);
        var that = this;

        await axios.delete(MyGlobleSetting.url + `/api/auth/customer/${obj.id}`)
        .then(response => {
            //this.setState({ customers: response.data });
            //this.props.history.push('/customer');
            that.fetchData();
        })
        .catch(function (error) {
            console.error(error);
            this.setState({ error: error.message });
        })

    }

    logout(e){
        let ls = MyGlobleSetting.ls_name;
        MyStorage.unset(ls);
        window.location.href="/login";
    }

    tabRow(){
        if(this.state.customers instanceof Array){
            return this.state.customers.map((obj, i) => {
                //console.dir(obj);
                
                return (<tr key={obj.id}>
                        <td>{obj.id}</td>
                        <td>{obj.firstname}</td>
                        <td>{obj.lastname}</td>
                        <td>{obj.phone}</td>
                        <td>{obj.email}</td>
                        <td>
                            <Link to={"customeredit/" + obj.id} className="btn btn-primary btn-edit"> Edit </Link>&nbsp;
                            <button type="button" className="btn btn-danger btn-delete" 
                            onClick={(e) => {if(window.confirm('Are you sure you wish to delete this item?')) this.handleClickDelete(e, obj)}} > Delete </button>
                        </td>
                        </tr>
                );
            })
        }
     }


    render(){

        const { error } = this.state;

        return (
            <div>
                <Navbar />
                <div className="container" style={{marginTop:10}}>
                    { error ? <h5 className="alert alert-danger">{error}</h5> : '' }
                    <div className="row">
                        <div className="col-md-9"><h1>Utenti</h1></div>
                        <div className="col-md-3">
                            <Link to="/customeredit" className="btn btn-warning">Create Customer</Link>
                        </div>
                    </div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>
                            <td>Cognome</td>
                            <td>Telefono</td>
                            <td>Email</td>
                            <td width="200px">Actions</td>
                        </tr>
                        </thead>
                        <tbody>
                            { this.tabRow() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}