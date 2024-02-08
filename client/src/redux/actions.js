import axios from "axios";

import { POST_PRODUCT, UPDATE_PRODUCT, GET_ORDER_QR } from "./actions-types";


// export const getProducts = () => {
//     return async (dispatch) => {
//         try {
//             const { data } = await axios.get("http://localhost:3001/testNati/product")
//             dispatch({
//                 type: GET_PRODUCTS,
//                 payload: data
//             })
//         } catch (error) {
//             window.alert(error.message)
//         }
//     }
// }




export const postProduct = (productData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post("http://localhost:3001/testNati/product", productData)
            if (data) {
                dispatch({
                    type: POST_PRODUCT,
                    payload: data
                })
            } else {
                throw new Error("No se ha creado el producto")
            }

        } catch (error) {
            window.alert("No se ha creado el producto" + error.message)
        }
    }
}



export const updateProduct = (productData) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`http://localhost:3001/testNati/b827702a-0085-46a3-b1e6-9dc6d9417bd9`, productData)
            console.log(data)
            if (data) {
                dispatch({
                    type: UPDATE_PRODUCT,
                    payload: data
                })
            } else {
                throw new Error("No se ha actualizado el producto")
            }

        } catch (error) {
            window.alert("No se ha actualizado el producto. " + error.message)
        }
    }

}






//////////////////////////////////////////



export const portOrder = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`http://localhost:3001//:client/collaborator/qr`)
            console.log(data)
            if (data) {
                dispatch({
                    type: "POST_ORDER",
                    payload: data
                })
            } else {
                throw new Error("No se ha creado la orden")
            }

        } catch (error) {
            window.alert("No se ha creado la orden. " + error.message)
        }
    }

}


export const getOrderQRCode = () => {
    return async (dispatch) => {
        try {
            // const { data } = await axios.get(`http://localhost:3001/:client/collaborator/qr/:uuid"`)

            const data = {
                id: '6rhu73f5-3f5h-3f5h-3f5h-3f5h3f5h3f5h',
                products: [
                    {
                        id: 1,
                        name: "Coca Cola",
                        price: 2.5,
                        quantity: 2
                    },
                    {
                        id: 2,
                        name: "Pepsi",
                        price: 2.5,
                        quantity: 2
                    }
                ],
                totalPrice: 25000,
                status: "en proceso"
            };

            console.log(data)
            if (data) {
                dispatch({
                    type: GET_ORDER_QR,
                    payload: data
                })
            } else {
                throw new Error("No se ha obtenido el QR")
            }

        } catch (error) {
            window.alert("No se ha obtenido el QR. " + error.message)
        }
    }

}



export const closeOrder = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`http://localhost:3001/:client/collaborator/qr/:uuid`)
            console.log(data)
            if (data) {
                dispatch({
                    type: "CLOSE_ORDER",
                    payload: data
                })
            } else {
                throw new Error("No se ha cerrado la orden")
            }

        } catch (error) {
            window.alert("No se ha cerrado la orden. " + error.message)
        }
    }

}