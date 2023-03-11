import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../ContextApi/AuthProvider/AuthProvider';
import PostCard from '../PostCard/PostCard';
import { FaShare } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';

const PostTweet = () => {
    const time = new Date().toLocaleTimeString();
    const { user } = useContext(AuthContext);
    const [react, setReact] = useState(false);
    const [count, setCount] = useState(0);
    const reactCount = count;


    //fetch data
    const { data: myposts = [], refetch } = useQuery({
        queryKey: ['myproducts'],
        queryFn: async () => {
            const res = await fetch(`https://joytweet-server.vercel.app/postscard`);
            const data = await res.json();
            return data

        }
    })

    //get post data and send it to database
    const handleAddPost = (event) => {
        event.preventDefault();
        const form = event.target;
        const pictur = form.picture.files[0];
        const description = form.description.value;
        const imageApi = process.env.REACT_APP_imgKey;
        const userPhoto = user?.photoURL;
        const userName = user?.displayName;
        const userEmail = user?.email;


        //image host in imagebb
        const formData = new FormData();
        formData.append('image', pictur)
        const url = `https://api.imgbb.com/1/upload?key=${imageApi}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {

                if (imgData.success) {

                    const picture = imgData.data.url
                    const postCards = {
                        picture,
                        description,
                        userPhoto,
                        userName,
                        reactCount,
                        time,
                        userEmail,
                        react

                    }
                    fetch('https://joytweet-server.vercel.app/postCards', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(postCards)
                    })
                        .then(res => res.json())
                        .then(data => {
                            
                            if (data.acknowledged) {
                                form.reset();
                                refetch()
                                toast.success("Post Successful");
                            }
                        })
                        .catch(error => console.error(error));
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleAddPost} className="bg-green-500 px-8 py-4 rounded-lg mb-10">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-3xl ">What is on your mind?</span>

                    </label>

                    <textarea type="text" name='description' required placeholder="Start post" cols="30" rows="10" className="input input-bordered border-black border-4 mb-6 text-xl  h-28"></textarea>
                </div>

                <div className='flex  justify-center border border-black bg-black text-green-500 font-bold text-xl mb-6 '><input name='picture' required placeholder='choose picture' type="file" className='w-full ' /></div>

                <div className="form-control mb-6">
                    <button className="btn bg-black mb-8 text-2xl text-green-500">Post
                        <FaShare />
                    </button>
                </div>
            </form>

            {
                myposts.map((post) => <PostCard
                    key={post._id}
                    post={post}
                ></PostCard>)
            }
            <Toaster/>
        </div>
    );
};

export default PostTweet;