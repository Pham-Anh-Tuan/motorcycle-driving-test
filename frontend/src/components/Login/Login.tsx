import { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { alertError } from "../Shared/AlertError";
import { authApi } from "../../api/api";

interface LoginData {
    email: string;
    password: string;
}

interface LoginProps {
    setLoginPopup: (isOpen: boolean) => void;
    setForgetPwPopup: (isOpen: boolean) => void;
    setRegisterPopup: (isOpen: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoginPopup, setForgetPwPopup, setRegisterPopup }) => {
    const [form, setForm] = useState<LoginData>({ email: '', password: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const [showPassword, setShowPassword] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);

    const handleEmailInvalid = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (input.validity.valueMissing) {
            input.setCustomValidity("Vui lòng điền vào trường này.");
        } else if (input.validity.typeMismatch && input.type === "email") {
            input.setCustomValidity("Vui lòng nhập đúng định dạng email.");
        } else {
            input.setCustomValidity(""); // reset nếu hợp lệ
        }
    };

    const handlePasswordInvalid = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (input.validity.valueMissing) {
            input.setCustomValidity("Vui lòng điền vào trường này.");
        }
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.setCustomValidity(""); // reset khi người dùng đang gõ
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await authApi.login(form);

            // const { token, email, fullName, imageName } = response;

            // Lưu token vào localStorage
            localStorage.setItem('token', response.data?.token);
            localStorage.setItem('imageName', response.data?.imageName);
            localStorage.setItem('email', response.data?.email);
            localStorage.setItem('role', response.data?.role);

            if (String(response.data?.role) === "1" || String(response.data?.role) === "3") {
                window.location.href = "/quan-li";
            } else {
                window.location.reload();
            }
        } catch (error: any) {
            const message = error.response.data;
            if (message === "Email not found") {
                alertError("Email không tồn tại.");
            } else if (message === "Invalid password") {
                alertError("Mật khẩu không đúng.");
            } else if (message === "Account blocked") {
                alertError("Tài khoản này đã bị khóa.");
            } else {
                alertError("Đăng nhập thất bại.");
            }

        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `https://onthia1.xyz/oauth2/authorization/google`;
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
                                        ĐĂNG NHẬP
                                    </h1>
                                    <IoCloseOutline
                                        className="text-xl cursor-pointer hover:text-red-500"
                                        onClick={() => setLoginPopup(false)}
                                    />
                                </div>

                                <hr className="border-gray-300 my-3" />

                                {/* <div>
                                    Hãy đăng nhập để lưu kết quả ôn tập và có thể đồng bộ trên các thiết bị khác của bạn.
                                </div> */}
                            </div>

                            <form className="space-y-3" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input ref={emailRef}
                                        onInvalid={handleEmailInvalid}
                                        onInput={handleInput}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === " ") e.preventDefault();
                                        }}
                                        type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:outline-none focus:border-gray-300 block w-full p-2.5" placeholder="" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                                    <div className="relative block w-full">
                                        <input onInvalid={handlePasswordInvalid}
                                            onInput={handleInput}
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
                                <div className="flex items-center justify-end">
                                    <a onClick={() => { setLoginPopup(false); setForgetPwPopup(true) }}
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Quên mật khẩu?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-gray-800 hover:bg-blue-500 font-medium rounded-sm text-sm px-5 py-2.5 text-center">
                                    Đăng nhập
                                </button>

                                <div className="flex items-center justify-center my-2">
                                    <hr className="flex-grow border-gray-300" />
                                    <span className="mx-4 text-gray-500 text-xs">HOẶC</span>
                                    <hr className="flex-grow border-gray-300" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleGoogleLogin}
                                        type="button" className="w-full flex items-center justify-center gap-2 text-black bg-white shadow-md border border-gray-200 font-medium rounded-sm text-sm px-5 py-2.5">
                                        <img
                                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                            alt="Google logo"
                                            className="w-5 h-5"
                                        />
                                        Đăng nhập với Google
                                    </button>
                                </div>

                                <p className="text-sm font-light text-gray-500">
                                    Bạn chưa có tài khoản? <a onClick={() => { setLoginPopup(false); setRegisterPopup(true) }} className="font-medium text-primary-600 hover:underline cursor-pointer">Đăng ký</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;