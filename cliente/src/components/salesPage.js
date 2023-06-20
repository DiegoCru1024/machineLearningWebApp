import HeaderComponent from "./headerComponent";
import styles from './css/saleStyles.module.css'

export default function SalesPage() {
    return (
        <div>
            <HeaderComponent/>
            <div className={styles.salesContainer}>
                <h1>Inmuebles en venta</h1>
                <div className={styles.itemGrid}>
                    <div className={styles.item}>
                        <img src='https://picsum.photos/300/200' alt='img'/>
                        <div>
                            <h2>Departamento en SJL</h2>
                            <p>$ 150000</p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src='https://picsum.photos/300/200' alt='img'/>
                        <div>
                            <h2>Departamento en SJL</h2>
                            <p>$ 150000</p>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src='https://picsum.photos/300/200' alt='img'/>
                        <div>
                            <h2>Departamento en SJL</h2>
                            <p>$ 150000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}