import PropTypes from "prop-types";
import 'react-awesome-button/dist/styles.css';
import {Card, CardActionArea, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";


const DisplaypostCard = ({post}) => {

    const {_id, title, tags, posts, photoUrl, name, timestamp} = post;

    return (
        <Card className="md:w-[800px] sm:w-[600px] w-[300px] p-4">
            <Link to={`/dashboard/post/${_id}`}>
                <CardActionArea>
                    <div className="flex justify-between">
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
                        <Typography variant="body2" color="text.secondary">
                            <div>{timestamp}</div>
                        </Typography>
                    </div>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                        <div className="flex justify-between">
                            <div className="flex gap-5">
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{ overflowWrap: 'break-word' }}>{posts}</div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div className="underline">{tags}</div>
                                </Typography>
                            </div>
                            <Typography variant="body2" color="text.secondary">
                                <div className="">Votes: </div>
                            </Typography>
                        </div>
                </CardContent>
            </CardActionArea>
            </Link>
        </Card>
    );
};






DisplaypostCard.propTypes = {
    post: PropTypes.object,



}

export default DisplaypostCard;