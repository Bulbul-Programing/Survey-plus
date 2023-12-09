import React from 'react';

const Pricing = () => {
    return (
        <div>
            <div className='bg-[url("https://i.ibb.co/2NNLdYf/13744786-Mar-Business-11.jpg")] bg-contain bg-no-repeat bg-center'>
                <div className='bg-blue-200 py-20 bg-opacity-80'>
                    <h1 className='text-4xl font-bold text-center bg'>Explorer Plan</h1>
                    <p className='text-center my-2'>Uncover insights with our Explorer Plan. Perfect for individuals and startups.</p>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 justify-between px-20 my-10'>
                <div className='text-slate-700 hover:text-white hover:bg-gradient-to-r from-blue-300 to-blue-400 hover:shadow-inner  font-bold p-10 rounded-lg shadow-lg text-center'>
                    <p className='my-3 text-xl'>Basic</p>
                    <p className='my-3  text-5xl'>$29</p>
                    <p className='border-t-2 mx-auto py-3'>Unlimited create surveys</p>
                    <p className='border-t-2 mx-auto py-3'>Up to 500 responses per survey</p>
                    <p className='border-t-2 mx-auto py-3'>Advanced analytics</p>
                    <p className='border-t-2 mx-auto py-3'>Custom branding</p>
                    <p className='border-t-2 border-b-2 mx-auto py-3'>Priority email support</p>
                    <button className='btn bg-gradient-to-t from-blue-400 to-blue-500 text-white mt-5 hover:bg-transparent hover:text-black'>Parches Now</button>
                </div>
                <div className='text-slate-700 hover:text-white hover:bg-gradient-to-r from-blue-300 to-blue-400 hover:shadow-inner  font-bold p-10 rounded-lg shadow-lg text-center'>
                    <p className='my-3  text-xl'>Premium </p>
                    <p className='my-3  text-5xl'>$59</p>
                    <p className='border-t-2 mx-auto py-3'>Unlimited create surveys</p>
                    <p className='border-t-2 mx-auto py-3'>Up to 1000 responses per survey</p>
                    <p className='border-t-2 mx-auto py-3'>Advanced analytics</p>
                    <p className='border-t-2 mx-auto py-3'>Custom branding</p>
                    <p className='border-t-2 border-b-2 mx-auto py-3'>Priority email support</p>
                    <button className='btn bg-gradient-to-t from-blue-400 to-blue-500 text-white mt-5 hover:bg-transparent hover:text-black'>Parches Now</button>

                </div>
                <div className='text-slate-700 hover:text-white hover:bg-gradient-to-r from-blue-300 to-blue-400 hover:shadow-inner  font-bold p-10 rounded-lg shadow-lg text-center'>
                    <p className='my-3 text-xl'>Basic</p>
                    <p className='my-3  text-5xl'>$69</p>
                    <p className='border-t-2 mx-auto py-3'>Unlimited create surveys</p>
                    <p className='border-t-2 mx-auto py-3'>Unlimited</p>
                    <p className='border-t-2 mx-auto py-3'>Advanced analytics</p>
                    <p className='border-t-2 mx-auto py-3'>Custom branding</p>
                    <p className='border-t-2 border-b-2 mx-auto py-3'>Priority email support</p>
                    <button className='btn bg-gradient-to-t from-blue-400 to-blue-500 text-white mt-5 hover:bg-transparent hover:text-black'>Parches Now</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;