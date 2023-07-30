import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link, useParams, useLocation } from "react-router-dom";

// 
import Carousel from './HeroCarousel/Carousel'
import CategoryCard from './Category/CategoryCard';

// layout
import Loader from "../components/layout/Loader";
import MetaData from "../components/layout/MetaData";

import { useSelector, useDispatch } from "react-redux";

// functions
import { getProducts } from "../actions/productActions";

// products
import Product from "../components/product/product";

import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);



const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes",
    "Shoes",
    "Beauty",
    "Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useAlert();
  const {
    loading,
    products,
    productCount,
    error,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();
 
  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, alert, error, keyword, currentPage, price, category, ratings]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <>


      {loading ? (
        <Loader />
      ) : (
        <>
       
        {! (location.pathname.split('/').includes('search')) &&  <Carousel /> }
          
          <MetaData title="Buy Best Products Online" />
          


          <div className="container">
         
          {! (location.pathname.split('/').includes('search')) &&  <CategoryCard />   }

          <h1 id="products_heading">Featured Products</h1>

          <section id="products" className="mt-3">
            <div className="row">
              {keyword ? (
                <>
                  <div className="col-6 col-md-3 my-5">
                    <div className="px-5">
                      <h5 className="mb-5" style={{ fontWeight: "bold" }}>
                        Price Filter
                      </h5>
                      <Range
                        marks={{
                          1: `$1`,
                          10000: `$10000`,
                        }}
                        min={1}
                        max={10000}
                        step={50}
                        defaultValue={[1, 10000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                        className="mt-5"
                      />
                      <hr className="mt-5 mb-4" />

                      <div className="mt-2">
                        <h5 className="mb-3" style={{ fontWeight: "bold" }}>
                          Categories Filter
                        </h5>

                        <ul className="pl-0">
                          {categories &&
                            categories.map((category) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                        </ul>
                      </div>

                      <hr className="mt-4 mb-4" />

                      <div className="mt-2">
                        <h5 className="mb-3" style={{ fontWeight: "bold" }}>
                          Rating Filter
                        </h5>

                        <ul className="pl-0">
                          {[5,4,3,2,1].map((star) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={star}
                                onClick={() => setRatings(star)}
                              >
                                <div className="rating-outer">
                                  <div className="rating-inner" style={{width: `${ (star / 5) * 100}%`}}>

                                  </div>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product
                            product={product}
                            key={product._id}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                products &&
                products.map((product) => (
                  <Product product={product} key={product._id} col={3} />
                ))
              )}
            </div>
          </section>

          {resPerPage < count && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={setCurrentPageNo}
                prevPageText={"Prev"}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}

          </div>
        </>
    
      )}
    </>
  );
};

export default Home;
