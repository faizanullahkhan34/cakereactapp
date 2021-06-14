import {Link, withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cake from "./Cake";
import {connect} from "react-redux";
import {emptyCartMiddleware} from "../reduxstore/Middlewares";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Footer from "./Footer";
const Cart = (props) => {
    const [cakes, getCakes] = useState([]);
    let totalPrice = 0

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/cakecart',
            method: 'post'
        }).then(res => {
            if (res.data !== 'Session Expired') {
                const cakeList = res.data.data
                getCakes(cakeList);
                props.dispatch({
                    type: "SHOW_CART",
                    payload: {
                        data: cakeList
                    }
                })
            } else {
                props.history.push('/login')
            }
        }, err => {
            console.log('error')
        })
    }, [])

    const emptyCart = () => {
        props.dispatch(emptyCartMiddleware())
    }

    return (
        <div className="container-fluid" style={{marginTop: "100px"}}>
            <h1>My Cart</h1>
            <button className="btn btn-danger" onClick={emptyCart}>
                                <span style={{marginRight:'5px'}}>
                                    <FontAwesomeIcon icon="trash"/>
                                </span>
                                Remove All Items
            </button>
            <div className="row">
                {
                    cakes.map((each, index) => {
                        totalPrice += each.price
                        return (
                            <Cake data={each} key={index} page="cart"/>
                        )
                    })
                }
            </div>
            <span style={{float : "left", marginTop : "31px"}}>
                <h5 style={{textAlign:'center',fontWeight:'bolder'}}>Total Price: </h5> <span style={{textAlign:'center',fontWeight:'bolder'}}>Rs. {totalPrice}/-</span>
            </span>
            <span style={{float : "right", marginTop : "31px"}}>
                <Link to={'/checkout'} className="btn btn-primary"><span style={{marginRight:'5px'}}>Checkout </span> <FontAwesomeIcon icon="arrow-right"/></Link>
            </span>
            <div style={{marginTop:'80px'}}>
            <Footer />
            </div>
        </div>
    )
}

export default connect() (withRouter(Cart))