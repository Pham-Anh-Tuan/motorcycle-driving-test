import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuth2Redirect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get("token");
        const email = query.get("email");
        const imageName = query.get("imageName");
        const role = query.get("role");

        if (token && email && imageName && role) {
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
            localStorage.setItem("imageName", imageName);
            localStorage.setItem("role", role);

            if (String(role) === "1" || String(role) === "3") {
                window.location.href = "/quan-li";
            } else {
                window.location.href = "/";  // chuyển đến trang chính
            }
        } else {
            // Nếu thiếu dữ liệu thì quay về login
            navigate("/login");
        }
    }, [location, navigate]);

    return <div>Đang xử lý đăng nhập...</div>;
};

export default OAuth2Redirect;