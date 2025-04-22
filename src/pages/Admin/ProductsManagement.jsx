'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Filter, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { deleteProduct, getAllCategories, getAllProduct, getProducts, getProductsByCategory } from '~/untils/ApiHelper';
import ProductModal from '~/components/Admin/ProductModal';
import ProductTable from '~/components/Admin/ProductTable';
import DeleteModal from '~/components/Admin/DeletedModal';

const ProductsManagement = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        ProductName: '',
        ProductDes: '',
        ProductPrice: '',
        discount: '0',
        categoryId: '',
        inStock: true,
        featured: false,
        image: [],
    });

    const productsPerPage = 10;

    const fetchInitialData = async () => {
        try {
            const [productRes, categoryRes] = await Promise.all([
                getProducts(),
                getAllCategories()
            ]);
            setProducts(productRes.data);
            setCategories(categoryRes.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        let result = [...products];

        if (searchTerm) {
            result = result.filter(
                (product) =>
                    product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.ProductDes.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        if (selectedCategory) {
            result = result.filter((product) => product.categoryId === selectedCategory);
        }

        setFilteredProducts(result);
    }, [products, searchTerm, selectedCategory]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setFormData({
            ProductName: '',
            ProductDes: '',
            ProductPrice: '',
            discount: '0',
            categoryId: '',
            inStock: true,
            featured: false,
            image: [],
        });
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setFormData({
            ProductName: product.ProductName,
            ProductDes: product.ProductDes,
            ProductPrice: product.ProductPrice.toString(),
            discount: product.discount.toString(),
            categoryId: product.categoryId,
            inStock: product.inStock,
            featured: product.featured,
            image: product.image || [],
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(selectedProduct._id);
            fetchInitialData()
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
                <button
                    onClick={handleAddProduct}
                    className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={20} className="mr-2" />
                    Thêm sản phẩm
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="md:w-64">
                        <div className="relative">
                            <Filter
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="">Tất cả danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.CateName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <ProductTable currentProducts={currentProducts} categories={categories} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} handleEditProduct={handleEditProduct} handleDeleteClick={handleDeleteClick} filteredProducts={filteredProducts}/>

            {/* Add/Edit Product Modal */}
            <ProductModal isModalOpen={isModalOpen} selectedProduct={selectedProduct} categories={categories} setIsModalOpen={setIsModalOpen} fetchProducts={fetchInitialData}/>
            {/* {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
                                        name="name"
                                        value={formData.ProductName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                    <textarea
                                        name="description"
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
                                        name="price"
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
                                        name="category"
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
                                    <div className="flex items-center space-x-4">
                                        <div className="w-24 h-24 border border-gray-300 rounded-lg overflow-hidden">
                                            <img
                                                src={formData.image || '/placeholder.svg'}
                                                alt="Product preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <label className="block">
                                                <span className="sr-only">Chọn hình ảnh</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                                                />
                                            </label>
                                            <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF tối đa 5MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                                >
                                    {selectedProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}

            {/* Delete Confirmation Modal */}
            <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteProduct} productName={selectedProduct?.ProductName}/>
        </div>
    );
};

export default ProductsManagement;
