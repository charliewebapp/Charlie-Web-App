import React, { useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptOrder, rejectOrder, getBoliches } from '../../redux/actions'
import style from './colaboradorreader.module.css';
import Swal from "sweetalert2"


function ColaboradorReader() {


    const dispatch = useDispatch()


    const [refresh, setRefresh] = useState(false)

    const [scanResult, setScanResult] = useState(null)

    const handleRefresh = () => {
        setButtons(true);
        setRefresh(prevRefresh => !prevRefresh);
    }

    useEffect(() => {

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(error) {
            console.log(error);
        }

        return () => {
            scanner.clear()
            setScanResult(null);
        }

    }, [refresh]);

    const scanResultObj = JSON.parse(scanResult);

    console.log(scanResultObj, "este es el scanResultObj");




    const [buttons, setButtons] = useState(true);


    const processOrder = (e) => {

        let clientName = scanResultObj[0].club;
        let purchaseId = scanResultObj[0].cart[0].id

        let accepted = {
            status: "approved"
        };
        let rejected = {
            status: "rejected"
        };

        if (e.target.value === "aceptar") {
            try {
                Swal.fire({
                    title: "Atencion!",
                    text: "estas seguro que deseas aceptar la orden?",
                    inputAttributes: {
                        autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonText: "confirmar",
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        setButtons(false);
                        dispatch(acceptOrder(accepted, clientName, purchaseId))
                        return Promise.resolve();
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Éxito",
                            text: "La orden ha sido aceptada",
                            icon: "success",
                            timer: "4000",
                        })
                    }
                });
            }
            catch (error) {
                window.alert("No se ha aceptado la orden. " + error.message)
            }


        }
        if (e.target.value === "rechazar") {
            try {
                Swal.fire({
                    title: "Atencion!",
                    text: "estas seguro que deseas rechazar la orden?",
                    inputAttributes: {
                        autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonText: "confirmar",
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        setButtons(false);
                        dispatch(rejectOrder(rejected, clientName, purchaseId));
                        return Promise.resolve();
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Éxito",
                            text: "La orden ha sido rechazada",
                            icon: "success",
                            timer: "4000",
                        })
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }


    const scanResultObj0 = scanResultObj && scanResultObj[0];


    // if (scanResultObj) {
    //     const { status } = scanResultObj;

    //     console.log(status, "este es el status");
    // }




    return (
        <div className={style.container}>
            <h1 className={style.h1}>
                QR Code Reader
            </h1>

            {scanResultObj0 && scanResultObj0.status === "pending" && scanResultObj0.cart.map((product, index) => (
                <div key={index}>
                    {Object.keys(product).map(key => (
                        <p key={key}>{key}: {product[key]}</p>
                    ))}
                </div>
            ))}

            {scanResultObj0 && scanResultObj0.status === "pending" && buttons === true && (
                <>
                    <button className={style.button} value="aceptar" onClick={processOrder}>Aceptar</button>
                    <button className={style.button} value="rechazar" onClick={processOrder}>Rechazar</button>
                </>
            )}

            {scanResultObj0 && scanResultObj0.status !== "pending" && (
                <h2>Orden ya procesada</h2>
            )}

            {scanResultObj0 && (
                <button className={style.button} onClick={handleRefresh}>Refresh</button>)}

            <div id="reader">
                {/* <button className={style.button} onClick={handleDispatch}>Get Boliches</button> */}
            </div>
        </div>
    );
}

export default ColaboradorReader;