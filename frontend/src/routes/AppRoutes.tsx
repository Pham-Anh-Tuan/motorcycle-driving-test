import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MenuBox from "../components/MenuBox/MenuBox";
import Exam from "../components/Exam/Exam";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route index element={<>
                        <MenuBox />
                    </>} />
                    <Route path="de-ngau-nhien" element={<Exam />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes