interface TimeoutProps {
    toggleResult: () => void;
}

const Timeout: React.FC<TimeoutProps> = ({ toggleResult }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white p-6 rounded shadow text-center">
                <h2 className="text-xl font-bold text-red-500">⏰ Hết giờ làm bài!</h2>
                <p className="mt-2">Hệ thống đã tự động nộp bài của bạn.</p>

                <div className="mt-4 flex justify-center">
                    <button
                        onClick={toggleResult}
                        className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow"
                    >
                        Xem kết quả
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Timeout