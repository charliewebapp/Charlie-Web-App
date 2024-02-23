import React from 'react'
import DetailQR from '../DetailQR/DetailQR'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getOrderQRCode } from "../../../redux/actions";
import { useDispatch } from 'react-redux'

function OrderDetail() {

    const dispatch = useDispatch();

    // const handlegetOrderQRCode = () => {
    //     dispatch(getOrderQRCode());
    // }

    const detail = useSelector((state) => state.detailQrCode);
    const cart = useSelector(state => state.orderqrdata)


    return (
        <div>
            <h1>OrderDetail</h1>

            {detail || cart ? (
                <>
                    <DetailQR />
                    <Link to="/profile">
                        <button>Back</button>
                    </Link>
                </>
            ) : (
                <h2>No hay ordenes pendientes</h2>
            )}
            {/* <button onClick={handlegetOrderQRCode}>getOrderQRCode</button> */}
        </div>
    )
}

export default OrderDetail