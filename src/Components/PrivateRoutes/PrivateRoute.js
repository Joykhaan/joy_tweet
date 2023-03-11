import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location =useLocation();
    if(loading){
        return <div className="flex justify-center items-center my-8">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    }
    if(!user){
        return <Navigate to={'/login'} state={{from: location}} replace ></Navigate>
    }
    return children;
};

export default PrivateRoute;