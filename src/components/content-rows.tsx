import { useEffect, useRef, useState } from "react";
import { ENDPOINT } from "../common/endpoints";
import { MovieResponse, MovieResult, fetchRequest } from "../common/api";
type RowProp = {
    endpoint: string;
    title: string;
};
export default function ContentRows({ title, endpoint}: RowProp) {
    const sliderRef = useRef<HTMLSelectElement>(null);
    const [rowData, setRowData] = useState<MovieResult[]>([]);
    async function fetchRowData() {
        const response =  await fetchRequest<MovieResponse<MovieResult[]>>(
            endpoint
        );
        setRowData(response.results);
    }
    function createImageURL(path: string) {
        return `${import.meta.env.VITE_BASE_IMAGE_URI}/${path}`;
    }

    function onNextClick() {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-100%)`;
        }
    }
    function prevClick() {}
    useEffect(() => {
        fetchRowData();
    }, []);
    return( 
    <section className="">
        <h2 className="mb-4">{title}</h2>
        <section className="relative flex flex-nowrap gap-2 overflow-hidden">

        
        <button className="absolute h-full bg-black/25">prev</button>

        <button 
        className="absolute right-0 z-[1] h-full bg-black/25" 
        onClick={onNextClick}
        >
            next
        </button>


            <section
            ref={sliderRef} 
            className="flex gap-2 transition-transform delay-700">
            {rowData?.map((row) => {
                const { id, title, poster_path } = row;
                console.log(row); 
                return (
                     <section key={id} 
                     className="h-[200px] w-[200px] flex-none">
                        <img 
                        loading="lazy"
                        className="h-full w-full" 
                        src={createImageURL(poster_path)} 
                        alt={title} />
                     </section>
                );
            })}
            </section>
        </section>
    </section>
    );
}