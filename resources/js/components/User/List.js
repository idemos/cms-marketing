import React, {Component} from 'react';
import axios from 'axios';

import { Link } from 'react-router';
import MyGlobleSetting from '../MyGlobleSetting';

class ListUser extends Component {

    constructor(props) {
       super(props);
       this.state = {value: '', users: ''};
       
       this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    componentDidMount(){
       
        axios.get(MyGlobleSetting.url + '/api/users')
        .then(response => {
            this.setState({ users: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let uri = MyGlobleSetting.url + `/api/users/${this.props.obj.id}`;
        axios.delete(uri);
        browserHistory.push('/display-item');
    }
  
    tabRow(){
        if(this.state.users instanceof Array){
            return this.state.users.map(function(object, i){
                return (<tr>
                        <td>{obj.id}</td>
                        <td>{obj.firstname}</td>
                        <td>{obj.lastname}</td>
                        <td>{obj.phone}</td>
                        <td>{obj.email}</td>
                        <td>
                            <form onSubmit={this.handleSubmit}>
                                <Link to={"edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
                                <input type="submit" value="Delete" className="btn btn-danger"/>
                            </form>
                        </td>
                        </tr>);
            })
        }
     }


    render(){
        return (
        <div>
            <h1>Utenti</h1>
            <div className="row">
                <div className="col-md-10"></div>
                <div className="col-md-2">
                    <Link to="/add-item">Create User</Link>
                </div>
            </div>
            <br />
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
        )
    }
}

export default ListUser;