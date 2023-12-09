import { FaHome, FaRegBookmark, FaUser, FaUsers } from "react-icons/fa";
import { FaBookJournalWhills, FaCartShopping, FaMoneyBill1Wave } from "react-icons/fa6";
import { MdMarkEmailUnread, MdOutlinePayment, MdOutlinePayments, MdReviews } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { IoCreate } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { IoIosMailUnread } from "react-icons/io";
import { FcSurvey } from "react-icons/fc";
import { GrDocumentUpdate } from "react-icons/gr";



const Dashboard = () => {
    const { user, logOut, loading } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const [userRole, setUserRole] = useState({})

    const { data, isLoading } = useQuery({
        queryKey: ['adminRole'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.email}`)
            setUserRole(res.data)
            return res.data
        }
    })

    useEffect(() => {
        axiosPublic.get(`/user/${user?.email}`)
            .then(res => setUserRole(res.data))
    }, [user])
    
    return (
        <>

            <div className="flex">
                <div className="w-64 bg-blue-100 ">
                    <h1 className="text-3xl font-bold text-center my-10">Survey Plus</h1>
                    <div>
                        {
                            userRole.role === 'admin' && <ul className="menu menu-vertical">
                                <NavLink to='/dashboard/home' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><FaHome className="text-lg"></FaHome>Admin Home</NavLink>
                                <NavLink to='/dashboard/admin/allUser' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><FaUsers className="text-lg"></FaUsers>All User</NavLink>
                                <NavLink to='/dashboard/admin/manageSurvey' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><FiMenu className="text-lg"></FiMenu> Manage Survey</NavLink>
                                <NavLink to='/dashboard/admin/payment' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><FaMoneyBill1Wave className="text-lg"></FaMoneyBill1Wave>Payments</NavLink>
                                <NavLink to='/dashboard/admin/surveyResponse' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><MdMarkEmailUnread className="text-lg"></MdMarkEmailUnread>Survey responses</NavLink>
                            </ul>
                        }
                    </div>
                    <div>
                        {
                            userRole.role === 'surveyor' && <ul className="menu menu-vertical">
                            <NavLink to='/dashboard/surveyor/home' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><FaHome className="text-lg"></FaHome>Survey Home</NavLink>
                            <NavLink to='/dashboard/surveyor/create-survey' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><IoCreate className="text-lg"></IoCreate>Create Survey</NavLink>
                            <NavLink to='/dashboard/surveyor/update-survey' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><GrDocumentUpdate className="text-lg"></GrDocumentUpdate>update Survey</NavLink>
                            <NavLink to='/dashboard/surveyor/user-response' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><CiMail className="text-lg"></CiMail>User Massage</NavLink>
                            <NavLink to='/dashboard/surveyor/admin-response' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><IoIosMailUnread className="text-lg"></IoIosMailUnread>Admin Massage</NavLink>
                            <NavLink to='/dashboard/surveyor/survey-response' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><FcSurvey className="text-lg"></FcSurvey>Survey Response</NavLink>
                        </ul>
                        }
                    </div>
                    <div className="divider"></div>
                    <ul className="menu menu-vertical">
                        <NavLink to='/' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><FaHome className="text-lg"></FaHome>Home</NavLink>
                        <NavLink to='/survey' className='px-2 font-bold py-4 rounded-lg mb-2 flex gap-x-3 items-center'><FaBookJournalWhills className="text-lg"></FaBookJournalWhills>Survey</NavLink>
                    </ul>
                </div>
                <div className="m-10 w-full">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;