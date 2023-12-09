import {useQuery} from "@tanstack/react-query";
import {AwesomeButton} from "react-awesome-button";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/material";
import useAuth from "../Hooks/UseAuth.jsx";
import useAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import {Helmet} from "react-helmet";

const ReportsActivities = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data: feedback = [], refetch} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/feedback');
            return res.data;
        }
    })

    const {data: reports = []} = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await axiosSecure.get('/report');
            return res.data;
        }
    })

    const hanelFeedBack = async (e) => {
        e.preventDefault();
        const form = e.target;
        const photoUrl = user?.photoURL;
        const email = user?.email;
        const name = user?.name;
        const feedback = form.feedback.value;

        const reports = {feedback, photoUrl, email, name}

        const addreport = await axiosSecure.post('/feedback', reports)
        if(addreport.data.insertedId){
            refetch();
        }
    }

    return (
        <div className="justify-center flex">
            <Helmet>
                <title>DashBoard | Reports</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="container">
                <div className="my-10 text-xl font-semibold">
                    <h1 className="my-10">Reported Activities/Comments Page</h1>
                    <Typography variant="body2">
                        {
                            reports.map(r => <div key={r._id}>
                                {r.report}
                            </div>)
                        }
                    </Typography>
                </div>
                <CardActions>
                    <form onSubmit={e => hanelFeedBack(e)} className="w-full flex items-center gap-3">
                        <input type="text" name="feedback" placeholder="feedback" className="input input-bordered w-full" />
                        <AwesomeButton type="primary">PostFeedBack</AwesomeButton>
                    </form>
                </CardActions>

                <div className="divider">
                    <div>
                        <h1>FeedBack</h1>
                    </div>
                </div>
                <div className="grid gap-7">
                    {
                        feedback.map(post => <div key={post._id}>
                            <div className="flex items-center gap-3">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="i" src={post.photoUrl} />
                                    </div>
                                </label>
                                <p>{post.feedback}</p>
                            </div>

                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ReportsActivities;