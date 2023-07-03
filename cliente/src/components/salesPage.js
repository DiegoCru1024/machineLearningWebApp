import HeaderComponent from "./headerComponent";
import styles from './css/saleStyles.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function SalesPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        buscarItems().then(() => {
            console.log("Datos recibidos...")
        });
    }, []);

    const buscarItems = async () => {
        try {
            const url = 'https://realestate-backend-lq5v.onrender.com/api/getItems';
            const response = await axios.get(url);
            setItems(response.data); // No es necesario JSON.parse(response)
        } catch (error) {
            console.log(error);
        }
    };

    const renderItems = items.map((item) => (
        <div key={item.uuid} className={styles.item}>
            <img alt='img' src={item.imagen}/>
            <div>
                <h2>{item.titulo}</h2>
                <p>{item.descripcion}</p>
                <span className={styles.itemActionLine}>
                    <h3>Precio de Venta: ${item.precio}</h3>
                    <Link to={`/moreInfo?uuid=${item.uuid}`}>Ver Detalles</Link>
                </span>
            </div>
        </div>
    ));

    return (
        <div>
            <HeaderComponent/>
            <div className={styles.salesContainer}>
                <h1>Inmuebles en venta</h1>
                <div className={styles.itemGrid}>
                    {renderItems}
                </div>
            </div>
        </div>
    )
}
