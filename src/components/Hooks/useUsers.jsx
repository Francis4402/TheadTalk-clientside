import {useQuery} from "@tanstack/react-query";
import UseAxiosSecure from "./useAxiosSecure.jsx";
import UseAuth from "./UseAuth.jsx";

const UseUsers = () => {
    const {user} = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/badges?email=${user.email}`);
            return res.data;
        }
    })
    return [users, refetch]
};

export default UseUsers;