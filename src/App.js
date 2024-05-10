import React from 'react';
import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';

function App() {
  const token = localStorage.getItem('token');

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Home /> : <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
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