import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MenuBox from "../components/MenuBox/MenuBox";
import Exam from "../components/Exam/Exam";
import AdminDashboard from "../pages/AdminDashboard";
import RandomStructure from "../components/RandomStructure/RandomStructure";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route index element={<>
                        <MenuBox />
                    </>} />
                    <Route path="cau-truc-thi-ngau-nhien" element={<RandomStructure/>} />
                    <Route path="de-ngau-nhien" element={<Exam />} />
                </Route>

                <Route path="/quan-tri" element={<AdminDashboard />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;