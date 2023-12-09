
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckOutform from "../DashBoard/Checkout/CheckOutform.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Membership = () => {
    return (
        <div className="justify-center flex">
            <div className="container justify-center flex items-center md:px-0 px-5">
                <div className="card w-96 bg-base-100 shadow-xl my-40">
                    <div className="card-body">
                        <h2 className="card-title">Gold Membership</h2>
                        <p>Unlimited Posts</p>
                        <p className="text-xl">Price: 40$</p>
                        <div className="my-5">
                            <Elements stripe={stripePromise}>
                                <CheckOutform/>
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;