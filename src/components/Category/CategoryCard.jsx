import React from "react";
import {Link} from 'react-router-dom';

const CategoryCard = () => {

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
  return (
    <>
      <h1>Browse Different Categories</h1>

      <div className="row mt-3">
        {categories && categories.map((category) => (

            <div className="col-sm-4 col-md-3 col-lg-2 p-2">
               <Link to={`/category/${category}`} style={{textDecoration: 'none', color: "#FA9C23"}}>
              <div class="card">
                <div className="card-body p-3 text-center ">
               
                  <h5 className="card-title">{category}</h5>
                 
                </div>
              </div>
              </Link> 
           </div>
         
          ))}
      </div>
    </>
  );
};

export default CategoryCard;
