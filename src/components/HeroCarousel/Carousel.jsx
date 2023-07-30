import Slider from "react-slick";

//  import css files 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// component
import {NextArrow, PrevArrow} from './Arrows'

const Carousel = () => {

  const settings = {
    arrows: true,
    autoplay: true,
    centerMode: true,
    centerPadding: "300px",
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 1000,
 
}

// const settings = {
//     arrows: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow : <NextArrow/>,
//     prevArrow : <PrevArrow />
// };
  
const images = [
  "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2F0Y2h8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1588058365548-9efe5acb8077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1552975084-6e027cd345c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHRlbGV2aXNpb258ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoZXN8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1520095570847-5d121452cd39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNob2V8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGVhbHRofGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
]
  return (
    <Slider {...settings} className="mb-5">
       {images.map(image =>(
         <div style={{width :'100%'}}>
           <img src={image} alt="product" style={{width :'100%', height :'400px',  padding: '7px', borderRadius: "20px",}}   />
         </div>
       ))}
    </Slider>
  )
}

export default Carousel
