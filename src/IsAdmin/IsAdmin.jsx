import { Navigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Component/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const IsAdmin = ({ children }) => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin , isLoading} = useQuery({
        queryKey: ['checkAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user.email}`)
            return res.data
        }
    })

    if(isLoading){
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg mx-auto my-20"></span></div>
    }
    if(isAdmin.role === 'admin'){
        return children
    }
    return <Navigate to='/'></Navigate>
};

export default IsAdmin;