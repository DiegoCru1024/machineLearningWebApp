import HeaderComponent from "./headerComponent";
import axios from "axios";

export default function PredictPage() {

    const predecirPrecio = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://realestate-backend-lq5v.onrender.com/api/predictPrice'
            const testData = {
                'Superficie': 200,
                'Número de habitaciones': 3,
                'Número de baños': 2,
                'Número de garajes': 1,
                'Piso de ubicación': 5,
                'Vista al exterior': 1,
                'Años de antigüedad': 10,
                'ate vitarte': 0,
                'barranco': 1,
                'bellavista': 0,
                'breña': 0,
                'carabayllo': 0,
                'cercado de lima': 0,
                'chorrillos': 0,
                'comas': 0,
                'jesús maría': 0,
                'la molina': 0,
                'la perla': 0,
                'la victoria': 0,
                'lince': 0,
                'los olivos': 0,
                'magdalena': 0,
                'miraflores': 0,
                'pueblo libre': 0,
                'san borja': 0,
                'san isidro': 0,
                'san miguel': 0,
                'surco': 0,
                'surquillo': 0
            };

            const response = await axios.post(url, testData)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <HeaderComponent/>
            <h1>Cotizar</h1>
            <button onClick={predecirPrecio}>Predecir</button>
        </div>
    )
}