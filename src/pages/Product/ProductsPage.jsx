import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '~/components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { getAllCategories, getProductsByCategory, getAllProduct } from '~/untils/ApiHelper';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState(
    categoryParam ? [categoryParam] : []
  );
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const lastProductRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const getCategories = async () => {
    try {
      const response = await getAllCategories();
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      }
    } catch (error) {
    }
  };

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    try {
      let response;
      if (selectedCategories.length === 0) {
        response = await getAllProduct(`page=${pageNumber}&limit=8`);
      } else {
        response = await getProductsByCategory(selectedCategories.join(','), pageNumber, 8);
      }

      if (response && response.data) {
        const newProducts = response.data;

        if (pageNumber === 1) {
          setProducts(newProducts);
          setFilteredProducts(newProducts);
        } else {
          setProducts(prev => [...prev, ...newProducts]);
          setFilteredProducts(prev => [...prev, ...newProducts]);
        }

        if (newProducts.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("❌ Lỗi fetch sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    fetchProducts(1);
  }, []);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1);
  }, [selectedCategories]);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.ProductDes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.categoryId));
    }

    result = result.filter(product => {
      const price = product.discount > 0
        ? product.ProductPrice * (1 - product.discount / 100)
        : product.ProductPrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategories, priceRange, products]);

  useEffect(() => {
    if (page === 1) return;
    fetchProducts(page);
  }, [page]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-yellow-800 mb-8">Tất cả sản phẩm</h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-6 relative">
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-r flex items-center"
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Bộ lọc
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Bộ lọc */}
        {showFilters && (
          <div className="w-full md:w-64 md:mr-8 mb-6 md:mb-0 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-bold text-lg mb-4 text-yellow-800">Bộ lọc</h2>

              {/* Lọc theo danh mục */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Danh mục</h3>
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`category-${category._id}`}
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category._id}`}>{category.CateName}</label>
                  </div>
                ))}
              </div>

              {/* Lọc theo giá */}
              <div>
                <h3 className="font-semibold mb-2">Giá (đ)</h3>
                <div className="flex justify-between mb-2">
                  <span>{priceRange[0].toLocaleString()}</span>
                  <span>{priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Danh sách sản phẩm */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => {
                const isLast = index === filteredProducts.length - 1;
                return (
                  <div
                    key={product._id}
                    ref={isLast ? lastProductRef : null}
                  >
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Không tìm thấy sản phẩm phù hợp.</p>
            </div>
          )}

          {/* Hiệu ứng loading khi scroll */}
          {loading && (
            <div className="text-center mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-yellow-500 mx-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
