import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const SurveyResponse = () => {
    const axiosSecure = useAxiosSecure()
    const { data, isLoading } = useQuery({
        queryKey: ['pae'],
        queryFn: async () => {
            const res = await axiosSecure.get('/survey/allParticipant')
            return res.data
        }
    })

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-dots loading-lg my-20"></span></div>
    }

    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold text-center my-10">Survey responses</h1>
            </div>
            <div>
                <div>
                    <div className="block md:block lg:block">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th>Name</th>
                                    <th>Email </th>
                                    <th>Date</th>
                                    <th>React</th>
                                </tr>
                            </thead>
                            <tbody >

                                {
                                    data?.map(participant =>
                                        <tr key={participant._id} >
                                            <th>
                                            </th>
                                            <td className="p-0 md:pr-0 lg:p-3">
                                                <div className="flex flex-col md:flex-col lg:flex-row items-center space-y-2 md:space-x-2 lg:space-x-3">
                                                    <p className="text-lg font-bold">{participant.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-2 md:pr-0 lg:p-3 flex items-center">
                                                <p className="mb-0 font-semibold mt-4 text-lg">{participant.userEmail}</p>
                                            </td>
                                            <td className="px-2 md:pr-0 lg:p-3 ">
                                                <p className="mb-0 font-semibold ">{participant.submitDate}</p>
                                            </td>
                                            <td className="px-2 md:pr-0 lg:p-3">
                                                {participant.surveyReact === 'Liked' && <AiFillLike className="text-4xl text-blue-400"></AiFillLike>}
                                                {participant.surveyReact === 'Dislike' && <AiFillDislike className="text-4xl text-red-400"></AiFillDislike>}
                                                {participant.surveyReact ? '': <button className="bg-slate-300 p-3 rounded-lg font-medium">Do not React</button>}
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyResponse;