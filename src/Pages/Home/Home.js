import React from 'react';
import PostTweet from '../../Components/PostTweet/PostTweet';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Home = () => {
    return (
        <div className='grid grid-cols-7 w-full lg:w-3/5 mx-auto mt-10 text-center gap-8' >

            <div className='col-span-7  lg:col-span-2  mx-10  mt-10  lg:w-full'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-span-7 lg:col-span-5  lg:mx-auto w-full p-10'>
                <PostTweet></PostTweet>
            </div>
        </div>
    );
};

export default Home;