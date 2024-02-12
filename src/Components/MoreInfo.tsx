import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../Types/Movie";
import Navbar from "./Navbar";
import { BsFillPlayFill } from "react-icons/bs";

const MoreInfo = () => {
  const { MovieName } = useParams();
  const [Movie, setMovie] = useState<Movie | null>(null);
  const Navigate = useNavigate();
  const FetchMovie = useCallback(async () => {
    if (MovieName) {
      try {
        const response = await fetch("/movie.json");
        const data: Movie[] = await response.json();
        if (data) {
          const FilteredMovie = data.filter(
            (movie) => movie.name === MovieName
          );
          const WatchMovie = FilteredMovie[0];
          setMovie(WatchMovie as Movie);
        }
      } catch (error: any) {
        console.log(error);
      }
    } else {
      console.log("No Movie Name Found");
    }
  }, []);

  useEffect(() => {
    FetchMovie();
  }, [FetchMovie]);

  const formatDuration = (durationInSeconds: number): string => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    const hoursDisplay = hours > 0 ? `${hours}h` : "";
    const minutesDisplay = minutes > 0 ? `${minutes}m` : "";
    const secondsDisplay = seconds > 0 ? `${seconds}s` : "";

    return `${hoursDisplay} ${minutesDisplay} ${secondsDisplay}`.trim();
  };

  return (
    <>
      <Navbar />
      <div className="w-full bg-zinc-900 overflow-hidden h-screen flex justify-center items-center">
        {Movie ? (
          <div className="w-full relative  text-white flex flex-col max-w-2xl bg-black rounded-md h-max">
            <video
              className="w-full   h-full md:h-auto  object-cover brightness-[50%]"
              autoPlay
              loop
              muted
              poster={Movie.image}
              src={Movie.video}
            />
            <span className="bg-black rounded-md py-1 px-4 text-xs top-[40%] md:top-[60%] right-2 absolute">
              {formatDuration(Movie.duration)}
            </span>
            <div
              onClick={() => Navigate(`/watch/${Movie.name}`)}
              className="flex flex-row items-center absolute max-[340px]:bottom-[55%] max-[482px]:bottom-[50%] bottom-[40%] sm:bottom-[35%] left-5  gap-5 "
            >
              <div
                className="
cursor-pointer w-12 h-12 sm:w-14 sm:h-14 
bg-white rounded-full flex justify-center
items-center transition hover:bg-neutral-300 
"
              >
                <BsFillPlayFill size={35} color="black" className="ml-1" />
              </div>
            </div>
            <div className="flex flex-col p-10 gap-2">
              <span className="font-bold">{Movie.name}</span>
              <span>Genre: {Movie.genre}</span>
              <span>Ratings: {Movie.ratings}</span>
              <span>Release Date: {Movie.release_date}</span>
            </div>
          </div>
        ) : (
          <div className="h-[500px] bg-black animate-pulse" />
        )}
      </div>
    </>
  );
};

export default MoreInfo;
