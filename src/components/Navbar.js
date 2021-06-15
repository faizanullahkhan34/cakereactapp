import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'
import cartLogo from '../images/shopping-cart.png'
import {connect} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Navbar = (props) => {
    let searchString;
    let buttonClick = (event) => {
        event.preventDefault()
        if (searchString) {
            const url = '/search?q=' + searchString;
            props.history.push(url);
        }
    }

    let getSearchString = (event) => {
        searchString = event.target.value;
    }

    let logout = () => {
        props.dispatch({
            type: "LOGOUT",
            payload: {
                token: localStorage.getItem('token')
            }
        })
        props.history.push('/')
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios({
                url: process.env.REACT_APP_API_BASE_URL + '/cakecart',
                method: 'post'
            }).then(res => {
                const cakeList = res.data.data
                props.dispatch({
                    type: "SHOW_CART",
                    payload: {
                        data: cakeList
                    }
                })
            }, err => {
            })
        }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link to="/" className="navbar-brand">Cake Bazaar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>

            <div className="item collapse navbar-collapse" id="navbarSupportedContent">
                {props.isLoggedIn && <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link">Welcome, {props.username}</a>
                    </li>
                </ul> }
                {props.isLoggedIn && <form className="form-inline col-lg-8">
                    <input className="form-control mr-sm-2 col-md-10" type="search" placeholder="Search" aria-label="Search" onChange={getSearchString} />
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={buttonClick}>Search</button>
                </form> }
                {!props.isLoggedIn && <form className="form-inline col-lg-10">
                    <input className="form-control mr-sm-2 col-md-10" type="search" placeholder="Search" aria-label="Search" onChange={getSearchString} />
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={buttonClick}>Search</button>
                </form> }
                {props.isLoggedIn && <Link to={'/orders'} className="my-2 my-sm-0 ml-sm-1" style={{color:'white',textDecoration:'none',cursor:'pointer'}}>Orders</Link>}
                {props.isLoggedIn && <a onClick={logout} className="my-2 my-sm-0 ml-sm-2" style={{color:'white',textDecoration:'none',cursor:'pointer',marginLeft:'10px'}}>Logout </a>}
                {!props.isLoggedIn && <Link to="/login" className="my-2 mr-sm-2" style={{color:'white',textDecoration:'none'}}><i className="fa fa-user" aria-hidden="true"></i>Login |</Link>}
                {!props.isLoggedIn && <Link to="/signup" className="my-2 my-sm-0 ml-sm-2" style={{color:'white',textDecoration:'none'}}> <i className="fa fa-user" aria-hidden="true" style={{marginRight:'10px'}}></i>Register</Link>}
                {props.isLoggedIn && localStorage.getItem('userData') && ((JSON.parse(localStorage.getItem('userData'))).email ===  (JSON.parse(localStorage.getItem('userData'))).email === 'faiz05rajput@gmail.com') && <Link to="/admin" className="my-2 my-sm-0 ml-sm-2">
                    <span title="Admin">
                        <FontAwesomeIcon icon="user"/>
                    </span>
                </Link> }
                
                {props.isLoggedIn && <Link to="/cart" className="my-2 my-sm-0 ml-sm-2" style={{marginLeft:'10px'}}>
                   
                    <span className="btn btn-warning" style={{marginLeft:'10px'}}>  Cart - {props.totalItems} Items
                  
                    </span>
                    
                </Link> }
            </div>
        </nav>
    )
}

export default connect((state, props) => {
    return {
        username: state.AuthReducer.username,
        isLoggedIn: state.AuthReducer.isLoggedIn,
        totalItems: state.CartReducer.totalItems
    }
}) (withRouter(Navbar));
