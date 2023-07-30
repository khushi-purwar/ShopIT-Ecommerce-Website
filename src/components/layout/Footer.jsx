import React from "react";
import {Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
 <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
      <div className="footer-images">
      <img src="./images/playstore.png" alt="playstore" />
      <img src="./images/Appstore.png" alt="Appstore" />
      </div>
      </div>

      <div className="midFooter">
        <h1>SHOP IT</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Khushi Purwar</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us On</h4>
        <div className="icons">
          <Link to="https://www.instagram.com/khushi_140901/" className="insta"><i class="fa fa-instagram"></i></Link>
          <Link to="https://www.linkedin.com/in/khushi-purwar/" className="linkedin"><i class="fa fa-linkedin"></i></Link>
          <Link to="https://github.com/khushi-purwar/" className="github"><i class="fa fa-github"></i></Link>
        </div>
       
      </div>
    </footer>
    </>
  );
};

export default Footer;
