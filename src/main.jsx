import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./components/MainRoute/Main.jsx";
import Home from "./components/HomeRoutes/Home.jsx";
import AuthProvider from './components/Provider/AuthProvider';
import Login from "./components/SignIn&Registration/Login.jsx";
import Register from "./components/SignIn&Registration/Register.jsx";
import {Toaster} from "react-hot-toast";
import Dashboard from "./components/DashBoard/Dashboard.jsx";
import AllUsers from "./components/DashBoard/AllUsers.jsx";
import AddPosts from "./components/DashBoard/AddPosts.jsx";
import PrivateRoute2 from './components/PrivateRoutes/PrivateRoute2';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserPosts from "./components/DashBoard/UserPosts.jsx";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute/AdminRoute.jsx";
import PostDetails from "./components/HomeRoutes/PostDetails.jsx";
import AdminProfile from "./components/DashBoard/AdminProfile/AdminProfile.jsx";
import UserProfile from "./components/DashBoard/UserProfile/UserProfile.jsx";
import Announcement from "./components/DashBoard/Announcement.jsx";
import Membership from "./components/MemberShip/Membership.jsx";
import ReportsActivities from "./components/DashBoard/ReportsActivities.jsx";
import DisplayAnnouncement from "./components/HomeRoutes/DisplayAnnouncement.jsx";
import Page404 from "./components/Errorpages/Page404.jsx";
import EPage from "./components/Errorpages/EPage.jsx";
import PaymentHistory from "./components/DashBoard/PaymentHistory.jsx";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <EPage/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <PrivateRoute2><Login/></PrivateRoute2>
            },
            {
                path: '/register',
                element: <PrivateRoute2><Register/></PrivateRoute2>
            },
            {
                path: '/membership',
                element: <PrivateRoute><Membership/></PrivateRoute>
            },
            {
                path: '/announcement',
                element: <DisplayAnnouncement/>
            },
            {
                path: '/*',
                element: <Page404/>
            }
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        errorElement: <EPage/>,
        children: [
            {
                path: 'add-posts',
                element: <AddPosts/>
            },
            {
                path: 'admin-profile',
                element: <AdminRoute><AdminProfile/></AdminRoute>
            },
            {
                path: 'my-profile',
                element: <UserProfile/>,
            },
            {
                path: 'make-announcement',
                element: <AdminRoute><Announcement/></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><AllUsers/></AdminRoute>
            },
            {
                path: 'reported-comments',
                element: <AdminRoute><ReportsActivities/></AdminRoute>,
            },
            {
                path: 'myposts',
                element: <UserPosts/>
            },
            {
                path: 'post/:id',
                element: <PostDetails/>,
                loader: async ({params}) => await fetch(`https://online-group-study-serverside-ctsz-francisms-projects.vercel.app/posts/${params.id}`),
            },
            {
                path: 'payment-history',
                element: <PaymentHistory/>,
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-center"/>
            <RouterProvider router={routes}/>
        </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
