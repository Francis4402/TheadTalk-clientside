import useAnnouncement from "../Hooks/useAnnouncement.jsx";
import {AwesomeButton} from "react-awesome-button";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import useAdmin from "../Hooks/useAdmin.jsx";
const DisplayAnnouncement = () => {

    const [announcement, refetch] = useAnnouncement();
    const axiosSecure = UseAxiosSecure();

    const [isAdmin] = useAdmin();

    const handleDelete = post => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/announcement/${post._id}`)
                    .then(res => {
                        if(res.data.deletedCount > 0){
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="justify-center flex">
            <div className="container sm:px-0 px-5">
                <div className="grid gap-10 my-20 justify-center">
                    {
                        announcement.map(posts => <div key={posts._id} className="card sm:w-[700px] w-full bg-base-100 shadow-xl">
                            <figure><img width="100%" src={posts.image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{posts.title}</h2>
                                <p>Description: {posts.description}</p>

                                { isAdmin ?
                                    <div className="card-actions justify-end">
                                        <AwesomeButton onPress={() => handleDelete(posts)} type="facebook">Delete</AwesomeButton>
                                    </div> : ''
                                }

                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default DisplayAnnouncement;