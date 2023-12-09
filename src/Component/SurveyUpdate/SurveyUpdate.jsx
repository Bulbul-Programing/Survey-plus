import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const SurveyUpdate = () => {
    const id = useParams()
    const [question, setQuestion] = useState([])
    const axiosPublic = useAxiosPublic()

    const { isLoading, data: updateSurveyData } = useQuery({
        queryKey: ['updateSurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/survey/singleItem/${id.id}`)
            setQuestion(res.data[0].question)
            return res.data
        }
    })


    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const surveyData = { title: data.title, shortDescription: data.description, deadline: data.deadline, categoryName: data.category, question: [...question],}
        
        axiosPublic.put(`/surveyUpdate/${id.id}`, surveyData)
            .then(res => {
               if(res.data.modifiedCount > 0){
                swal('success', 'survey update success', 'success')
               };
            })
    }

    const handleAddQuestion = (e) => {
        e.preventDefault()
        const insertQuestion = e.target.question.value
        const updateQuestion = [...question, insertQuestion]
        setQuestion(updateQuestion)
        toast.success('Question add', {
            autoClose: 1000,
        })
        e.target.reset()
    }

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg my-20"></span></div>
    }

    return (
        <div className="mx-20">
            <div>
                <h1 className="text-4xl font-bold my-10 text-center">Update Your Survey</h1>
                <div className="flex justify-center">
                    <img className="w-[500px] rounded-3xl" src={updateSurveyData[0]?.image} alt="" />
                </div>
                <p className='font-bold'>Add a Question</p>
                <div className="flex justify-between items-center gap-x-4 mt-2 mb-5">
                    <form className="w-full" onSubmit={handleAddQuestion}>

                        <div className="flex flex-col md:flex-row lg:flex-row gap-x-3 items-center">
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3  border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="question" placeholder='Question' required /> <br />
                            <input className=" bg-blue-400 px-2 hover:bg-blue-500 cursor-pointer rounded-lg  font-medium py-3 text-white" type="submit" value='ADD Question' />
                        </div>
                    </form>
                    <button className="btn bg-blue-400 px-2 text-white hover:bg-blue-500 cursor-pointer" onClick={() => document.getElementById('my_modal_5').showModal()}>See question</button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Question</h3>
                            <div>
                                {
                                    question.map((question, index) => <p className="my-3 font-medium" key={index}><span className="text-blue-400">{index + 1}.</span> {question}</p>)
                                }
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4'>
                        <div>
                            <p className='font-bold'>Survey Title</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="survey title" placeholder='Survey Title' {...register('title', { required: 'Title is require' })} defaultValue={updateSurveyData[0]?.title} required /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Survey Description:</p>
                            <textarea className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" placeholder='description' name="Survey Description" id="" cols="5" rows="1" {...register('description', { required: 'Description is require' })} defaultValue={updateSurveyData[0]?.shortDescription} required></textarea>
                        </div>
                        <div>
                            <p className='font-bold'>Survey Category:</p>
                            <select className='w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400' name="category" {...register('category', { required: 'Category is require' })} defaultValue={updateSurveyData[0]?.categoryName} required>
                                <option value=''>Select option</option>
                                <option value="Education">Education</option>
                                <option value="Health">Health</option>
                                <option value="Business">Business</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Food">Food</option>
                            </select>
                        </div>
                        <div>
                            <p className='font-bold'>Deadline</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="date" name="deadline" placeholder='DeadLine' min={new Date().toISOString().split('T')[0]} {...register('deadline', { required: 'Deadline is require' })} defaultValue={updateSurveyData[0]?.deadline} required /> <br />
                        </div>
                    </div>
                    <input className="w-full my-5 bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg text-xl font-medium py-3 text-white" type="submit" value='Update Survey' />
                </form>
            </div>
        </div>
    );
};

export default SurveyUpdate;