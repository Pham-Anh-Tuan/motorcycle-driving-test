import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { alertError } from "../Shared/AlertError";
import { alertSuccess } from "../Shared/AlertSuccess";
import { authApi } from "../../api/api";
import type { RegisterData } from "./AuthTypes";


interface RegisterProps {
    setRegisterPopup: (isOpen: boolean) => void;
    setLoginPopup: (isOpen: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setRegisterPopup, setLoginPopup }) => {
    const [form, setForm] = useState<RegisterData>({
        email: '',
        fullName: '',
        password: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPass, setConfirmPass] = useState<string>("");

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Kiểm tra mật khẩu khớp
        if (form.password !== confirmPass) {
            alertError("Mật khẩu và nhập lại mật khẩu không khớp.");
            return;
        }

        try {
            await authApi.register(form);
            setRegisterPopup(false);
            alertSuccess("Đăng ký thành công!");
            // Lưu token nếu cần
            // localStorage.setItem('token', response.data.token);
        } catch (error: any) {
            // Nếu API trả lỗi email đã tồn tại
            if (error?.response?.data === "Email already exists") {
                alertError("Email đã tồn tại. Vui lòng chọn email khác.");
            } else {
                alertError("Đăng ký thất bại. Vui lòng thử lại.");
            }
            console.error("Đăng ký thất bại:", error);
        }
    };
    return (
        <div>
            <section className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-sm shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-3">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h1 className="text-md font-semibold leading-tight tracking-tight text-gray-900 text-center">
                                        ĐĂNG KÝ
                                    </h1>
                                    <IoCloseOutline
                                        className="text-xl cursor-pointer hover:text-red-500"
                                        onClick={() => setRegisterPopup(false)}
                                    />
                                </div>

                                <hr className="border-gray-300 my-3" />
                            </div>

                            <form className="space-y-3" onSubmit={handleRegister}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === " ") e.preventDefault();
                                        }}
                                        type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:outline-none focus:border-gray-300 block w-full p-2.5" placeholder="" required />
                                </div>
                                <div>
                                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                                    <input onChange={handleChange}
                                        type="name" name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:outline-none focus:border-gray-300 block w-full p-2.5" placeholder="" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                                    <div className="relative block w-full">
                                        <input
                                            onChange={handleChange}
                                            onKeyDown={(e) => {
                                                if (e.key === " ") e.preventDefault();
                                            }}
                                            type={showPassword ? "text" : "password"} name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:outline-none focus:border-gray-300 block w-full p-2.5" required />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Nhập lại mật khẩu</label>
                                    <div className="relative block w-full">
                                        <input
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === " ") e.preventDefault();
                                            }}
                                            type={showConfirmPassword ? "text" : "password"} name="confirm-password" id="confirm-password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:outline-none focus:border-gray-300 block w-full p-2.5" required />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-gray-800 hover:bg-blue-500 font-medium rounded-sm text-sm px-5 py-2.5 text-center">
                                    Đăng ký
                                </button>

                                <p className="text-sm font-light text-gray-500">
                                    Bạn đã có tài khoản? <a onClick={() => { setRegisterPopup(false); setLoginPopup(true) }} className="font-medium text-primary-600 hover:underline cursor-pointer">Đăng nhập</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register