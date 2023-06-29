import HeaderComponent from "./headerComponent";
import styles from './css/publishStyles.module.css';
import Resizer from 'react-image-file-resizer';

import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import uploadIMG from './img/uploadIMG.png';
import axios from "axios";

export default function PublishPage() {
    const navigation = useNavigate();
    const receivedData = JSON.parse(localStorage.getItem('itemData'));
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null)
    const [data, setData] = useState({
        titulo: 'Titulo',
        imagen: null,
        antiguedad: receivedData.antiguedad,
        banos: receivedData.banos,
        distrito: receivedData.distrito,
        garajes: receivedData.garajes,
        habitaciones: receivedData.habitaciones,
        piso: receivedData.piso,
        precio: receivedData.precio,
        superficie: receivedData.superficie,
        vista_exterior: receivedData.vista_exterior
    });

        const publicarItem = async (e) => {
            e.preventDefault();
            try {
                data.precio = parseFloat(data.precio)
                const url = 'http://localhost:8080/api/publishItem'
                const response = await axios.post(url, data)
                navigation('/sales')
                console.log(response)
            } catch (error) {
                setError(error.response.data.message)
                console.log(error)
            }
        };

    const volver = () => {
        localStorage.removeItem('itemData');
        navigation('/predict');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            Resizer.imageFileResizer(
                file,
                512, // Nuevo ancho deseado de la imagen
                512, // Nueva altura deseada de la imagen
                'JPEG', // Formato de salida de la imagen ('JPEG', 'PNG', 'WEBP')
                80, // Calidad de la imagen de salida (0-100)
                0, // Rotación de la imagen en grados (0, 90, 180, 270)
                (uri) => {
                    setSelectedImage(uri);
                    setData((prevState) => ({
                        ...prevState,
                        imagen: uri,
                    }));
                },
                'base64', // Tipo de salida de datos ('base64', 'blob', 'file')
            );
        }
    };


    const handleImageClick = () => {
        document.getElementById("imageInput").click();
    };

    const detectarCambio = (event) => {
        const {name, value} = event.target;

        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div>
            <HeaderComponent/>
            <div className={styles.mainContainer}>
                <form className={styles.formContainer} onSubmit={publicarItem}>
                    <h2>Revise los datos antes de continuar:</h2>
                    <div className={styles.inputContainer}>
                        <div>
                            <label htmlFor='distrito'>Distrito seleccionado:</label>
                            <select id='distrito' disabled>
                                <option>{receivedData.distrito}</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor='vista_exterior'>Vista al exterior:</label>
                            <select id='vista_exterior' disabled>
                                <option>{receivedData.vista_exterior}</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor='superficie'>Tamaño (m2):</label>
                            <input type='number' id='superficie' value={receivedData.superficie} disabled/>
                        </div>

                        <div>
                            <label htmlFor='habitaciones'>Número de habitaciones:</label>
                            <input type='number' id='habitaciones' value={receivedData.habitaciones} disabled/>
                        </div>

                        <div>
                            <label htmlFor='banos'>Número de baños:</label>
                            <input type='number' id='banos' value={receivedData.banos} disabled/>
                        </div>

                        <div>
                            <label htmlFor='garajes'>Capacidad del garaje:</label>
                            <input type='number' id='garajes' value={receivedData.garajes} disabled/>
                        </div>

                        <div>
                            <label htmlFor='piso'>Piso ubicado:</label>
                            <input type='number' id='piso' value={receivedData.piso} disabled/>
                        </div>

                        <div>
                            <label htmlFor='antiguedad'>Antigüedad del inmueble:</label>
                            <input type='number' id='antiguedad' value={receivedData.antiguedad} disabled/>
                        </div>
                    </div>

                    <div>
                        <button className={styles.backButton} onClick={volver}>Volver</button>
                        <button type='submit' className={styles.submitButton}>Publicar</button>
                    </div>

                </form>
                <div className={styles.predictionContainer}>
                    <h1>Datos de publicación:</h1>
                    <div className={styles.itemInfoContainer}>
                        <div className={styles.imageContainer}>
                            <p>Imagen de publicación:</p>
                            <img
                                src={selectedImage || uploadIMG}
                                alt="Preview"
                                onClick={handleImageClick}
                            />
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{display: "none"}}
                            />
                        </div>
                        <div className={styles.infoContainer}>
                            <div>
                                <p>Titulo de publicación:</p>
                                <input type='text' name='titulo' value={data.titulo} onChange={detectarCambio}/>
                            </div>
                            <div>
                                <p>Precio de venta:</p>
                                <input type='text' name='precio' value={data.precio} onChange={detectarCambio}/>
                            </div>
                        </div>
                    </div>

                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>
            </div>
        </div>
    );
}
