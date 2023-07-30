import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

// function
import { newReview} from "../../actions/reviewActions";
import { clearErrors , getProductDetails} from "../../actions/productActions";

// constants
import { NEW_REVIEW_RESET } from "../../constants/reviewConstants";

const ListReviews = () => {


  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
    const { product } = useSelector(state=> state.productDetails)
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // dispatch(getProductDetails(id));
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      dispatch(getProductDetails(id));
      alert.success("Review Posted Successfully");
      dispatch({
        type: "NEW_REVIEW_RESET",
      });
    }
  }, [dispatch, alert, reviewError, success, id]);


  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const reviewHandler = (e) => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);

    dispatch(newReview(formData));
  };


    return (
        <>
        <div className="row mt-5">
          <div className="col-12 col-lg-6 " i>
               
          <h3 style={{ fontWeight: "bold" }} >
         
         Review this product
       </h3>
       <p>Share your thoughts with other customers</p>

       {user ? (
         <button
           id="review_btn"
           type="button"
           className="btn btn-primary mt-2"
           data-toggle="modal"
           data-target="#ratingModal"
           
         >
           Submit Your Review
         </button>
       ) : (
         <div className="alert alert-danger mt-3" type="alert">
           Login to Post your Review.
         </div>
       )}


        <div className="row">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ReactStars
                            count={5}
                            value={rating}
                            onChange={ratingChanged}
                            size={50}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#fa9c23"
                            required
                          />

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your review here."
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            onClick={reviewHandler}
                            data-dismiss="modal"
                            aria-label="Close" // for close the model after review posted
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          </div> 


           <div className="col-12 col-lg-5">
           <h3>Reviews:</h3>
         <hr/>
         
         {product.reviews && product.reviews.length>0 ? product.reviews.map((review)=> (
           <div className="reviews w-75 mt-3 ">
          
         
               <div className="review-card mt-3">
               <figure className="avatar avatar-nav">
                  <img
                    src={review.user.avatar.url && review.user.avatar.url}
                    alt={review.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{review.name}</span><br/>
                   <div className="rating-outer mt-2">
                       <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                   </div>
                   
                   <p className="review_comment">{review.comment}</p>
         
               </div>
           </div>
         ))
         : "No Reviews Given Yet"
        }
           </div>
        </div>
       

       
            
        </>
    )
}

export default ListReviews;
