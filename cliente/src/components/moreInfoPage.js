import HeaderComponent from "./headerComponent";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import styles from './css/moreInfoStyles.module.css'

export default function MoreInfoPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const uuid = queryParams.get('uuid');
    const [itemInfo, setItemInfo] = useState({});

    useEffect(() => {
        const fetchItemInfo = async () => {
            try {
                const url = `https://realestate-backend-lq5v.onrender.com/api/getInfo?uuid=${uuid}`
                const response = await axios.get(url)
                setItemInfo(response.data);
            } catch (error) {
                console.error("Error al obtener la información del item:", error);
            }
        };

        fetchItemInfo().then(() => {
            console.log('Datos recibidos...')
        });
    }, [uuid]);

    return (
        <div>
            <HeaderComponent/>
            <div className={styles.moreInfoContainter}>
                <div className={styles.infoHeaderContainer}>
                    <img src={itemInfo.imagen} alt='imagen'/>
                    <div>
                        <h1>{itemInfo.titulo}</h1>
                        <p>{itemInfo.descripcion}</p>
                    </div>
                </div>
                <div className={styles.infoFeaturesContainer}>
                    <p><strong>Número de Habitaciones:</strong><br/> {itemInfo.habitaciones} habitaciones</p>
                    <p><strong>Número de Garajes:</strong><br/> {itemInfo.garajes} garajes</p>
                    <p><strong>Superficie total:</strong><br/> {itemInfo.superficie} m<sup>2</sup></p>
                    <p><strong>Distrito de ubicación:</strong><br/> {itemInfo.distrito}</p>
                    <p><strong>Número de Baños:</strong><br/> {itemInfo.banos} baños</p>
                    <p><strong>Vista al exterior:</strong><br/> {itemInfo.vista_exterior}</p>
                    <p><strong>Piso ubicado:</strong><br/> {itemInfo.piso}</p>
                    <p><strong>Antiguedad del inmueble:</strong><br/> {itemInfo.antiguedad} años</p>
                </div>
            </div>
        </div>
    )
}