import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import moment from "moment/moment";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const AddSurvey = () => {
    const [question, setQuestion] = useState([])
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
    
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHosting, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },)
        const nowDate = moment().format('l')

        const imageURL = res.data.data.display_url
        console.log(imageURL);
        const surveyData = { title: data.title, image: imageURL, postDate: nowDate, hostEmail: user.email, shortDescription: data.description, deadline: data.deadline, categoryName: data.category, question: [...question], totalLike: 0, totalDislike: 0, status: 'Pending' }
       
        axiosSecure.post('/addSurvey', surveyData)
            .then(res => {
                if (res.data.insertedId) {
                    swal('success', 'Survey add successfully', 'success')
                    reset()
                    setQuestion([])
                }
            })
            .catch(error => console.log(error))
    }

    const handleAddQuestion = (e) => {
        e.preventDefault()
        const insertQuestion = e.target.question.value
        const updateQuestion = [...question, insertQuestion]
        setQuestion(updateQuestion)
        toast.success('Question add',{
            autoClose: 1000,
        })
        e.target.reset()
    }

    return (
        <div className="flex flex-col md:flex-col lg:flex-row items-center gap-x-5 justify-between m-5 md:m-12 lg:m-20">
            <div className="md:w-1/2 lg:w-3/6">
                <img className="w-[500px]" src="https://i.ibb.co/n7M5GFJ/thoughtful-woman-with-laptop-looking-big-question-mark-1150-39362.jpg" alt="" />
            </div>
            <div>
            <ToastContainer />
                <h1 className="text-4xl font-bold text-center">Create a New Survey</h1>
                <form onSubmit={handleAddQuestion} className="my-5">
                    <p className='font-bold'>Add a Question</p>
                    <div className="flex flex-col md:flex-row lg:flex-row gap-x-3 items-center">
                        <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3  border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="question" placeholder='Question' required /> <br />
                        <input className="w-1/2 lg:w-2/6  bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg  font-medium py-3 text-white" type="submit" value='ADD Question' />
                    </div>
                </form>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4'>
                        <div>
                            <p className='font-bold'>Survey Title</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="text" name="survey title" placeholder='Survey Title' {...register('title', { required: 'Title is require' })} /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Survey Description:</p>
                            <textarea className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" placeholder='description' name="Survey Description" id="" cols="5" rows="1" {...register('description', { required: 'Description is require' })}></textarea>
                        </div>
                        <div>
                            <p className='font-bold'>Survey Category:</p>
                            <select className='w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400' name="category" {...register('category', { required: 'Category is require' })} >
                                <option value=''>Select option</option>
                                <option value="Education">Education</option>
                                <option value="Health">Health</option>
                                <option value="Business">Business</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Food">Food</option>
                            </select>
                        </div>
                        <div>
                            <p className='font-bold'>Image</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="file" name="image" placeholder='Image' {...register('image', { required: 'Image is require' })} /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Deadline</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="date" name="deadline" placeholder='DeadLine' min={new Date().toISOString().split('T')[0]} {...register('deadline', { required: 'Deadline is require' })} /> <br />
                        </div>
                        <div>
                            <p className='font-bold'>Email</p>
                            <input className="w-full rounded-md font-medium text-slate-500 px-3 py-3 mb-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400" type="email" name="hostEmail" placeholder='Email' {...register('email')} value={user.email} readOnly /> <br />
                        </div>
                    </div>
                    <input className="w-full my-5 bg-blue-400 hover:bg-blue-500 cursor-pointer rounded-lg text-xl font-medium py-3 text-white" type="submit" value='Add Survey' />
                </form>
            </div>
        </div>
    );
};

export default AddSurvey;