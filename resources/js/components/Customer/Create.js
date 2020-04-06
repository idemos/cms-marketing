import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyGlobleSetting from '../MyGlobleSetting';
import Navbar from '../Navbar';


export default class CustomerCreate extends Component {

    state = {
        error: '',
        loading: true,

        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        photo: '',
        active: false
    };

    name_field = '';

/*
    constructor(props){
        super(props);
        
        this.state = {
            error: '',
            loading: true,

            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            active: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backHistory = this.backHistory.bind(this);

        console.log('constructor');
    }
*/

    componentDidMount(){
        console.log('componentDidMount');
        this.fetchData();
    }

    componentWillMount(){
        console.log('componentWillMount');
    }
  
/*
    readFile = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    callback = (output, name) => {
        console.error(name,output);
    }
*/

    readFile = (name, file) => {

        this.name_field = name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            this.setState({[this.name_field]: e.target.result});
        };
        reader.onerror = function() {
            console.log(reader.error);
        };
    }

    handleChange = (e) => {

        if(e.target.type == 'file'){
            let file = e.target.files || e.dataTransfer.files;
            //console.error(e.target.name, file[0]);
            
            this.readFile(e.target.name, file[0]);

        }else{
            var inputvalue = (e.target.type == 'checkbox' ? e.target.checked : e.target.value);
            
            this.setState({
                [e.target.name]: inputvalue
            });
        }

        //var inputvalue = (e.target.type == 'checkbox' ? (e.target.checked ? true : false) : e.target.value);



    }

    backHistory(e){
        this.props.history.push('/customers');
    }

    formatErrors(errors){
        var error_label = '';
        var obj = JSON.parse(errors);
        console.error(errors);
        console.dir(obj);
/*        obj.forEach((key,value) => {
                console.log(value);
        });*/

        return error_label;
    }

    async handleSubmit(e){
        
        e.preventDefault();

        const customer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            email: this.state.email,
            active: this.state.active,
            photo: this.state.photo
        }

        var that = this;
        const { id } = this.props.match.params; // or this.props.params.id

        if(typeof id !== "undefined"){
            let uri = MyGlobleSetting.url + '/api/auth/customer/' + id;
            
            await axios.put(uri, customer).then((response) => {
                //browserHistory.push('/customer');
                that.props.history.push('/customers');
            }).catch(function(error){

                console.dir(error);
                console.log(error.message);
                that.setState({
                    error: error.message,
                    loading: false,
                });
            });

        }else{
            // console.log(this.props.match.params);
            console.log(customer);
            let uri = MyGlobleSetting.url + '/api/auth/customer';
            
            await axios.post(uri, customer).then((response) => {
                //browserHistory.push('/customer');
                that.props.history.push('/customers');
            }).catch(function(errors){

                error = that.formatErrors(errors);
                //console.dir(error);
                //console.log(error.message);
                that.setState({
                    error: error,
                    loading: false,
                });
            });
        }

    }

    async fetchData(){

        const { id } = this.props.match.params; // or this.props.params.id
        console.log('id => ', this.props.match.params);

        var param = '/customer';
        if(typeof id !== "undefined"){
            param = '/customer/' + id + '/edit';
        }else{
            
            this.setState({
                loading: false,
                error: ''
            });

            return;
        }
       
        await axios.get(MyGlobleSetting.url + '/api/auth' + param)
        .then(response => {
            console.dir(response.data);

            this.setState({ 
                loading:false,
                // customer: response.data,
                id: response.data.id, 
                firstname: response.data.firstname, 
                lastname: response.data.lastname,
                email: response.data.email,
                phone: response.data.phone,
                photo: response.data.photo,
                active: response.data.active
            });

            //console.log(response.data.phone);
        })
        .catch(function (error) {

            console.error('error',error.response.message);
/*
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.request);
            console.log('Error', error.message);
*/

            this.setState({
                error: error.data.message,
                loading:true,
            });
            console.log(error);
        })
    }


    render() {

        const { loading, id, firstname, lastname, email, phone, active, error } =  this.state;
        console.log('lo state', this.state);
        
        const actived = (active === true && typeof active !== "undefined" ? 'checked' : '');

        console.log('loading', loading);
        console.log('actived', actived);
        
        if(error == true){
            return `<div className="row justify-content-center align-items-center">
                        <h1>${error}</h1>
                    </div>`;
        }

        if(loading === true){
            return (<div className="row justify-content-center align-items-center">
                        <h1>LOADING</h1>
                    </div>);
        }


        return (
            <div>
                <Navbar />
                <div className="container" style={{marginTop:10}}>
                    <h2>Create/Edit customer</h2>
                    { error ? <h5 className="alert alert-danger">{error}</h5> : '' }
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Nome:</label>
                                <input type="text" value={firstname} name="firstname" id="firstname" className="form-control" onChange={(e) => this.handleChange(e)} />
                              </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                  <label>Cognome:</label>
                                  <input type="text" value={this.state.lastname} name="lastname" id="lastname" className="form-control" onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                  <label>Email:</label>
                                  <input type="email" value={email??''} name="email" id="email" className="form-control" onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                  <label>Telefono:</label>
                                  <input type="tel" value={phone??''} name="phone" id="phone" className="form-control" onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Foto:</label>
                                    <input type="file" name="photo" id="photo" className="form-control"  accept="image/*;capture=camera" onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                  <label>Attivo:</label>
                                  <input type="checkbox" checked={actived} name="active" id="active" onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <button className="btn btn-primary">Save customer</button>&nbsp;
                                    <button type="button" className="btn btn-success" onClick={(e) => this.backHistory(e)}>Back</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}