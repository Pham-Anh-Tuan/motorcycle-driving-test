// src/App.tsx
import type { ReactNode } from "react";
import khainiemImg from "../../assets/KHÁI NIỆM VÀ QUY TẮC.png";
import vanhoaImg from "../../assets/VĂN HOÁ VÀ ĐẠO ĐỨC LÁI.png";
import kyThuatImg from "../../assets/KỸ THUẬT LÁI XE.png";
import bienbaoImg from "../../assets/BIỂN BÁO ĐƯỜNG BỘ.png";
import sahinhImg from "../../assets/SA HÌNH.jpg";

interface Section {
    title: string;
    subtitle: string;
    progress: number;
    total: number;
    link: string;
    icon: ReactNode;
}

const sectionList: Section[] = [
    {
        title: "CHƯƠNG 1: KHÁI NIỆM VÀ QUY TẮC",
        subtitle: "Gồm 100 câu hỏi (20 câu điểm liệt)",
        progress: 3,
        total: 100,
        link: "khai-niem-va-quy-tac",
        icon: (
            <img src={khainiemImg} alt="" />
        ),
    },
    {
        title: "CHƯƠNG 2: VĂN HOÁ VÀ ĐẠO ĐỨC LÁI XE",
        subtitle: "Gồm 10 câu hỏi",
        progress: 0,
        total: 10,
        link: "van-hoa-va-dao-duc-lai-xe",
        icon: (
            <img src={vanhoaImg} alt="" />
        ),
    },
    {
        title: "CHƯƠNG 3: KỸ THUẬT LÁI XE",
        subtitle: "Gồm 15 câu hỏi",
        progress: 0,
        total: 15,
        link: "ky-thuat-lai-xe",
        icon: (
            <img src={kyThuatImg} alt="" />
        ),
    },
    {
        title: "CHƯƠNG 4: BIỂN BÁO ĐƯỜNG BỘ",
        subtitle: "Gồm 90 câu hỏi",
        progress: 0,
        total: 90,
        link: "bien-bao-duong-bo",
        icon: (
            <img src={bienbaoImg} alt="" />
        ),
    },
    {
        title: "CHƯƠNG 5: SA HÌNH",
        subtitle: "Gồm 35 câu hỏi",
        progress: 0,
        total: 35,
        link: "sa-hinh",
        icon: (
            <img src={sahinhImg} alt="" />
        ),
    },
];

function Card({ data }: { data: Section }) {
    const percentage = (data.progress / data.total) * 100;

    return (
        <a href={data.link} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow mb-3 cursor-pointer">
            {/* Icon minh hoạ */}
            <div className="w-20 h-20 flex items-center justify-center">
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
        </a>
    );
}

function Sections() {
    return (
        <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sectionList.map((s, idx) => (
                    <Card key={idx} data={s} />
                ))}
            </div>
        </div>
    );
}

export default Sections;
