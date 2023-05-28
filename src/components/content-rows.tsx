import { useEffect, useState } from "react";
import { ENDPOINT } from "../common/endpoints";
import { MovieResponse, MovieResult, fetchRequest } from "../common/api";
type RowProp = {
    endpoint: string;
    title: string;
};
export default function ContentRows({ title, endpoint}: RowProp) {
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
    useEffect(() => {
        fetchRowData();
    }, []);
    return <section>
        <h2 className="mb-4">{title}</h2>
        <section className="flex flex-nowrap overflow-x-auto">
            {rowData?.map((row) => {
                const { id, title, poster_path } = row;
                console.log(row); 
                return (
                     <section key={id} className="h-[200px] w-[200px] flex-none">
                        <img className="h-full w-full object-contain" src={createImageURL(poster_path)} alt={title} />
                     </section>
                );
            })}
        </section>
    </section>
}