// src/App.tsx
import type { ReactNode } from "react";
import anh1 from "../../assets/KHÁI NIỆM VÀ QUY TẮC.png";
import anh2 from "../../assets/VĂN HOÁ VÀ ĐẠO ĐỨC LÁI.png";
import anh3 from "../../assets/KỸ THUẬT LÁI XE.png";
import anh4 from "../../assets/BIỂN BÁO ĐƯỜNG BỘ.png";
import anh5 from "../../assets/SA HÌNH.jpg";
import anh6 from "../../assets/20 CÂU HỎI ĐIỂM LIỆT.png";

interface Section {
    title: string;
    subtitle: string;
    progress: number;
    total: number;
    icon: ReactNode;
}

const sections: Section[] = [
    {
        title: "20 CÂU HỎI ĐIỂM LIỆT",
        subtitle: "20 câu hỏi điểm liệt",
        progress: 1,
        total: 20,
        icon: (
            // <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            // </svg>
            <img src={anh6} alt="" />
        ),
    },
    {
        title: "KHÁI NIỆM VÀ QUY TẮC",
        subtitle: "Gồm 83 câu hỏi (18 câu điểm liệt)",
        progress: 3,
        total: 83,
        icon: (
            // <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M12 4H3m9 16V4m0 0l-9 9m9-9l9 9" />
            // </svg>
            <img src={anh1} alt="" />
        ),
    },
    {
        title: "VĂN HOÁ VÀ ĐẠO ĐỨC LÁI",
        subtitle: "Gồm 5 câu hỏi",
        progress: 0,
        total: 5,
        icon: (
            // <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5V4H2v16h5m10-6l-4-4m0 0l-4 4m4-4v12" />
            // </svg>
            <img src={anh2} alt="" />
        ),
    },
    {
        title: "KỸ THUẬT LÁI XE",
        subtitle: "Gồm 12 câu hỏi (2 câu điểm liệt)",
        progress: 0,
        total: 12,
        icon: (
            // <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h2l2-2h10l2 2h2M5 13v6h14v-6M9 21h6" />
            // </svg>
            <img src={anh3} alt="" />
        ),
    },
    {
        title: "BIỂN BÁO ĐƯỜNG BỘ",
        subtitle: "Gồm 65 câu hỏi",
        progress: 0,
        total: 65,
        icon: (
            // <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            // </svg>
            <img src={anh4} alt="" />
        ),
    },
    {
        title: "SA HÌNH",
        subtitle: "Gồm 35 câu hỏi",
        progress: 0,
        total: 35,
        icon: (
            // <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
            // </svg>
            <img src={anh5} alt="" />
        ),
    },
];

function Card({ data }: { data: Section }) {
    const percentage = (data.progress / data.total) * 100;

    return (
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow mb-3 cursor-pointer">
            {/* Icon minh hoạ */}
            <div className="w-16 h-16 flex items-center justify-center">
                {data.icon}
            </div>

            {/* Nội dung */}
            <div className="flex flex-col flex-1">
                <h2 className="text-sm font-bold text-gray-800">{data.title}</h2>
                <p className="text-xs text-gray-500">{data.subtitle}</p>

                {/* Progress */}
                <div className="mt-2">
                    <div className="w-full h-1.5 bg-gray-200 rounded">
                        <div
                            className="h-1.5 bg-blue-500 rounded"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                        {data.progress} / {data.total}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Sections() {
    return (
        <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sections.map((s, idx) => (
                    <Card key={idx} data={s} />
                ))}
            </div>
        </div>
    );
}

export default Sections;
