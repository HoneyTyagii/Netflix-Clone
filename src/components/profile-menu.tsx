import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import React, { useEffect, useRef, useState } from 'react'
import profileImage from "/netflix-profile.png";
export default function ProfileMenu(){
    const [showMenu, setShowMenu] = useState(false);
    const ProfileMenuContainer = useRef<HTMLElement>(null);
    const timerId = useRef(0);
    function onMouseEnter(){
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
        setShowMenu(true);
    }
    function onMouseExit(){
        timerId.current = setTimeout(() => {
            setShowMenu(false);
        }, 300);
    }
    useEffect(() => {
        ProfileMenuContainer.current?.addEventListener("mouseenter", onMouseEnter)
        ProfileMenuContainer.current?.addEventListener("mouseleave", onMouseExit)

        return () => {
        ProfileMenuContainer.current?.removeEventListener(
            "mouseenter", 
            onMouseEnter
        );
        ProfileMenuContainer.current?.removeEventListener(
            "mouseleave", 
            onMouseExit
            );
        }; 

    },[])

    return (
        <section ref={ProfileMenuContainer} className="relative">
            <section className="flex items-center gap-2">
            <img 
            className="h-10 w-10 rounded-md"
            src={profileImage} 
            alt="User profile image" 
            />
            <ChevronDownIcon 
            style={{ strokeWidth: ".2rem"}}
            className={`h-6 w-6 transition-transform duration-200 
            ${showMenu ? "rotate-180" : ""
            } `} 
            />
            </section>
            {showMenu ? (
            <ul className="absolute -left-24 top-[60px] flex flex-col gap-4 bg-dark justify-center px-4 py-2 w-[200px]">
                <li>username</li>
                <li>Manage Profiles</li>
                <li>Transfer Profiles</li>
                <li>Account</li>
                <li>Help Center</li>
                <li className="-mx-4 border-t border-t-gray-500 px-4 pt-2">Sign out of Netflix</li>
            </ul>
            ) : null}
        </section>
    ); 
} 