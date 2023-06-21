import HeaderComponent from "./headerComponent";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from './css/dataStyles.module.css'

export default function DataPage() {
    const [pageNumber, setPageNumber] = useState(1);
    const [queryString, setQueryString] = useState([{
        query: '',
        ascending: false
    }]);
    const [inputPage, setInputPage] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'https://realestate-backend-lq5v.onrender.com/api/getDataFrame/?pageNumber=1&queryString=undefined&ascending=undefined'

        axios.get(url)
            .then(response => {
                console.log(JSON.parse(response.data));
                setData(JSON.parse(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    }, [pageNumber, queryString]);


    const handleNextPage = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(prevPageNumber => prevPageNumber - 1);
        }
    };

    const handleGoToPage = () => {
        const page = parseInt(inputPage);
        if (page && page !== pageNumber) {
            setPageNumber(page);
            setInputPage("");
        }
    };

    const filterData = (event) => {
        let newQueryString = {...queryString};

        if (newQueryString.query === event.target.textContent) {
            newQueryString.ascending = !newQueryString.ascending;
        } else {
            newQueryString.query = event.target.textContent;
            newQueryString.ascending = false;
        }

        setQueryString(newQueryString);
        console.log(newQueryString)
    };


    return (
        <div>
            <HeaderComponent/>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th onClick={filterData}>Precio en dólares corrientes</th>
                        <th onClick={filterData}>Distrito</th>
                        <th onClick={filterData}>Superficie</th>
                        <th onClick={filterData}>Número de habitaciones</th>
                        <th onClick={filterData}>Número de baños</th>
                        <th onClick={filterData}>Número de garajes</th>
                        <th onClick={filterData}>Piso de ubicación</th>
                        <th onClick={filterData}>Vista al exterior</th>
                        <th onClick={filterData}>Años de antigüedad</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                            <td>{item[5]}</td>
                            <td>{item[6]}</td>
                            <td>{item[7]}</td>
                            <td>{item[8]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className={styles.pageNavigator}>
                    <div className={styles.changePage}>
                        <button onClick={handlePreviousPage} className={styles.button}>Página anterior</button>
                        <p>{pageNumber}</p>
                        <button onClick={handleNextPage} className={styles.button}>Siguiente página</button>
                    </div>
                    <div className={styles.goToPage}>
                        <input
                            type="number"
                            value={inputPage}
                            onChange={(e) => setInputPage(e.target.value)}
                        />
                        <button onClick={handleGoToPage} className={styles.button}>Ir a página</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
