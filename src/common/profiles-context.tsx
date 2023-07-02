import React, { createContext, useContext, useEffect, useReducer } from "react"
import { ActionType, ProfilesContextType } from "./types";
import { useAuth } from "./auth";
import profilesReducer from "../reducer/profilesReducer";

type StoredProfiles = Map<string, ProfilesContextType>;
const LOCAL_STORAGE_KEY = "profiles";

const ProfilesContext = createContext<ProfilesContextType | null>(null);

const ProfileDispatchContext = createContext<React.Dispatch<ActionType>| null>(null);


export default function ProfilesProvider({
    children,
} : {
    children: React.ReactElement;
}) {

    const {user} = useAuth();

    const userProfiles = findProfile(user?.email as string);

    const [state,dispatch] = useReducer(profilesReducer,userProfiles)

    useEffect(() => {
        if(user?.email){
            if(state){
                const storedProfiles = getProfiles();
                storedProfiles.set(user.email, state as ProfilesContextType);
                updateProfiles(storedProfiles);
            }else{
                dispatch({type:"load",payload:userProfiles});
            }
        }
    }, [user?.email,state])

    return <ProfilesContext.Provider value={state}>
        <ProfileDispatchContext.Provider value={dispatch}>
            {children}
        </ProfileDispatchContext.Provider>
    </ProfilesContext.Provider>
    
}

function getProfiles():StoredProfiles{
    return new Map(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)?? "[]"));
}

function findProfile(id:string){
    const profiles = getProfiles();
    return id ? profiles.get(id)  ?? null : null;
}

function updateProfiles(profiles:StoredProfiles){
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(profiles)));
}

export const useProfilesContext = () => useContext(ProfilesContext);
export const useProfilesDispatchContext = () => 
useContext(ProfileDispatchContext) as React.Dispatch<ActionType> ;