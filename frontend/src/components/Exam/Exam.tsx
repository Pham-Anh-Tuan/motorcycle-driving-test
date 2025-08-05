import { useState } from "react";
import type { FC } from "react";
import Cau2555 from "../../assets/cau2555.jpg";

interface Question {
    id: number;
    content: string;
    options: string[];
    image?: string;
}

const questions: Question[] = [
    {
        id: 1,
        content:
            "Khổ giới hạn của đường bộ được hiểu như thế nào là đúng?",
        options: [
            "1- Khổ giới hạn của đường bộ là khoảng trống có kích thước giới hạn về chiều rộng, chiều cao của đường bộ để các xe, bao gồm cả hàng hoá xếp trên xe đi qua được an toàn và được xác định theo quy chuẩn, tiêu chuẩn kỹ thuật của đường bộ.",
            "2- Là khoảng trống có kích thước giới hạn về chiều rộng của đường, cầu, bến phà, hầm trên đường bộ để các xe kể cả hàng hóa xếp trên xe đi qua được an toàn.",
            "3- Là khoảng trống có kích thước giới hạn về chiều cao của cầu, bến phà, hầm trên đường bộ để các xe đi qua được an toàn."
        ]
    },
    {
        id: 2,
        content:
            "Người điều khiển giao thông đường bộ được hiểu như thế nào là đúng?",
        options: [
            "1- Là người điều khiển phương tiện tham gia giao thông đường bộ.",
            "2- Là Cảnh sát giao thông và người được giao nhiệm vụ hướng dẫn giao thông trên đường bộ.",
            "3- Là người tham gia giao thông đường bộ."
        ]
    },
    {
        id: 25,
        content:
            "Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?",
        options: ["1- Xe con.", "2- Xe tải.", "3- Xe con, xe tải."],
        image: Cau2555
    }
];

const Exam: FC = () => {
    const [current, setCurrent] = useState<number>(1);
    const currentIndex = questions.findIndex((q) => q.id === current);
    const currentQuestion = questions[currentIndex];

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrent(questions[currentIndex - 1].id);
        }
    };

    const goToNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrent(questions[currentIndex + 1].id);
        }
    };
    return (
        <div className="bg-white container">
            <div>
                <h1 className="text-xl font-bold text-black bg-white p-3 text-center rounded-sm">
                    ĐỀ THI THỬ BẰNG LÁI XE A1 250 CÂU HỎI MỚI NHẤT 2025
                </h1>

                <div className="flex flex-col md:flex-row gap-4 mt-4">


                    {/* Question */}
                    <div className="bg-white border border-gray-200 p-4 rounded-sm shadow w-full md:w-2/3 lg:w-3/4">
                        {currentQuestion && (
                            <>
                                <h2 className="text-black font-semibold mb-2">
                                    Câu {currentQuestion.id}:
                                    <span className="text-black font-semibold ml-1">
                                        {currentQuestion.content}
                                    </span>
                                </h2>
                                {currentQuestion.image && (
                                    <img
                                        src={currentQuestion.image}
                                        alt="question"
                                        className="w-full mb-4"
                                    />
                                )}
                                <div className="space-y-2">
                                    {currentQuestion.options.map((option, index) => (
                                        <label key={index} className="block">
                                            <input type="radio" name="option" className="mr-2" />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button onClick={goToPrevious}
                                        disabled={currentIndex === 0}
                                        className="border px-4 py-2 rounded hover:bg-gray-100">
                                        Câu trước
                                    </button>
                                    <button onClick={goToNext}
                                        disabled={currentIndex === questions.length - 1}
                                        className="border px-4 py-2 rounded hover:bg-gray-100">
                                        Câu tiếp theo
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="bg-white border border-gray-200 p-4 rounded-sm shadow w-full md:w-1/3 lg:w-1/4">
                        <h2 className="text-black font-bold mb-2">
                            Câu hỏi | Đề số: 03
                        </h2>
                        <div className="grid grid-cols-5 gap-2">
                            {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
                                <button
                                    key={num}
                                    className={`py-2 text-white rounded ${current === num ? "bg-blue-500" : "bg-green-500"
                                        }`}
                                    onClick={() => setCurrent(num)}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 border p-2 text-gray-800 font-semibold">
                            Thời gian còn lại: 13:22
                        </div>
                        <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
                            KẾT THÚC BÀI THI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Exam;
