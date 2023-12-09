import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { GoDotFill } from "react-icons/go";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { useState } from "react";

const ManageSurvey = () => {
    const axiosSecure = useAxiosSecure()
    const [massage, setMassage] = useState('')

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['addSurveyItem'],
        queryFn: async () => {
            const res = await axiosSecure('/addSurveyItem')
            return res.data
        }
    })

    if (isLoading) {
        return (
            <div className="text-center my-20">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    const handleMassage = (e) => {
        setMassage(e.target.value)
    }

    const handleAction = (action, user) => {
        console.log(action, user)
        const updateStatus = { action, massage: massage }
        axiosSecure.put(`/survey/action/${user._id}`, updateStatus)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    setMassage('')
                    toast.success('Status Update Successfully')
                }
            })
            .catch(error => console.log(error))
    }

    return (

        <div>
            <div>
                <ToastContainer />
                <div className="block md:block lg:block">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Job title</th>
                                <th>Email</th>
                                <th>status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >

                            {
                                data?.map(survey =>
                                    <tr key={survey._id} >
                                        <th>
                                            <div className="flex flex-col md:flex-col lg:flex-row items-center space-y-2 md:space-x-2 lg:space-x-3">
                                                <div className="avatar">
                                                    <div className=" w-20 h-20">
                                                        <img className="rounded-2xl" src={survey.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="p-0 md:pr-0 lg:p-3">
                                            <div>
                                                <div className="font-bold">{survey.title}</div>
                                            </div>
                                        </td>
                                        <td className="px-2 md:pr-0 lg:p-3 ">
                                            <div>
                                                <div className="font-bold">{survey.hostEmail}</div>
                                            </div>
                                        </td>
                                        <td className="px-2 md:pr-0 lg:p-3">
                                            <div className="flex items-center">
                                                {/* <GoDotFill className="text-2xl text-orange-500"></GoDotFill>
                                                <div className="font-bold">{survey?.status}</div> */}
                                                <GrStatusGoodSmall className={`${survey.status === 'Pending' && 'text-yellow-400'} ${survey.status === 'Publish' && 'text-blue-500'} ${survey.status === 'Reject' && 'text-red-500'}`}></GrStatusGoodSmall>
                                                <h1 className={`${survey.status === 'Pending' && 'text-yellow-400'} ${survey.status === 'Publish' && 'text-blue-500'} ${survey.status === 'Reject' && 'text-red-500'} font-semibold`}>{survey.status}</h1>
                                            </div>
                                        </td>
                                        <th>
                                            <div className="flex flex-col lg:flex-row gap-x-2">
                                                {
                                                    survey.status === 'Pending' ? <>
                                                <button onClick={() => handleAction('Publish', survey)} className="btn text-lg font-bold bg-blue-500 text-white hover:text-black">Accept</button>

                                                <button className="btn text-lg font-bold bg-red-500 text-white hover:text-black" onClick={() => document.getElementById('my_modal_5').showModal()}>Reject</button>
                                                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                    <div className="modal-box">
                                                        <h3 className="font-bold text-lg">Sent Massage</h3>
                                                        <textarea onChange={handleMassage} className="w-full mt-5 border-2 border-slate-300 focus:border-blue-400 focus:outline-none p-3 rounded-lg"  name="textarea" id="" rows="4" placeholder="Write Massage"></textarea>
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                <button className="btn mr-2">Close</button>
                                                                <button onClick={() => handleAction('Reject', survey)} className="btn text-lg font-bold bg-red-500 text-white hover:text-black">Reject</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>

                                                </> :
                                                    <button className={`btn text-lg font-bold ${survey.status === 'Publish' && 'disabled:text-white disabled:bg-blue-300'} ${survey.status === 'Reject' && 'disabled:text-white disabled:bg-red-300'}`} disabled>{survey.status}d</button>
                                                }
                                            </div>
                                        </th>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {/* <div className="block mx-10 md:hidden lg:hidden">
                            <table className="table">

                                <thead>
                                    <tr>

                                    </tr>
                                </thead>
                                <tbody >

                                    {
                                        data?.data?.map(singleBid =>
                                            <tr key={singleBid._id} className="flex flex-col">
                                                <th>
                                                </th>
                                                <td className="p-0">
                                                    <div className="flex flex-col ">
                                                        <div className="avatar">
                                                            <div className=" w-[250px] h-[200px] rounded-2xl mx-auto">
                                                                <img src={singleBid.image} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div className="mt-5 mb-3">
                                                            <div className="font-bold text-2xl">{singleBid.job_title}</div>
                                                            <div className="text-lg opacity-50">{singleBid.company_name}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <div>
                                                    <td className="p-0">
                                                        <div>
                                                            <div className="flex flex-col w-full  gap-y-2">
                                                                <div className='flex gap-x-2 items-center'>
                                                                    <FaRegMoneyBillAlt className='text-2xl text-[#ff6161d6]'></FaRegMoneyBillAlt>
                                                                    <p className='font-medium'>${singleBid.price}</p>
                                                                </div>
                                                                <div className='flex gap-x-2 items-center'>
                                                                    <FaLocationDot className='text-xl text-[#ff6161d6]'></FaLocationDot>
                                                                    <p>{singleBid.location}</p>
                                                                </div>
                                                                <div className='flex items-center gap-x-3'>
                                                                    <BsCalendarDay className='text-xl text-[#ff6161d6]'></BsCalendarDay>
                                                                    <p>Deadline: <span className='text-blue-400'>{singleBid.date}</span></p>
                                                                </div>
                                                            </div>
                                                            <p className="mb-0 mt-2 font-semibold">Host Email : <span className="text-blue-400">{singleBid.hostEmail}</span></p>
                                                        </div>
                                                    </td>
                                                </div>
                                                <td className="p-0 my-2">
                                                    <div className="flex gap-x-2  items-center ">
                                                        <GrStatusGoodSmall className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'Rejected' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'}`}></GrStatusGoodSmall>
                                                        <h1 className={`${singleBid.progress === 'Pending' && 'text-red-500'} ${singleBid.progress === 'In Progress' && 'text-green-500'} ${singleBid.progress === 'Complete' && 'text-blue-500'} font-semibold`}>{singleBid.progress}</h1>
                                                    </div>
                                                </td>
                                                <th className="p-0 my-2">
                                                    {
                                                        singleBid.progress === 'In Progress' ? <button onClick={() => handleStatus(singleBid._id, 'Complete')} className='bg-blue-400 px-3 py-2 rounded-lg text-white' >Complete</button> : <button className={`bg-blue-400 px-3 py-2 rounded-lg ${singleBid.progress === 'Complete' && 'hidden'} ${singleBid.progress === 'Rejected' && 'hidden'} text-white hover:cursor-not-allowed disabled:opacity-40`} disabled >Complete</button>
                                                    }
                                                </th>
                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        </div> */}
            </div>

        </div>
    );
};

export default ManageSurvey;