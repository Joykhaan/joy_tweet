import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../ContextApi/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    const googleProvider = new GoogleAuthProvider()
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const { logIn, googleSignUp } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';

    // for  login
    const handlelogin = data => {
        logIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error)
            })
    }

    // for  google signup
    const handleGoogleSignUp = () => {
        googleSignUp(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='h-screen'>
            <div className='flex justify-center pt-20  '>
                <form className='flex justify-center shadow-xl rounded-lg  bg-green-500 mx-4 w-96' onSubmit={handleSubmit(handlelogin)}>

                    <div className='my-10 mx-4 md:mx-0'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-2xl text-black">Your Email</span>
                            </label>
                            <input type="text" {...register("email", { required: 'Email is required' })} className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-red-500' role='alert'>{errors.email?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-2xl text-black">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: 'Password is required' })} className="input input-bordered w-full max-w-xs" />
                        </div>
                        {errors.password && <p className='text-red-500' role='alert'>{errors.password?.message}</p>}

                        <p className='mt-4 mb-4 text-xl text-black'>Not registered? please <Link to='/register' className='text-primary font-bold'>Signup</Link> now</p>
                        <input className="btn text-green-500 w-full bg-black font-bold" type="submit" />
                    </div>
                </form>

            </div>
            <div className='flex justify-center mt-8 mb-8'>
                <button onClick={handleGoogleSignUp} className="btn  bg-green-500 text-black mb-8 text-xl">Login with google</button>
            </div>

        </div>
    );
};

export default Login;