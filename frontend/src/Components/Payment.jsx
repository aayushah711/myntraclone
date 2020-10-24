import React from 'react';
import Axios from 'axios';
import { openSnackbar } from '../Redux/app/actions';
import { useDispatch } from 'react-redux';

const Payment = (props) => {
    const dispatch = useDispatch();
    const paymentHandler = async (e) => {
        e.preventDefault();

        const API_URL = 'http://localhost:5000/api/payment/';
        const orderUrl = `${API_URL}order`;
        const response = await Axios.get(orderUrl);
        const { data } = response;
        const options = {
            name: 'Masai RazorPay',
            description: 'Integration of Razorpay',
            order_id: data.id,
            handler: async (response) => {
                try {
                    const paymentId = response.razorpay_payment_id;
                    const url = `${API_URL}capture/${paymentId}`;
                    const captureResponse = await Axios.post(url, {});
                    const successObj = JSON.parse(captureResponse.data);
                    const captured = successObj.captured;
                    if (captured) {
                        dispatch(
                            openSnackbar({
                                message: 'Payment successful!',
                                severity: 'success'
                            })
                        );
                    }
                } catch (err) {
                    dispatch(
                        openSnackbar({
                            message: err,
                            severity: 'error'
                        })
                    );
                }
            },
            theme: {
                color: '#c6203d'
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return <button onClick={paymentHandler}>Pay Now</button>;
};

export default Payment;
