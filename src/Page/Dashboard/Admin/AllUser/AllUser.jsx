import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AllUser = () => {
    const axiosSecure = useAxiosSecure()
    const [updateUser, setUpdateUser] = useState({})
    const [categoryValue, setCategoryValue] = useState('')
    const [users, setUsers] = useState([])

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user')
            setUsers(res.data)
            return res.data
        }
    })

    useEffect(() => {
        const loadData = async () => {
            if (!categoryValue) {
                setUsers(data)
            }
            else {
                const res = await axiosSecure.get(`/user/role/${categoryValue}`)
                setUsers(res.data)
            }
        }
        loadData()
    }, [categoryValue])
    

    const handleCategorySubmit = (e) => {
        setCategoryValue(e.target.value)
    }

    const changeRole = (role) => {
        const updateRole = { role }
        axiosSecure.put(`/role/update/${updateUser._id}`, updateRole)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                }
            })
    }

    const good = (user) => {
        document.getElementById('my_modal_5').showModal()
        setUpdateUser(user)
    }

    if (isLoading) {
        return (
            <div className="text-center my-20">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    return (
        <div>
            <div className="my-5 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Control User Role</h1>
                <div className="mx-5 md:mx-10 lg:mx-20 flex flex-col md:flex-row lg:flex-row items-center gap-y-4 gap-x-2 md:gap-x-5 lg:gap-x-5">
                    <h1 className="lg:text-2xl font-bold">Short by</h1>
                    <div className="flex items-center gap-x-2">
                        <form>
                            <select onChange={handleCategorySubmit} className='rounded-md font-medium text-slate-500 px-3 py-3 border lg:border-2 border-black sm:border-slate-300 lg:border-slate-300 focus:outline-blue-400' name="category">
                                <option value=''>All Users</option>
                                <option value="pro user">Pro user</option>
                                <option value="user">Normal user</option>
                                <option value="surveyor">Surveyor</option>
                            </select>
                        </form>
                    </div>
                </div>
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
                                    <th>Image</th>
                                    <th>Name </th>
                                    <th>Email </th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody >

                                {
                                    users?.map(user =>
                                        <tr key={user._id} >
                                            <th>
                                            </th>
                                            <td className="p-0 md:pr-0 lg:p-3">
                                                <div className="flex flex-col md:flex-col lg:flex-row items-center space-y-2 md:space-x-2 lg:space-x-3">
                                                    <div>
                                                        <img className="w-20 h-20 rounded-full" src={user.image} alt="" />
                                                        {/* <div className="text-sm opacity-50">{user.company_name}</div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            {/* {date,price, progress, category, company_name, job_title, image} */}
                                            <div>
                                                <td className="px-2 md:pr-0 lg:p-3 ">
                                                    <div className="w-[250px] lg:w-full md:w-full">
                                                        <p className="mb-0 mt-7 font-semibold text-lg">{user.name}</p>
                                                    </div>
                                                </td>
                                            </div>
                                            <td className="px-2 md:pr-0 lg:p-3 ">
                                                <p className="mb-0 font-semibold text-lg">{user.email}</p>
                                            </td>
                                            <td className="px-2 md:pr-0 lg:p-3">
                                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                                <button className="btn" onClick={() => good(user)}>{user.role}</button>
                                                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                    <div className="modal-box">
                                                        <h3 className="font-bold text-lg">Select User Role</h3>
                                                        <div className="flex justify-between mx-5 lg:mx-10 my-5">
                                                            <div className="flex flex-col items-center justify-between">
                                                                <h1 className="text-lg font-bold">Admin</h1>
                                                                <button onClick={() => changeRole('admin')}><img className="w-24 h-24 rounded-full border-2 border-blue-400 hover:border-blue-600 mt-2" src="https://i.ibb.co/gSk4fqh/50426.jpg" alt="" /></button>
                                                            </div>
                                                            <div className="flex flex-col items-center justify-between">
                                                                <h1 className="text-lg font-bold">Surveyor</h1>
                                                                <button onClick={() => changeRole('surveyor')}><img className="w-24 h-24 rounded-full border-2 border-blue-400 hover:border-blue-600 mt-2" src="https://i.ibb.co/LvXf1y1/13184991-5138237.jpg" alt="" /></button>
                                                            </div>
                                                            <div className="flex flex-col items-center justify-between">
                                                                <h1 className="text-lg font-bold">User</h1>
                                                                <button onClick={() => changeRole('user')}><img className="w-24 h-24 rounded-full border-2 border-blue-400 hover:border-blue-600 mt-2" src="https://i.ibb.co/qrr7cRx/isolated-young-handsome-man-different-poses-white-background-illustration-632498-855.jpg" alt="" /></button>
                                                            </div>
                                                        </div>
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                {/* if there is a button in form, it will close the modal */}
                                                                <button className="btn">Close</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
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

export default AllUser;