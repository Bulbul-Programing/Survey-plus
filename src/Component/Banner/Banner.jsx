import { Link } from 'react-router-dom';
import bannerVideo from '../../assets/New folder/1.mp4'
const Banner = () => {
    return (
        <div className="flex flex-col md:flex-row lg:flex-row justify-between lg:mx-10 my-10 items-center">
            <div className="lg:w-1/2">
                <video src={bannerVideo} width="600" height="300" autoPlay loop muted />
            </div>
            <div className="lg:w-1/2 ml-10 lg:ml-24">
                <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold text-blue-500  mb-5">Survey Plus </h1>
                <p className="text-black lg:mr-10 font-bold text-2xl md:text-xl lg:text-2xl mb-2"><span className='text-red-500'>Sharing Your Opinion</span> By Rating Products & Brands Around The World</p>
                <p className='font-bold'> Create, share, and analyze surveys effortlessly.</p>
                <Link to='/survey'><button className='my-5 hover:text-black text-lg font-bold btn bg-blue-500 text-white'> Explore</button></Link>
            </div>
        </div>
    );
};

export default Banner;