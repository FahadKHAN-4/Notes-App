import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NoteState from './context/notes/NoteState';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    }
  ]);
  return (
    <div>
      <NoteState>
      <Navbar />
      <div className='container'>
      <RouterProvider router={router}></RouterProvider>
      </div>
      </NoteState>
    </div>

  );
}

export default App;
