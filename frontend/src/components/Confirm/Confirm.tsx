import React from "react";

interface ConfirmProps {
    toggleResult: () => void;
    onCancel: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ toggleResult, onCancel }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
                <h2 className="text-lg font-semibold text-black mb-4">
                    Bạn có chắc chắn muốn kết thúc bài thi?
                </h2>
                <p className="text-gray-500 mb-6">
                    Nếu đồng ý, hệ thống sẽ hiển thị kết quả của bạn.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={toggleResult}
                        className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow"
                    >
                        Đồng ý
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
