import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import DisplaypostCard from "./DisplaypostCard.jsx";
import {useQuery} from "@tanstack/react-query";
import useAuth from "../Hooks/UseAuth.jsx";
import {useState} from "react";
import {motion} from "framer-motion";
import {AwesomeButton} from "react-awesome-button";
import {FaSearch} from "react-icons/fa";

const HomePosts = () => {
    const axiosPublic = useAxiosPublic();
    const {loading} = useAuth();
    const [search, setSearch] = useState('');
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
        queryKey: ['homeposts', currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/homeposts?page=${currentPage}&size=${itemsPerPage}&search=${search}`);
            return res.data;
        },
    })

    const handleSearch = e => {
        e.preventDefault();
        refetch()
        const search = e.target.search.value;
        setSearch(search);
    }


    const handlepage = (e) => {
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


    return (
        <div>
            <div className="hero sm:h-[500px] h-[300px] mb-10" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content grid text-center text-white">
                    <div className="max-w-md">
                        <h1 className="mb-5 md:text-5xl text-2xl font-bold">WelCome To ThreadTalk</h1>
                        <div className="justify-center flex">
                            <div className="container justify-center flex">
                                <form onSubmit={handleSearch} className="justify-center text-black flex lg:w-[840px] md:w-[760px] w-full items-center gap-3">
                                    <input type="text" name="search" placeholder="Search" className="input input-bordered w-full"  />
                                    <button type="submit" className="btn btn-neutral"><FaSearch size={25}/></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="justify-center flex min-h-screen">
                <div className="container">
                    <div className="grid justify-center">
                        { posts.length === 0 ? (
                            loading ? <div className="flex justify-center items-center">
                                <progress className="progress w-56"></progress>
                            </div> : <p className="text-3xl font-bold p-10">There is no Posts</p>
                        ) : (
                            <div className="grid justify-center gap-10">
                                {
                                    posts.map(post => <DisplaypostCard key={post._id} post={post} />)
                                }
                            </div>

                        )

                        }

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
                                <select value={itemsPerPage} onChange={handlepage} name="" id=''>
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
        </div>

    );
};

export default HomePosts;