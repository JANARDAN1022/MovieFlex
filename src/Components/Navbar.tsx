import { useContext, useEffect,useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Movie } from "../Types/Movie";
import { MovieBannerContext } from "../Context/MovieBannerContext";

type NavbarProps = {
  Movies?:Movie[]  | null,
  Placeholder?:string
}

const Navbar = ({Movies,Placeholder}:NavbarProps) => {
    const [ShowBackground,setshowBackground]=useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
   const {setSearchResults} = useContext(MovieBannerContext);

    
    const location = useLocation();
    const Path = location.pathname;
    const TOP_OFFSET = 66;

    useEffect(()=>{
    const handleScroll = ()=>{
      if(window.scrollY >= TOP_OFFSET){
       setshowBackground(true);
      }else{
        setshowBackground(false);
      }
    }

    window.addEventListener('scroll',handleScroll);

    return()=>{
      window.removeEventListener('scroll',handleScroll)
    }
    },[]);


    const SearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);
      
      if (Movies) {
        const results = value
          ? Movies.filter(movie => movie.name.toLowerCase().includes(value))
          :null;
        setSearchResults(results);
      } else {
        setSearchResults(null);
      }
    };

   
  
    
  return (
    
 
    <nav className={`fixed flex max-[360px]:flex-col max-[360px]:gap-1 items-center flex-row justify-between  top-0 w-full z-[1000] p-2 md:p-4  bg-zinc-900 text-white font-bold ${ShowBackground===true?'bg-opacity-100':'bg-opacity-60'}`}>
      <div className="flex gap-5 sm:gap-10 md:gap-20 items-center">
      <Link to={'/'} onClick={()=>{
        setSearchResults(null);
        setSearchTerm('');
      }} className="sm:text-xl font-bold text-base ">MovieFlex</Link>
      <div className="hidden sm:flex sm:gap-5 md:gap-10 items-center">
      <Link to={'/Category/Action'} onClick={()=>{
        setSearchResults(null);
        setSearchTerm('');
      }} className={`${Path==='/Category/Action'?'opacity-100 underline':'opacity-70'}  hover:opacity-100`}>Action</Link>
      <Link to={'/Category/Comedy'} onClick={()=>{
        setSearchResults(null);
        setSearchTerm('');
      }} className={` ${Path==='/Category/Comedy'?'opacity-100 underline':'opacity-70'} hover:opacity-100`}>Comedy</Link>
      </div>
    </div>
    <input 
     value={searchTerm}
     onChange={SearchChange}
    type="search" className={`p-1 ${Path.includes(`/Info/`)?'hidden':''} text-sm sm:text-base sm:p-2 rounded-md outline-none bg-white sm:mr-5 md:mr-10 text-black`} placeholder={`${Placeholder?Placeholder:'Search Movies'}`}/>
    </nav>
   )
}

export default Navbar