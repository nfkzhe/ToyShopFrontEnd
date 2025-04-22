'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '~/contexts/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleIncrement = () => {
        updateQuantity(item._id, item.quantity + 1);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            updateQuantity(item._id, item.quantity - 1);
        }
    };

    const handleRemove = () => {
        removeFromCart(item._id);
    };

    // Tính giá sau khi giảm giá
    const discountedPrice = item.discount > 0 ? item.ProductPrice * (1 - item.discount / 100) : item.ProductPrice;

    const totalPrice = discountedPrice * item.quantity;

    return (
        <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200">
            <div className="sm:w-24 w-full mb-4 sm:mb-0 sm:mr-4">
                <img
                    src={
                        item.image && item.image[0]
                            ? item.image[0].startsWith('http')
                                ? item.image[0]
                                : import.meta.env.VITE_API_URL + 'uploads/product/' + item.image[0]
                            : '/placeholder.svg'
                    }
                    alt={item.ProductName}
                    className="w-24 h-24 object-cover rounded"
                />
            </div>

            <div className="flex-grow sm:mr-4">
                <h3 className="font-semibold text-yellow-800">{item.ProductName}</h3>
                <div className="flex items-center mt-1">
                    {item.discount > 0 ? (
                        <>
                            <span className="font-medium text-yellow-700">{discountedPrice.toLocaleString()}đ</span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                                {item.ProductPrice.toLocaleString()}đ
                            </span>
                        </>
                    ) : (
                        <span className="font-medium text-yellow-700">{item.ProductPrice.toLocaleString()}đ</span>
                    )}
                </div>
            </div>

            <div className="flex items-center mt-4 sm:mt-0">
                <div className="flex items-center border border-gray-300 rounded">
                    <button
                        onClick={handleDecrement}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                    >
                        <Minus size={16} />
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button onClick={handleIncrement} className="px-2 py-1 text-gray-600 hover:bg-gray-100">
                        <Plus size={16} />
                    </button>
                </div>

                <button onClick={handleRemove} className="ml-4 text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="font-bold text-yellow-800 mt-4 sm:mt-0 sm:ml-4 sm:text-right">
                {totalPrice.toLocaleString()}đ
            </div>
        </div>
    );
};

export default CartItem;
