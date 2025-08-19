import type { ResultInterface } from "../../interfaces/Result";

interface ResultProps {
    result?: ResultInterface;
    toggleResult: () => void;
    setShowReview: React.Dispatch<React.SetStateAction<boolean>>;
}

const Result: React.FC<ResultProps> = ({ result, toggleResult, setShowReview}) => {
    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-sm shadow-xl p-8 text-center">
                <div className="relative flex justify-center items-center">
                    <h1 className="text-2xl font-bold text-green-600 text-center">KẾT QUẢ BÀI THI</h1>
                    <button onClick={toggleResult}
                        type="button" className=
                        "absolute right-0 text-gray-400 bg-transparent hover:text-gray-900 text-sm inline-flex items-center">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                {result?.isPassed ? (
                    <div className="text-green-500 my-4">
                        🎉 Chúc mừng bạn đã ĐẬU.
                    </div>
                ) : (
                    <div className="text-red-500 my-4">
                        ❌ Bạn đã thi TRƯỢT.
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
                    <div className="bg-gray-100 rounded-xl p-6 shadow">
                        <p className="font-semibold">Tổng số câu</p>
                        <p className="text-2xl text-black">{result?.total}</p>
                    </div>
                    <div className="bg-green-100 rounded-xl p-6 shadow">
                        <p className="font-semibold">Số câu đúng ✅</p>
                        <p className="text-2xl text-green-600">{result?.correctCount}</p>
                    </div>
                    <div className="bg-red-100 rounded-xl p-6 shadow">
                        <p className="font-semibold">Số câu sai ❌</p>
                        <p className="text-2xl text-red-600">{(result?.total ?? 0) - (result?.correctCount ?? 0)}</p>
                    </div>
                </div>

                <div className="flex mt-8 justify-center">
                    <div className="flex gap-6">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow"
                        >
                            Thi lại đề khác
                        </button>

                        <button
                            onClick={() => {
                                toggleResult();
                                setShowReview(true);
                            }}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow"
                        >
                            Xem lại bài thi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result;