const MenuBox = () => {
    const resetExamRecord = () => {
        localStorage.removeItem("resultData");
        window.location.reload();
    };

    const resetReviewRecord = () => {
        localStorage.removeItem("progressData");
        localStorage.removeItem("answersData");
        window.location.reload();
    };
    
    return (
        <div className="container">
            <main className="py-5">
                <div className="flex justify-end gap-4">
                    <button onClick={resetExamRecord} className="mb-4 bg-gray-500 hover:bg-blue-600 p-1.5 rounded-sm text-white">🗑️ Xóa lịch sử thi thử</button>
                    <button onClick={resetReviewRecord} className="mb-4 bg-gray-500 hover:bg-blue-600 p-1.5 rounded-sm text-white">🧹 Xóa lịch sử ôn tập</button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card 1 */}
                    <a href="/cau-truc-thi-ngau-nhien" className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4">🔀</div>
                        <h3 className="text-lg font-semibold">Thi thử đề ngẫu nhiên</h3>
                        {/* <span className="bg-green-800 text-white text-xs px-2 py-0.5 rounded-full mt-2 inline-block">B1</span> */}
                    </a>

                    {/* Card 2 */}
                    <a href="/cac-de-thi" className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition relative cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4">📋</div>
                        <h3 className="text-lg font-semibold">Thi thử bộ đề tạo sẵn</h3>
                        <span className="absolute top-2 right-2 bg-green-900 text-white text-xs px-2 py-0.5 rounded-full">8</span>
                    </a>

                    {/* Card 3 */}
                    <a href="/on-cac-chuong" className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition relative cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4 text-indigo-700">📘</div>
                        <h3 className="text-lg font-semibold">Ôn tập toàn bộ câu hỏi</h3>
                        <span className="absolute top-2 right-2 bg-indigo-700 text-white text-xs px-2 py-0.5 rounded-full">250</span>
                    </a>

                    {/* Card 4 */}
                    <a href="/20-cau-diem-liet" className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition relative cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4 text-orange-500">⭐</div>
                        <h3 className="text-lg font-semibold">Ôn tập câu điểm liệt</h3>
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">20</span>
                    </a>

                    {/* Card 5 */}
                    <a  href="/cau-hoi-bi-sai-nhieu" className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition relative cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4 text-red-700">❌</div>
                        <h3 className="text-lg font-semibold">Câu hỏi bị sai nhiều</h3>
                        <span className="absolute top-2 right-2 bg-red-700 text-white text-xs px-2 py-0.5 rounded-full">30</span>
                    </a>

                    {/* Card 6 */}
                    <a href="/cac-bien-bao" className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4 text-yellow-500">🚦</div>
                        <h3 className="text-lg font-semibold">Biển báo giao thông</h3>
                    </a>

                </div>
            </main>
        </div>
    )
}

export default MenuBox