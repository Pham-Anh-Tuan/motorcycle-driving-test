import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MenuBox from "../components/MenuBox/MenuBox";
import Exam from "../components/Exam/Exam";
import AdminDashboard from "../pages/AdminDashboard";
import RandomStructure from "../components/RandomStructure/RandomStructure";
import Sections from "../components/Sections/Sections";
import Review from "../components/Review/Review";

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
                    <Route path="on-cac-chuong" element={<Sections />} />

                    <Route path="khai-niem-va-quy-tac" element={<Review />} />
                    <Route path="van-hoa-va-dao-duc-lai-xe" element={<Review />} />
                    <Route path="ky-thuat-lai-xe" element={<Review />} />
                    <Route path="bien-bao-duong-bo" element={<Review />} />
                    <Route path="sa-hinh" element={<Review />} />
                </Route>

                <Route path="/quan-tri" element={<AdminDashboard />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;