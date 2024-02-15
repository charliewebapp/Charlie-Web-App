import React, { useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { acceptOrder, rejectOrder } from '../../redux/actions'
import style from './colaboradorreader.module.css';
import Swal from "sweetalert2"

function ColaboradorReader() {

    const dispatch = useDispatch()

    const [scanResult, setScanResult] = useState(null)

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

    }, []);

    const scanResultObj = JSON.parse(scanResult);

    console.log(scanResultObj, "este es el scanResultObj");


    const processOrder = (e) => {

        if (e.target.value === "aceptar") {
            try {
                // dispatch(acceptOrder())
                Swal.fire({
                    title: "Éxito",
                    text: "La orden ha sido aceptada",
                    icon: "success",
                    timer: "4000",
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
                        // dispatch(rejectOrder());
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

    if (scanResultObj) {
        const { status } = scanResultObj;

        console.log(status, "este es el status");
    }


    return (
        <div className={style.container}>
            <h1 className={style.h1}>
                QR Code Reader
            </h1>

            {scanResultObj && (
                <div className={style.order}>
                    {scanResultObj.products.map((product, index) => (
                        <div key={index}>
                            <p>Name: {product.name}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                    ))}
                    <p className={style.status}>Status: {scanResultObj.status}</p>

                    <button className={style.button} value="aceptar" onClick={processOrder}>Aceptar</button>

                    <button className={style.button} value="rechazar" onClick={processOrder}>Rechazar</button>

                </div>
            )}
            <div id="reader">
            </div>
        </div>
    );
}

export default ColaboradorReader