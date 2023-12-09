import UseAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import CommentIcon from '@mui/icons-material/Comment';
import Swal from "sweetalert2";
import {AwesomeButton} from "react-awesome-button";
import DeleteIcon from "@mui/icons-material/Delete.js";
import {Link} from "react-router-dom";
import useAuth from "../Hooks/UseAuth.jsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import UseAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import {motion} from "framer-motion";
import {Helmet} from "react-helmet";

const UserPosts = () => {

    const axiosSecure = UseAxiosSecure();
    const axiosPublic = UseAxiosPublic();
    const {loading, user} = useAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const { data: countData = { count: 0 } } = useQuery({
        queryKey: ['homepostscount'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepostscount');
            return res.data;
        },
    });

    const NumberOfPages = Math.ceil(countData.count / itemsPerPage);
    const pages = []
    for(let i = 0; i < NumberOfPages; i++){
        pages.push(i)
    }

    const {data: posts = [], refetch} = useQuery({
        queryKey: ['userposts', user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userposts?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`)
            return res.data;
        }
    })


    const handlePage = (e) => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if(currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if(currentPage < pages.length){
            setCurrentPage(currentPage + 1);
        }
    }


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
                axiosSecure.delete(`/userposts/${post._id}`)
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
        <div>
            <Helmet>
                <title>DashBoard | MyPosts</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
                <div>
                    <div className="overflow-x-auto my-10">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-orange-400 text-white">
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Post Title</th>
                                <th>Votes</th>
                                <th>Details</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>

                                { posts.length === 0 ? (
                                        loading ? <div className="flex justify-center items-center">
                                            <progress className="progress w-56"></progress>
                                        </div> : <p className="text-3xl font-bold p-10">There is no Posts</p>
                                    ) : (

                                    posts.map((post, index) => <tr key={post._id}>
                                        <th>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={post.photoUrl} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{post.name}</div>
                                                    <div className="text-sm opacity-50">{post.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {post.tags}
                                        </td>
                                        <td>
                                            <Link to={`/dashboard/post/${post._id}`}><AwesomeButton type="secondary"><CommentIcon/></AwesomeButton></Link>
                                        </td>
                                        <th>
                                            <AwesomeButton onPress={() => handleDelete(post)} type="secondary"><DeleteIcon/></AwesomeButton>
                                        </th>
                                    </tr>
                                )

                                    )
                                }
                            </tbody>
                        </table>

                        <div className='grid justify-center gap-4 py-20'>
                            <p className='flex justify-center font-semibold'>Current Page: {currentPage}</p>
                            <div className='flex justify-center gap-4 '>
                                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 400, damping: 15}}
                                               onClick={handlePrevPage} className={'bg-[#6C5F5B] px-3 py-2 rounded-lg text-white font-semibold hover:bg-gray-300'}
                                >
                                    Prev
                                </motion.button>
                                {
                                    pages.map(page => <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 400, damping: 15}}
                                                                     className={'bg-[#6C5F5B] px-3 py-2 rounded-lg text-white font-semibold hover:bg-[#4F4A45]'}
                                                                     key={page} onClick={() => setCurrentPage(page)}>

                                        {page}

                                    </motion.button>)
                                }
                                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 400, damping: 15}}
                                               onClick={handleNextPage} className={'bg-[#6C5F5B] px-3 py-2 rounded-lg text-white font-semibold hover:bg-[#4F4A45]'}
                                >
                                    Next
                                </motion.button>
                                <select value={itemsPerPage} onChange={handlePage} name="" id=''>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    );
};

export default UserPosts;