import {Component} from "react";

class Carousel extends Component {
    render() {
        return (
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://cdn.shopify.com/s/files/1/1758/8043/files/Banner_1_2000x2000.jpg?v=1581943077" className="d-block w-100" alt="Image 1" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 style={{color:'black',fontWeight:"bolder"}}>It smells freshly baked</h5>
                                <p style={{color:'black',fontWeight:"bolder"}}>We deliver the best of quality.</p>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvFz0321PUSTNpkDewV2Lcc07bsm-yReQrg&usqp=CAU" className="d-block w-100" alt="Image 2" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 style={{color:'black',fontWeight:"bolder"}}>Making Your Special Day More Special</h5>
                                <p style={{color:'black',fontWeight:"bolder"}}>We deliver the best of quality.</p>
                            </div>
                    </div>
                     <div className="carousel-item">
                        <img src="https://d3cif2hu95s88v.cloudfront.net/live-site-2016/2021/cakes-updated/welcome-cake-banner-mobile-1.jpg" className="d-block w-100" alt="Image 2" />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 style={{color:'black',fontWeight:"bolder"}}>Making Your Special Day More Special</h5>
                                <p style={{color:'black',fontWeight:"bolder"}}>We deliver the best of quality.</p>
                            </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default Carousel;