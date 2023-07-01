import { 
  createBrowserRouter, 
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route, 
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/layout';
import Browse from './pages/browse';
import Login from './pages/login';
import { AuthProvider, useAuth } from './common/auth';
import Profile from './pages/profile';
import { useEffect, useState } from 'react';
import ProfilesProvider from './common/profiles-context';

function ProtectedRoute({children}:{children:React.ReactElement}){
  const {user} = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   if(user){
  //     setIsLoggedIn(true);
  //   } else{
  //     setIsLoggedIn(false);
  //   }
  // }, [user]);

  // if(!isLoggedIn){
  //   return <Navigate to="/login" />
  // }
  return children;
}

function AppRouter(){
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
      </>
    )
  );

  return <RouterProvider router={router}></RouterProvider>
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