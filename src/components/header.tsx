
// import React from 'react';
import { Link, NavLink } from "react-router-dom";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";

export default function Header(){

    function isActiveLink({isActive} : {isActive: boolean}) {
        return isActive ? "font-semibold text-white" : undefined;
    }
    return(
         <header className="border-b-2 py-2">
            <nav className="grid grid-cols-[200px_auto_200px] items-center gap-4">
                <section className="h-12">
                    <Link to="/browse">
                    <img 
                    className="h-full w-full object-contain" 
                    src={netflixLogo} 
                    alt="Netflix logo" />
                    </Link>
                </section>
                <section className="text-sm font-thin text-gray-300">
                    <ul className="flex gap-4">
                        <li>
                            <NavLink className={isActiveLink} to="/browse">Home</NavLink>
                        </li>

                        <li>
                            <NavLink className={isActiveLink} to="/browse/genre">TV Shows</NavLink>
                        </li>

                        <li>
                            <NavLink className={isActiveLink} to="/browse/genre/movies">Movies</NavLink>
                        </li>

                        <li>
                            <NavLink className={isActiveLink} to="/latest">New & Popular</NavLink>
                        </li>
                    </ul>
                </section>
                <section>
                    search icon user info
                </section>
            </nav>
        </header>
    );
}