import UseAuth from "./UseAuth.jsx";
import UseAxiosSecure from "./useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";

const UseVote = () => {
    const {user} = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const {data: vote = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/badges?email=${user.email}`);
            return res.data;
        }
    })
    return [vote, refetch]
};

export default UseVote;