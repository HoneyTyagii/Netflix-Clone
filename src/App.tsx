import { 
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/layout';
import Browse from './pages/browse';
import Login from './pages/login';

function AppRouter(){
  const router =  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<h1>default view</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/browse" element={<Layout />} >
          <Route index element={<Browse />} />
        </Route>
        <Route path="/latest" element={<Layout />} >
          <Route index element={<h1>Latest</h1>} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router}></RouterProvider>
}

export default function App() {
  return <AppRouter /> ;
} 