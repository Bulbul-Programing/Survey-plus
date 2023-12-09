import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SurveyCart from "../../SharePage/SurveyCart/SurveyCart";


import React, { useRef, } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import { AuthContext } from "../AuthProvider/AuthProvider";



const FeaturedSurvey = () => {
    const [surveyData, setSurveyData] = useState([])
    const axiosPublic = useAxiosPublic()
    const { user, loading } = useContext(AuthContext)
    useEffect(() => {
        if (user) {
            axiosPublic.get('/survey/totalVotes')
                .then(res => {
                    const sixData = res.data.slice(0, 6)
                    setSurveyData(sixData)
                })
                .catch(error => console.log(error))
        }
    }, [axiosPublic])


    if (loading) {
        return <p>Loading .........</p>
    }

    return (
        <div className="my-10">
            <div className="my-5">
                <h1 className="text-4xl font-bold text-center">Most Voted Survey</h1>
                <p className="text-center font-bold text-lg">Voting our Most Voting survey</p>
            </div>
            <div className="hidden md:hidden lg:block">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        surveyData.map(singleData => <SwiperSlide key={singleData._id} className="pb-10"><SurveyCart data={singleData}></SurveyCart></SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className="hidden md:block lg:hidden">
                <Swiper
                    slidesPerView={2.5}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        surveyData.map(singleData => <SwiperSlide key={singleData._id}><SurveyCart data={singleData}></SurveyCart></SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className="block md:hidden lg:hidden">
                <Swiper
                    slidesPerView={1.5}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        surveyData.map(singleData => <SwiperSlide key={singleData._id}><SurveyCart data={singleData}></SurveyCart></SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default FeaturedSurvey;