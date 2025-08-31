import { Outlet } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useState } from "react";
import Login from "../components/Login/Login";
import ForgetPassword from "../components/Login/ForgetPassword";
import Register from "../components/Login/Register";
import { ToastContainer } from "react-toastify";
import Profile from "../components/Profile/Profile";

const Home = () => {
    const [loginPopup, setLoginPopup] = useState(false);
    const [forgetPwPopup, setForgetPwPopup] = useState(false);
    const [registerPopup, setRegisterPopup] = useState(false);
    const [profilePopup, setProfilePopup] = useState(false);
    return (
        <div className="flex flex-col flex-1">
            <Navbar setLoginPopup={setLoginPopup} setProfilePopup={setProfilePopup}/>
            <Banner />
            <Outlet /> {/* Dùng để render nội dung của từng Route */}

            {loginPopup && <Login setLoginPopup={setLoginPopup} setForgetPwPopup={setForgetPwPopup} setRegisterPopup={setRegisterPopup} />}
            {forgetPwPopup && <ForgetPassword setForgetPwPopup={setForgetPwPopup} />}
            {registerPopup && <Register setRegisterPopup={setRegisterPopup} setLoginPopup={setLoginPopup} />}
            {profilePopup && <Profile setProfilePopup={setProfilePopup} />}
            <ToastContainer />
            <div className="flex-1">{/* Cho phần nội dung đẩy footer xuống */}</div>
            <Footer />
        </div>
    )
}

export default Home;