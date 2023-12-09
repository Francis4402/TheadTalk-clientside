import Swal from "sweetalert2";
import UseAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import UseAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";
const image_hosting_key = import.meta.env.VITE_Image_Upload_token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Announcement = () => {
    const {register, handleSubmit, reset} = useForm();
    const axiosSecure = UseAxiosSecure();
    const axiosPublic = UseAxiosPublic();
    const onSubmit = async (data) => {
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if(res.data.success){
            const annoucementsmenu = {
                image: res.data.data.display_url,
                name: data.name,
                title: data.title,
                description: data.description,
            }
            const annoucementRes = await axiosSecure.post('/announcement', annoucementsmenu);
            if(annoucementRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Announcement is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    return (
        <div className="w-full justify-center flex min-h-screen my-10">
            <Helmet>
                <title>DashBoard | Announcement</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className="sm:p-0 px-5 lg:w-[700px] sm:w-[500px] w-full">
                <h1 className="text-4xl font-bold text-center py-5">Announcement</h1>
                <div className="grid sm:gap-6 gap-3 bg-base-300 sm:p-8 p-2 rounded-xl">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Author Image</span>
                        </label>
                        <input {...register('image', {required: true})} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Author Name</span>
                        </label>
                        <input {...register('name',{required: true})} type="text" placeholder="Your Name" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input {...register('title',{required: true})} type="text" placeholder="title" className="input input-bordered w-full" />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register('description',{required: true})} className="textarea textarea-bordered h-24 resize-none" placeholder="Posts"></textarea>
                    </div>
                    <input className="btn btn-neutral w-fit" type="submit" value="submit" />
                </div>
            </form>
        </div>
    );
};

export default Announcement;