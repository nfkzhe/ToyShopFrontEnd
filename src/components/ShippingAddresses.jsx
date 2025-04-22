import { Edit, MapPin } from 'lucide-react';
import React from 'react';

const ShippingAddresses = ({shippingAddresses}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Địa chỉ giao hàng</h3>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-medium py-1.5 px-3 rounded text-sm transition-colors flex items-center">
            <Edit size={14} className="mr-1" /> Thêm địa chỉ mới
        </button>
    </div>

    {shippingAddresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shippingAddresses.map((address) => (
                <div
                    key={address.id}
                    className={`border ${
                        address.isDefault ? 'border-yellow-400' : 'border-gray-200'
                    } rounded-lg p-4 relative`}
                >
                    {address.isDefault && (
                        <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Mặc định
                        </span>
                    )}
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{address.name}</h4>
                        <div className="flex space-x-2">
                            <button className="text-gray-600 hover:text-yellow-700">
                                <Edit size={16} />
                            </button>
                        </div>
                    </div>
                    <p className="font-medium">{address.recipient}</p>
                    <p className="text-gray-600">{address.phone}</p>
                    <p className="text-gray-600 mt-1">{address.address}</p>
                    {!address.isDefault && (
                        <button className="text-yellow-600 hover:text-yellow-700 text-sm mt-2">
                            Đặt làm mặc định
                        </button>
                    )}
                </div>
            ))}
        </div>
    ) : (
        <div className="text-center py-8">
            <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Bạn chưa có địa chỉ giao hàng nào</p>
            <button className="btn-primary">Thêm địa chỉ mới</button>
        </div>
    )}
</div>
  );
};

export default ShippingAddresses;
