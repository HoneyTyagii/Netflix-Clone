import  { useEffect, useState } from "react";
import { MovieResponse, MovieResult, MovieVideoInfo, fetchRequest, fetchVideoInfo } from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import { createImageURL } from "../common/utils";
import YouTube, {YouTubeEvent, YouTubeProps} from "react-youtube";
import Info from "@heroicons/react/24/outline/InformationCircleIcon";
import PlayIcon from "@heroicons/react/24/solid/PlayIcon";
import Loader from "./loader";

// eslint-disable-next-line react-refresh/only-export-components
export default function () {
    const [randomMovie, setRandomMovie] = useState<MovieResult>();
    const [videoInfo, setVideoInfo] = useState<MovieVideoInfo>();
    const [hidePoster, setHidePost] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const options: YouTubeProps["opts"] = {
        width: document.body.clientWidth,
        height: "800",
        playerVars: {
        autoplay: 1,
        playsinline: 1,
        controls: 1,
    },
    };

    function getRandomIndex(last: number) {
        return Math.floor(Math.random() * (last-1))
    }
    async function fetchPopularMovies() {
        const response = await fetchRequest<MovieResponse<MovieResult[]>>(ENDPOINT.MOVIES_POPULAR);
        const filteredMovies = response.results.filter(
            (movie) => movie.backdrop_path
        );
        const randomSelection = 
            filteredMovies[getRandomIndex(filteredMovies.length)];
        console.log({randomSelection});
        setRandomMovie(randomSelection);

        const videoInfo = await fetchVideoInfo(randomSelection.id.toString());
        setVideoInfo(videoInfo[0]);
        setTimeout(() => {
            setHidePost(true);
        },1000);

    }

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    function onStateChange(event: YouTubeEvent<number>){
        //video has finished playing
        if(event.data === 0){
            setHidePost(false);
            setShowBackdrop(true);
        } else if(event.data === 1) {
            setHidePost(true);
            setShowBackdrop(false);
        }
    }

    return randomMovie ? (
    <section className="relative aspect-video h-[800px] w-full">
        <img 
        src={createImageURL(
            randomMovie?.backdrop_path as string, 
            0,
            "original"
        )} 
        alt={randomMovie?.title} 
        className = {hidePoster? `h-0 invisible`: `h-full w-full visible`}
        />
        {videoInfo ? (
        <YouTube 
        videoId={videoInfo?.key} 
        id="banner-video" 
        opts={options}
        className={`${
            hidePoster? "visible h-full":"invisible h-0"
        } absolute z-[1] -mt-14`}
        onStateChange={onStateChange}
        />
        ) : null}
        {showBackdrop ? (
        <section className="absolute z-[1] top-0 left-0 w-full h-full bg-dark/60"></section>
        ) : null}
        <section className="absolute bottom-16 z-[1] ml-16 max-w-sm flex-col gap-2 ">
            <h2 className="text-6xl">{randomMovie.title}</h2>
            <p className="text-sm line-clamp-3">{randomMovie.overview}</p>
            <section className="flex gap-2">
                <button className="flex w-[100px] items-center rounded-md bg-white p-2 text-dark justify-center">
                    <PlayIcon className="h-8 w-8" /> 
                    <span>Play</span>
                </button>
                <button className="flex w-[150px] rounded-md bg-zinc-400/50 p-2 text-white justify-center">
                    <Info className="h-8 w-8" /> 
                    <span>More Info</span>
                </button>
            </section>
        </section>
    </section>
    ) : <Loader /> ;
}