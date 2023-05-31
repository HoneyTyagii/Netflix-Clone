import React, { useEffect, useState } from "react";
import { MovieResponse, MovieResult, fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endpoints";
type RowProp = {
    endpoint: string;
    title: string;
};
const CARD_WIDTH = 200;
export default function ContentRows({ title, endpoint}: RowProp) {
    const [rowData, setRowData] = useState<MovieResult[]>([]);
    async function fetchRowData() {
        const response =  await fetchRequest<MovieResponse<MovieResult[]>>(
            endpoint
        );
        setRowData(response.results);
    }
    function createImageURL(path: string, width: number) {
        return `${import.meta.env.VITE_BASE_IMAGE_URI}/w${width}/${path}`;
    }
    useEffect(() => {
        fetchRowData();
    }, []);
    return (
    <section>
        <h2 className="mb-4">{title}</h2>
        <section className="flex flex-nowrap gap-2">
            {rowData?.map((row) => {
                const { id, title, poster_path, backdrop_path } = row;
                console.log(row); 


                return (
                     <section key={id} 
                     className="aspect-square flex-none overflow-hidden rounded-md">
                        <img 
                        loading="lazy"
                        className="h-full w-full" 
                        src={createImageURL(poster_path, CARD_WIDTH)} 
                        alt={title} />
                     </section>
                );
            })}
        </section>
    </section>
    );
}