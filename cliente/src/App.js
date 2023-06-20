import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./components/mainPage";
import SearchPage from "./components/dataPage";
import SalesPage from "./components/salesPage";
import PredictPage from "./components/predictPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/data" element={<SearchPage/>}/>
                <Route path="/sales" element={<SalesPage/>}/>
                <Route path="/predict" element={<PredictPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
