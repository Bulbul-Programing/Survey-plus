import { Link } from 'react-router-dom';
import video from '../../assets/New folder/2.mp4'
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
const DifferentSection = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className="my-20">
            <div>
                <h1 className="text-4xl font-semibold text-center">Refreshingly different,<br /> by design</h1>
            </div>

            <div className="flex flex-col-reverse md:flex-row lg:flex-row justify-between lg:mx-10 my-10 items-center">
                <div className="md:w-1/2 lg:w-1/2 ml-10 lg:ml-24">
                    <h1 className="text-4xl md:text-2xl lg:text-5xl font-bold mb-5">Looks striking. Feels effortless.</h1>
                    <p className="text-black lg:mr-10 md:font-medium lg:font-bold text-2xl md:text-base lg:text-2xl mb-2"><span>Impress your form takers.</span> Catch their eye with striking visuals, and make form-filling feel effortless by replacing walls of questions with just one at a time.</p>
                    <div>
                        {
                            user ? <Link to='/survey'><button className='btn bg-blue-500 text-white hover:text-black px-10 text-lg'>Explore</button></Link> : <Link to='/login'><button className='btn bg-blue-500 text-white hover:text-black px-10 text-lg'>Login</button></Link>
                        }
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <video src={video} width="600" height="300" autoPlay loop muted />
                </div>
            </div>
        </div>
    );
};

export default DifferentSection;