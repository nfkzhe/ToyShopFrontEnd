import React from 'react';
import { User, Package, MapPin, Heart, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ user, activeTab, setActiveTab, BASE_URL }) => {
    return (
        <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-yellow-400 text-yellow-900">
                    <div className="flex items-center">
                        <img
                            src={
                                user.avatar ? `${BASE_URL}uploads/avatar/${user.avatar}` : '/placeholder.svg'
                            }
                            alt={user.ten}
                            className="w-12 h-12 rounded-full mr-3 border-2 border-white"
                        />
                        <div>
                            <h3 className="font-semibold">{user.ten}</h3>
                            <p className="text-sm">{user.email}</p>
                        </div>
                    </div>
                </div>

                <nav className="p-2">
                    <ul className="space-y-1">
                        <li>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                                    activeTab === 'profile'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'hover:bg-gray-100 text-gray-700'
                                }`}
                            >
                                <User size={18} className="mr-2" />
                                Thông tin cá nhân
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                                    activeTab === 'orders'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'hover:bg-gray-100 text-gray-700'
                                }`}
                            >
                                <Package size={18} className="mr-2" />
                                Đơn hàng của tôi
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('addresses')}
                                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                                    activeTab === 'addresses'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'hover:bg-gray-100 text-gray-700'
                                }`}
                            >
                                <MapPin size={18} className="mr-2" />
                                Địa chỉ giao hàng
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('favorites')}
                                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                                    activeTab === 'favorites'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'hover:bg-gray-100 text-gray-700'
                                }`}
                            >
                                <Heart size={18} className="mr-2" />
                                Sản phẩm yêu thích
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                                    activeTab === 'settings'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'hover:bg-gray-100 text-gray-700'
                                }`}
                            >
                                <Settings size={18} className="mr-2" />
                                Cài đặt tài khoản
                            </button>
                        </li>
                        <li className="pt-2 mt-2 border-t border-gray-200">
                            <button className="w-full flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors">
                                <LogOut size={18} className="mr-2" />
                                Đăng xuất
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
