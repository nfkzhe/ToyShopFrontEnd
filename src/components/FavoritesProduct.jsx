import { Heart } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesProduct = ({favoriteProducts}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4">Sản phẩm yêu thích</h3>

    {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative">
                        <img
                            src={product.image || '/placeholder.svg'}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        {product.discount > 0 && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                -{product.discount}%
                            </div>
                        )}
                        <button className="absolute top-2 left-2 text-red-500 bg-white p-1.5 rounded-full shadow-md">
                            <Heart size={16} fill="currentColor" />
                        </button>
                    </div>
                    <div className="p-4">
                        <h4 className="font-medium mb-1">{product.name}</h4>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                            <div>
                                {product.discount > 0 ? (
                                    <div className="flex items-center">
                                        <span className="font-bold text-yellow-700">
                                            {calculateDiscountedPrice(
                                                product.price,
                                                product.discount,
                                            ).toLocaleString()}
                                            đ
                                        </span>
                                        <span className="text-sm text-gray-500 line-through ml-2">
                                            {product.price.toLocaleString()}đ
                                        </span>
                                    </div>
                                ) : (
                                    <span className="font-bold text-yellow-700">
                                        {product.price.toLocaleString()}đ
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                            <Link
                                to={`/products/${product.id}`}
                                className="flex-1 text-center py-1.5 border border-yellow-400 text-yellow-700 rounded hover:bg-yellow-50 transition-colors text-sm"
                            >
                                Xem chi tiết
                            </Link>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 py-1.5 rounded transition-colors text-sm"
                            >
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div className="text-center py-8">
            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Bạn chưa có sản phẩm yêu thích nào</p>
            <Link to="/products" className="btn-primary">
                Khám phá sản phẩm
            </Link>
        </div>
    )}
</div>
  );
};

export default FavoritesProduct;
