import {MdEmail, MdMessage} from "react-icons/md";
import {FaUsers} from "react-icons/fa";
import {useEffect, useState} from "react";
import UseAxiosSecure from "../Hooks/useAxiosSecure.jsx";
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";

const Stats = () => {
    const [Allusers, setAllUsers] = useState([]);
    const [Allcomments, setAllComments] = useState([]);
    const [Allposts, setAllPosts] = useState([]);

    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => setAllUsers(res.data));
    })

    useEffect(() => {
        axiosSecure.get('/comments')
            .then(res => setAllComments(res.data));
    })

    useEffect(() => {
        axiosSecure.get('/posts')
            .then(res => setAllPosts(res.data));
    })


    const pieChartData = [
        { id: 0, value: Allposts.length, label: 'Posts' },
        { id: 1, value: Allcomments.length, label: 'Comments' },
        { id: 2, value: Allusers.length, label: 'Users' },
    ];

    const colors = ["#00C49F", "#FF444A", "#0000FF"]


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <div className="justify-center grid">
                <div className="stats shadow">

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <MdEmail size={30}/>
                        </div>
                        <div className="stat-title">Posts</div>
                        <div className="stat-value">{Allposts.length}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <MdMessage size={30}/>
                        </div>
                        <div className="stat-title">Comments</div>
                        <div className="stat-value">{Allcomments.length}</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUsers size={30}/>
                        </div>
                        <div className="stat-title">Users</div>
                        <div className="stat-value">{Allusers.length}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>

                <div className="my-5">
                    <div className="grid justify-center">
                        <PieChart width={300} height={400}>
                            <Pie
                                dataKey="value"
                                data={pieChartData}
                                cx={145}
                                cy={200}
                                outerRadius={120}
                                fill="#8884d8"
                                labelLine={false}
                                label = {renderCustomizedLabel}
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;