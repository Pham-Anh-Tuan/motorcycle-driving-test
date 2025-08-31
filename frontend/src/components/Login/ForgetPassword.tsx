import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5"
import { authApi } from "../../api/api";
import { alertError } from "../Shared/AlertError";

interface ForgetPasswordProps {
    setForgetPwPopup: (isOpen: boolean) => void;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ setForgetPwPopup }) => {
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        try {
            formData.append("email", email);
            await authApi.forgotPassword(formData);
            window.location.reload();
        } catch (error: any) {
            alertError(error?.response?.data);
        }
    }

    return (
        <div>
            <section className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-sm shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-3">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h1 className="text-md font-semibold leading-tight tracking-tight text-gray-900 text-center">
                                        KHÔI PHỤC MẬT KHẨU
                                    </h1>
                                    <IoCloseOutline
                                        className="text-xl cursor-pointer hover:text-red-500"
                                        onClick={() => setForgetPwPopup(false)}
                                    />
                                </div>

                                <hr className="border-gray-300 my-3" />

                                <div>
                                    Nhập email của bạn và chúng tôi sẽ gửi mật khẩu mới của bạn qua email!
                                </div>
                            </div>

                            <form className="space-y-3" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input onChange={(e) => setEmail(e.target.value)}
                                        type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:outline-none focus:border-gray-300 block w-full p-2.5" placeholder="" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-gray-800 hover:bg-blue-500 font-medium rounded-sm text-sm px-5 py-2.5 text-center">
                                    Gửi
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgetPassword