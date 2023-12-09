import { Link, NavLink } from "react-router-dom";
import "./navbar.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const [userRole, setUserRole] = useState({})
   
    // const { data, isLoading } = useQuery({
    //     queryKey: ['adminRole'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/user/${user.email}`)
    //         setUserRole(res.data)
    //         return res.data
    //     },
    //     enabled:user? true : false
    // })
    
    useEffect(() => {
        if(user){
            axiosPublic.get(`/user/${user?.email}`)
            .then(res => setUserRole(res.data))
        }
    }, [user])


    if (loading) {
        <div className="flex justify-center"><span className="loading loading-dots loading-lg mx-auto my-20"></span></div>
    }


    const handleLogout = () => {
        logOut()
            .then(res => {
                swal('Success', 'SuccessFully Logout', 'success')
            })
    }

    const navElement = <>
        <NavLink className='text-lg font-bold py-2 px-3 rounded-lg' to='/'>Home</NavLink>
        <NavLink className='text-lg font-bold py-2 px-3 rounded-lg' to='/survey'>Survey</NavLink>
        <div className="flex items-center">
            {
                userRole?.role === 'admin' && <NavLink className='text-lg font-bold py-2 px-3 rounded-lg' to='/dashboard/home'>Dashboard</NavLink>
            }
            {
                userRole.role === 'surveyor' && <NavLink className='text-lg font-bold py-2 px-3 rounded-lg' to='/dashboard/surveyor/home'>Dashboard</NavLink>
            }
        </div>
        <NavLink className='text-lg font-bold py-2 px-3 rounded-lg' to='/pricing'>Pricing</NavLink>
        <NavLink className='text-lg font-bold py-2 px-3 rounded-lg' to='/contact'>Contact</NavLink>
    </>
    return (
        <div>
            <div className="hidden md:block lg:block">
                <div className="flex shadow-lg py-2 items-center justify-between bg-base-100 px-2 md:px-10 lg:px-10 ">
                    <div className="md:navbar-start lg:navbar-start col-span-3 md:w-[50%] lg:w-[28%]">
                        <div >
                            <div className="flex items-center">
                                <img className="w-[60px] " src="https://i.ibb.co/GsqcG8K/logo.png" alt="" />
                                <h1 className="text-xl md:text-2xl lg:text-2xl  font-bold"><span className="text-blue-400">Survey</span> Plus</h1>
                            </div>
                        </div>
                    </div>
                    <div className=" hidden lg:flex lg:w-[50%]">
                        <ul className="menu menu-horizontal px-1">
                            <div className="flex gap-x-1 justify-center font-medium">
                                {navElement}
                            </div>
                        </ul>
                    </div>
                    <div className=" flex items-center justify-end gap-x-2  ml-0 col-span-5 lg:w-[32%]">
                        <p>{user?.displayName}</p>
                        {
                            user && <img className="rounded-full  w-[50px] h-[50px]" src={user.photoURL} alt="" />
                        }
                        {
                            user ? <button onClick={handleLogout} className="btn bg-blue-400 text-white hover:text-black">Logout</button> : <button className="btn bg-blue-400 text-white hover:text-black"><Link to='/login'>Login</Link></button>
                        }
                    </div>
                </div>
                <div className="hidden md:block lg:hidden">
                    <div className="flex flex-wrap justify-center my-3 gap-x-5 font-medium">
                        {navElement}
                    </div>
                </div>
            </div>


            <div className="block md:hidden lg:hidden mt-0">
                <div className=" flex items-center justify-between bg-base-100 px-2 md:px-10 lg:px-10 ">
                    <div>
                        <div >
                            <div className="flex items-center">
                                <img className="w-[60px] " src="https://i.ibb.co/GsqcG8K/logo.png" alt="" />
                                <h1 className="text-xl md:text-3xl lg:text-3xl mt-3 font-bold"><span className="text-blue-400">Survey</span> Plus</h1>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content ml-[-250px] z-[1] py-4 shadow bg-slate-200 rounded-box w-[300px]">
                            <div>
                                <div className="flex flex-col items-center space-y-2">
                                    <p className="text-lg">{user?.displayName}</p>
                                    {
                                        user && <img className="rounded-full  w-[50px] h-[50px]" src={user.photoURL} alt="" />
                                    }
                                    {
                                        user ? <button onClick={handleLogout} className="btn bg-blue-400 text-white hover:text-black">Logout</button> : <button className="btn bg-blue-400 text-white hover:text-black"><Link to='/login'>Login</Link></button>
                                    }
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center my-3 gap-x-5 lg:text-lg font-medium">
                    {navElement}
                </div>
            </div>
        </div>
    );
};

export default Navbar;