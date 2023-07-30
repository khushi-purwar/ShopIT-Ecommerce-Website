import React from 'react'
import {Link} from 'react-router-dom';
const NotFound = () => {
    return (
        <div className="PageNotFound">
        <img src="./images/notfound.png" alt="not-found" />
  
        <p>Page Not Found </p>
        <Link to="/">Home</Link>
      </div>
    )
}

export default NotFound
