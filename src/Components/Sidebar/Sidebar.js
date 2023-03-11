import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthProvider/AuthProvider';

const Sidebar = () => {
    //get data from context api
    const {user,logOut}=useContext(AuthContext)

    //fetch data
    const { data: userInfo = []} = useQuery({
        queryKey: ['userinfo'],
        queryFn: async () => {
            const res = await fetch(`https://joytweet-server.vercel.app/userinfo/${user?.email}`);
            const data = await res.json();
            return data

        }
    })
 
    //for logout
    const handleLogOut = () => {
        logOut()
          .then(() => { })
          .catch(error => console.error(error))
      }
    return (
        <div className='container  lg:mx-auto sticky top-24 bg-green-500   rounded-lg py-10'>
            <img  src={user?.photoURL} alt="user"  className='w-20 h-20 mx-auto rounded-full border border-black'/>
            <div className='px-8 mt-4'>
              <h2 className='text-2xl font-bold text-left mb-2 text-black'>{user?.displayName}</h2>  
              <p className='text-lg font-bold text-left mb-2 text-black'>{user?.email}</p>
              <Link to={`/mypost/${user?.email}`} ><h1 className='text-start mb-2 text-black font-bold text-lg'>My All Post </h1></Link>
             
              {userInfo.map((users)=><Link
              to={`/postscard`}
              key={users._id}
              >
                {users.role==="Admin"&&<h1 className='font-bold  text-left text-black text-lg mb-2'>Users post</h1>}
              </Link>)}

              <h1 onClick={handleLogOut} className='text-start  text-black font-bold text-lg cursor-pointer'>Logout</h1>
            </div>
            
        </div>
    );
};

export default Sidebar;