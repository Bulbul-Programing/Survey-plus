import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { MdOutlineTitle } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { MdHowToVote } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
import moment from "moment/moment";


const SurveyDetails = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useContext(AuthContext)
    const { id } = useParams()
    const [firstRadio, setFirstRadio] = useState('')
    const [secondRadio, setSecondRadio] = useState('')
    const [commentValue, setComment] = useState('')
    const [report, setReport] = useState('')
    const [surveyReact, setSurveyReact] = useState('')
    const [changeStatus, setChangeStatue] = useState('')


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['surveyDetails'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/survey/details/${id}`)
            return res.data
        }
    })


    const { data: userComment, refetch: refetchComment } = useQuery({
        queryKey: ['allComment'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/comments/${id}`)
            return res.data
        }
    })

    const { data: userRole } = useQuery({
        queryKey: ['hamfdkf'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`)
            return res.data
        }
    })


    if (loading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg mx-auto my-20"></span></div>
    }

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg my-20"></span></div>
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        await axiosSecure.get(`/isLiked?id=${_id}&email=${user.email}`)
        .then(res => {

            if(res.data.status === 'liked'){
                setSurveyReact('Liked')
            }
            if(res.data.status === 'dislike'){
                setSurveyReact('Dislike')
            }
            if(!res.data){
                setSurveyReact('')
            }
        })
        console.log(surveyReact);
        const nowDate = moment().format('l')
        const from = e.target
        const name = from.name.value
        const userEmail = from.userEmail.value
        const ans1 = from.ans1.value
        const ans2 = from.ans2.value
        const ans3 = from.ans3.value
        const ans4 = from.ans4.value
        const ans5 = from.ans5.value
        const firstRadioAns = firstRadio
        const secondRadioAns = secondRadio
        const submittedAns = { name, userEmail, ans1, ans2, ans3, ans4, ans5, firstRadioAns, secondRadioAns, submitDate: nowDate, surveyReact }

        axiosSecure.post('/survey/participant', submittedAns)
            .then(res => {
                if (res.data.insertedId) {
                    from.reset()
                    swal('Thank You', 'Thanks for join our survey', 'success')
                }
            })
    }

    const handleRadio = (value) => {
        setFirstRadio(value);
    }
    const handleRadioSecond = (value) => {
        setSecondRadio(value)
    }

    const handleLike = (action, id) => {
        setChangeStatue('update')
        if (action === 'like') {
            const likedEmail = { email: user.email }
            axiosSecure.put(`/survey/update/like/${id}`, likedEmail)
                .then(res => {
                    if (res.data.massage === 'all ready liked') {
                        toast.error('Already Share Your Opinion')
                    }
                    if (res.data.modifiedCount > 0) {
                        toast.success('Thanks for Share Your Opinion')
                        refetch()
                    }
                })
        }
        if (action === 'dislike') {
            const likedEmail = { email: user.email }
            axiosSecure.put(`/survey/update/disLike/${id}`, likedEmail)
                .then(res => {
                    if (res.data.massage === 'all ready liked') {
                        toast.error('Already Share Your Opinion')
                    }
                    if (res.data.modifiedCount > 0) {
                        toast.success('Thanks for Share Your Opinion')
                        refetch()
                    }
                })
        }
    }

    const handleComment = (e) => {
        e.preventDefault()
        setComment(e.target.value)
    }

    const submitComment = (e) => {
        e.preventDefault()

        const comment = { commentValue, email: user.email, image: user.photoURL }
        axiosSecure.post(`/comment/${data[0]._id}`, comment)
            .then(res => {
                if (res.data.insertedId) {
                    setComment()
                    refetchComment()
                    toast.success('comment add')
                    e.target.reset()
                }
            })
    }

    const handleReportValue = (e) => {
        e.preventDefault()
        setReport(e.target.value)
    }

    const handleReport = (id, surveyHost) => {
        const reportData = {
            reportedId: id,
            userEmail: user.email,
            surveyHostEmail: surveyHost,
            reportMassage: report
        }
        axiosSecure.post('/report/add', reportData)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Thanks for your feedback')
                    setReport('')
                }
            })
    }



    const { _id, categoryName, disableBtn, question, deadline, hostEmail, image, postDate, shortDescription, title, totalDislike, totalLike, totalVotes } = data[0]
    const { displayName, email } = user


    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className={`my-10 bg-content bg-no-repeat bg-center bg-[url('https://i.ibb.co/pfVrp9n/setup-analytics-concept-illustration-114360-1438.jpg')]`}>
                <div className="bg-slate-600 bg-opacity-70 py-20 md:py-20 lg:py-32">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-white text-center font-bold">Survey Details</h1>
                </div>
            </div>
            <div className="className='lg:py-20 mx-5 lg:mx-10 flex flex-col lg:flex-row gap-x-10 lg:gap-x-12">
                <div className='lg:w-[30%] flex flex-col md:flex-row lg:flex-col items-center'>
                    <img className='w-full md:w-[50%] lg:w-full rounded-xl ' src={image} alt="" />
                    <div className='w-full md:w-[50%] lg:w-full p-5 my-5 rounded-lg border-2 border-slate-300'>
                        <h1 className='text-4xl font-bold mb-5'>Survey Details</h1>
                        <div className='flex flex-col md:flex-col lg:flex-col gap-y-1 md:gap-y-2 lg:gap-y-3 my-2 '>
                            <div className='flex gap-x-2 items-center'>
                                <p className="font-bold">Title: </p>
                                <p className='font-medium'>{title}</p>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <IoCalendarOutline className='text-xl text-blue-400'></IoCalendarOutline >
                                <p className="font-bold">Post date: </p>
                                <p className='font-medium'>{postDate}</p>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <BsCalendar2Date className='text-xl text-blue-400'></BsCalendar2Date>
                                <p className="font-bold">Dead line: </p>
                                <p className='font-medium'>{deadline}</p>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <BiCategory className='text-xl text-blue-400'></BiCategory>
                                <p className="font-bold">Category: </p>
                                <p className='font-medium bg-slate-200 py-1 px-3 rounded-md'>{categoryName}</p>
                            </div>
                            <div className="flex gap-x-4 items-center">
                                <div className="flex gap-x-1 items-center">
                                    <AiFillLike className="text-2xl text-blue-400"></AiFillLike>
                                    <h1 className="font-bold mt-1 text-blue-400">{totalLike}</h1>
                                </div>
                                <div className="flex gap-x-1 items-center">
                                    <AiFillDislike className="text-2xl text-red-400"></AiFillDislike>
                                    <h1 className="font-bold mt-1 text-red-400">{totalDislike}</h1>
                                </div>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <MdHowToVote className='text-2xl text-blue-400'></MdHowToVote>
                                <p className="font-bold">Total Vote: </p>
                                <p className='font-medium bg-slate-200 py-1 px-3 rounded-md'>{totalVotes}</p>
                            </div>
                        </div>
                        <div>
                            <button></button>
                        </div>
                    </div>
                </div>
                <div className='pb-20 w-[70%]'>
                    <div>
                        <h1 className='text-4xl font-bold'>{title}</h1>
                        {/* <div className='flex flex-col md:flex-row gap-y-6 lg:flex-row gap-x-3 my-4'>
                            <p className='text-sm font-semibold'>Company: <span className=' font-bold text-blue-400 bg-slate-100 px-3 py-2 rounded-lg ml-2'>{company_name}</span></p>
                            <p className='text-sm font-semibold'>Expertise: <span className=' font-bold text-blue-400 bg-slate-100 px-3 py-2 rounded-lg ml-2'>{expertise}</span></p>

                        </div> */}
                        <h1 className='text-xl font-bold mt-10 mb-5'>Survey Description:</h1>
                        <p className='text-slate-400'>{shortDescription}</p>
                    </div>
                    <div className='mt-10'>
                        <h1 className='text-2xl font-bold text-center my-3'>Vote this <span className='text-blue-400'>Survey</span></h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <p className='font-bold'>Name</p>
                                <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="name" placeholder='Price' defaultValue={displayName} required /> <br />
                            </div>
                            <div>
                                <p className='font-bold'>Your Email</p>
                                <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="email" name="userEmail" placeholder="email" value={email} readOnly required /><br />
                            </div>
                            <div>
                                <div className="grid grid-cols-2 gap-x-3 gap-y-3 my-3">
                                    {
                                        question.map((singleQuestion, index) => <div key={index}>
                                            <div>
                                                <p className='font-semibold'><span className="font-bold">Question:</span> {singleQuestion}</p>
                                                <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name={`ans${index + 1}`} placeholder="ANS" required /><br />
                                            </div>
                                        </div>)
                                    }
                                </div>


                            </div>
                            <div className="my-5">
                                <div >
                                    <p className="font-bold">Do you believe technology has improved your productivity at work?</p>
                                    <div className="flex gap-x-5">
                                        <label className="text-2xl flex items-center gap-x-3">
                                            <input onChange={() => handleRadio('Yes')} className="radio radio-primary" type="radio" name="firstRadio" id="" />
                                            Yes
                                        </label>
                                        <label className="text-2xl flex items-center gap-x-3">
                                            <input onChange={() => handleRadio('No')} className="radio radio-primary" type="radio" name="firstRadio" id="" />
                                            No
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="font-bold">Do you think social media has a positive impact on your mental well-being?</p>
                                    <div className="flex gap-x-5">
                                        <label className="text-2xl flex items-center gap-x-3">
                                            <input onChange={() => handleRadioSecond('Yes')} className="radio radio-primary" type="radio" name="secondRadio" id="" />
                                            Yes
                                        </label>
                                        <label className="text-2xl flex items-center gap-x-3">
                                            <input onChange={() => handleRadioSecond('No')} className="radio radio-primary" type="radio" name="secondRadio" id="" />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {
                                    user.email === hostEmail ? <input className="w-full bg-blue-400 opacity-40 cursor-not-allowed rounded-lg text-xl text-center font-medium py-3 text-white" type="" value={'Submit'} /> : <input className="w-full bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg text-xl font-medium py-3 text-white" type="submit" value={'Submit'} />
                                }
                            </div>
                        </form>
                        <div className="flex items-center my-6 gap-x-5">
                            <div className="ml-5">
                                <h1 className="font-bold">What do you think about this survey?</h1>
                                <div className="flex gap-x-4 items-center my-4">
                                    <div>
                                        <button className={``} onClick={() => handleLike('like', _id)}>
                                            <div className="flex gap-x-1 items-center">
                                                <AiFillLike className="text-4xl text-blue-400"></AiFillLike>
                                                <h1 className="font-bold text-3xl mt-1 text-blue-400">{totalLike}</h1>
                                            </div>
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => handleLike('dislike', _id)}>
                                            <div className="flex gap-x-1 items-center">
                                                <AiFillDislike className="text-4xl text-red-400"></AiFillDislike>
                                                <h1 className="font-bold text-3xl mt-1 text-red-400">{totalDislike}</h1>
                                            </div>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className={`${userRole?.role == 'surveyor' ? 'block' : 'hidden'}`}>
                                {/* todo change user role to pro user */}
                                <form onSubmit={submitComment} className="flex items-center gap-x-3">
                                    <textarea onChange={handleComment} className="p-4 focus:outline-none border-2 focus:border-blue-300 rounded-xl" placeholder="Write Comment" name="comment" id="" cols="30" rows="1"></textarea>
                                    {
                                        commentValue?.length === 0 ? <input type="submit" className="btn bg-blue-400 text-white" value={'Comment'} disabled /> : <input type="submit" className="btn bg-blue-400 text-white" value={'Comment'} />
                                    }
                                </form>
                            </div>
                            <div>
                                <button className="btn bg-transparent border-none shadow-none" onClick={() => document.getElementById('my_modal_5').showModal()}><MdOutlineReportGmailerrorred className="text-4xl text-red-500"></MdOutlineReportGmailerrorred></button>
                                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Write a Report</h3>
                                        <textarea onChange={handleReportValue} className="p-4 w-full mt-3 focus:outline-none border-2 focus:border-blue-300 rounded-xl" placeholder="Write Comment" name="comment" id="" cols="30" rows="1"></textarea>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button onClick={() => handleReport(_id, hostEmail)} className="btn bg-blue-500 text-white hover:text-black mr-4">Submit</button>
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                        <div>
                            {
                                userComment?.map((singleComment, index) => <div key={index}>
                                    <div className="flex items-center gap-x-4 mb-4 shadow-lg p-4 rounded-lg">
                                        <div>
                                            <img className="w-20 h-20 rounded-full" src={singleComment.image} alt="" />
                                        </div>
                                        <div>
                                            <h1 className="font-bold">{singleComment.email}</h1>
                                            <p>{singleComment.comment}</p>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyDetails;