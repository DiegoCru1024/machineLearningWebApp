import axios from "axios";
import HeaderComponent from "./headerComponent";
import './css/mainStyles.css'

export default function MainPage() {

    const llamarAPI = async (e) => {
        e.preventDefault();
        try {
            console.log("Llamando API...")
            const url = 'https://realestate-backend-lq5v.onrender.com/api'
            const testData = {'id': 500, 'name': "diego"}
            const response = await axios.post(url, testData)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <HeaderComponent/>
            <section className="hero-container">
                <div className="hero-content">
                    <h1>Bienvenido a RealEstate.py</h1>
                <p>Nos complace darte la bienvenida a nuestra plataforma de venta inmobiliaria.</p>
                </div>
            </section>
            <button onClick={llamarAPI}>Test</button>
        </div>
    )
}