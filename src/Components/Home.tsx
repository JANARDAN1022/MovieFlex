import {useEffect,useState,useCallback, useContext} from 'react'
import { Movie } from '../Types/Movie';
import  Navbar  from './Navbar';
import MovieBanner from './MovieBanner';
import MovieSlider from './MovieSlider';
import { MovieBannerContext } from '../Context/MovieBannerContext';
import MovieCard from './MovieCard';

const Home = () => {
    const [Movies, setMovies] = useState<Movie[] | null>(null);
    const {searchResults} = useContext(MovieBannerContext);
    const [Load,setLoad]=useState(9)
    const SlicedResults = searchResults && searchResults.slice(0,Load);

    const fetchMovies = useCallback(async () => {
        try {
          const response = await fetch('/movie.json'); 
          const data = await response.json();
         setMovies(data as Movie[]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },[]);

      const RandomMovie = ()=>{
        if(Movies){
        let index = Math.floor(Math.random() * Movies!.length);
        return Movies![index] as Movie;
        }else{
          return null
        }
      }

      const FilterActionMovies = ()=>{
        if(Movies){
          const ActionMovies = Movies.filter((Movie)=>Movie.genre==='Action');
          return ActionMovies as Movie[];
        }else{
          return null;
        }
      }

      
      const FilterComedyMovies = ()=>{
        if(Movies){
          const ComedyMovies = Movies.filter((Movie)=>Movie.genre==='Comedy');
          return ComedyMovies as Movie[];
        }else{
          return null;
        }
      }

      useEffect(()=>{
        if(!Movies){
       fetchMovies();
        }
      },[fetchMovies]);

      useEffect(()=>{
       if(!searchResults){
        window.scrollTo({top:0,behavior:'smooth'});
       }
      },[searchResults]);

      useEffect(()=>{
        const handleResize = () => {
          const windowWidth = window.innerWidth;
          if (windowWidth > 768) {
              setLoad(9);
          } else if (windowWidth >640) {
              setLoad(6);
          }else{
            setLoad(3);  
          }
      };
        handleResize();
        // event listener for window resize
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
      },[]);

      const HandleLoadMore = ()=>{
        if(searchResults && SlicedResults){
        const windowWidth = window.innerWidth;
        const LoadLimit = searchResults.length-SlicedResults.length;
        if (windowWidth > 768) {
            setLoad(LoadLimit>9?Load + 9:Load + LoadLimit);
        } else if (windowWidth >640) {
          setLoad(LoadLimit>6?Load + 6:Load + LoadLimit);
        }else{
          setLoad(LoadLimit>3?Load + 3:Load + LoadLimit);
        }
      }
      }


  return (
    Movies?
    <div className='h-screen  flex flex-col  gap-2 '>
      <div className='w-full'>
      <Navbar  Movies={Movies}/>
      </div>
       {!searchResults?
       <>
      <MovieBanner Movie={RandomMovie()}/>
      <div className='flex flex-col gap-20 mt-10 '>
      <MovieSlider Movies={FilterActionMovies()} />
      <MovieSlider Movies={FilterComedyMovies()} />
      </div>
      </>
      :
      
    <div className={` ${searchResults.length>3?'h-max':'h-screen'} w-full  px-10 py-16`}>
      {searchResults.length===0?
      <div className='w-full flex justify-center items-center h-full'>
        <span className='text-white font-bold text-xl'>No Movies Found</span>
      </div>
      :
    <div className='grid pb-5 w-full h-max gap-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
    { searchResults.slice(0,Load).map((searchResult)=>(
      <MovieCard Movie={searchResult}/>
    ))}
    
    </div>
       }
       <div onClick={HandleLoadMore} className={`${SlicedResults?.length===searchResults.length?'hidden':''} w-full flex  justify-center items-center`}>
    <button className='bg-red-500  border-black border-2 w-max p-2 rounded-md  text-white font-bold opacity-70 hover:opacity-100 transition-all ease-in-out'>Load More</button>
    </div>
    </div>
          }
    </div>
    :
    <div className='w-full h-screen bg-black opacity-30 animate-pulse'/>

   ) 
}

export default Home