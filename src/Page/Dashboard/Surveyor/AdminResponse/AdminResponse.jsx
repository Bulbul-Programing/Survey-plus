import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AdminResponse = () => {
    const axiosSecure = useAxiosSecure()

    const {data} = useQuery({
        queryKey: ['adminMassage'],
        queryFn: async() => {
            const res = await axiosSecure.get('/surveys')
            return res.data
        }
    })

    return (
        <div>
            <h1 className="text-4xl my-10 text-center">Admin Massage</h1>
        
        </div>
    );
};

export default AdminResponse;