import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'

// layout
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import Sidebar from './Sidebar'

import {useAlert} from 'react-alert';

// fundctions
import {getAdminProducts, clearErrors, deleteProduct} from '../../actions/productActions'
import {DELETE_PRODUCT_RESET} from '../../constants/productConstants';
 
const ProductsLists = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error, products} = useSelector(state => state.products);
    const{error:deleteError, isDeleted} = useSelector(state => state.updateDeleteProduct)

    useEffect( ()=>{
        dispatch(getAdminProducts());

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success("Product Deleted Successfully!");
            navigate('/admin/products')
            dispatch({
                type: 'DELETE_PRODUCT_RESET'
            })
        }
    }, [dispatch, alert, error, deleteError, isDeleted, navigate])

    const setProducts = ()=>{
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: '#fa9c23'}}>{product._id}</Link>,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-1 mr-1">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-1" onClick={()=>deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        })
 

        return data;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }
    return (
        <>
            <MetaData title="All Products" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                   <h1 className="my-5">All Products</h1>
                   {loading ? <Loader /> : (
                       <MDBDataTable
                       data={setProducts()}
                       entriesOptions={[5, 10, 15, 20, 50, 100, 500,1000]}
                       className="px-3"
                       bordered
                       striped
                       hover
                      
                   />
                   )}
                </div>
            </div>
        </>
    )
}

export default ProductsLists;
