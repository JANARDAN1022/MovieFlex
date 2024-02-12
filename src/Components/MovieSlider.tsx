import {useState,useEffect} from 'react';
import {AiOutlineArrowLeft,AiOutlineArrowRight,AiOutlinePlus} from 'react-icons/ai';
import Slider from "react-slick";
import { Movie } from '../Types/Movie';
import "slick-carousel/slick/slick.css";
import MovieCard from './MovieCard';
import { Link, useLocation } from 'react-router-dom';


type MovieSliderProps = {
    Movies:Movie[] | null
}






const MovieSlider = ({Movies}:MovieSliderProps) => {
  const [slidesToScroll, setSlidesToScroll] = useState(5);
 

   
  const location = useLocation();
  const Path = location.pathname;
  
 
 
 
    
    
    const PrevArrow = (props:any) => (
        <button {...props}  className="slick-arrow slick-prev">
          <AiOutlineArrowLeft className={`text-white cursor-pointer p-1 top-0 left-[-2px] absolute z-[100] w-10 bg-[rgba(0,0,0,0.7)] h-[90%] max-h-full  `}  />
        </button>
      );
      
      const NextArrow = (props:any) => (
        <button {...props} className="slick-arrow slick-next">
          <AiOutlineArrowRight className={`text-white cursor-pointer  absolute z-[1] p-1 w-10 bg-[rgba(0,0,0,0.7)] h-[90%] right-[-2px] top-0 `} />
        </button>
      );
   
     
   

      useEffect(() => {
        const handleResize = () => {
          const windowWidth = window.innerWidth;
          if (windowWidth >= 1200) {
              setSlidesToScroll(5);
          } else if (windowWidth >= 992) {
              setSlidesToScroll(4);
          } else if (windowWidth >= 768) {
              setSlidesToScroll(3);
          } else if (windowWidth >=502) {
              setSlidesToScroll(2);
          }else{
            setSlidesToScroll(1);  
          }
      };
        handleResize();
        // event listener for window resize
        window.addEventListener('resize', handleResize);
        // Removing event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    


   

  return (
    <div className=' px-6 pb-8 relative transition ' >
     {Movies?
    <div className=''>
        <p className='text-white flex gap-5  text-md md:text-xl mb-2  lg:text-3xl font-semibold '>
         <span>{Movies[0].genre} </span>
         <Link to={`/Category/${Movies[0].genre}`} className={`${Path.includes('/Category')?'hidden':''} text-sm max-[375px]:text-xs max-[300px]:text-[8px] border bg-white w-max gap-2 opacity-70 hover:opacity-100 flex items-center text-black rounded-md px-2 `}>Explore {Movies[0].genre} Movies <AiOutlinePlus size={18} className='mt-1'/> </Link>
        </p>
        <Slider
        className='w-full  h-max max-h-[310px]'
  infinite={true}
  slidesToShow={slidesToScroll}
  slidesToScroll={slidesToScroll}
  speed={800}
   
  prevArrow={<PrevArrow />}
  nextArrow={<NextArrow />}
>
   
           {Movies?
    Movies.map((Movie)=>(
           <MovieCard Movie={Movie} key={Movie.name}/>
           ))
        : 
        <span>No Movies Found</span>  
        }
            </Slider>
        
       
    </div>
:
<div className='animate-pulse w-full bg-black h-[250px] opacity-30'/>
}
    </div>
  )
}

export default MovieSlider


