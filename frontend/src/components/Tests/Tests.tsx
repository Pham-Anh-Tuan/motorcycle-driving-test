import { useState } from "react";

type TestStatus = "paused" | "failed" | "not-started" | "in-progress";

interface Test {
    id: number;
    title: string;
    total: number;
    status: TestStatus;
    timeLeft?: string;
    failReason?: string;
}

const testData: Test[] = [
    {
        id: 1,
        title: "Đề số 1",
        total: 25,
        status: "paused",
        timeLeft: "Còn lại 8 phút 37 giây",
    },
    {
        id: 2,
        title: "Đề số 2",
        total: 25,
        status: "failed",
        failReason: "Sai câu điểm liệt",
    },
    {
        id: 3,
        title: "Đề số 3",
        total: 25,
        status: "failed",
        failReason: "Sai câu điểm liệt",
    },
    {
        id: 4,
        title: "Đề số 4",
        total: 25,
        status: "not-started",
        timeLeft: "Thời gian 19 phút",
    },
    {
        id: 5,
        title: "Đề số 5",
        total: 25,
        status: "not-started",
        timeLeft: "Thời gian 19 phút",
    },
    {
        id: 6,
        title: "Đề số 6",
        total: 25,
        status: "not-started",
        timeLeft: "Thời gian 19 phút",
    },
    {
        id: 7,
        title: "Đề số 7",
        total: 25,
        status: "not-started",
        timeLeft: "Thời gian 19 phút",
    },
    // {
    //     id: 8,
    //     title: "Đề số 8",
    //     total: 25,
    //     status: "not-started",
    //     timeLeft: "Thời gian 19 phút",
    // },
    // {
    //     id: 9,
    //     title: "Đề số 9",
    //     total: 25,
    //     status: "not-started",
    //     timeLeft: "Thời gian 19 phút",
    // },
    // {
    //     id: 10,
    //     title: "Đề số 10",
    //     total: 25,
    //     status: "not-started",
    //     timeLeft: "Thời gian 19 phút",
    // },
];
const Tests = () => {
    const [exams] = useState(testData);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container">
            {exams.map((exam) => (
                <div
                    key={exam.id}
                    className="bg-white rounded-xl shadow p-4 flex flex-row justify-between items-start items-center"
                >
                    {/* Left Info */}
                    <div>
                        <p className="text-xs text-gray-500">{exam.total} CÂU HỎI</p>
                        <h2 className="text-lg font-semibold text-gray-800">{exam.title}</h2>

                        {exam.status === "paused" && (
                            <p className="text-sm text-teal-500 mt-1 flex items-center gap-1">
                                ⏱ {exam.timeLeft}
                            </p>
                        )}

                        {exam.status === "failed" && (
                            <p className="text-sm text-orange-500 mt-1 flex items-center gap-1">
                                ⚠️ {exam.failReason}
                            </p>
                        )}

                        {exam.status === "not-started" && (
                            <p className="text-sm text-teal-500 mt-1 flex items-center gap-1">
                                ⏱ {exam.timeLeft}
                            </p>
                        )}
                    </div>

                    {/* Right Buttons */}
                    <div className="flex flex-col items-end gap-2 mt-3 sm:mt-0">
                        {exam.status === "paused" && (
                            <>
                                <span className="text-xs font-semibold text-white bg-orange-400 px-3 py-1 rounded-md">
                                    TẠM DỪNG
                                </span>
                                <button className="text-sm font-medium text-teal-500 border border-teal-400 px-3 py-1 rounded-md hover:bg-teal-50">
                                    Tiếp tục
                                </button>
                            </>
                        )}

                        {exam.status === "failed" && (
                            <span className="text-xs font-semibold text-white bg-rose-500 px-3 py-1 rounded-md">
                                KHÔNG ĐẠT
                            </span>
                        )}

                        {exam.status === "not-started" && (
                            <button className="text-sm font-medium text-teal-500 border border-teal-400 px-3 py-1 rounded-md hover:bg-teal-50">
                                Bắt đầu
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tests;