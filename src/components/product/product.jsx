import React from 'react'
import {Link} from 'react-router-dom';

const product = (props) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${props.col} my-3`} key={product._id}>
        <div className="card p-3 rounded">
          <img
            className="card-img-top mx-auto"
            src={props.product.images[0].url}
            alt=""
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <Link to={`/product/${props.product._id}`}>{props.product.name}</Link>
            </h5>
            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div className="rating-inner" style={{width: `${ (props.product.ratings / 5) * 100}%`}}>

                </div>
              </div>
              <span id="no_of_reviews">({props.product.numOfReview} Reviews)</span>
            </div>
            <p className="card-text">${props.product.price}</p>
            <Link to={`/product/${props.product._id}`} id="view_btn" className="btn btn-block">
              View Details
            </Link>
          </div>
        </div>
      </div>
    )
}

export default product;
