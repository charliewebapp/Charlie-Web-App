import React, { useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

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




    const processOrder = () => {
        dispatch(closeOrder())
    }

    if (scanResultObj !== null) {
        const { status } = scanResultObj;

        console.log(status, "este es el status");
    }


    return (
        <div>
            <h1>
                QR Code Reader
            </h1>
            {scanResultObj && (
                <div>

                    {scanResultObj.products.map((product, index) => (
                        <div key={index}>
                            <p>Name: {product.name}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                    ))}

                    <p>Status: {scanResultObj.status}</p>




                    <button onSubmit={processOrder}>Aceptar</button>
                    <button onSubmit={processOrder}>Rechazar</button>
                </div>
            )}
            <div id="reader">
            </div>
        </div>
    );
}

export default ColaboradorReader