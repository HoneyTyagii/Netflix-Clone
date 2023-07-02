// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {User, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX5KT2bRjqr4t6vpSTAlJpOdOL9_wEmow",
  authDomain: "netflix-clone-4c49b.firebaseapp.com",
  projectId: "netflix-clone-4c49b",
  storageBucket: "netflix-clone-4c49b.appspot.com",
  messagingSenderId: "344205088834",
  appId: "1:344205088834:web:2085ac873c960ef26d35db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export type AuthContextType = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}:{
  children:React.ReactElement|React.ReactElement[];
}) =>{
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext) ?? {} as AuthContextType ;

function useProvideAuth(){
  // current user => null
  // 1. firebase is still fetching the information. async operation
  // 2. when the user is logged out
  //user is logged in => User
    const [user, setUser] = useState<User|null>(auth.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) =>{
        setLoading(false);
        setUser(user);
      });
      return () => {
        unsubscribe();
      }
    }, []);
    

    const signUp = (email:string, password:string) => createUserWithEmailAndPassword(auth, email, password).then(({ user })=>{
        return user;
    });

    const signIn = (email:string, password:string)=> signInWithEmailAndPassword(auth,email,password).then(({ user })=>{
        return user;
    });

    const signOutUser = ()=>signOut(auth);

    return {
        signUp,
        signIn,
        signOut: signOutUser,
        user,
        loading,
    };
}