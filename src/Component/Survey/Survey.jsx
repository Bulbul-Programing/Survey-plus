import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
const Survey = () => {
    const [categoryValue, setCategoryValue] = useState('')
    const [categoryData, setCategoryData] = useState([])
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data, isLoading } = useQuery({
        queryKey: ['allSurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys')
            setCategoryData(res.data)
            return res.data
        },
    })

    useEffect(() => {
        const loadData = async () => {
            if (!categoryValue) {
                setCategoryData(data)
            }
            else {
                const res = await axiosSecure.get(`/survey/short/${categoryValue}`)
                setCategoryData(res.data)
            }
        }
        loadData()
    }, [categoryValue])


    if (isLoading) {
        return (
            <div className="text-center my-20">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    const handleName = async () => {
        const res = await axiosSecure.get('/survey/short/title')
        setCategoryData(res.data)
    }
    const handleVote = async () => {
        const res = await axiosSecure.get('/survey/totalVotes')
        setCategoryData(res.data)
    }
    const handleCategorySubmit = (e) => {
        setCategoryValue(e.target.value)
    }

    return (
        <div>
            <div className=" my-10 bg-cover bg-[url('https://i.ibb.co/1r4NZMn/team-checklist-concept-illustration-114360-13202.jpg')]">
                <div className="bg-slate-800 bg-opacity-70 py-20 md:py-20 lg:py-32">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-white text-center font-bold">Explore Surveys</h1>
                </div>
            </div>
            <div className="mx-5 md:mx-10 lg:mx-20 flex flex-col md:flex-row lg:flex-row items-center gap-y-4 gap-x-2 md:gap-x-5 lg:gap-x-5">
                <h1 className="lg:text-2xl font-bold">Short by</h1>
                <div className="flex items-center gap-x-2">
                    <button onClick={handleName} className="btn btn-ghost bg-slate-200">A-Z</button>
                    <div>
                        <form>
                            <select onChange={handleCategorySubmit} className='rounded-md font-medium text-slate-500 px-3 py-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400' name="category">
                                <option value=''>Select option</option>
                                <option value="Education">Education</option>
                                <option value="Health">Health</option>
                                <option value="Business">Business</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Food">Food</option>
                            </select>
                        </form>
                    </div>
                    <button onClick={handleVote} className="btn btn-ghost bg-slate-200 text-lg">Vote</button>
                </div>
            </div>
            <div className=" m-5 md:m-10 lg:m-20 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    categoryData?.map(item => <DisplaySurvey key={item._id} data={item}></DisplaySurvey>)
                }
            </div>
        </div>
    );
};

const DisplaySurvey = ({ data }) => {
    const { status, title, totalLike, _id, totalDislike, shortDescription, image, totalVotes, categoryName, postDate, deadline } = data
    return (
        <div>
            {
                status === 'Publish' ?
                    <div className="card h-[630px] bg-base-100 shadow-xl">
                        <figure><img className="h-[180px] w-full rounded-lg" src={image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{title}</h2>
                            <p className="font-medium">Total Vote: {totalVotes}</p>
                            <p className="font-medium">Publish: {postDate}</p>
                            <p className="font-medium">Expire : {deadline}</p>
                            <p className="bg-slate-100 p-2 rounded-md text-center font-medium">Category: {categoryName}</p>
                            <div className="flex gap-x-4 items-center">
                                <div className="flex gap-x-1 items-center">
                                    <AiFillLike className="text-2xl text-blue-500"></AiFillLike>
                                    <h1 className="font-bold mt-1 text-blue-500">{totalLike}</h1>
                                </div>
                                <div className="flex gap-x-1 items-center">
                                    <AiFillDislike className="text-2xl text-red-500"></AiFillDislike>
                                    <h1 className="font-bold mt-1 text-red-500">{totalDislike}</h1>
                                </div>
                            </div>
                            <p>{shortDescription.slice(0, 80)} ......</p>
                            <div className="card-actions justify-center">
                                <Link to={`/surveyDetails/${_id}`}><button className="btn font-bold bg-blue-500 text-white hover:text-black">Show Details</button></Link>
                            </div>
                        </div>
                    </div>  :
                    ''
            }

        </div>
    )
}

export default Survey;