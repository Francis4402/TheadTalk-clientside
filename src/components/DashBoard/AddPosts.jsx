import useAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import useAuth from "../Hooks/UseAuth.jsx";
import Select from 'react-select';
import {allTags} from "./Tags/AllTags.js";
import {Helmet} from "react-helmet";

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  
  const formatGroupLabel = (allTags) => (
    <div style={groupStyles}>
      <span>{allTags.label}</span>
      <span >{allTags.options.length}</span>
    </div>
  );


const AddPosts = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleposts = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const tags = form.tags.value;
        const photoUrl = user?.photoURL;
        const name = user?.displayName;
        const email = user?.email;
        const posts = form.posts.value;
        const voteup = form.voteup.value;
        const votedown = form.votedown.value;

        const postLimit = user.type === 'bronze' ? 5 : Infinity;

        const userposts = await axiosSecure.get(`/posts?email=${user.email}`)

        if (userposts.data.length >= postLimit){
            Swal.fire({
                title: 'Limit Exceeded',
                text: 'You have reached the maximum number of allowed posts.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        const timestamp = new Date().toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });

        const myPosts = {title, timestamp, tags, posts, email, name, photoUrl, voteup, votedown}

        const addpostsres = await axiosSecure.post('/posts', myPosts);
        if(addpostsres.data.insertedId){
            Swal.fire({
                title: 'Success!',
                text: 'Post Added Successfully',
                icon: 'success',
                confirmButtonText: 'ok'
            });
        }
    }

    return (
        <div className="w-full justify-center flex min-h-screen my-10">
            <Helmet>
                <title>DashBoard | AddPost</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <form onSubmit={handleposts} className="sm:p-0 px-5 lg:w-[700px] sm:w-[500px] w-full">
                <h1 className="text-4xl font-bold text-center py-5">Add Posts</h1>
                <div className="grid sm:gap-6 gap-3 bg-base-300 sm:p-8 p-2 rounded-xl">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Post Title</span>
                        </label>
                        <input name="title" type="text" placeholder="post title" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Tags</span>
                        </label>
                        <Select name="tags" placeholder="select"
                            options={allTags}
                            formatGroupLabel={formatGroupLabel}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Posts</span>
                        </label>
                        <textarea name="posts" className="textarea textarea-bordered h-24 resize-none" placeholder="Posts"></textarea>
                    </div>
                    <div className="hidden gap-4">
                        <div className="form-control w-32">
                            <label className="label">
                                <span className="label-text">Vote Up</span>
                            </label>
                            <input name="voteup" defaultValue={0} type="number" placeholder="vote up" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-32">
                            <label className="label">
                                <span className="label-text">Vote Down</span>
                            </label>
                            <input name="votedown" defaultValue={0} type="number" placeholder="vote down" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <input className="btn btn-neutral w-fit" type="submit" value="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddPosts;