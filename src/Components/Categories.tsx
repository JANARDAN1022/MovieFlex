import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Movie } from '../Types/Movie';
import MovieBanner from './MovieBanner';
import MovieSlider from './MovieSlider';
import { MovieBannerContext } from '../Context/MovieBannerContext';
import MovieCard from './MovieCard';

const Categories = () => {
    const {category} = useParams();
    const [GenreMovies,setGenreMovies]=useState<Movie[] | null>(null);
    const {searchResults} = useContext(MovieBannerContext);
    const [Load,setLoad]=useState(9)
    const SlicedResults = searchResults && searchResults.slice(0,Load);
   
const FetchCategoryMovies = useCallback(async()=>{
    if(category){
    try {
        const response = await fetch('/movie.json'); 
        const data:Movie[] = await response.json();
        if(data){
            const FilteredMovies = data.filter((movie)=>movie.genre===category);
            setGenreMovies(FilteredMovies as Movie[])
        }
        // window.scrollTo({top:0,behavior:'smooth'})
  } catch (error:any) {
    console.log(error);
  }
}else{
    console.log('Error Category Movies');
}
},[category]);

const RandomGenreMovie = ()=>{
    if(GenreMovies){
        let index = Math.floor(Math.random() * GenreMovies!.length);
        return GenreMovies![index] as Movie;
        }else{
          return null
        }
}

useEffect(()=>{
FetchCategoryMovies();
},[FetchCategoryMovies]);

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
    <div className='h-screen flex flex-col overflow-x-auto  gap-2 pb-10'>
    <div className='w-full'>
    <Navbar Movies={GenreMovies} Placeholder={`Search ${category} Movies`}/>
    </div>

   {!searchResults?
    <>
    <MovieBanner Movie={RandomGenreMovie()}/>
    <div className='flex flex-col gap-20 mt-10'>
    <MovieSlider Movies={GenreMovies} />
    </div>
    </>
    :
    <div className={` ${searchResults.length>3?'h-max':'h-screen'} w-full  p-10`}>
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
  )
}

export default Categories