import UseAxiosPublic from "./useAxiosPublic.jsx";
import {useQuery} from "@tanstack/react-query";

const UseAnnouncement = () => {
    const axiosPublic = UseAxiosPublic();
    const {data: announcement = [], refetch } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcement');
            return res.data;
        }
    })

    return [announcement, refetch]
};

export default UseAnnouncement;