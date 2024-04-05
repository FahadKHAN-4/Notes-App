import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    }
  ]);
  return (
    <div>
      <Navbar />
    
      <RouterProvider router={router}></RouterProvider>
    </div>

  );
}

export default App;
