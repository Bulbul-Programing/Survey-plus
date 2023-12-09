import { FcSettings, FcConferenceCall, FcLike } from "react-icons/fc";
import { GiArchiveRegister } from "react-icons/gi";
import { FaUsers, FaHeart } from "react-icons/fa6";


const HowItWork = () => {
    return (
        <div >
            <div className=" my-10 bg-cover bg-[url('https://i.ibb.co/PNLQ16B/how-it-work.jpg')]">
                <div className="bg-slate-800 bg-opacity-70 py-20 md:py-20 lg:py-32">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-white text-center font-bold">How Does It Work?</h1>
                </div>
            </div>
            <div className="my-10">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center">See How It Works In <span className="text-blue-500">3 Simple Steps</span></h1>
                <p className=" font-medium md:font-bold lg:font-bold my-5 text-center md:w-4/6 lg:w-1/2 mx-auto">Survey Plus is more than just surveys, it's a community-driven platform where your voice matters.</p>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row gap-x-3 gap-y-10 md:gap-y-0 lg:gap-y-0 justify-between mx-10 md:mx-5 lg:mx-32">
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-r fle from-blue-600 to-blue-500 p-6 inline-block rounded-full"><GiArchiveRegister className="text-6xl text-white"></GiArchiveRegister></div>
                    <h1 className="text-2xl my-3 font-bold">Sign Up For Free</h1>
                    <p className="text-center">Unlock a world of insights by joining Survey Plus for free! Sign up today to become a valued member of our vibrant community.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-r fle from-blue-600 to-blue-500 p-6 inline-block rounded-full"><FaUsers className="text-6xl text-white"></FaUsers></div>
                    <h1 className="text-2xl my-3 font-bold">Participate In Surveys</h1>
                    <p className="text-center">Dive into a rich tapestry of surveys and share your perspectives on the topics that matter to you. </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-r fle from-blue-600 to-blue-500 p-6 inline-block rounded-full"><FaHeart className="text-6xl text-white"></FaHeart></div>
                    <h1 className="text-2xl my-3 font-bold">Earn Experiences</h1>
                    <p className="text-center">At Survey Plus, your participation goes beyond opinions – earn experiences as you engage with surveys and discussions. </p>
                </div>
            </div>
            <div className="flex justify-center my-6">
                <button className=" rounded-full hover:bg-blue-500 border-2 border-blue-500 bg-transparent p-4 text-black hover:text-white  font-bold">I Want To Register</button>
            </div>
        </div>
    );
};

export default HowItWork;