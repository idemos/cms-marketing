import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyGlobleSetting from '../MyGlobleSetting';

class UserCreate extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            user: '',
            firstname: '', 
            lastname: '',
            email: '',
            phone: '',
        };
/*
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
*/
    }

    async componentDidMount(){

        const { id } = this.props.match.params; // or this.props.params.id
        //console.log(this.props.match.params);

        var param = '/user';
        if(typeof id !== "undefined"){
            param = '/user/' + id + '/edit';
        }
       
        //this.setState({ user: await axios.get(MyGlobleSetting.url + '/api/auth' + param).data});

        const response = await axios.get(MyGlobleSetting.url + '/api/auth' + param);
        this.setState({ user: response.data });
        /*
        .then(response => {
            //console.dir(response.data);
            this.setState({ user: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })
        */
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
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
        }

        let uri = MyGlobleSetting.url + '/api/user';
        
        axios.post(uri, products).then((response) => {
            browserHistory.push('/display-item');
        });
    }


    render() {

        const { user } =  this.state;

        console.log('aaaa',this.state.user[0].firstname);

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
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label>Attivo:</label>
                          <input type="checkbox" name="active" className="form-control" onChange={this.handleChangeActive} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Save User</button>
                </div>
            </form>
        </div>
        )
    }
}

export default UserCreate;