import { createBrowserRouter } from "react-router-dom";
import NotFound from "../../404page/NotFound";
import About from "../../Components/About/About";
import Blog from "../../Components/Blog/Blog";
import Login from "../../Components/Login/Login";
import PrivateRoute from "../../Components/PrivateRoutes/PrivateRoute";
import Register from "../../Components/Register/Register";
import UsersPost from "../../Components/UsersPost/UsersPost";
import Main from "../../Layout/Main/Main";
import Myposts from "../../Myposts/Myposts";
import Home from "../../Pages/Home/Home";

const router = createBrowserRouter([
    {
        path:'/',
        element:<PrivateRoute><Main></Main></PrivateRoute>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/mypost/:email',
                element:<Myposts></Myposts>,
                loader:({params}) => fetch(`http://localhost:5000/mypost/${params.email}`),
            },
            {
                path:'/postscard',
                element:<UsersPost></UsersPost>
            },
            {
                path:'/about',
                element:<About></About>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            },
            {
                path:'*',
                element: <NotFound></NotFound>
            }
        ],
    },
    {
        path:'/login',
        element: <Login></Login>
    },
    {
        path:'/register',
        element: <Register></Register>
    }
    
    
      
])

export default router;