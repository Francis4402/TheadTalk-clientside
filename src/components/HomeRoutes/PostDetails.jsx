import {useLoaderData} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {CardActions, CardContent} from "@mui/material";
import {AwesomeButton} from "react-awesome-button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp.js";
import ThumbDownIcon from "@mui/icons-material/ThumbDown.js";
import SendIcon from "@mui/icons-material/Send.js";
import {FacebookShareButton} from "react-share";
import useAuth from "../Hooks/UseAuth.jsx";
import UseAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import Swal from "sweetalert2";

const PostDetails = () => {

    const {photoUrl, name, title, tags, posts, _id } = useLoaderData();


    return (
        <div className="justify-center flex">
            <div className="container my-20">
                <div className="flex items-center gap-2">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="i" src={photoUrl} />
                        </div>
                    </label>
                    <Typography variant="h6" noWrap component="div">
                        {name}
                    </Typography>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Title: {title}
                    </Typography>

                    <div className="flex items-center gap-10">
                        <Typography variant="body2" color="text.secondary">
                            <div style={{ overflowWrap: 'break-word' }} className="text-xl"><span className="font-semibold">Post: {posts}</span> </div>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <p>Tags: <span className="underline">{tags}</span></p>
                        </Typography>
                    </div>
                </CardContent>
                <CardActions>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <AwesomeButton type="primary"><ThumbUpIcon/></AwesomeButton>
                            <AwesomeButton type="primary"><ThumbDownIcon/></AwesomeButton>
                        </div>
                    </div>
                </CardActions>

                <CardActions>
                    <form className="w-full flex items-center gap-3">
                        <input type="text" name="comment" placeholder="Comment" className="input input-bordered w-full" />
                        <AwesomeButton type="primary"><SendIcon/></AwesomeButton>
                        <FacebookShareButton url={`https://threadtalkbackend-production.up.railway.app/posts/${_id}`}>
                            <AwesomeButton type="primary">Share</AwesomeButton>
                        </FacebookShareButton>
                    </form>
                </CardActions>
            </div>
        </div>
    );
};

export default PostDetails;