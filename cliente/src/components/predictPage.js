import HeaderComponent from "./headerComponent";
import axios from "axios";

export default function PredictPage() {

    const predecirPrecio = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://realestate-backend-lq5v.onrender.com/api/predictPrice'
            const testData = {
                'Superficie ': [200],
                'Número de habitaciones': [3],
                'Número de baños': [2],
                'Número de garajes': [1],
                'Piso de ubicación': [5],
                'Vista al exterior': [1],
                'Años de antigüedad': [10],
                'ate vitarte': [False],
                'barranco': [True],
                'bellavista': [False],
                'breña': [False],
                'carabayllo': [False],
                'cercado de lima': [False],
                'chorrillos': [False],
                'comas': [False],
                'jesús maría': [False],
                'la molina': [False],
                'la perla': [False],
                'la victoria': [False],
                'lince': [False],
                'los olivos': [False],
                'magdalena': [False],
                'miraflores': [False],
                'pueblo libre': [False],
                'san borja': [False],
                'san isidro': [False],
                'san miguel': [False],
                'surco': [False],
                'surquillo': [False]
            }
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