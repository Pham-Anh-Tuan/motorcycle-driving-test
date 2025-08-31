import { toast } from 'react-toastify';
export function alertError(errorName: string) {
    toast.error(errorName, {
        position: "top-center",
        autoClose: 6000, // tự tắt sau 6s
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}