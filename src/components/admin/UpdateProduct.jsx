import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

// layout
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";

// functions
import { updateProduct, getProductDetails, clearErrors } from "../../actions/productActions";

// constants
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'

const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [previousImages, setPreviousImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const alert = useAlert();
    const {product, error} = useSelector( (state) => state.productDetails)
    const { loading, error:updateError,  isUpdated } = useSelector( (state) => state.updateDeleteProduct);

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes',
        'Shoes',
        'Beauty',
        'Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    useEffect(() => {

        if(product && product._id !== id){
            dispatch(getProductDetails(id))
        }else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setSeller(product.seller);
            setCategory(product.category);
            setStock(product.stock);
            setPreviousImages(product.images);
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated) {
            navigate('/admin/products');
            alert.success('Product Updated Successfully');
            dispatch({
                type: 'UPDATE_PRODUCT_RESET'
            })
        }

    }, [dispatch, alert, error, updateError, navigate, isUpdated, id, product])

    const submitHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('seller', seller);
        formData.set('stock', stock);

        images.forEach(image => {
            formData.append('images', image)
        });

        dispatch(updateProduct(id, formData));
    }
  
    const onChange = (e)=> {
        const files = Array.from(e.target.files);

        setImagesPreview([])
        setImages([]);
        setPreviousImages([]);

        files.forEach( file => {
            const reader = new FileReader();
            reader.onload = () =>{
                if(reader.readyState === 2){
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file);
        })
    }


    return (
             <>
        <MetaData title="Update Product" />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
            <div className="wrapper my-5"> 
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
            <h1 className="mb-4">Update Product</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                placeholder="Watch"
                value={name}
                onChange={(e)=> setName(e.target.value)}
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  placeholder="490.21"
                  value={price}
                  onChange={(e)=> setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea 
                  className="form-control" 
                  id="description_field" 
                  rows="8" 
                  value={description} 
                  placeholder="This Samsung smartwatch is not only a looker, but it also comes with innovative features. This device can track your physical activity. Simply slip it on and start your daily workout. This way, you can keep a track of your activity for the day."
                  onChange={(e)=> setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select className="form-control" id="category_field" value={category}   onChange={(e)=> setCategory(e.target.value)}>
                   {categories.map(category=> 
                       <option key={category} value={category}>{category}</option>
                   )}
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  placeholder="20"
                  value={stock}
                  onChange={(e)=> setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  placeholder="Amazon"
                  value={seller}
                  onChange={(e)=> setSeller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            multiple
                            onChange={onChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Multple Images
                        </label>
                    </div>

                    {previousImages && previousImages.map(image => (
                        <img src={image.url} key={image.public_id} alt={image.url} className="mt-3 mr-2" width="55" height="52" />
                    ))}
                    {imagesPreview.map(image => (
                        <img src={image} key={image} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                    ))}
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading? true: false}
            >
              UPDATE
            </button>

          </form>
    </div>
              
            </div>
        </div>
    </>
    )
}

export default UpdateProduct;
