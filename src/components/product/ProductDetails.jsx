import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

// component
import ListReviews from "./ListReviews";
import Product from "../product/product";

// layout
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

// functions
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const { loading, error, product, recommendedProducts } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  }, [dispatch, alert, error, id]);

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item Added To Cart Successfully!");
  };

 
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={` ${product.name}`} />
          <div className="row f-flex justify-content-around mb-4">
            <div className="col-12 col-lg-6 " id="product_image">
              <Carousel
                pause="hover"
                controls="false"
                nextLabel=""
                prevLabel=""
                indicators={false}
                interval={3000}
              >
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100"
                        src={image.url}
                        alt={product.title}
                        height="380px"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">( {product.numOfReview} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0}
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              <hr />

        
            </div>

            
          </div>
        

          <div className="container row mt-5 ">
        
            <h4 className="mt-2">Description:</h4> <br/>
            <p>{product.description}</p>
          </div>

          {/* reviews */}
          <ListReviews />

          <hr className="mt-4" />
          <h3 className="mt-4" >You might be interested in</h3>
          <div className="row">
            {recommendedProducts &&
              recommendedProducts.map((product) => (
                <Product product={product} key={product._id} col={3} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
