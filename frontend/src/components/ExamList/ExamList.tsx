import { useEffect, useState } from "react";
import { examApi } from "../../api/api";

type ExamStatus = "paused" | "failed" | "not-started" | "in-progress";

interface ExamStructure {
    id: number;
    title: string;
    examNumber: number;
    status: ExamStatus;
    timeLeft?: string;
    failReason?: string;
}

// const examData: ExamStructure[] = [
//     {
//         id: 1,
//         title: "Đề số 1",
//         total: 25,
//         status: "paused",
//         timeLeft: "Còn lại 8 phút 37 giây",
//     },
//     {
//         id: 2,
//         title: "Đề số 2",
//         total: 25,
//         status: "failed",
//         failReason: "Sai câu điểm liệt",
//     },
//     {
//         id: 3,
//         title: "Đề số 3",
//         total: 25,
//         status: "failed",
//         failReason: "Sai câu điểm liệt",
//     },
//     {
//         id: 4,
//         title: "Đề số 4",
//         total: 25,
//         status: "not-started",
//         timeLeft: "Thời gian 19 phút",
//     },
//     {
//         id: 5,
//         title: "Đề số 5",
//         total: 25,
//         status: "not-started",
//         timeLeft: "Thời gian 19 phút",
//     },
//     {
//         id: 6,
//         title: "Đề số 6",
//         total: 25,
//         status: "not-started",
//         timeLeft: "Thời gian 19 phút",
//     },
//     {
//         id: 7,
//         title: "Đề số 7",
//         total: 25,
//         status: "not-started",
//         timeLeft: "Thời gian 19 phút",
//     },
//     {
//         id: 8,
//         title: "Đề số 8",
//         total: 25,
//         status: "not-started",
//         timeLeft: "Thời gian 19 phút",
//     },
//     {
//         id: 9,
//         title: "Đề số 9",
//         total: 25,
//         status: "not-started",
//         timeLeft: "Thời gian 19 phút",
//     },
//     {
//         id: 10,
//         title: "Đề số 10",
//         total: 25,
//         status: "not-started",
//         timeLeft: "Thời gian 19 phút",
//     },
// ];
const ExamList = () => {
    const [examNumbers, setExamNumbers] = useState<number[]>([]);

    const loadExamNumbers = async () => {
        try {
            const { data } = await examApi.getExamNumberList();
            setExamNumbers(data);
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    useEffect(() => {
        loadExamNumbers();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container">
            {examNumbers.map((number, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow p-4 flex flex-row justify-between items-start"
                >
                    {/* Left Info */}
                    <div>
                        <p className="text-xs text-gray-500">25 CÂU HỎI</p>
                        <h2 className="text-lg font-semibold text-gray-800">Đề số {number}</h2>

                        {/* {exam.status === "paused" && (
                            <p className="text-sm text-blue-500 mt-1 flex items-center gap-1">
                                ⏱ {exam.timeLeft}
                            </p>
                        )}

                        {exam.status === "failed" && (
                            <p className="text-sm text-orange-500 mt-1 flex items-center gap-1">
                                ⚠️ {exam.failReason}
                            </p>
                        )}

                        {exam.status === "not-started" && (
                            <p className="text-sm text-blue-500 mt-1 flex items-center gap-1">
                                ⏱ {exam.timeLeft}
                            </p>
                        )} */}
                        <p className="text-sm text-blue-500 mt-1 flex items-center gap-1">
                            ⏱ Thời gian 19 phút
                        </p>
                    </div>

                    {/* Right Buttons */}
                    <div className="mt-3 sm:mt-0">
                        {
                            (() => {
                                const savedResult = JSON.parse(localStorage.getItem("resultData") || "{}");

                                if (savedResult[number] === false) {
                                    return (
                                        <div className="flex flex-col gap-2">
                                            <span className="self-end w-fit text-xs font-semibold text-white bg-rose-500 px-3 py-1 rounded-md">
                                                KHÔNG ĐẠT
                                            </span>
                                            <a href={`/de/${Number(number)}`} className="self-end w-fit text-sm font-medium text-blue-500 border border-blue-400 px-3 py-1 rounded-md hover:bg-blue-50 cursor-pointer">
                                                Thi lại
                                            </a>
                                        </div>
                                    );
                                }

                                if (savedResult[number] === true) {
                                    return (
                                        <div className="flex flex-col gap-2">
                                            <span className="self-end w-fit text-xs font-semibold text-white bg-green-500 px-3 py-1 rounded-md">
                                                ĐẠT
                                            </span>
                                            <a href={`/de/${Number(number)}`} className="self-end w-fit text-sm font-medium text-blue-500 border border-blue-400 px-3 py-1 rounded-md hover:bg-blue-50 cursor-pointer">
                                                Thi lại
                                            </a>
                                        </div>
                                    );
                                }

                                return <div>
                                    <span></span>
                                    <a href={`/de/${Number(number)}`} className="text-sm font-medium text-blue-500 border border-blue-400 px-3 py-1 rounded-md hover:bg-blue-50 cursor-pointer">
                                        Bắt đầu
                                    </a>
                                </div>;
                            })()
                        }

                        {/* <a href={`/de/${Number(number)}`} className="text-sm font-medium text-blue-500 border border-blue-400 px-3 py-1 rounded-md hover:bg-blue-50 cursor-pointer">
                            Bắt đầu
                        </a> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExamList;