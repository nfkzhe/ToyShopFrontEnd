import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Xác nhận xóa</h3>
                    <p className="text-gray-700 mb-6">
                        Bạn có chắc chắn muốn xóa sản phẩm "{productName}"? Hành động này không thể hoàn tác.
                    </p>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
