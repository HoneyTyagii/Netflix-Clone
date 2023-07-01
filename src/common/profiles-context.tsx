import React, { createContext, useEffect, useReducer } from 'react'
import { ProfilesContextType, UserProfile } from './types';
import { useAuth } from './auth';

type StoredProfiles = Map<string, ProfilesContextType>;

const LOCAL_STORAGE_KEY = "profiles";

const ProfilesContext = createContext<ProfilesContextType | null>(null);

const ProfileDispatchContext = createContext(null);


export default function ProfilesProvider({
    children,
} : {
    children: React.ReactElement;
}) {

    const {user} = useAuth();

    const userProfiles = findProfile(user?.email as string);

    const [state,dispatch] = useReducer(profilesReducer,userProfiles)

    useEffect(() => {

    }, [])

    return <ProfilesContext.Provider>
        <ProfileDispatchContext.Provider>
            {children}
        </ProfileDispatchContext.Provider>
    </ProfilesContext.Provider>
    
}

function getProfiles(){
    return new Map(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)?? "[]"));
}

function findProfile(id:string){
    const profiles = getProfiles();
    return id ? profiles.get(id) as StoredProfiles ?? null : null;
}