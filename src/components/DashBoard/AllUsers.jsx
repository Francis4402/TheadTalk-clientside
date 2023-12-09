import UseAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import {AwesomeButton} from "react-awesome-button";
import PeopleIcon from "@mui/icons-material/People.js";
import {Helmet} from "react-helmet";
import useAllUsers from "../Hooks/useAllUsers.jsx";

const AllUsers = () => {

    const axiosSecure = UseAxiosSecure();

    const [Allusers, refetch] = useAllUsers();


    const handleMakerAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if(res.data.modifiedCount > 0){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    
    return (
        <div>
            <Helmet>
                <title>DashBoard | ManageUser</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="overflow-x-auto my-10">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-orange-400 text-white">
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Subscription Status</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                            {
                                Allusers.map((user, index) => <tr key={user._id}>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user?.photoURL} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{user?.name}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm">{user?.email}</div>
                                    </td>
                                    <td>
                                        {
                                            user.role === 'admin' ? 'Admin' : <AwesomeButton  onPress={() => handleMakerAdmin(user)} type="secondary"><PeopleIcon/></AwesomeButton>
                                        }
                                    </td>
                                    <td>
                                        {user.badge}
                                    </td>

                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default AllUsers;