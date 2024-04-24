import React from "react";
import Login from "./pages/login/Login.jsx";
import Error404 from "./pages/404/Error404.jsx";
import PrivateRoute from './router/PrivateRoute.jsx';
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Categories from "./pages/categories/Categories.js";
import Comments from "./pages/comments/Comments.js";
import Genre from "./pages/genre/Genre.js";
import Posts from "./pages/posts/Posts.js";
import CreatePost from "./pages/posts/CreatePost.js";
import EditPost from "./pages/posts/EditPost.js"
import AccountManagement from "./pages/accountManagement/accountManagement.js";

let routes=[
    {path:'/', element:<Login />},
    {path:'/*', element:<PrivateRoute/>,children:[
        {path:'dashboard', element:<Dashboard />},
        {path:'posts', element:<Posts />},
        {path:'create-post', element:<CreatePost />},
        {path:'edit-post/:PostID', element:<EditPost />},
        {path:'cats', element:<Categories />},
        {path:'comments', element:<Comments />},
        {path:'genre', element:<Genre />},
        {path:'account', element:<AccountManagement />},
    ]},
    {path:'*', element:<Error404 />},
]

export default routes;