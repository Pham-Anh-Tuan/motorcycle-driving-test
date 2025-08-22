import { useEffect, useState } from "react";
import { mcQuestionApi } from "../../api/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Check, X } from "lucide-react";

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

const CriticalQuestion = () => {
    const [mcQuestions, setMcQuestions] = useState<McQuestion[]>([]);

    const loadMcQuestions = async () => {
        setMcQuestions([]);
        try {
            const { data } = await mcQuestionApi.getCriticalMcQuestions();
            setMcQuestions(data);

            if (data.length > 0) {
                setCurrent(data[0].questionNumber); // lấy câu đầu tiên
            }
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    };

    useEffect(() => {
        loadMcQuestions();
    }, []);

    const [current, setCurrent] = useState<number>(1);
    const currentIndex = mcQuestions.findIndex((q) => q.questionNumber === current);
    const currentQuestion = mcQuestions[currentIndex];
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>(() => {
        const saved = localStorage.getItem("selectedAnswers");
        return saved ? JSON.parse(saved) : {};
    });

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

    function updateProgress(chapterKey: string, doneCount: number) {
        // Lấy dữ liệu hiện tại từ localStorage
        const savedProgress = JSON.parse(localStorage.getItem("progressData") || "{}");

        // Ghi đè tiến độ chương hiện tại
        savedProgress[chapterKey] = doneCount;

        // Lưu lại vào localStorage
        localStorage.setItem("progressData", JSON.stringify(savedProgress));
    }

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

                                    {currentQuestion.isCritical && (
                                        <span className="text-red-500"> [Câu liệt] </span>
                                    )}

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
                                    {currentQuestion.choices.map((choice, index) => {
                                        const selected = selectedAnswers[currentQuestion.questionNumber];
                                        const isSelected = selected === choice.orderNumber;
                                        const isCorrect = choice.orderNumber === currentQuestion.answer;

                                        let choiceClass = "bg-gray-100 hover:bg-gray-200 border-gray-300"; // mặc định

                                        if (isSelected && !isCorrect) {
                                            // chọn sai
                                            choiceClass = "bg-red-500 text-white border-red-600 shadow";
                                        } else if (isSelected && isCorrect) {
                                            // chọn đúng
                                            choiceClass = "bg-green-500 text-white border-green-600 shadow";
                                        }

                                        return (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    const newAnswers = {
                                                        ...selectedAnswers,
                                                        [currentQuestion.questionNumber]: choice.orderNumber,
                                                    };

                                                    setSelectedAnswers(newAnswers);

                                                    localStorage.setItem("selectedAnswers", JSON.stringify(newAnswers));

                                                    // Tính số câu đã làm trong chương hiện tại
                                                    const answeredCount = Object.keys(newAnswers).filter((qNum) => {
                                                        const question = mcQuestions.find(q => q.questionNumber === Number(qNum));
                                                        return question;
                                                    }).length;

                                                    updateProgress(location.pathname, answeredCount);
                                                }}
                                                className={`cursor-pointer rounded-sm px-4 py-3 border transition ${choiceClass}`}
                                            >
                                                {choice.orderNumber}. {choice.content}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        type="button"
                                        onClick={goToPrevious}
                                        disabled={currentIndex === 0}
                                        className="flex items-center font-semibold gap-0.5 px-2 py-1 rounded-sm hover:bg-blue-100 cursor-pointer border-2 border-b-4 border-blue-400 text-sm">
                                        <FaChevronLeft />
                                        Câu trước
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goToNext}
                                        disabled={currentIndex === mcQuestions.length - 1}
                                        className="flex items-center font-semibold gap-0.5 px-2 py-1 rounded-sm hover:bg-blue-100 cursor-pointer border-2 border-b-4 border-blue-400 text-sm">
                                        Câu sau
                                        <FaChevronRight />
                                    </button>
                                </div>

                                {selectedAnswers[currentQuestion.questionNumber] != null && (
                                    <div>
                                        {selectedAnswers[currentQuestion.questionNumber] === currentQuestion.answer ? (
                                            <div className="flex flex-row mt-4 text-green-400 font-semibold">TRẢ LỜI ĐÚNG ✅</div>
                                        ) : (
                                            <div className="mt-4 text-red-400 font-semibold">TRẢ LỜI SAI ❌</div>
                                        )}

                                        <div className="mt-1 text-yellow-400 font-semibold">ĐÁP ÁN ĐÚNG: {currentQuestion.answer} </div>

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
                        <h2 className="text-black font-bold text-center">
                            20 câu điểm liệt
                        </h2>
                        <div className="flex justify-center">
                            <div className="bg-yellow-300 h-[3px] mt-1.5 mb-3 w-3/4"></div>
                        </div>
                        <div className="grid grid-cols-8 md:grid-cols-4 xl:grid-cols-5 gap-2 overflow-y-auto max-h-96">
                            {mcQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    className={`relative text-black w-11 rounded-full aspect-square ${current === question.questionNumber ? "ring-2 ring-inset ring-blue-500" : selectedAnswers[question.questionNumber]               // câu đã chọn đáp án
                                        ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                    onClick={() => setCurrent(question.questionNumber)}
                                >
                                    {question.questionNumber}
                                    {selectedAnswers[mcQuestions[index].questionNumber] === mcQuestions[index].answer ? (
                                        <div className="absolute -top-0 -right-0 flex items-center justify-center w-3.5 h-3.5 p-0.5 border border-white bg-green-500 rounded-full text-white shadow">
                                            <Check size={18} strokeWidth={3} />
                                        </div>
                                    ) : selectedAnswers[mcQuestions[index].questionNumber] !== mcQuestions[index].answer && selectedAnswers[mcQuestions[index].questionNumber] != null ? (
                                        <div className="absolute -top-0 -right-0 flex items-center justify-center w-3.5 h-3.5 p-0.5 border border-white bg-red-500 rounded-full text-white shadow">
                                            <X size={18} strokeWidth={3} />
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}

                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CriticalQuestion;