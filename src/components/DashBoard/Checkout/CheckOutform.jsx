import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/useAxiosSecure.jsx";
import useAuth from "../../Hooks/UseAuth.jsx";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const CheckOutform = () => {
    const [error, setError] = useState(null);
    const {user} = useAuth();
    const stripe = useStripe();
    const [clientsecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    const elements = useElements();
    const axiosSecure = UseAxiosSecure();
    const totalprice = 40;
    const totalpriceString = totalprice.toString();


    useEffect(() => {
        if(totalprice > 0) {
            axiosSecure.post('/create-payment-intent', {price: totalpriceString})
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalprice])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)

        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log(error)
            setError(error.message);
        } else {
            console.log(paymentMethod);
            setError('');
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientsecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if(confirmError){
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                setTransactionId(paymentIntent.id);

                const payment = {
                    name: user?.name,
                    email: user?.email,
                    price: totalpriceString,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    badge: 'Gold',
                }

                const res = await axiosSecure.post('/payments', payment)
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate ('/')
                }
            }
        }

    };





    return (
        <form onSubmit={handleSubmit} className="grid gap-10">
            <div>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424970",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
            </div>
            <div className="w-full grid">
                <button className="btn btn-primary" type="submit" disabled={!stripe || !clientsecret}>
                    Buy Now
                </button>

                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
            </div>
        </form>
    );
};

export default CheckOutform;