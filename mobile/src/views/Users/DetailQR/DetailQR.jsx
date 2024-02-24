import React, { useEffect, useState } from 'react';
import '../DetailQR/detailqr.module.css';
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDetailQrCode } from "../../../redux/actions";
import style from './detailqr.module.css';

function DetailQR() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()
    const detail = useSelector((state) => state.detailQrCode);
    const cartState = useSelector(state => state.orderqrdata);
    const cart = [cartState];

    console.log(detail, "este es el detail")
    console.log(cart, "este es el cart")

    // useEffect(() => {
    //     dispatch(getDetailQrCode());
    // }, [dispatch]);

    useEffect(() => {
        if (cart.length !== 0 || detail) {
            setIsLoading(false);
        }
    }, [cart, detail]);

    let mappedData, cartString, mappedData2, cartString2;

    if (cart.length > 0) {
        mappedData = cart.map(item => ({
            cart: item.cart.map(product => ({
                name: product.name,
                quantity: product.quantity,
            })),
            status: item.status,
            club: item.client.name,
            id: item.id
        }));

        cartString = JSON.stringify(mappedData);

    } else if (detail) {
        mappedData2 = {
            status: detail.status,
            cart: detail.cart.map(product => ({
                name: product.name,
                quantity: product.quantity
            }))
        };


        cartString2 = JSON.stringify([mappedData2]);

    }

    console.log(mappedData2, "este es el mappedData2")
    console.log(cartString2, "este es el cartString2")

    return (


        // <div style={{ background: 'white', padding: '16px' }}>


        //     <QRCode value={cartString2} />

        // </div>


        <div className={style.container}>
            {isLoading ? (
                <div>Loading...</div>
            ) : cart.length > 0 ? (
                <>
                    <h1 className={style.h1}>Detalle de la orden</h1>
                    <h2 className={style.h2}>Acercate a la barra con tu codigo</h2>
                    <div style={{ background: 'white', padding: '16px' }}>
                        <QRCode value={cartString} />
                    </div>
                </>
            ) : detail ? (
                <>
                    <div style={{ background: 'white', padding: '16px' }}>
                        <QRCode value={cartString2} />
                    </div>

                    {detail.cart.map((product, i) => (
                        <div key={i}>
                            <p>Producto: {product.name}</p>
                            <p>Cantidad: {product.quantity}</p>
                        </div>
                    ))}
                </>
            ) : null}
        </div>
    )
}

export default DetailQR;