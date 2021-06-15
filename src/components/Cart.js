import {Link, withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cake from "./Cake";
import './cart.css'
import {connect} from "react-redux";
import {emptyCartMiddleware,addCartMiddleware,removeOneCakeFromCartMiddleware,removeCakeFromCartMiddleware} from "../reduxstore/Middlewares";
import Footer from "./Footer"; 
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';  
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

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

    const addOneCakeToCart = (cakeId) => {
        props.dispatch(addCartMiddleware(cakeId))
    }

    const removeOneCakeFromCart = (cakeId) => {
        props.dispatch(removeOneCakeFromCartMiddleware(cakeId))
    }

    const removeCakeFromCart = (cakeId) => {
        props.dispatch(removeCakeFromCartMiddleware(cakeId))
    }

   if(cakes.length > 0){
    return (
        <div className="container-fluid mt-5">
        <h2 className="mb-5 text-center">Shopping Cart</h2>
        <button className="btn btn-danger" style={{float:'right'}} onClick={emptyCart}> Clear All</button>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="table-responsive">
                    <table id="myTable" className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th className="text-right"><span id="amount" className="amount">Amount</span> </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                        
                      
                        {
                    cakes.map((data, index) => {
                        totalPrice += data.price
                                return (
                            <tr key={index}>
                          
                                <td>
                                    <div className="product-img">
                                        <div className="img-prdct"><img src={data.image}  /></div>
                                    </div>
                                </td>
                                <td>
                                    <p>{data.name}</p>
                                </td>
                                <td className="text-center">
                                            <AddBoxOutlinedIcon style={{cursor:'pointer'}} onClick={() => addOneCakeToCart(data)} />
                                            <div className="count-input">
                                                <label> {data.quantity} </label>
                                            </div>
                                            <IndeterminateCheckBoxOutlinedIcon style={{cursor:'pointer'}} onClick={()=>removeOneCakeFromCart(data.cakeid)} />
                                        </td>
                                <td>
                                    <input type="text" value={data.price} className="price form-control" disabled />
                                </td>
                                <td >Rs. <span id="amount" className="amount">{data.price }</span></td>
                                <td> <button className="btn btn-danger" onClick={() => removeCakeFromCart(data.cakeid)}><i className="fa fa-trash"></i></button>  </td>
                            </tr>
                             ) })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4"></td><td><strong>TOTAL = Rs.<span id="total" className="total">{totalPrice}</span></strong></td>
                            </tr>
                        </tfoot>
                        
                    </table>
                </div>
            </div>
        </div>
    <Link to="/"> <button className="btn- btn-success" style={{float:'left'}}>Continue Shopping</button> </Link>      
   <Link to="/Checkout"> <button className="btn- btn-success" style={{float:'right'}}>Proceed To Checkout</button> </Link> 
    </div>
    );
    }
    else {
        return(
            <>
            <h3 style={{marginTop:'100px'}}> Your Cart is Empty</h3>
            <butoon className="btn btn-primary"> <Link to="/" style={{color:'white'}}>Continue Shopping </Link>  </butoon>
            </>
        )
    }
}

export default connect() (withRouter(Cart))