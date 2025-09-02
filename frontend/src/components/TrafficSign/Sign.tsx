import { useEffect, useState } from "react";
import { signApi } from "../../api/api";

interface Sign {
    id: string;
    code: string;
    title: string;
    imageName?: string;
    imageFile?: File | null;
    description: string;
}

const Sign = () => {
    const [signList, setSignList] = useState<Sign[]>([]);
    const loadSigns = async () => {
        try {
            const { data } = await signApi.getSigns();
            setSignList(data);
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    useEffect(() => {
        loadSigns();
    }, []);

    return (
        <div className="w-full min-h-screen bg-white container">
            {/* Header */}
            {/* <div className="flex items-center gap-2 mb-4">
                <h1 className="text-2xl font-bold">BIỂN BÁO GIAO THÔNG</h1>
            </div> */}

            {/* Category */}
            <div className="bg-white rounded-md shadow-md">
                <button
                    type="button"
                    className="w-full flex justify-center items-center px-4 py-3 text-lg font-semibold border-b"
                >
                    <span className="text-xl font-bold bg-yellow-300 px-3 py-1">BIỂN BÁO GIAO THÔNG</span>
                    {/* <span>{open ? "▲" : "▼"}</span> */}
                </button>


                <div className="divide-y">
                    {signList.map((sign) => (
                        <div
                            key={sign.id}
                            className="flex gap-4 p-4 hover:bg-gray-50 transition"
                        >
                            {/* Image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={import.meta.env.VITE_API_URL_SIGN_IMG + sign.imageName}
                                    alt={sign.title}
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                            {/* Content */}
                            <div>
                                <h2 className="font-bold text-lg">{sign.title}</h2>
                                <p className="text-sm text-gray-500 mb-1">{sign.code}</p>
                                <p className="text-sm text-gray-700">{sign.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sign;