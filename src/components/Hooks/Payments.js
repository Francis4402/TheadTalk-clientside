import UseAxiosSecure from "./useAxiosSecure.jsx";


const axiosSecure = UseAxiosSecure();
export const createPaymentIntent = async price => {
    const {data} = await axiosSecure.post('/create-payment-intent', price)
    return data
}

export const saveBookinginfo = async paymentInfo => {
    const {data} = await axiosSecure.post('/payments', paymentInfo)
    return data
}

export const updateBadge = async (id, badge) => {
    const {data} = await axiosSecure.patch(`/users/badge/${id}`, {badge})
    return data
}