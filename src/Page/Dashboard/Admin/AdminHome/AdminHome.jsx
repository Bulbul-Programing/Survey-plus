import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', '#FA9864'];
const AdminHome = () => {
    const [maxLike, setMaxLike] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(()=>{
        axiosPublic.get('/surveys/filter/totalLike')
        .then(res => setMaxLike(res.data))
    },[])

    const data = [
        {
            name: 'Top One',
            uv: maxLike[0]?.totalLike,
        },
        {
            name: 'Top 2',
            uv: maxLike[1]?.totalLike,
        },
        {
            name: 'Top 3',
            uv: maxLike[2]?.totalLike,
        },
        {
            name: 'Top 4',
            uv: maxLike[3]?.totalLike,
        },
        {
            name: 'Top 5',
            uv: maxLike[4]?.totalLike,
        },
        {
            name: 'Top 6',
            uv: maxLike[5]?.totalLike,
        },
    ];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <div>
            <div className="flex justify-between gap-x-10">
                <div className="w-1/2 bg-gradient-to-r from-blue-400 to-blue-500 text-center p-8 text-white rounded-lg">
                    <h1 className="text-4xl font-bold">50</h1>
                    <p className="text-lg font-bold">People Attend This survey</p>
                </div>
                <div className="w-1/2 bg-gradient-to-r from-red-400 to-orange-400 text-center p-8 text-white rounded-lg">
                    <h1 className="text-4xl font-bold">60</h1>
                    <p className="text-lg font-bold">People Like survey</p>
                </div>
            </div>
            <div className='my-10'>
                <h1 className='text-4xl font-bold m-10'>Top Survey By Rating</h1>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default AdminHome;