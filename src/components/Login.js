import {Component} from "react";
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {loginMiddleware} from "../reduxstore/Middlewares";
import Footer from "./Footer";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            }
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                errors.email =
                    re.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 1
                        ? 'Password should not be empty'
                        : '';
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(loginMiddleware(this.state))
        this.props.text()
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="container-fluid" style={{marginTop: "100px"}}>
                <div className="row">
                <div className="col"></div>
                <div className="col">
                <h3 style={{textDecoration:'underline',marginBottom:'20px'}}>Please Login to Book Cake</h3>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group email">
                        <input value={this.state.email} name='email' onChange={this.handleChange} className="form-control" placeholder="Enter Email ID"/>
                        {errors.email.length > 0 &&
                        <span className='error'>{errors.email}</span>}
                    </div>
                    <div className="form-group role">
                        <input type="password" value={this.state.password} name='password' onChange={this.handleChange} className="form-control" placeholder="Enter Password"/>
                        {errors.password.length > 0 &&
                        <span className='error'>{errors.password}</span>}
                    </div>
                    <button type="submit" className="form-control btn btn-success">Login Now</button>
                </form>
                </div>
                <div className="col"></div>
                </div>
                <Footer />
            </div>
        )
    }
}

Login = connect(function (state, props){
    if (state.AuthReducer.isLoggedIn) {
        props.history.push('/')
    }
})(Login);

export default withRouter(Login)