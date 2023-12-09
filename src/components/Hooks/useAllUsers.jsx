import {useQuery} from "@tanstack/react-query";
import UseAxiosSecure from "./useAxiosSecure.jsx";

const UseAllUsers = () => {

    const axiosSecure = UseAxiosSecure();

    const {data: Allusers = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })
    return [Allusers, refetch]
};

export default UseAllUsers;