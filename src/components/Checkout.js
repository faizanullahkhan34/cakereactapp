import {Link, Route,Redirect} from "react-router-dom";
import Summary from "./Summary";
import Address from "./Address";
import Confirm from "./Confirm";
import {useState} from "react";
import {connect} from "react-redux";
import {placeOrderMiddleware} from "../reduxstore/Middlewares";
import {withRouter} from "react-router-dom";

let Checkout = (props) => {

    const [disableAddressLink, setDisableAddressLink] = useState(true)
    const [disablePaymentLink, setDisablePaymentLink] = useState(true)
    const data = {}
    let totalPrice = 0;

    const handleAddressLink = () => {
        setDisableAddressLink(false)
    }

    const handlePaymentLink = () => {
        setDisablePaymentLink(false)
    }

    const handleAddressSubmit = (value) => {
        value = value.split("_")
        data.address = value[0]
        data.city = value[1]
        data.pincode = value[2]
        data.phone = value[3]
        props.cakes.map((each, index) => {
            totalPrice += each.price
            return totalPrice
        })
        data.name = (JSON.parse(localStorage.getItem('userData'))).name
        data.price = totalPrice
        data.cakes = props.cakes
        console.log('data final value: ', data)
        props.dispatch(placeOrderMiddleware(data))
    }

    /*const placeOrder = (final_data) => {
        console.log('final data', final_data)
    }*/

    return (
        <div>
        <div className="row" style={{marginTop:'100px'}}>

        <div className="col-4">
        <ul style={{listStyle:'none',display:'block',marginTop:'50px'}}>
      <li style={{fontSize:'30px'}}> <Link className={"nav-link " + (disableAddressLink ? "active" : "")} aria-current="page" to={'/Checkout'}>Order Summary</Link> </li>
      <li style={{fontSize:'30px'}}> 
      {
                            !disableAddressLink
                            ? <Link className={"nav-link " + (disablePaymentLink ? "active" : "")} to={'/Checkout/Address'}>Address Details</Link>
                                : <Link className="nav-link disabled" to={'/Checkout/Address'} tabIndex="-1" aria-disabled="true">Address Details</Link>
                        }

      </li>
        </ul>    
        </div> 

        <div className="col-8">

        <Route exact path="/checkout"><Summary disableAddressLink={disableAddressLink} onChange={handleAddressLink} /></Route>
                        <Route exact path="/checkout/address"><Address disablePaymentLink={disablePaymentLink} onChange={handlePaymentLink} onSubmit={handleAddressSubmit} /></Route>
  
        </div>     
              
        </div> 
        </div>
    )
}

Checkout = connect(function (state, props) {
    if(state.CartReducer.success) {
        props.history.push('/orders')
        state.CartReducer.success = false
    }
    return {
        cakes: state.CartReducer.cart
    }
}) (Checkout)

export default withRouter(Checkout)