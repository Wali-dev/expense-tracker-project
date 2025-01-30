import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"
import SignIn from './components/Pages/Signin'
import SignUp from './components/Pages/Signup'
import Report from './components/Pages/Report';
import Landingpage from './components/Pages/Langingpage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landingpage />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/home',
    _children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "report",
        element: <Report />
      },

    ],
    get children() {
      return this._children;
    },
    set children(value) {
      this._children = value;
    },
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
