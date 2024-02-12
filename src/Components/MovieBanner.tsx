import {useRef,useState} from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';
import {BsFillPlayFill} from 'react-icons/bs';
import {MdOutlineCancel} from 'react-icons/md';
import { Movie } from '../Types/Movie';
import { useNavigate } from 'react-router-dom';


type MovieBannerProps = {
    Movie:Movie | null
}

const MovieBanner = ({Movie}:MovieBannerProps) => {

  const [showInfo,setshowInfo] =useState(false);
  const Navigate = useNavigate();
  const InfoVidRef = useRef<HTMLVideoElement>(null);

  const HandleMoreInfo = ()=>{
    if(!showInfo){
       window.scrollTo({top:0,behavior:'smooth'});
      setshowInfo(true);
      if(InfoVidRef && InfoVidRef.current){
        InfoVidRef.current.currentTime = 15;
      }
      }
  }

  
  const formatDuration = (durationInSeconds: number): string => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
  
    const hoursDisplay = hours > 0 ? `${hours}h` : '';
    const minutesDisplay = minutes > 0 ? `${minutes}m` : '';
    const secondsDisplay = seconds > 0 ? `${seconds}s` : '';
  
    return `${hoursDisplay} ${minutesDisplay} ${secondsDisplay}`.trim();
  };

    
  return (
    Movie ?
    <div className="relative h-full min-h-[300px] md:min-h-[600px] md:max-h-[700px] ">
 <video
 className='w-full relative  h-[400px] sm:h-[500px] md:h-[700px]  lg:h-[700px] object-cover brightness-[50%]' 
 autoPlay
 loop
 muted
poster={Movie.image}
src={Movie.video}/>

 
   <div className='absolute top-[50%] sm:top-[40%] md:top-[30%] ml-4 md:ml-16'>
   <p className='text-white  text-base sm:text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
   {Movie.name}
   </p>
     
   <div className='flex flex-row mt-3 md:mt-10 gap-3 '>
  
   <button disabled={showInfo} onClick={()=>Navigate(`/watch/${Movie.name}`)}  className={`${showInfo?'':'hover:bg-opacity-100'} flex bg-white  bg-opacity-70  w-24 h-[25px] md:w-44 md:h-[50px] rounded-[3px] justify-center items-center gap-2 p-2 text-xs lg:text-[20px]`}>
   <BsFillPlayFill  className='mr-1 w-[20px]  h-[20px] md:w-[30px] md:h-[30px]'/>
        Play</button>
    <button disabled={showInfo} onClick={HandleMoreInfo}  className={`${showInfo?'':'hover:bg-opacity-20'} flex bg-zinc-400 text-white bg-opacity-30 w-32 h-[25px] md:w-44 md:h-[50px] rounded-[3px] justify-center items-center gap-0 md:gap-2 p-2 text-xs lg:text-[20px] `}>
       <AiOutlineInfoCircle  className='mr-1 w-[20px]  h-[20px] md:w-[30px] md:h-[30px]'/>
        More Info</button>
   </div>
   
   </div>
   
   
   <div  className={`${showInfo?'visible':'hidden'} absolute top-20 md:top-36 left-0 md:left-[8%] lg:left-[20%] min-[1173px]:left-[25%] w-full  md:max-w-2xl lg:max-w-3xl h-max  z-[9999] `}>

   
    <video  className='
    cursor-pointer object-cover transition duration
    shadow-xl rounded-t-md w-full h-[35vw] md:h-[21vw] 
    '
    onClick={()=>Navigate(`/watch/${Movie.name}`)} 
    ref={InfoVidRef}
    src={Movie.video}  autoPlay  muted loop  />
    <MdOutlineCancel size={50} className='cursor-pointer text-white absolute z-20 top-0 right-3' onClick={()=>{
      setshowInfo(false)
      }}/> 
    <span className='bg-black rounded-md py-1 px-4 text-xs absolute bottom-2 sm:bottom-5 right-5 text-white  '>{formatDuration(Movie.duration)}</span>
 
   <div className='
    bg-zinc-800 p-2 lg:p-4 absolute 
   w-full  transition  shadow-md rounded-b-md
    flex flex-col h-max z-50
      '>
     
  <div onClick={()=>Navigate(`/watch/${Movie.name}`)}  className='flex flex-row items-center absolute top-[-40px] sm:top-[-60px] md:top-[-70px] left-5  gap-5 '>

   <div className='
   cursor-pointer w-8 h-8 sm:w-14 sm:h-14 
   bg-white rounded-full flex justify-center
   items-center transition hover:bg-neutral-300 
   '  >
       <BsFillPlayFill size={35} className='ml-1'/>
   </div>
  </div>
  <div className='flex flex-row justify-center mt-4 gap-2 items-center'>
    <p className='text-white font-bold text-sm sm:text-base lg:text-2xl'>{Movie.name}</p>
   </div>
  <div className='flex flex-col gap-2 px-6'>
   <div className='flex flex-row mt-4 gap-2 items-center'>
    <p className='text-white font-bold text-sm sm:text-base lg:text-2xl'>Genre: {Movie.genre}</p>
   </div>
   <div className='flex flex-row mt-4 gap-2 items-center'>
    <p className='text-white font-bold text-sm sm:text-base lg:text-2xl'>Ratings: {Movie.ratings}</p>
   </div>
   <div className='flex flex-row mt-4 gap-2 items-center'>
    <p className='text-white font-bold text-sm sm:text-base lg:text-2xl'>Release Date: {Movie.release_date}</p>
   </div>
   </div>
    
   </div>
   
   </div>
   
    </div>
    :
    <div className="relative min-h-[600px] w-full animate-pulse bg-black opacity-20" />
  )
}

export default MovieBanner;