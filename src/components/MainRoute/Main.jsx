import {Outlet} from "react-router-dom";
import Navbar from "../HomeRoutes/Navbar.jsx";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Main;