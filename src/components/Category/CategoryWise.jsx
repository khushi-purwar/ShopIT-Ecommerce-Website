import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";

// layout
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

// component
import Product from "../product/product";

// functions/actions
import {getProductsByCategory, clearErrors} from '../../actions/productActions';

const Category = () => {

    const {category} = useParams();
    console.log(category);
    const dispatch = useDispatch();
    const alert = useAlert();
    const {products, productCount, error, loading} = useSelector(state => state.getProductsByCategory);


    useEffect(() => {
        dispatch(getProductsByCategory(category));

        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
    } ,[dispatch, category, error, alert]);
    return (
        <>
     {loading ? <Loader /> : (
         <>
        <MetaData title={category} />
        <h1 className="mt-3">Category - {category}</h1>
        <section id="products" className="mt-3">
            <div className="row">
            { 
                products.length === 0 ? (
                    <h3 className='mt-3 ml-3 mb-4'>No products find under this category</h3>
                ) : (
                    products && products.map((product) => (
                    <Product product={product} key={product._id}col={3} />
                    ))
                )
            }
            </div>
        </section>
       
        </>
    )}

    </>
    )
}

export default Category
