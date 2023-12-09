import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const UserResponse = () => {
    const axiosPublic = useAxiosPublic()

    const { data, isLoading } = useQuery({
        queryKey: ['userReport'],
        queryFn: async () => {
            const res = await axiosPublic.get('/report/user')
            return res.data
        }
    })

    return (
        <div>
            <h1 className="text-4xl font-bold my-10 text-center">Uer Report</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Massage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((report, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{report.userEmail}{index}</td>
                                    <td>{report.reportMassage}</td>

                                </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserResponse;