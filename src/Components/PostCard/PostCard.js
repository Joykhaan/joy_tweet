import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaHeart} from 'react-icons/fa';

import { AuthContext } from '../../ContextApi/AuthProvider/AuthProvider';


const PostCard = ({post}) => {
    const{reactCount,_id,react,picture,time,description,userName}=post;
    const {user ,loading} = useContext(AuthContext)

    const { data: myposts = [], refetch } = useQuery({
        queryKey: ['myproducts'],
        queryFn: async () => {
            const res = await fetch(`https://joytweet-server.vercel.app/postscard`);
            const data = await res.json();
            return data
            
        }
    })
    const [reacts, setReact] = useState(react);
    const [count, setCount] = useState(reactCount);

    if(loading ){
        return <div className="flex justify-center items-center my-8">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    }
    //handle post react
    const handleReact=()=>{
   
        if(!reacts){
            setReact(true)
            setCount(count + 1)   
        }
       
        if(reacts){
            
            setReact(false)
            setCount(count - 1)
        }
        
        const postCardss = {
            
            reactCount:count,
            react:reacts,
            uid:user.uid

        }
        fetch(`https://joytweet-server.vercel.app/reactupdate/${_id}`,{
                method:'PUT',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(postCardss)
            })
            .then(res=>res.json())
            .then(data=>{
                
                if(data.matchedCount>0){
                   
                    refetch()                 
                }             
    
            }).catch(error => console.error(error));
    }

    return (
        <>

            <div className="card  lg:w-full bg-green-400 shadow-xl mb-10" >
                <figure><img className='w-full' src={picture} alt="Shoes" /></figure>
                <div className="card-body">
                    <p className='text-2xl font-bold text-left mb-4'>{userName} <span>{time}</span></p>
                    <p className='text-xl text-left mb-4'>{description}</p>
                    <div className="flex cursor-pointer">
                    {<FaHeart onClick={handleReact} size={30} />}
                        {react === true ? <h2 className="card-title text-xl ml-4">{reactCount}  loves</h2> : <h2 className="card-title text-xl ml-4">{reactCount} loves</h2>}

                    </div>
                </div>
            </div>
        </>
    );
};

export default PostCard;