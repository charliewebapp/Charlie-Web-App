import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putImage, selectClientImage } from "../../../redux/actions";
import Swal from "sweetalert2";

const FormUpdateImage = () => {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);  // Solo mantén el archivo de la imagen en el estado

    const clubName = useSelector((state) => state.selectClientAdmin);
    const clubImage = useSelector((state) => state.selectClientImage);

    useEffect(() => {
        dispatch(selectClientImage(clubImage));
    }, []);


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

    const handlerSubmit = (e) => {
        e.preventDefault();
        sendFormData();
    }

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