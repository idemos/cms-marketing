import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyGlobleSetting from './MyGlobleSetting';

class CreateUser extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            firstname: '', 
            lastname: '',
            email: '',
            phone: '',
        };

        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFirstname(e){
        this.setState({
            firstname: e.target.value
        })
    }

    handleChangeLastname(e){
        this.setState({
            lastname: e.target.value
        })
    }


    handleChangePhone(e){
        this.setState({
            phone: e.target.value
        })
    }

    handleChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const products = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
        }

        let uri = MyGlobleSetting.url + '/api/products';
        
        axios.post(uri, products).then((response) => {
            browserHistory.push('/display-item');
        });
    }


    render() {
        return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" name="firstname" className="form-control" onChange={this.handleChangeFirstname} />
                      </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label>Cognome:</label>
                          <input type="text" name="lastname" className="form-control" onChange={this.handleChangeLastname} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label>Email:</label>
                          <input type="text" name="email" className="form-control" onChange={this.handleChangeEmail} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label>Telefono:</label>
                          <input type="text" name="phone" className="form-control" onChange={this.handleChangePhone} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Add New User</button>
                </div>
            </form>
        </div>
        )
    }
}

export default CreateUser;