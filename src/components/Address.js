import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const Address = (props) => {
    const [disablePaymentLink, setDisablePaymentLink] = useState(true)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [phone, setPhone] = useState('')

    const submitAddress = (event) => {
        event.preventDefault()
        const finalValue = address + '_' + city + '_' + pincode + '_' + phone
        props.onSubmit(finalValue)
        setDisablePaymentLink(false)
        props.onChange(disablePaymentLink)
    }

    return (
        <div className="container">
            <form onSubmit={submitAddress}>
                <div className="form-group address">
                    <input value={address} name='address' onChange={e => setAddress(e.target.value)} className="form-control" placeholder="Enter Address" required/>
                </div>
                <div className="form-group city">
                    <input value={city} name='city' onChange={e => setCity(e.target.value)} className="form-control" placeholder="Enter City" required/>
                </div>
                <div className="form-group pincode">
                    <input value={pincode} name='pincode' onChange={e => setPincode(e.target.value)} className="form-control" placeholder="Enter Pin Code" required/>
                </div>
                <div className="form-group phone">
                    <input value={phone} name='phone' onChange={e => setPhone(e.target.value)} className="form-control" placeholder="Enter Phone" required/>
                </div> 
                
                <button className="btn btn-primary" style={{float: "right"}}>
                Place Order
                <span style={{marginLeft:'5px'}}>
                            <FontAwesomeIcon icon="arrow-right"/>
                        </span>
                </button>
            </form>
          
        </div>
    )
}

export default connect() (withRouter(Address))