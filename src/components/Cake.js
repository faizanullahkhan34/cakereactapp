import React,{useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import StarRatings from 'react-star-ratings';
import ReactPaginate from "react-paginate";

let Cake = (props) => {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
     
        return (
          <div>
          <div className="card" style={{width: '28rem',marginLeft:'10px',height:'30em'}}>
         <Link to={'/cake/'+props.data.cakeid}>
        <img src={props.data.image} className="card-img-top" alt={props.data.image} style={{height: '20rem'}} /> </Link>
        <div className="card-body">
          <h5 className="card-title">{props.data.name}</h5>
          <p className="card-text"> Rs.{props.data.price}</p>
          <p>
            <StarRatings rating={props.data.ratings} starRatedColor="yellow" numberOfStars={5} starDimension="25px" starSpacing="1px" name='rating'/>
          </p>
          
        </div>
              
      </div>
      
      </div>
      
        );
     
      }
      
      export default Cake;
      