import { useState,useRef } from "react";
import { Movie } from "../Types/Movie"
import { MdOutlineStar } from "react-icons/md";
import {BsFillPlayFill} from 'react-icons/bs';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type MovieCardProps = {
    Movie:Movie
}


const MovieCard = ({Movie}:MovieCardProps) => {
  const [isHovered,setisHovered]=useState(false);
  const [MovieHovered,setMovieHovered]=useState('');
  const Navigate = useNavigate();
  const InfoVidRef = useRef<HTMLVideoElement>(null);

const onHoverIn = ()=>{
  setisHovered(true);
  setMovieHovered(Movie.name)
  if(InfoVidRef && InfoVidRef.current){
    InfoVidRef.current.currentTime = 15;
  }
}

const onHoverOut = ()=>{
  setisHovered(false)
      setMovieHovered('');
}

  return (
    <div onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} className={` transition-all ease-in-out opacity-70 hover:opacity-100   bg-black text-white relative   ml-[2px] rounded-md `}>
    {!isHovered && MovieHovered!==Movie.name?
    <img onClick={()=>Navigate(`/watch/${Movie.name}`)} src={Movie.image} alt='MovieThumbnail' className='cursor-pointer w-full min-h-[120px] h-max max-h-[120px]  object-cover' />
     :
     <video 
     ref={InfoVidRef}
     autoPlay
     muted 
     src={Movie.video}
     onClick={()=>Navigate(`/watch/${Movie.name}`)}
     className="min-w-full h-[120px]  object-cover cursor-pointer"
     />
  }
           <div className="flex flex-col justify-between gap-2 py-4 px-6 w-full items-center">
           <span className={`${Movie.name.length>30?'text-xs w-full':'text-sm'}  font-bold`}>{Movie.name}</span>
            <div className="flex flex-col justify-center items-center w-full">
            <div className="flex gap-2 items-center">
            <button onClick={()=>Navigate(`/watch/${Movie.name}`)} className="flex gap-2 border border-white rounded-full w-8 h-8 justify-center items-center">
           <BsFillPlayFill size={30} className='ml-1'/>
            </button>
            <button onClick={()=>Navigate(`/Info/${Movie.name}`)}  className='flex  text-white bg-opacity-30 hover:bg-opacity-100 p-2 rounded-full'>
            <AiOutlineInfoCircle size={33} className='mr-1'/>
            </button>
            </div>
            <div className="flex flex-col gap-2">
            <span className="text-xs">{Movie.release_date}</span>
            <div className="flex gap-1 items-center justify-center">
            <span>{Movie.ratings}</span>
            <MdOutlineStar size={18} className="text-white mt-[0.5px]"/>
            </div>
            </div>
            </div>
            </div>
            </div>
  )
}

export default MovieCard