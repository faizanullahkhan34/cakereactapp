import {Component} from "react";
import axios from "axios";
import Footer from "./Footer";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            fullName: '',
            password: '',
            email: '',
            errors: {
                fullName: '',
                password: '',
                email: '',
            }
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'fullName':
                errors.fullName =
                    value.length < 1
                        ? 'Name should not be empty'
                        : '';
                break;
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
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/register',
            method: 'post',
            data: {name: this.state.fullName, email: this.state.email, password: this.state.password}
        }).then(res => {
            this.props.history.push('/login')
        }, err => {})
        // this.props.text()
    }

    like = () => {
        this.setState({
            likes: this.state.likes + 1
        })
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="container-fluid" style={{marginTop: "100px"}}>
                 <div className="row">
                <div className="col"></div>
                <div className="col">
                <h3 style={{textDecoration:'underline',marginBottom:'20px'}}>Please Register to Book Cake</h3>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group fullName">
                        <input value={this.state.fullName} name='fullName' onChange={this.handleChange} className="form-control" placeholder="Enter Full Name"/>
                        {errors.fullName.length > 0 &&
                        <span className='error'>{errors.fullName}</span>}
                    </div>
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
                    <button type="submit" className="form-control btn btn-success">Regsiter Now</button>
                </form>
                </div>
                <div className="col"></div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Signup;