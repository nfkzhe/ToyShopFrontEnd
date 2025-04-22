import { Edit } from 'lucide-react';
import React from 'react';

const ProfileInfo = ({ user, setShowAvatarUploader, BASE_URL }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={
                                user.avatar ? `${BASE_URL}uploads/avatar/${user.avatar}` : '/placeholder.svg'
                            }
                            alt={user.ten}
                            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
                        />
                        <button
                            className="absolute bottom-0 right-0 bg-yellow-400 text-yellow-900 p-2 rounded-full"
                            onClick={() => setShowAvatarUploader(true)}
                        >
                            <Edit size={16} />
                        </button>
                    </div>
                    <h2 className="text-xl font-bold mt-4">{user.ten}</h2>
                    <p className="text-gray-600 font-bold">{user.email}</p>
                </div>

                <div className="w-full md:w-2/3">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
                        <button className="text-yellow-600 hover:text-yellow-700 flex items-center">
                            <Edit size={16} className="mr-1" /> Chỉnh sửa
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600 mb-1">Họ và tên</p>
                            <p className="font-bold">{user.ten}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Email</p>
                            <p className="font-bold">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Số điện thoại</p>
                            <p className="font-bold">{user.phone}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Địa chỉ</p>
                            <p className="font-bold">{user.address}</p>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Bảo mật</h3>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium py-2 px-4 rounded transition-colors">
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
