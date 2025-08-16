const MenuBox = () => {
    return (
        <div className="container">
            <main className="py-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card 1 */}
                    <a href="/cau-truc-thi-ngau-nhien" className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4">🔀</div>
                        <h3 className="text-lg font-semibold">Thi thử đề ngẫu nhiên</h3>
                        {/* <span className="bg-green-800 text-white text-xs px-2 py-0.5 rounded-full mt-2 inline-block">B1</span> */}
                    </a>

                    {/* Card 2 */}
                    <div className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition relative cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4">📋</div>
                        <h3 className="text-lg font-semibold">Thi thử bộ đề tạo sẵn</h3>
                        <span className="absolute top-2 right-2 bg-green-900 text-white text-xs px-2 py-0.5 rounded-full">0/10</span>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition relative cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4 text-indigo-700">📘</div>
                        <h3 className="text-lg font-semibold">Ôn tập toàn bộ câu hỏi</h3>
                        <span className="absolute top-2 right-2 bg-indigo-700 text-white text-xs px-2 py-0.5 rounded-full">250</span>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition relative cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4 text-orange-500">⭐</div>
                        <h3 className="text-lg font-semibold">Ôn tập câu điểm liệt</h3>
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">20</span>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition relative cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4 text-red-700">❌</div>
                        <h3 className="text-lg font-semibold">Câu hỏi bị sai nhiều</h3>
                        <span className="absolute top-2 right-2 bg-red-700 text-white text-xs px-2 py-0.5 rounded-full">0/50</span>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-gray-50 p-6 rounded shadow text-center hover:shadow-md transition cursor-pointer border border-gray-200">
                        <div className="text-5xl sm:text-6xl mb-4 text-yellow-500">🚦</div>
                        <h3 className="text-lg font-semibold">Biển báo giao thông</h3>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default MenuBox