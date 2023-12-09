import {useQuery} from "@tanstack/react-query";
import UseAxiosPublic from "./useAxiosPublic.jsx";

const UseCommentPost = () => {
    const axiosPublic = UseAxiosPublic();
    const {data: comments = [], refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/comments');
            return res.data;
        }
    })

    return [comments, refetch]
};

export default UseCommentPost;