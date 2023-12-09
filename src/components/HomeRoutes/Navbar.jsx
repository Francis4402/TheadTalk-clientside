import {IoMdNotifications} from "react-icons/io";
import useAuth from "../Hooks/UseAuth.jsx";
import {Link} from "react-router-dom";
import {toast} from "react-hot-toast";
import useAdmin from "../Hooks/useAdmin.jsx";
import useAnnouncement from "../Hooks/useAnnouncement.jsx";



const Navbar = () => {
    const {user, logOut} = useAuth();
    const [isAdmin] = useAdmin();
    const [announcement] = useAnnouncement();


    const handleLogOut = () => {
        logOut()
            .then(() => toast.success('User Logged Out Successfully'))
            .catch(error => toast.error(error))
    }


    return (
        <div className="justify-center flex bg-base-300">
            <div className="container md:px-0 px-5">
                <div className="navbar">
                    <div className="navbar-start grid">
                        <Link to={"/"}><img width={80} src="/logo.png" alt="i" /></Link>
                        <div>
                            <h1 className="text-xl font-semibold">Assignment12_category_0001</h1>
                        </div>
                    </div>

                    {
                        !user ? <>
                                <div className="navbar-end hidden lg:flex">
                                <ul className="menu menu-horizontal px-1 lg:text-lg font-semibold items-center">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/membership">Membership</Link></li>
                                    <IoMdNotifications size={24} />
                                    {
                                        !user &&  <li><Link to="/register">Join Us</Link></li>
                                    }
                                </ul>
                            </div>

                                <div className="navbar-end lg:hidden flex">
                                    <div className="dropdown dropdown-left">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                        </label>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-10 z-[1] p-4 shadow bg-base-100 rounded-box w-52">
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/membership">Membership</Link></li>

                                            {
                                                !user &&  <li><Link to="/register">Join Us</Link></li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </>
                             :
                            <div className="navbar-end flex gap-3">
                                <div className="md:menu md:menu-horizontal items-center md:text-lg font-semibold hidden">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/membership">Membership</Link></li>

                                    { announcement.length > 0 ?
                                        <Link to="/announcement">
                                            <button className="btn btn-ghost bg-gray-300">
                                                <div className="indicator">
                                                    <IoMdNotifications size={24} />
                                                    <span className="badge badge-sm indicator-item">{announcement.length}</span>
                                                </div>
                                            </button>
                                        </Link> : null
                                    }

                                </div>
                                <div className="dropdown dropdown-end z-10">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL} alt="i" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>

                                                <a>{user?.displayName} <span className="badge">Bronze</span></a>


                                        </li>
                                        <li><Link to="/">Home</Link></li>
                                        {
                                            isAdmin ? <>
                                                <li><Link to="/dashboard/admin-profile">
                                                    <a className="justify-between">
                                                        Dashboard
                                                    </a>
                                                </Link>
                                                </li>
                                            </> : <li><Link to="/dashboard/my-profile">
                                                <a className="justify-between">
                                                    Dashboard
                                                </a>
                                            </Link>
                                            </li>
                                        }

                                        <div>
                                            <div className={"md:hidden"}>
                                                <li><Link to="/membership">Membership</Link></li>
                                                {
                                                    !user &&  <li><Link to="/register">Join Us</Link></li>
                                                }
                                                <li><Link to="/announcement">
                                                    <div className="indicator">
                                                        Announcement
                                                        <span className="badge badge-sm indicator-item">{announcement.length}</span>
                                                    </div>
                                                </Link></li>
                                            </div>

                                        </div>
                                        <li><a onClick={handleLogOut}>Logout</a></li>
                                    </ul>
                                </div>


                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;