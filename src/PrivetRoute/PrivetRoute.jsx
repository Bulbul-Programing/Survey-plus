import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Component/AuthProvider/AuthProvider";

const PrivetRoute = ({children}) => {
    const location = useLocation()
    const {user, isLoading} = useContext(AuthContext)
    
    if(isLoading){
        return <span className="loading loading-dots loading-lg my-20 text-center"></span>
    }
    if(user){
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivetRoute;