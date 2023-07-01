import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

export default function SeacrhBar(){
    const [open, setOpen] = useState(false);
    const strokeWidth = {strokeWidth: ".2rem"};
    const inputRef = useRef<HTMLInputElement>(null);
    function handleOutsideClick(event: globalThis.MouseEvent) {
        if((event.target as HTMLInputElement).id !== "searchbar"){
            setOpen(false);
        }
    }
    function toogleSearch(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        if (!open){
            inputRef.current?.focus();
        }
        setOpen(!open);
    }

    useEffect(() => {
        if (open) {
            window.addEventListener("click", handleOutsideClick);
        }
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [open]);
    return (
    <section className="flex w-[300px] justify-end items-center overflow-hidden">
        <button className={`h-8 ${!open ? "w-8" : "w-0"}`} onClick={toogleSearch} >
            <SearchIcon style={strokeWidth} />
        </button>
        <section 
        className={`${
            open ? "w-full animate-slide-rtl border border-white p-1" : "w-0"
            } flex items-center gap-2 bg-dark`}>
            <button className="h-8 w-8">
                <SearchIcon style={strokeWidth} />
            </button>
            <input ref={inputRef}
            className="w-full bg-dark outline-none"
            type="text" 
            name="searchbar" 
            id="searchbar" 
            placeholder="Title, people, genres"
            />
        </section>
    </section>
    );
}