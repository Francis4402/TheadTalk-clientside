import {useQuery} from "@tanstack/react-query";
import useAuth from "../../Hooks/UseAuth.jsx";
import {Helmet} from "react-helmet";
import UseAxiosSecure from "../../Hooks/useAxiosSecure.jsx";
import {AwesomeButton} from "react-awesome-button";
import Swal from "sweetalert2";
import {useState} from "react";
import useUsers from "../../Hooks/useUsers.jsx";
import Stats from "../Stats.jsx";

const AdminProfile = () => {


    const [isView, setView] = useState(false);
    const [users, refetch] = useUsers();
    const axiosSecure = UseAxiosSecure();
    const handleEditClick = () => {
        setView(true);
    }

    const handleUpdateprofile = async (e, _id) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoUrl.value;

        const updates = {name, photoURL}
        const mainupdate = await axiosSecure.put(`/badges/${_id}`, updates)
        refetch()
        if(mainupdate.data.modifiedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Profile Updated',
                showConfirmButton: false,
                timer: 1500
            })
            setView(false);
        }
    }

    return (
        <div>
            <Helmet>
                <title>DashBoard | AdminProfile</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="m-10">
                {
                    users.map(u =>
                        <div key={u._id}>
                            <div className="flex items-center gap-3">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-20 rounded-full">
                                        <img src={u?.photoURL} alt="i" />
                                    </div>
                                </label>
                                <h1 className="font-semibold text-xl">{u?.name}</h1>
                            </div>
                            <div className="flex my-8 gap-10">
                                <div>
                                    <span className="font-semibold">Email:</span> {u?.email}
                                </div>
                                <div className="capitalize">
                                    Badge: {u?.badge}
                                </div>
                            </div>
                            <AwesomeButton onPress={handleEditClick} type="primary">Edit</AwesomeButton>
                            <div className="flex justify-center">
                                { isView ?
                                    <form onSubmit={(e) => handleUpdateprofile(e, u?._id)} className="sm:p-0 px-5 lg:w-[700px] sm:w-[500px] w-full">
                                        <h1 className="text-4xl font-bold text-center py-5">UpdateNameEmail</h1>
                                        <div className="grid sm:gap-6 gap-3 bg-base-300 sm:p-8 p-2 rounded-xl">
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">Name</span>
                                                </label>
                                                <input name="name" type="text" placeholder="name" defaultValue={u?.name} className="input input-bordered w-full" />
                                            </div>

                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text">PhotoUrl</span>
                                                </label>
                                                <input name="photoUrl" type="url" placeholder="PhotoUrl" defaultValue={u?.photoURL} className="input input-bordered w-full" />
                                            </div>

                                            <AwesomeButton type="primary">Submit</AwesomeButton>
                                        </div>
                                    </form> : ''
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <Stats/>
        </div>
    );
};

export default AdminProfile;