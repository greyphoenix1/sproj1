import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TopBar from './TopBar';
import RegisterPage from './pages/registerpage';
import LoginPage from './pages/loginpage';
import HomePage from './pages/homepage';
import PrivateRoute from './PrivateRoute';
import ImageTranfer from './ImageTransfer';
import UploadPage from './pages/upload';
import ViewImages from './pages/view';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/homepage",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    )
  },
  {
    path: "/imagetransfer",
    element: (
      <PrivateRoute>
        <ImageTranfer />
      </PrivateRoute>
    )
  },
  {
    path:'/uploadimage',
    element: (
      <PrivateRoute>
        <UploadPage />
      </PrivateRoute>
    )
  },
  {
    path:'/viewstoredimages',
    element: (
      <PrivateRoute>
        <ViewImages />
      </PrivateRoute>
    )
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
