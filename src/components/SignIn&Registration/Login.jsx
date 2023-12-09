import { useState } from "react"
import UseAuth from "../Hooks/UseAuth";
import { Helmet } from "react-helmet";
import {toast} from "react-hot-toast";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../Hooks/useAxiosPublic";

const Login = () => {
    const axiosPublic = UseAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const {signIn, googleSignIn, updateUserProfile} = UseAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleloginwithpass = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((res) => {
                console.log(res.user)
                toast.success('Your Logged In')
            })
            .catch(error => {
                console.log(error)
                toast.error('Email or password is incorrect')
            })
    }


    const handlegoogleLogin = () => {
        googleSignIn()
        .then(res => {
            updateUserProfile(res.user?.displayName, res.user?.photoURL, res.user?.badge)
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName,
                photoURL: res.user?.photoURL,
                badge: res.user?.badge || "bronze"
            }
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Profile Created',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate(from, {replace: true});
                    }
                })
        })
        .catch(error =>  console.log(error))
    }

  return (
    <div>
        <Helmet>
            <title>Thread Talk | Login</title>
            <meta name="description" content="Helmet application" />
        </Helmet>

        <div className="h-[600px] hero bg-base-100">
            <div className="hero-content p-2 flex-col">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
                <div className="card-body">

                    <form onSubmit={handleloginwithpass}>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        
                        <div className="flex gap-3">
                            <input name="password" type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered w-full" required />
                            

                            <span onClick={() => setShowPassword(!showPassword)} className='btn'>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }
                            </span>
                        </div>
                        <label className="label">
                                <button className="label-text-alt link link-hover">Forgot password?</button>
                        </label>
                        
                        </div>
                        <div className="form-control mt-6">
                        <button type="submit" className="btn btn-outline">Login</button>
                        </div>
                    </form>

                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="md:text-base text-sm">New To Website register now?</p>
                            <Link className="btn btn-link text-base-content" to='/register'><button>Register</button></Link>
                        </div>
                        <button onClick={handlegoogleLogin} className="btn btn-outline mt-3">Google Login</button>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login