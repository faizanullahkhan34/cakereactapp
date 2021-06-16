import Cake from './Cake'
import axios from "axios";
import React,{useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Footer from './Footer';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";



function CakeList(props) {

    let[data,setData]  =React.useState([]);
    const [sortDown, setSortDown] = useState(true);


    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API_BASE_URL+'/allcakes')
                .then(res => {
                    const Data = res.data.data;
                    setData(Data);
                   
                    
                })
                   
      }, []);

     
      const onSorting = (e) => {
       
        let option = e.target.value;
        if(option=='high') {

        const copy = [...data] // create copy of cases array (new array is created each time function is called)
        copy.sort((a, b) => b.price - a.price) // mutate copy array
        setSortDown(!sortDown); // set new value for sortDown
        setData(copy); // pass array to setCases


        }
        else {

        const copy = [...data] // create copy of cases array (new array is created each time function is called)
        copy.sort((a, b) => a.price - b.price) // mutate copy array
        setSortDown(!sortDown); // set new value for sortDown
        setData(copy); // pass array to setCases

        }
       
    }

    return (
        <>
       
        <div class="container-fluid">
         
        <div className="container-fluid" style={{marginTop:'20px'}}>
        <div className="row">
        <div className="col"></div>
              <div className="col">  </div>
              <div className="col"></div>
              <div className="col"></div>
              <div className="col">   
        <select onChange={onSorting} className="form-control">
                  <option value=""> Sort By Price</option>
                  <option value="high">High to Low</option>
                  <option value="low">Low to High</option>
                
               </select>
               </div>
        </div>
      </div>
        <br />
        <div style={{clear:'both',  display: "table"}}></div>
         <div class="row row-cols-1 row-cols-md-4 row-cols-sm-3 row-cols-xs-12 g-4">
            <Cake data={data}/>
            </div>
            
        </div>
        </>
        
    )
}

export default  CakeList;