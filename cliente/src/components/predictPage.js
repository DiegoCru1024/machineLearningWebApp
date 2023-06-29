import HeaderComponent from "./headerComponent";
import axios from "axios";
import styles from './css/predict.module.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function PredictPage() {
    const navigation = useNavigate()
    const [price, setPrice] = useState('No Data')
    const [error, setError] = useState('')
    const [publishData, setPublishData] = useState({})
    const [data, setData] = useState({
        distrito: -1,
        superficie: -1,
        habitaciones: -1,
        banos: -1,
        garajes: -1,
        piso: -1,
        vista_exterior: -1,
        antiguedad: -1
    })

    const predecirPrecio = async (e) => {
        e.preventDefault()
        try {
            const url = 'http://localhost:8080/api/predictPrice'
            const response = await axios.post(url, data)
            setError(null)
            setPrice(response.data)
            setPublishData((prevState) => ({
                ...prevState,
                precio: response.data
            }))
        } catch (error) {
            setError(error.response.data.message)
            console.log(error)
        }
    }

    const detectarCambio = (event) => {
        const {name, value} = event.target;

        setData((prevState) => ({
            ...prevState,
            [name]: parseFloat(value),
        }));

        if (event.target.tagName === "SELECT") {
            setPublishData((prevState) => ({
                ...prevState,
                [name]: event.target.options[event.target.selectedIndex].text,
            }));
        } else {
            setPublishData((prevState) => ({
                ...prevState,
                [name]: parseFloat(value),
            }));
        }
    };


    const publishItem = () => {
        localStorage.setItem('itemData', JSON.stringify(publishData))
        navigation('/publish')
    }

    return (
        <div>
            <HeaderComponent/>

            <div className={styles.mainContainer}>
                <form onSubmit={predecirPrecio} className={styles.formContainer}>
                    <h2>Ingrese los datos para la cotización del inmueble:</h2>
                    <div className={styles.inputContainer}>
                        <div>
                            <label htmlFor='distrito'>Seleccione el distrito:</label>
                            <select id='distrito' name='distrito' onChange={detectarCambio}>
                                <option value="-1">-- Seleccione una opción --</option>
                                <option value='12'>Ancón</option>
                                <option value='27'>Ate Vitarte</option>
                                <option value='41'>Barranco</option>
                                <option value='32'>Breña</option>
                                <option value='31'>Callao</option>
                                <option value='20'>Carabayllo</option>
                                <option value='9'>Chaclacayo</option>
                                <option value='33'>Chorrillos</option>
                                <option value='11'>Cieneguilla</option>
                                <option value='22'>Comas</option>
                                <option value='15'>Cercado de Lima</option>
                                <option value='26'>El Agustino</option>
                                <option value='21'>Independencia</option>
                                <option value='36'>Jesús María</option>
                                <option value='42'>La Molina</option>
                                <option value='29'>La Victoria</option>
                                <option value='34'>Lince</option>
                                <option value='23'>Los Olivos</option>
                                <option value='3'>Lurigancho-Chosica</option>
                                <option value='1'>Lurin</option>
                                <option value='38'>Magdalena</option>
                                <option value='43'>Miraflores</option>
                                <option value='8'>Pachacamac</option>
                                <option value='35'>Pueblo Libre</option>
                                <option value='18'>Puente Piedra</option>
                                <option value='5'>Pucusana</option>
                                <option value='7'>Punta Hermosa</option>
                                <option value='6'>Punta Negra</option>
                                <option value='28'>Rímac</option>
                                <option value='4'>San Bartolo</option>
                                <option value='40'>San Borja</option>
                                <option value='44'>San Isidro</option>
                                <option value='13'>San Juan de Lurigancho</option>
                                <option value='30'>San Juan de Miraflores</option>
                                <option value='2'>San Luis</option>
                                <option value='19'>San Martín de Porres</option>
                                <option value='37'>San Miguel</option>
                                <option value='25'>Santa Anita</option>
                                <option value='10'>Santa María del Mar</option>
                                <option value='17'>Santa Rosa</option>
                                <option value='39'>Surco</option>
                                <option value='16'>Surquillo</option>
                                <option value='14'>Villa El Salvador</option>
                                <option value='24'>Villa María del Triunfo</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor='vista_exterior'>El inmueble tiene vista al exterior:</label>
                            <select id='vista_exterior' name='vista_exterior' onChange={detectarCambio}>
                                <option value="-1">-- Seleccione una opción --</option>
                                <option value="1">Si</option>
                                <option value="0">No</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor='superficie'>Ingrese el tamaño (m2):</label>
                            <input type='number' id='superficie' name='superficie' onChange={detectarCambio}/>
                        </div>

                        <div>
                            <label htmlFor='habitaciones'>Ingrese el número de habitaciones:</label>
                            <input type='number' id='habitaciones' name='habitaciones' onChange={detectarCambio}/>
                        </div>

                        <div>
                            <label htmlFor='banos'>Ingrese el número de baños:</label>
                            <input type='number' id='banos' name='banos' onChange={detectarCambio}/>
                        </div>

                        <div>
                            <label htmlFor='garajes'>Ingrese la capacidad del garaje:</label>
                            <input type='number' id='garajes' name='garajes' onChange={detectarCambio}/>
                        </div>

                        <div>
                            <label htmlFor='piso'>Ingrese el piso ubicado:</label>
                            <input type='number' id='piso' name='piso' onChange={detectarCambio}/>
                        </div>

                        <div>
                            <label htmlFor='antiguedad'>Ingrese la antigüedad del inmueble:</label>
                            <input type='number' id='antiguedad' name='antiguedad' onChange={detectarCambio}/>
                        </div>
                    </div>

                    <button type='submit' className={styles.submitButton}>Cotizar</button>

                    {error && <div className={styles.errorMessage}>{error}</div>}
                </form>
                <div className={styles.predictionContainer}>
                    <h1>Precio predecido:</h1>
                    <h2>USD {price}</h2>
                    {price !== 'No Data' && (
                        <button onClick={publishItem}>Publicar</button>
                    )}
                </div>
            </div>
        </div>
    )
}