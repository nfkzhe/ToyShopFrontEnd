import React from 'react';

const Settings = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4">Cài đặt tài khoản</h3>

    <div className="space-y-6">
        <div>
            <h4 className="font-medium mb-3">Thông báo</h4>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label htmlFor="email-notification" className="flex-grow">
                        Nhận thông báo qua email
                    </label>
                    <input
                        type="checkbox"
                        id="email-notification"
                        defaultChecked
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="sms-notification" className="flex-grow">
                        Nhận thông báo qua SMS
                    </label>
                    <input
                        type="checkbox"
                        id="sms-notification"
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="promo-notification" className="flex-grow">
                        Nhận thông tin khuyến mãi
                    </label>
                    <input
                        type="checkbox"
                        id="promo-notification"
                        defaultChecked
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    />
                </div>
            </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-3">Ngôn ngữ</h4>
            <select className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
            </select>
        </div>

        <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-3">Xóa tài khoản</h4>
            <p className="text-gray-600 mb-3">
                Khi xóa tài khoản, tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn và không thể khôi
                phục.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors">
                Xóa tài khoản
            </button>
        </div>
    </div>
</div>
  );
};

export default Settings;
