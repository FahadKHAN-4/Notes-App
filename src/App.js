import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import NoteItem from './components/NoteItem';
import Notes from './components/Notes';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    }
    // {
    //   path: "/PastNotes",
    //   element: <Notes />,
    // }
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
