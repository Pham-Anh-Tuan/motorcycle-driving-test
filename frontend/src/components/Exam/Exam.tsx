import { useEffect, useState } from "react";
import { mcQuestionApi } from "../../api/api";
import Result from "../Result/Result";
import type { ResultInterface } from "../../interfaces/Result";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

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

const Exam = () => {
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
    const [timeLeft, setTimeLeft] = useState(19 * 60); // 19 phút => giây
    const [showResult, setShowResult] = useState(false);
    const toggleResult = () => {
        setShowResult(!showResult);
    };

    const [showReview, setShowReview] = useState(false);
    const toggleReview = () => {
        setShowReview(!showReview);
    };

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

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer); // hết giờ thì dừng
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Hàm format mm:ss
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                goToPrevious();
            } else if (e.key === "ArrowRight") {
                goToNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentIndex, mcQuestions]);

    const [result, setResult] = useState<ResultInterface>();

    const getResult = (): ResultInterface => {
        const correctCount = mcQuestions.filter(
            (q) => q.answer === selectedAnswers[q.questionNumber]
        ).length;

        // Kiểm tra có sai câu critical nào không
        const hasWrongCritical = mcQuestions.some(
            (q) => q.isCritical && q.answer !== selectedAnswers[q.questionNumber]
        );

        const isPassed =
            correctCount >= 21 && !hasWrongCritical ? true : false;

        return {
            total: mcQuestions.length,
            correctCount,
            isPassed,
        };
    };

    return (
        <div className="bg-white container">
            <div>
                <h1 className="text-xl font-bold text-black p-3 text-center rounded-sm bg-yellow-300">
                    BỘ ĐỀ LUYỆN THI BẰNG LÁI XE MÁY HẠNG A1 | 250 CÂU HỎI MỚI NHẤT 2025
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
                                    {currentQuestion.choices.map((choice, index) => (
                                        <div key={index}
                                            onClick={() => {
                                                setSelectedAnswers({
                                                    ...selectedAnswers,
                                                    [currentQuestion.questionNumber]: choice.orderNumber,
                                                })
                                            }}
                                            className={`cursor-pointer rounded-sm px-4 py-3 border transition
                                            ${selectedAnswers[currentQuestion.questionNumber] === choice.orderNumber
                                                    ? "bg-blue-500 text-white border-blue-600 shadow"
                                                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"}
                                          `}>
                                            {choice.orderNumber}. {choice.content}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        type="button"
                                        onClick={goToPrevious}
                                        disabled={currentIndex === 0}
                                        className="flex items-center gap-0.5 px-2 py-1 rounded-sm hover:bg-blue-100 cursor-pointer border-2 border-b-4 border-blue-400 text-sm">
                                        <ArrowLeft className="w-5 h-5 text-sm" />
                                        Câu trước
                                    </button>
                                    {/* <div className="hidden sm:flex flex-col justify-center">
                                        <div className="flex flex-col justify-center border border-gray-300 rounded h-full px-8">Bạn có thể sử dụng mũi tên ⬅️ hoặc ➡️ trên bàn phím để thay đổi câu hỏi.</div>
                                    </div> */}
                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        disabled={currentIndex === mcQuestions.length - 1}
                                        className="flex items-center gap-0.5 px-2 py-1 rounded-sm hover:bg-blue-100 cursor-pointer border-2 border-b-4 border-blue-400 text-sm">
                                        Câu sau
                                        <ArrowRight className="w-5 h-5 text-sm" />
                                    </button>
                                </div>

                                {showReview && (
                                    <div>
                                        <div className="mt-4 text-yellow-400 font-semibold">ĐÁP ÁN ĐÚNG: {currentQuestion.answer} </div>

                                        <div className="mt-4 bg-green-300 rounded-sm p-2">
                                            <span className="font-medium">💡 GIẢI THÍCH ĐÁP ÁN: </span>
                                            <p> {currentQuestion.explanation} </p>
                                        </div>
                                    </div>
                                )}
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
                                    className={`relative text-black w-11 rounded-full aspect-square ${current === num ? "ring-2 ring-inset ring-blue-500" : selectedAnswers[num]               // câu đã chọn đáp án
                                        ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                    onClick={() => setCurrent(num)}
                                >
                                    {num}

                                    {showReview && (
                                        selectedAnswers[currentQuestion.questionNumber] === currentQuestion.answer ? (
                                            <div className="absolute -top-0 -right-0 flex items-center justify-center w-3.5 h-3.5 p-0.5 border border-white bg-green-500 rounded-full text-white shadow">
                                                <Check size={18} strokeWidth={3} />
                                            </div>
                                        ) : (
                                            <div className="absolute -top-0 -right-0 flex items-center justify-center w-3.5 h-3.5 p-0.5 border border-white bg-red-500 rounded-full text-white shadow">
                                                <X size={18} strokeWidth={3} />
                                            </div>
                                        )
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 border p-2 text-red-600 font-semibold rounded-sm">
                            Thời gian còn lại: {formatTime(timeLeft)}
                        </div>
                        <button onClick={() => {
                            toggleResult();
                            setResult(getResult());
                        }}
                            type="button"
                            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-sm">
                            KẾT THÚC BÀI THI
                        </button>
                    </div>
                </div>
            </div>
            {showResult && (
                <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-opacity-50">
                    <Result result={result} toggleResult={toggleResult} toggleReview={toggleReview} />
                </div>
            )}
        </div>
    );
};

export default Exam;
