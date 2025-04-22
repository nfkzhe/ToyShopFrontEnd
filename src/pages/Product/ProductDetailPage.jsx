'use client';

import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useCart } from '~/contexts/CartContext';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import ProductCard from '~/components/ProductCard';

const ProductDetailPage = () => {
    const location = useLocation();
    const { products } = location.state || {};
    console.log(products);
    const { id } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    // Tìm sản phẩm theo id
    const product = products._id === id ? products : null;

    // Nếu không tìm thấy sản phẩm
    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
                <p className="mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link to="/products" className="btn-primary">
                    Quay lại cửa hàng
                </Link>
            </div>
        );
    }

    // Tính giá sau khi giảm giá
    const discountedPrice =
        product.discount > 0 ? product.ProductPrice * (1 - product.discount / 100) : product.ProductPrice;

    // Xử lý thêm vào giỏ hàng
    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    // Tìm sản phẩm liên quan (cùng danh mục)
    // const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link to="/products" className="text-yellow-600 hover:text-yellow-700">
                    &larr; Quay lại cửa hàng
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-12">
                <div className="flex flex-col md:flex-row">
                    {/* Hình ảnh sản phẩm */}
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <div className="relative">
                            <img
                                src={
                                    product.image && product.image[0]
                                        ? product.image[0].startsWith('http')
                                            ? product.image[0]
                                            : import.meta.env.VITE_API_URL + 'uploads/product/' + product.image[0]
                                        : '/placeholder.svg'
                                }
                                alt={product.ProductName}
                                className="w-full h-auto rounded-lg"
                            />
                            {product.discount > 0 && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                                    -{product.discount}%
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="md:w-1/2 md:pl-8">
                        <h1 className="text-3xl font-bold text-yellow-800 mb-2">{product.ProductName}</h1>

                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-gray-600">(12 đánh giá)</span>
                        </div>

                        <div className="mb-4">
                            {product.discount > 0 ? (
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-yellow-700 mr-3">
                                        {discountedPrice.toLocaleString()}đ
                                    </span>
                                    <span className="text-lg text-gray-500 line-through">
                                        {product.ProductPrice.toLocaleString()}đ
                                    </span>
                                </div>
                            ) : (
                                <span className="text-2xl font-bold text-yellow-700">
                                    {product.ProductPrice.toLocaleString()}đ
                                </span>
                            )}
                        </div>

                        <p className="text-gray-700 mb-6 whitespace-pre-line">{product.ProductDes}</p>

                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <span className="w-24 font-medium">Độ tuổi:</span>
                                <span>{product.ageRange}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <span className="w-24 font-medium">Tình trạng:</span>
                                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                                    {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center mb-6">
                            <div className="flex items-center border border-gray-300 rounded mr-4">
                                <button
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="px-4 py-1">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="btn-primary flex items-center"
                                disabled={!product.inStock}
                            >
                                <ShoppingCart size={18} className="mr-2" />
                                Thêm vào giỏ hàng
                            </button>
                        </div>

                        <div className="flex space-x-4 mb-6">
                            <button className="flex items-center text-gray-600 hover:text-yellow-700">
                                <Heart size={18} className="mr-1" />
                                Yêu thích
                            </button>
                            <button className="flex items-center text-gray-600 hover:text-yellow-700">
                                <Share2 size={18} className="mr-1" />
                                Chia sẻ
                            </button>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center">
                                    <Truck size={18} className="text-yellow-600 mr-2" />
                                    <span className="text-sm">Giao hàng miễn phí</span>
                                </div>
                                <div className="flex items-center">
                                    <Shield size={18} className="text-yellow-600 mr-2" />
                                    <span className="text-sm">Bảo hành 12 tháng</span>
                                </div>
                                <div className="flex items-center">
                                    <RotateCcw size={18} className="text-yellow-600 mr-2" />
                                    <span className="text-sm">Đổi trả trong 30 ngày</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sản phẩm liên quan */}
            {/* {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="section-title">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )} */}
        </div>
    );
};

export default ProductDetailPage;
