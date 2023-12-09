import {AwesomeButton} from "react-awesome-button";
import Swal from "sweetalert2";
import {useState} from "react";
import UseAxiosSecure from "../Hooks/useAxiosSecure.jsx";

const ReportButton = () => {

    const axiosSecure = UseAxiosSecure()

    const handlereport = async (e) => {
        e.preventDefault();
        const form = e.target;
        const report = form.report.value;

        const getreport = {report}

        const addreport = await axiosSecure.post('/report', getreport)
        if(addreport.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Report Successfully',
                showConfirmButton: false,
                timer: 1500
            })
            setView(false);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="container justify-end flex">
                <form onSubmit={e => handlereport(e)} className="flex items-end gap-14">
                    <div>
                        <textarea name="report" className="textarea textarea-bordered resize-none" placeholder="Report"></textarea>
                    </div>
                    <div>
                        <AwesomeButton type="primary">Report</AwesomeButton>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ReportButton;