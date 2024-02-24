import React, { useEffect } from 'react';
import DetailQR from '../DetailQR/DetailQR';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderQRCode, getDetailQrCode } from '../../../redux/actions';

function OrderDetail() {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getOrderQRCode("73047715220"))
    // }, [dispatch]);

    const detail = useSelector((state) => state.detailQrCode);
    const cartState = useSelector(state => state.orderqrdata);
    const cart = [cartState];

    console.log(cart, "cart en OD")


    useEffect(() => {
        let paymentId;
        if (cart && cart.length > 0) {
            paymentId = cart[0].paymentId;
        }
        const intervalId = setInterval(() => {
            if (paymentId) {
                dispatch(getOrderQRCode(paymentId));
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [dispatch, detail, cart]);




    return (
        <div>
            <h1>OrderDetail</h1>

            {detail || cart ? (
                <>
                    <DetailQR />
                    <Link to="/:clubName/home">
                        <button>Home</button>
                    </Link>
                </>
            ) : (
                <h2>No hay ordenes pendientes</h2>
            )}
            {/*<button onClick={handlegetOrderQRCode}>getOrderQRCode</button> */}
        </div>
    )
}

export default OrderDetail