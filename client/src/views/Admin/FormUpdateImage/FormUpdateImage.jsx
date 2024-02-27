import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putImage, selectClientImage } from "../../../redux/actions";
import Swal from "sweetalert2";

const FormUpdateImage = () => {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);

    const clubName = JSON.parse((localStorage.getItem("clientName")));
    const imageBoliche = localStorage.getItem("bolicheimagen");



    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const sendFormData = async () => {
        try {
            const formData = new FormData();
            formData.append("image", image);

            dispatch(putImage(clubName, formData));
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Error al actualizar la imagen",
            });
        }
    }

    console.log(imageBoliche, "imageBoliche")

    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            await sendFormData();
            localStorage.setItem("bolicheimagen", JSON.stringify(imageBoliche));
            Swal.fire({
                icon: "warning",
                title: "Advertencia!",
                text: "Debe loguearse nuevamente para ver los cambios",
            });
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <form onSubmit={handlerSubmit} encType="multipart/form-data">
            <div>
                <input type="file" onChange={handleImageChange} />
                <button type="submit">Cambiar imagen</button>
            </div>
        </form>
    )
}

export default FormUpdateImage;