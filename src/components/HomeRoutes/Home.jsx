
import HomePosts from "./HomePosts.jsx";
import {Helmet} from "react-helmet";
import ReportButton from "./ReportButton.jsx";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Thread Talk | Home</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <HomePosts/>


            <div className="w-full">
                <ReportButton/>
            </div>
        </div>
    );
};

export default Home;