import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addProduct, updateProduct, uploadProductImg } from '~/untils/ApiHelper';
import { Search, Plus, Edit, Trash2, Filter, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
const ProductModal = ({ isModalOpen, setIsModalOpen, selectedProduct, categories, fetchProducts }) => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        ProductName: '',
        ProductDes: '',
        ProductPrice: '',
        discount: '',
        categoryId: '',
        inStock: false,
        featured: false,
        image: [],
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                ProductName: selectedProduct.ProductName,
                ProductDes: selectedProduct.ProductDes,
                ProductPrice: selectedProduct.ProductPrice,
                discount: selectedProduct.discount,
                categoryId: selectedProduct.categoryId,
                inStock: selectedProduct.inStock,
                featured: selectedProduct.featured,
                image: selectedProduct.image || [],
            });
        }
    }, [selectedProduct]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const formDataToSend = new FormData();

        files.forEach((file) => {
            formDataToSend.append('images', file);
        });

        try {
            const response = await uploadProductImg(formDataToSend);
            console.log('Uploaded images:', response.images);
            if (response) {
                const uploadedImages = response.images;

                setFormData((prevState) => ({
                    ...prevState,
                    image: [...(prevState.image || []), ...uploadedImages], // dùng `image` luôn là mảng tên ảnh
                }));
            }
        } catch (error) {
            console.error('Lỗi khi upload ảnh:', error);
            alert('Có lỗi khi upload ảnh, vui lòng thử lại.');
        }
    };
    const handleRemoveImage = (index) => {
        const updatedImages = formData.image.filter((_, i) => i !== index);
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: updatedImages,
        }));
    };
    const handleSaveProduct = async (e) => {
        e.preventDefault();

        const productData = {
            ProductName: formData.ProductName,
            ProductDes: formData.ProductDes,
            ProductPrice: formData.ProductPrice,
            discount: formData.discount,
            categoryId: formData.categoryId,
            inStock: formData.inStock,
            featured: formData.featured,
            image: formData.image, // đây là array tên ảnh
        };
        console.log('🧾 Dữ liệu sản phẩm gửi đi:', productData);
        setIsSaving(true);
        try {
            let response;
            if (selectedProduct) {
                response = await updateProduct(selectedProduct._id, productData);
                console.log('🧾 Response update:', response);
            } else {
                response = await addProduct(productData);
            }
            if (response.data) {
                fetchProducts();
                await fetchProducts(); // cập nhật danh sách
                setTimeout(() => {
                    setIsSaving(false);
                    setIsModalOpen(false); // tắt modal sau 1.5s
                }, 1500);
            }
        } catch (error) {
            console.error('Lỗi khi lưu sản phẩm:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
            setIsSaving(false);
        }
    };

    return (
        isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Overlay mờ */}
                    {isSaving && (
                        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-lg">
                            <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <div className={`${isSaving ? 'opacity-50' : ''}`}>
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-lg font-semibold">
                                {selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProduct} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        name="ProductName"
                                        value={formData.ProductName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                    <textarea
                                        name="ProductDes"
                                        value={formData.ProductDes}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá (đ)</label>
                                    <input
                                        type="number"
                                        name="ProductPrice"
                                        value={formData.ProductPrice}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giảm giá (%)</label>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                                    <select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.CateName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="inStock"
                                        name="inStock"
                                        checked={formData.inStock}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                                        Còn hàng
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                                        Sản phẩm nổi bật
                                    </label>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.image &&
                                            formData.image.map((imgName, index) => (
                                                <div key={index} className="relative w-20 h-20">
                                                    <img
                                                        src={`${BASE_URL}uploads/product/${imgName}`}
                                                        alt={`Product ${index}`}
                                                        className="object-cover w-full h-full rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                    </div>
                                    <div>
                                        <label className="block">
                                            <span className="sr-only">Chọn hình ảnh</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageUpload}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                                            />
                                        </label>
                                        <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF tối đa 5MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-white px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    Lưu sản phẩm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductModal;
