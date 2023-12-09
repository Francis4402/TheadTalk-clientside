import {Navigate} from "react-router-dom";
import PropTypes from 'prop-types'
import UseAuth from '../Hooks/UseAuth';


const PrivateRoute2 = ({children}) => {

    const {user, loading} = UseAuth();

    if(loading){
        return <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg min-h-screen"></span>
        </div>
    }

    if (!user) {
        return <>{children}</>
    }


    return <Navigate to="/"/>
};

PrivateRoute2.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute2;