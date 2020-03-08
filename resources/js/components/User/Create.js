import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyGlobleSetting from '../MyGlobleSetting';

class UserCreate extends Component {

    //var user;
    
    constructor(props){
        super(props);
        
        this.state = {
            error: '',
            loading: true,
            user: '',

            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            active: false
        };
        
        this.user = {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            active: false
        }

        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeActive = this.handleChangeActive.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log('constructor');
    }


    componentDidMount(){
        console.log('componentDidMount');
        this.fetchData()
    }

    componentWillMount(){
        console.log('componentWillMount');
    }

    async fetchData(){

        const { id } = this.props.match.params; // or this.props.params.id
        //console.log(this.props.match.params);

        var param = '/user';
        if(typeof id !== "undefined"){
            param = '/user/' + id + '/edit';
        }
       
        //this.setState({ user: await axios.get(MyGlobleSetting.url + '/api/auth' + param).data});

        await axios.get(MyGlobleSetting.url + '/api/auth' + param)
        .then(response => {
            console.dir(response.data);
            this.setState({ 
                loading:false,
                user: response.data,
                id: response.data.id, 
                firstname: response.data.firstname, 
                lastname: response.data.lastname,
                email: response.data.email,
                photo: response.data.photo,
                active: response.data.active
            });
        })
        .catch(function (error) {
            
            this.setState({ 
                loading:true,
            });
            
            console.log(error);
        })
    }

    handleChangeFirstname(e){
        this.setState({
            firstname: e.target.value,
            loading: false
        },function(){
            console.log('firstname',this.state.firstname);
        })

    }

    handleChangeLastname(e){
        this.setState({
            lastname: e.target.value
        },function(){
            console.log('lastname',this.state.lastname);
        })
    }


    handleChangePhone(e){
        this.setState({
            phone: e.target.value
        },function(){
            console.log('phone',this.state.phone);
        })
    }

    handleChangeEmail(e){
        this.setState({
            email: e.target.value
        },function(){
            console.log('email',this.state.email);
        })
    }

    handleChangeActive(e){
        this.setState({
            active: (e.target.checked === true ? 1 : 0)
        });
    }

    handleSubmit(e){
        e.preventDefault();

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            email: this.state.email,
            active: this.state.active
        }

        const { id } = this.props.match.params; // or this.props.params.id
        //console.log(this.props.match.params);
        //id = this.state.id;

        var param = '/user';
        if(typeof id !== "undefined"){
            param = '/user/' + id;
        }

        let uri = MyGlobleSetting.url + '/api/auth' + param;
        
        axios.put(uri, user).then((response) => {
            //browserHistory.push('/user');
            this.props.history.push('/');
        });

    }


    render() {

        const { firstname, id, lastname, email, phone, active, loading, error, user } =  this.state;

        console.log('bbb',user);

        const actived = (this.state.active === true || loading === false ? 'checked' : '');

        //console.log('aaaa',user_data.firstname);

        return (loading?(<h1>LOADING</h1>):(<div>
                            <h1>Create User</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Nome:</label>
                                        <input type="text" value={firstname} name="firstname" id="firstname" className="form-control" onChange={this.handleChangeFirstname} />
                                      </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                          <label>Cognome:</label>
                                          <input type="text" value={lastname} name="lastname" id="lastname" className="form-control" onChange={this.handleChangeLastname} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                          <label>Email:</label>
                                          <input type="text" value={email} name="email" id="email" className="form-control" onChange={this.handleChangeEmail} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                          <label>Telefono:</label>
                                          <input type="text" value={phone} name="phone" id="phone" className="form-control" onChange={this.handleChangePhone} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                          <label>Attivo:</label>
                                          <input type="checkbox" checked={actived} name="active" id="active" onChange={this.handleChangeActive} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Save User</button>
                                </div>
                            </form>
                        </div>))
    }
}

export default UserCreate;