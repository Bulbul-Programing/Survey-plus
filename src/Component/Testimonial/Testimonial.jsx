import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const Testimonial = () => {
    const [review, setReview] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        axiosPublic.get('/review')
            .then(res => setReview(res.data))
            .catch(error => console.log(error))
    }, [axiosPublic])
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-center">Our Clint Say</h1>
            <p className='text-center font-semibold my-2 '>Discover what our community has to say about their experience with Survey Plus.</p>
            <div>
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoPlay={true}
                    infiniteloop='true'
                    modules={[Pagination]}
                    className="mySwiper"
                >

                    {
                        review?.map(singleReview => <SwiperSlide key={singleReview._id} ><ReviewCart data={singleReview}></ReviewCart></SwiperSlide>)
                    }

                </Swiper>
            </div>
        </div>
    );
};
const ReviewCart = ({ data }) => {
    const { name, comment, image, position, rating } = data
    
    return (
        <div className=' mt-10 bg-cover bg-[url("https://i.ibb.co/XZkKYvM/organic-flat-feedback-concept-23-2148958007.jpg")]'>
            <div className='px-10 gap-x-5 lg:px-32 py-20 flex flex-col md:flex-row gap-y-5 lg:flex-row bg-slate-700 bg-opacity-80 text-white items-center'>
                <div className='lg:w-1/2 avatar'>
                    <div className='mask w-[200px] mask-hexagon'>
                        <img src={image} alt="" />
                    </div>
                </div>
                <div className='lg:mx-20 '>
                    <h1 className='text-lg lg:text-2xl font-bold'>{comment}</h1>
                    <Rating
                        className='mt-3'
                        style={{ maxWidth: 150 }}
                        value={rating}
                        autoPlay = {true}
                        readOnly> </Rating>
                    <h1 className='text-xl font-bold mt-2 mb-1'>{name}</h1>
                    <p>{position}</p>
                </div>
            </div>
        </div>
    )
}
export default Testimonial;