import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { AxiosError } from "axios";

const attachAuthToken = (axiosInstance: AxiosInstance): void => {
    // Gắn token cho mọi request
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = localStorage.getItem("token");
            // console.log("token la: ", token);
            if (token && config.headers) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Tự động logout nếu token hết hạn
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                const message = (error.response.data as any)?.message;
                if (message === "Token expired" || message === "Invalid token") {
                    // Xoá token khỏi localStorage
                    localStorage.removeItem("token");
                    localStorage.removeItem("imageName");
                    localStorage.removeItem("email");
                    localStorage.removeItem("role");

                    // Phát sự kiện để cập nhật UI
                    window.dispatchEvent(new Event("logUpdated"));

                    alert("Phiên đăng nhập đã hết hạn.");
                    window.location.reload();
                }
            }
            // Trả về lỗi
            return Promise.reject(error);
        }
    );
};

export default attachAuthToken;