import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../ContextApi/AuthProvider/AuthProvider';

const Myposts = () => {
    const { user } = useContext(AuthContext);
    const { data: myposts = [], refetch } = useQuery({
        queryKey: ['myproducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/mypost/${user?.email}`);
            const data = await res.json();
            return data

        }
    })

    const handlepostDelete = (id) => {

        const proced = window.confirm('are you sure?? to delete the Seller');
        if (proced) {
            fetch(`http://localhost:5000/deletepost/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    
                    if (data.deletedCount > 0) {
                        window.confirm('success');

                        toast.success("Deleted Successfully");
                        refetch()
                    }
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className=" mx-6 lg:w-1/2 lg:mx-auto min-h-screen">
            <h1 className='text-center text-4xl font-bold mt-8 text-green-500'>You have total {myposts.length} post</h1>
            {
                myposts.map((post) => <div
                    key={post._id}
                >
                    <div className="card card-compact w-full bg-green-400 shadow-xl my-10">
                        <figure><img className='w-full' src={post.picture} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{post.userName} {post.time}</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handlepostDelete(post._id)} className="btn btn-primary">Delete Post</button>
                            </div>
                        </div>
                    </div>

                </div>)
            }
            <Toaster/>
        </div>
    );
};

export default Myposts;