import React from "react";
import { 
  createBrowserRouter, 
  createRoutesFromElements,
  Link,
  Navigate,
  Outlet,
  Route, 
  RouterProvider,
} from "react-router-dom";
import ProfilesProvider from "./common/profiles-context";
import Layout from "./components/layout";
import Browse from "./pages/browse";
import Login from "./pages/login";
import { AuthProvider, useAuth } from "./common/auth";
import Profile from "./pages/profile";
import Registration from "./pages/registration";
import Loader from "./components/loader";

function ProtectedRoute({children}:{children:React.ReactElement}){
  const {user,loading} = useAuth();
  
  if(!user && !loading){
    return <Navigate to="/login" />
  }
  return children;
}

function RouteError(){
  return (
  <article className="grid place-content-center gap-2 p-4">
    <h1 className="text-4xl">The page you're looking for doesn't exist.</h1>
    <p className="text-2xl">
      {" "}
       Browse more content{" "} 
       <Link className="text-netflixRed" to="/browse">here</Link></p>
  </article>
  );
}

function AppRouter(){
  const {loading} = useAuth();
  const router =  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Outlet/>
          </ProtectedRoute>
        } 
        errorElement={<RouteError/>}
        >
          <Route index element={<Profile/>} />
          <Route path="ManageProfiles" element={<Profile edit/>} />
          <Route path="/browse" element={<Layout />} >
            <Route index element={<Browse />} />
        </Route>
        <Route path="/latest" element={<Layout />} >
          <Route index element={<h1>Latest</h1>} />
        </Route>
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<Registration/>} />
      </>
    )
  );

  return loading ? (
    <Loader />
  ):(
  <RouterProvider router={router}></RouterProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProfilesProvider>
        <AppRouter />
      </ProfilesProvider>
    </AuthProvider>
  );
} 