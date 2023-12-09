import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { GrDocumentUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";


const UpdateSurvey = () => {
    const axiosPublic = useAxiosPublic()

    const { data, isLoading } = useQuery({
        queryKey: ['updateSurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys')
            return res.data
        }
    })
    if (isLoading) {
        return <div className="text-center my-20"><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold text-center text-blue-500 my-10">Update a Survey</h1>
            </div>
            <dir>
                <div>
                    <div>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th>Image</th>
                                    <th>Title </th>
                                    <th>Email </th>
                                    <th>Update</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody >

                                {
                                    data?.map(singleSurvey =>
                                        <tr key={singleSurvey._id} >
                                            <th>
                                            </th>
                                            <td className="p-0 md:pr-0 lg:p-3">
                                                <div className="flex flex-col md:flex-col lg:flex-row items-center space-y-2 md:space-x-2 lg:space-x-3">
                                                    <div>
                                                        <img className="w-32 h-24 rounded-xl" src={singleSurvey.image} alt="" />
                                                        {/* <div className="text-sm opacity-50">{user.company_name}</div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            {/* {date,price, progress, category, company_name, job_title, image} */}
                                            <div>
                                                <td className="px-2 md:pr-0 lg:p-3 ">
                                                    <div className="w-[250px] lg:w-full md:w-full">
                                                        <p className="mb-0 mt-7 font-semibold text-lg">{singleSurvey.title}</p>
                                                    </div>
                                                </td>
                                            </div>
                                            <td className="px-2 md:pr-0 lg:p-3 ">
                                                <p className="mb-0 font-semibold text-lg">{singleSurvey.hostEmail}</p>
                                            </td>
                                            <td className="px-2 md:pr-0 lg:p-3">
                                                <Link to={`/dashboard/surveyor/survey/update/${singleSurvey._id}`}><button className="btn bg-transparent border-none shadow-none"><GrDocumentUpdate className="text-3xl text-blue-500"></GrDocumentUpdate></button></Link>
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </dir>
        </div>
    );
};

export default UpdateSurvey;