import './css/headerStyles.css'
import {Link} from "react-router-dom";

export default function HeaderComponent() {
    return (
        <header>
            <div className="container">
                <h1>RealEstate.py</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/search">Buscar</Link></li>
                        <li><Link to="/sales">Catálogo</Link></li>
                        <li><Link to="/predict" className='action-button'>Cotizar Inmueble</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}