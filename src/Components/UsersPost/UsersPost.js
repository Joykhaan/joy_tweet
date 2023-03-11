import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast, Toaster } from 'react-hot-toast';

// fetch data
const UsersPost = () => {
    const { data: userspost = [], refetch } = useQuery({
        queryKey: ['userspost'],
        queryFn: async () => {
            const res = await fetch(`https://joytweet-server.vercel.app/postscard`);
            const data = await res.json();
            return data

        }
    })

    //for deleting post
    const handlepostDelete = (id) => {
        const proced = window.confirm('are you sure?? to delete the Seller');
        if (proced) {
            fetch(`https://joytweet-server.vercel.app/deletepost/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        // altert user
                        toast.success("Deleted Successfully");
                        refetch()
                    }
                })
                .catch(error => console.error(error));
        }
    }


    return (
        <div className=" mx-6 lg:w-1/2 lg:mx-auto">
            <h1 className='text-center text-4xl font-bold mt-8 text-green-500'>Users have total {userspost.length} post</h1>
            {
                userspost.map((post) => <div
                    key={post._id}
                >
                    <div className="card card-compact w-full bg-green-400 shadow-xl my-10">
                        <figure><img className='w-full' src={post.picture} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl font-bold text-left mb-4">{post.userName} {post.time}</h2>
                            <p className='text-xl text-left mb-4'>{post.description}</p>
                            <h2 className="card-title text-xl ">{post.reactCount} Reacts</h2>
                            <div className="card-actions justify-end">
                                <button onClick={() => handlepostDelete(post._id)} className="btn btn-primary">Delete Post</button>
                            </div>
                        </div>
                    </div>

                </div>)
            }
            <Toaster />
        </div>
    );
};

export default UsersPost;