import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MenuBox from "../components/MenuBox/MenuBox";
import Exam from "../components/Exam/Exam";
import AdminDashboard from "../pages/AdminDashboard";
import RandomStructure from "../components/RandomStructure/RandomStructure";
import Sections from "../components/Sections/Sections";
import Review from "../components/Review/Review";
import Tests from "../components/ExamList/ExamList";
import QuestionManager from "../components/QuestionManager/QuestionManager";
import SignManager from "../components/SignManager/SignManager";
import Sign from "../components/TrafficSign/Sign";
import NewsManager from "../components/NewsManager/NewsManager";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<>
                        <MenuBox />
                    </>} />
                    <Route path="cau-truc-thi-ngau-nhien" element={<RandomStructure />} />
                    <Route path="de-ngau-nhien" element={<Exam />} />
                    <Route path="de/:numberExam" element={
                        <>
                            <Exam />
                        </>}
                    />

                    <Route path="on-cac-chuong" element={<Sections />} />

                    <Route path="khai-niem-va-quy-tac" element={<Review />} />
                    <Route path="van-hoa-va-dao-duc-lai-xe" element={<Review />} />
                    <Route path="ky-thuat-lai-xe" element={<Review />} />
                    <Route path="bien-bao-duong-bo" element={<Review />} />
                    <Route path="sa-hinh" element={<Review />} />
                    <Route path="20-cau-diem-liet" element={<Review />} />

                    <Route path="cac-de-thi" element={<Tests />} />

                    <Route path="cac-bien-bao" element={<Sign />} />
                </Route>

                <Route path="/" element={<AdminDashboard />}>
                    <Route index element={<> </>} />
                    <Route path="/cau-hoi" element={<QuestionManager />} />
                    <Route path="/bien-bao" element={<SignManager />} />
                    <Route path="/tin-tuc" element={<NewsManager />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;