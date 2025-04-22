import { ChevronRight, Package } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Orders = ({orderHistory}) => {
        const calculateDiscountedPrice = (price, discount) => {
            return discount > 0 ? price * (1 - discount / 100) : price;
        };
  return (
<div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Lịch sử đơn hàng</h3>

                        {orderHistory.length > 0 ? (
                            <div className="space-y-6">
                                {orderHistory.map((order) => (
                                    <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                            <div>
                                                <div className="flex items-center">
                                                    <span className="font-semibold mr-2">Mã đơn hàng: {order._id}</span>
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded ${
                                                            order.status === 'Đã giao hàng'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-blue-100 text-blue-800'
                                                        }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm mt-1">Ngày đặt: {order.date}</p>
                                            </div>
                                            <div className="mt-2 sm:mt-0">
                                                <p className="font-semibold text-yellow-800">
                                                    Tổng tiền: {order.total.toLocaleString()}đ
                                                </p>
                                                <button className="text-yellow-600 hover:text-yellow-700 text-sm mt-1 flex items-center">
                                                    Xem chi tiết <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <h4 className="font-medium mb-2">Sản phẩm</h4>
                                            <div className="space-y-3">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex items-center">
                                                        <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 mr-3"></div>
                                                        <div className="flex-grow">
                                                            <p className="font-medium">{item.name}</p>
                                                            <div className="flex justify-between text-sm text-gray-600">
                                                                <span>SL: {item.quantity}</span>
                                                                <span>
                                                                    {calculateDiscountedPrice(
                                                                        item.price,
                                                                        item.discount,
                                                                    ).toLocaleString()}
                                                                    đ
                                                                    {item.discount > 0 && (
                                                                        <span className="line-through ml-2 text-gray-500">
                                                                            {item.price.toLocaleString()}đ
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào</p>
                                <Link to="/products" className="btn-primary">
                                    Mua sắm ngay
                                </Link>
                            </div>
                        )}
                    </div>
  );
};

export default Orders;
