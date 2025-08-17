interface ResultProps {
    total: number;
    correctCount: number;
}

const Result: React.FC<ResultProps> = ({ total, correctCount }) => {
    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-sm shadow-xl p-8 text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 KẾT QUẢ BÀI THI</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
                    <div className="bg-gray-100 rounded-xl p-6 shadow">
                        <p className="font-semibold">Tổng số câu</p>
                        <p className="text-2xl text-black">{total}</p>
                    </div>
                    <div className="bg-green-100 rounded-xl p-6 shadow">
                        <p className="font-semibold">Số câu đúng ✅</p>
                        <p className="text-2xl text-green-600">{correctCount}</p>
                    </div>
                    <div className="bg-red-100 rounded-xl p-6 shadow">
                        <p className="font-semibold">Số câu sai ❌</p>
                        <p className="text-2xl text-red-600">{total - correctCount}</p>
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
                            onClick={() => window.location.reload()}
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