import {Helmet} from "react-helmet";
import UseAuth from "../Hooks/UseAuth.jsx";
import UseAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";

const PaymentHistory = () => {

    const {user} = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const {data: payments = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>DashBoard | PaymentHistory</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="overflow-x-auto my-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-orange-400 text-white">
                    <tr>
                        <th>
                            #
                        </th>
                        <th>Email</th>
                        <th>TranscationId</th>
                        <th>Date</th>
                        <th>Badge</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        payments.map((user, index) => <tr key={user._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="text-sm">{user?.email}</div>
                                </td>
                                <td>
                                    <div className="text-sm">{user?.transactionId}</div>
                                </td>
                                <td>
                                    <div className="text-sm">{user?.date}</div>
                                </td>
                                <td>
                                    {user?.badge}
                                </td>

                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;