import { useEffect, useState } from "react";
import type { FC } from "react";
import { mcQuestionApi } from "../../api/api";

interface McQuestion {
    id: string;
    questionNumber: number;
    isCritical: boolean;
    prompt: string;
    imageName?: string;
    imageFile?: File | null;
    choices: Choice[];
    answer: number;
    explanation: string;
    type: string;
}

interface Choice {
    id: string;
    orderNumber: number;
    content: string;
}

const Exam: FC = () => {
    const [mcQuestions, setMcQuestions] = useState<McQuestion[]>([]);

    const loadMcQuestions = async () => {
        try {
            const { data } = await mcQuestionApi.getRandomA1Exam();
            setMcQuestions(data);
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };


    const [current, setCurrent] = useState<number>(1);
    const currentIndex = mcQuestions.findIndex((q) => q.questionNumber === current);
    const currentQuestion = mcQuestions[currentIndex];
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | null }>({});

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrent(mcQuestions[currentIndex - 1].questionNumber);
        }
    };

    const goToNext = () => {
        if (currentIndex < mcQuestions.length - 1) {
            setCurrent(mcQuestions[currentIndex + 1].questionNumber);
        }
    };

    useEffect(() => {
        loadMcQuestions();
    }, []);
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
                                <h1 className="text-black font-semibold mb-1 text-xl">
                                    Câu {currentQuestion.questionNumber}:
                                    <span className="text-black font-semibold ml-1">
                                        {currentQuestion.prompt}
                                    </span>
                                </h1>
                                {currentQuestion.imageName && (
                                    <div className="flex justify-center">
                                        <img
                                            src={import.meta.env.VITE_API_URL_QUESTION_IMG + currentQuestion.imageName}
                                            alt="question"
                                            className="w-max mt-4 max-h-[320px]"
                                        />
                                    </div>
                                )}
                                <div className="space-y-4 my-6">
                                    {/* {currentQuestion.choices.map((choice, index) => (
                                        <label key={index} className="block">
                                            <input type="radio"
                                                name={`choice-${currentQuestion.questionNumber}`}
                                                checked={selectedAnswers[currentQuestion.questionNumber] === choice.orderNumber}
                                                onChange={() =>
                                                    setSelectedAnswers({
                                                        ...selectedAnswers,
                                                        [currentQuestion.questionNumber]: choice.orderNumber,
                                                    })
                                                }
                                                className="mr-2" />
                                            {choice.orderNumber}. {choice.content}
                                        </label>
                                    ))} */}
                                    {currentQuestion.choices.map((choice, index) => (
                                        <div key={index}
                                            onClick={() => {
                                                setSelectedAnswers({
                                                    ...selectedAnswers,
                                                    [currentQuestion.questionNumber]: choice.orderNumber,
                                                })
                                            }}
                                            className={`cursor-pointer rounded-lg px-4 py-3 border transition
                                            ${selectedAnswers[currentQuestion.questionNumber] === choice.orderNumber
                                                    ? "bg-blue-500 text-white border-blue-600 shadow"
                                                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"}
                                          `}>
                                            {choice.orderNumber}. {choice.content}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button onClick={goToPrevious}
                                        disabled={currentIndex === 0}
                                        className="border px-4 py-2 rounded hover:bg-gray-100">
                                        Câu trước
                                    </button>
                                    <button onClick={goToNext}
                                        disabled={currentIndex === mcQuestions.length - 1}
                                        className="border px-4 py-2 rounded hover:bg-gray-100">
                                        Câu sau
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="bg-white border border-gray-200 p-4 rounded-sm shadow w-full md:w-1/3 lg:w-1/4">
                        <h2 className="text-black font-bold mb-2">
                            Câu hỏi | Đề ngẫu nhiên
                        </h2>
                        <div className="grid grid-cols-8 md:grid-cols-4 xl:grid-cols-5 gap-2">
                            {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
                                <button
                                    key={num}
                                    className={`text-black w-11 rounded-full aspect-square ${current === num ? "ring-2 ring-inset ring-blue-500" : selectedAnswers[num]               // câu đã chọn đáp án
                                        ? "bg-blue-500 text-white" : "bg-gray-300"
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
