import { useNavigate, useParams } from "react-router-dom"
import {BiArrowBack} from 'react-icons/bi'
import { useCallback, useEffect, useState } from "react";
import {Movie} from '../Types/Movie';


const MoviePlayer = () => {
const {MovieName} = useParams();
const Navigate = useNavigate();
const [Movie,setMovie]=useState<Movie | null>(null);

const FetchMovie = useCallback(async()=>{
  if(MovieName){
    try {
        const response = await fetch('/movie.json'); 
        const data:Movie[] = await response.json();
        if(data){
            const FilteredMovie = data.filter((movie)=>movie.name===MovieName);
            const WatchMovie = FilteredMovie[0];
            setMovie(WatchMovie as Movie);
        }
  } catch (error:any) {
    console.log(error);
  }
}else{
    console.log('No Movie Name Found');
}
},[]);

useEffect(()=>{
    FetchMovie()
},[FetchMovie]);

    return (
        <div className='h-screen w-screen bg-black'>
         
        <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
         <BiArrowBack className='text-white cursor-pointer w-[20px] h-[20px] sm:w-[40px] sm:h-[40px]' onClick={()=>Navigate('/')}/>
       <div className='flex items-center'>
        <span className='font-light mr-2 text-sm sm:text-[20px] text-white'>
          watching :
          </span>
          <p className=' text-white text-sm sm:text-[25px] font-bold'>
          {MovieName}
        </p>
           </div>
 
        </nav>
        {
            Movie?
        <video src={Movie.video}
        className='h-full w-full'
        autoPlay controls
        />
        :
        <video src={'/'}
        className='h-full w-full'
        autoPlay controls
        />
           }
 
         </div>
  )
}

export default MoviePlayer