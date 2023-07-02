import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../common/auth";
import { 
    useProfilesContext, 
    useProfilesDispatchContext 
} from "../common/profiles-context";
import { UserProfile } from "../common/types";
export default function ProfileMenu(){
    const {signOut} = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const ProfileMenuContainer = useRef<HTMLElement>(null);
    const timerId = useRef(0);
    const navigate = useNavigate();
    const userProfiles = useProfilesContext();
    const dispatch = useProfilesDispatchContext();
    const currentProfile = userProfiles?.profiles.find(
        (profile) => profile.id === userProfiles.selectedProfileId
    );
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

    async function signOutOfNetflix(){
        await signOut();
        dispatch({ type: "load", payload: null });
        navigate("/login");
    }

    function loadProfile(profile:UserProfile){
        dispatch({type:"current",payload:profile});
        // navigate("/browse");    
        window.location.reload(); //relaod whole page
    }

    return (
        <section ref={ProfileMenuContainer} className="relative">
            <section className="flex items-center gap-2">
            <img 
            className="h-10 w-10 rounded-md"
            src={currentProfile?.imageUrl} 
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
            <ul className="absolute -left-24 top-[60px] flex w-[200px] flex-col justify-center gap-4 bg-dark px-4 py-2 ">
                {userProfiles?.profiles
                .filter(profile=>profile.id !== currentProfile?.id)
                ?.map(profile => (
                <li 
                className="flex cursor-pointer items-center gap-2 hover:underline" 
                key={profile.id}
                onClick={() => loadProfile(profile)}
                >
                <img 
                className="h-8 w-8" 
                src ={profile.imageUrl} 
                alt={profile.name} 
                />{" "}
                {profile.name}
                </li>
                ))}
                <li 
                className={
                    (userProfiles?.profiles.length??0) > 1 
                    ? "-mx-4 border-t border-t-gray-500 px-4 pt-2"
                    : ""
                }
                >
                <Link className="hover:underline" to="/ManageProfiles">
                    Manage Profiles
                </Link>
                </li>
                <li>Transfer Profiles</li>
                <li>Account</li>
                <li>Help Center</li>
                <li 
                onClick={signOutOfNetflix} 
                className="-mx-4 cursor-pointer border-t border-t-gray-500 px-4 pt-2 hover:underline"
                >
                    Sign out of Netflix
                </li>
            </ul>
            ) : null}
        </section>
    ); 
} 