
const RandomStructure = () => {
    return (
        <div className="container">
            {/* Tiêu đề */}
            <div className="mx-auto bg-gray-50 rounded-sm shadow p-4 md:p-6">
                <h1 className="text-xl md:text-2xl font-semibold mb-4 border-b pb-2">
                    THI ĐỀ NGẪU NHIÊN HẠNG A1
                </h1>

                {/* Nội dung chia 2 cột */}
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    {/* Cấu trúc đề thi */}
                    <div className="flex-1">
                        <h2 className="font-semibold text-xl pb-1 mb-3">
                            Cấu trúc đề thi
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-lg">
                            <li>
                                Thời gian làm bài:{" "}
                                <span className="font-bold text-gray-800">19 phút</span>
                            </li>
                            <li>
                                Tổng số câu hỏi:{" "}
                                <span className="font-bold text-blue-600">25</span>
                            </li>
                            <li>
                                Điểm tối thiểu đạt:{" "}
                                <span className="font-bold text-green-600">21/25</span>
                            </li>
                            <li>
                                Số câu điểm liệt:{" "}
                                <span className="font-bold text-red-600">1</span>
                            </li>
                        </ul>
                    </div>

                    {/* Kết quả gần nhất */}
                    <div className="flex-1">
                        <p className="mb-2 text-lg">
                            Đề thi ngẫu nhiên được tạo từ các câu hỏi trong ngân hàng câu hỏi.
                            Đề thi sẽ giống như cấu trúc đề thi thật. Bạn có muốn bắt đầu làm 1
                            đề thi ngẫu nhiên không?
                        </p>
                    </div>
                </div>

                {/* Nút bắt đầu */}
                <div className="flex items-center space-x-4 justify-end mt-4">
                    <a href="/"
                        className="bg-red-500 hover:bg-red-600 text-white border border-red-600 font-normal rounded-sm text-base px-3 py-2">
                        Hủy
                    </a>
                    <a href="/de-ngau-nhien"
                        className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-500 hover:border-blue-600 font-normal rounded-sm text-base px-3 py-2">
                        Bắt đầu
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomStructure;