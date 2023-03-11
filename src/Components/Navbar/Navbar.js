import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthProvider/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)

  //handle logout
  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.error(error))
  }
  return (
    <div className="navbar bg-green-500 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl  text-black">JoyTweet</Link>
        
      </div>
      <div className='flex-1'>
      <Link to="/" className="btn btn-ghost normal-case text-right text-2xl  text-black">Home</Link>
      <Link to="/About" className="btn btn-ghost normal-case text-right text-2xl  text-black">About</Link>
      <Link to="/blog" className="btn btn-ghost normal-case text-right text-2xl  text-black">Blog</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border border-black">
              <img src={user?.photoURL} alt='user' />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link>Settings</Link></li>
            <li><Link onClick={handleLogOut}>Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;