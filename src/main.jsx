import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './views/dashboard/Dashboard';
import DiroxRadar from './views/Music/Music.jsx';

const root = '/react-miu-template';

const router = createBrowserRouter([
  {
    path: `${root}/dashboard`,
    element: <Dashboard />,
  },
  {
    path: `${root}/sign-in`,
    element: <DiroxRadar />,
  },
  {
    path: `${root}/`,
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
