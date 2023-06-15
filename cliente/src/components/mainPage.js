import HeaderComponent from "./headerComponent";
import './css/mainStyles.css'

export default function MainPage() {
    return (
        <div>
            <HeaderComponent/>
            <section className="hero-container">
                <div className="hero-content">
                    <h1>Bienvenido a RealEstate.py</h1>
                    <p>Nos complace darte la bienvenida a nuestra plataforma de venta inmobiliaria.</p>
                </div>
            </section>
        </div>
    )
}