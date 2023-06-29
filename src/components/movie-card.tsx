import React from "react";
import { createImageURL } from "../common/utils";


type MovieCardProp = {
    poster_path:string;
    id:number;
    title: string;
}

export default function MovieCard({poster_path, id, title}:MovieCardProp){
    return (
        <section 
        key={id} 
        className="h-[200px] w-[200px] flex-none"
        >
           <img 
           loading="lazy"
           className="h-full w-full" 
           src={createImageURL(poster_path,)} 
           alt={title} 
        />
        </section>
   );
}