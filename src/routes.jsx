import React from "react";
import Login from "./pages/login/Login.jsx";
import Error404 from "./pages/404/Error404.jsx";
import PrivateRoute from './router/PrivateRoute.jsx';
import Dashboard from "./pages/dashboard/Dashboard.jsx";

let routes=[
    {path:'/', element:<Login />},
    {path:'/*', element:<PrivateRoute/>,children:[
        {path:'dashboard', element:<Dashboard />},
    ]},
    {path:'*', element:<Error404 />},
]

export default routes;