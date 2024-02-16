import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postOrderInDB } from '../../../redux/actions';

const OrderConfirmation = () => {


    const dispatch = useDispatch();

    // products: [
    //     {
    //         id: "c91c7694-76ab-4c56-b57d-d4607651a36b",
    //         name: "fernet",
    //         brand: "branca",
    //         image: "image",
    //         description: "30%fernet - 70%cola",
    //         price: 3500,
    //         stock: "available",
    //         category: "Tragos",
    //         ClientId: "6e9ecd54-5f20-4782-bd3d-1f90ce3d929b"
    //     },
    //     {
    //         id: "a123b456-78c9-0def-1234-56789abcdef0",
    //         name: "birra",
    //         brand: "branca",
    //         image: "image",
    //         description: "30%fernet - 70%cola",
    //         price: 4000,
    //         stock: "available",
    //         category: "Tragos",
    //         ClientId: "6e9ecd54-5f20-4782-bd3d-1f90ce3d929b"
    //     },
    //     {
    //         id: "12345abc-de67-89f0-1234-56789abcdef0",
    //         name: "guaro",
    //         brand: "branca",
    //         image: "image",
    //         description: "30%fernet - 70%cola",
    //         price: 10000,
    //         stock: "available",
    //         category: "Tragos",
    //         ClientId: "6e9ecd54-5f20-4782-bd3d-1f90ce3d929b"
    //     }
    // ],
    const orders = [

        {
            id: "c91c7694-76ab-4c56-b57d-d4607651a36b",
            productname: "fernet",
            quantity: 2,
            price: 3500,
            idMP: "484698956"
        },
        {
            id: "e83f9f32-7bf4-4f8d-97e7-255779561b58",
            productname: "birra",
            quantity: 2,
            price: 3500,
            idMP: "484698956"
        },
        {
            id: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
            productname: "guaro",
            quantity: 2,
            price: 3500,
            idMP: "484698956"
        },
    ]

    // {
    //     totalPrice: 10500,
    //     ClientId: "0db15a91-5308-4fe3-8a28-4083507a75af",
    //     UserId: "facebook|10231414652610252",
    // }




    // useEffect(() => {
    //     dispatch(postOrderInDB(orders, idMP, client));
    // }, [dispatch, orders]);

    const sendToDB = () => {
        const idMP = "484698956"
        const clubID = "pepe"
        dispatch(postOrderInDB(orders, idMP, clubID));
    }



    return (
        <div>
            <h1>Confirmacion de tu orden</h1>
            <p>Tu orden ha sido procesada con exito</p>
            {/* <ul>
                {orders.map(product => (
                    <li key={product.id}>
                        {product.productname}
                    </li>
                ))}
            </ul> */}
            {/* <p>Total: {totalPrice.toFixed(2)}</p> */}
            <button onClick={sendToDB}>Enviar</button>
        </div>
    );
};

export default OrderConfirmation;