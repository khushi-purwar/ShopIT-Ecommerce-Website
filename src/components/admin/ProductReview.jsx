import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'

// layout
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import Sidebar from './Sidebar'

import {useAlert} from 'react-alert';

// fundctions
import {getProductReviews, clearErrors, deleteReview} from '../../actions/reviewActions';

// type
import {DELETE_REVIEW_RESET} from '../../constants/reviewConstants';

const ProductReview = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, reviews} = useSelector(state => state.productReviews);
    const {error:deleteError, isDeleted} = useSelector(state => state.deleteReview)

    let [productId, setProductId] = useState('');

    useEffect( ()=>{
      
        if(error) {
            if(error.includes('No Reviews')){
                alert.show(error)
                dispatch(clearErrors())
            }else{
                alert.error(error)
                dispatch(clearErrors())
            }
        }
        
        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success("Review Deleted Successfully!");
            dispatch({
                type: 'DELETE_REVIEW_RESET'
            })
           
        }

    }, [dispatch, alert, error, navigate, isDeleted, deleteError, productId])

    const setReviews = ()=>{
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Name of the User',
                    field: 'user_name',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        const deleteReviewHandler = (reviewId) => {
            dispatch(deleteReview(productId, reviewId));
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user_name: review.name,
                actions: 
                <>
                  <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
             
            })
        })
 

        return data;
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(getProductReviews(productId));
       
    }

    return (
        <>
        <MetaData title="Reviews of a Product" />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
            <div className="row justify-content-center mt-5">
			<div className="col-5">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="productId_field">Enter Product ID</label>
                                    <input
                                        type="text"
                                        id="productId_field"
                                        className="form-control"
                                        placeholder="For example, 61a27fa5449f55c0a976e186	"
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="search_button"
                                    type="submit"
                                    className="btn btn-primary btn-block py-2"
                                >
                                    SEARCH
								</button>
                            </ form>
                        </div>
            
        </div>
               { reviews && reviews.length > 0 ? (
                   <MDBDataTable
                   data={setReviews()}
                   entriesOptions={[5, 10, 15, 20, 50, 100, 500,1000]}
                   className="px-3"
                   bordered
                   striped
                   hover
                  
               />
               ) : !error && <p className="text-center mt-5">No Reviews! Enter The Product Id To Get Reviews Of A Particular Product.</p>}
            </div>
        </div>
    </>
    )
}

export default ProductReview;
