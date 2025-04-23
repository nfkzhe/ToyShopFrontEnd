import axios from 'axios';
import AxiosInstance from './AxiosInstance';

// đăng ký tài khoản
const register = async (data) => {
    try {
        const { email, password, name } = data;
        const body = {
            email: email,
            pass: password,
            ten: name,
        };
        const response = await AxiosInstance().post('/api/user/register', body);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
};

const login = async (data) => {
    try {
        const { email, pass } = data;
        const body = { email, pass };

        const response = await AxiosInstance().post('/api/user/login', body);

        if (response.status === 200) {
            return response.data; // Không cần trả về token nữa
        }
    } catch (error) {
        console.log(error);
    }
    return null;
};

const logOut = async () => {
    try {
        const response = await AxiosInstance().post('/api/user/logout');
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
};

// lấy danh sách tất cả danh mục
const getAllCategories = async () => {
    try {
        const response = await AxiosInstance().get('/api/categories/');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
    return [];
};

const getAllProduct = async (query = '') => {
    try {
        const res = await AxiosInstance().get(`/api/product?${query}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
const getProducts = async ()=> {
    try {
        const res = await AxiosInstance().get(`/api/products/`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

// lấy danh sách tất cả sản phẩm theo 1 danh mục
const getProductsByCategory = async (categoryIds, page = 1, limit = 8) => {
    try {
        const response = await AxiosInstance().get(
            `/api/product/getByCate?category=${categoryIds}&page=${page}&limit=${limit}`,
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
};
// lấy chi tiết 1 sản phẩm
const getProductDetail = async (productId) => {
    try {
        const response = await AxiosInstance().get(`/api/products/detail/${productId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log('Unexpected response:', response);
        }
    } catch (error) {
        console.log('Error fetching product details:', error);
    }
    return null; // Return null if the request fails
};

const getTopSold = async () => {
    try {
        const response = await AxiosInstance().get(`/api/products/topsell`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};
const getUser = async () => {
    try {
        const response = await AxiosInstance().get(`/api/user/`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

const getCart = async () => {
    try {
        const response = await AxiosInstance().get(`/api/cart`);
        return response.data; // Trả về dữ liệu giỏ hàng
    } catch (error) {
        console.log(error);
        return { cart: [] }; // Trả về giỏ hàng rỗng nếu có lỗi
    }
};

// Cập nhật giỏ hàng lên server
const addCart = async (cartItems) => {
    try {
        const response = await AxiosInstance().post(`/api/cart`, { cart: cartItems });
        return response.data; // Trả về kết quả sau khi thêm giỏ hàng lên server
    } catch (error) {
        console.log(error);
    }
};

const getProfile = async () => {
    try {
        const response = await AxiosInstance().get('/api/user/profile'); // Gọi API profile để lấy thông tin người dùng
        return response.data;
    } catch (error) {
        console.error('Failed to fetch profile:', error);
        return null;
    }
};

// lấy danh sách đơn hàng của user
const getOrders = async () => {
    try {
        const response = await AxiosInstance().get('/api/orders');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
    return [];
};
const getOrdersByUser = async () => {
    try {
        const response = await AxiosInstance().get('/api/orders/user/');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
    return [];
};

// lấy chi tiết 1 đơn hàng
const getOrderDetail = async (orderId) => {
    try {
        const response = await AxiosInstance().get(`/api/orders/${orderId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(`Error fetching order detail for ID ${orderId}:`, error);
    }
    return null;
};

// lấy danh sách sản phẩm nổi bật
const getFeaturedProducts = async () => {
    try {
        const response = await AxiosInstance().get('/api/products/featured');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching featured products:', error);
    }
    return [];
};

// lấy danh sách sản phẩm giảm giá
const getDiscountedProducts = async () => {
    try {
        const response = await AxiosInstance().get('/api/products/discounted');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching discounted products:', error);
    }
    return [];
};

const getUserAddresses = async () => {
    try {
        const response = await AxiosInstance().get('/api/user/addresses');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching user addresses:', error);
    }
    return [];
};
const getUserFavorites = async () => {
    try {
        const response = await AxiosInstance().get('/api/user/favorites');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching user favorites:', error);
    }
    return [];
};
const uploadUserAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    return AxiosInstance('multipart/form-data').post('/api/user/upload-avatar', formData, {
        withCredentials: true,
    });
};

const getSettings = async () => {
    try {
        const response = await AxiosInstance().get('/api/settings');
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        console.error('Lỗi lấy cài đặt:', err);
        return null;
    }
};

const addProduct = async (formDataToSend) => {
    try {
        const response = await AxiosInstance().post('/api/product/addProduct', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        throw error; // Throw error để có thể xử lý tại nơi gọi hàm
    }
};

const updateProduct = async (productId, formDataToSend) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
        const response = await AxiosInstance().put(`/api/product/${productId}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        throw error; // Throw error để có thể xử lý tại nơi gọi hàm
    }
};
const uploadProductImg = async (formDataToSend) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
        const response = await axios.post(`${apiUrl}api/product/upload/product-images`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi tải ảnh sản phẩm:', error);
        throw error; // Throw error để có thể xử lý tại nơi gọi hàm
    }
};

const deleteProduct = async (productId) => {
    try {
        const response = await AxiosInstance().delete(`api/product/${productId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Lỗi khi tải ảnh sản phẩm:', error);
        throw error; // Throw error để có thể xử lý tại nơi gọi hàm
    }
}

export const getAdminOverview = async () => {
    try {
        const response = await AxiosInstance().get('/api/admin/overview', {
            withCredentials: true, // Đảm bảo token trong cookie được gửi
          });

        if( response.status === 200) {
            return response.data
        }
    }catch (error) {
        console.error('Error fetching admin overview:', error);
    }
  };
  
  // Lấy dữ liệu biểu đồ doanh thu theo thời gian
  export const getRevenueChart = async () => {
    try {
        const response = await AxiosInstance().get('/api/admin/revenue-chart', {
            withCredentials: true, // Đảm bảo token trong cookie được gửi
          });
        if( response.status === 200) {
            return response.data
        }
    }catch (error) {
        console.error('Error fetching admin overview:', error);
    }
  };
  
  // Lấy dữ liệu phân bố sản phẩm theo danh mục
  export const getCategoryDistribution = async () => {
    try {
        const response = await AxiosInstance().get('/api/admin/category-distribution', {
            withCredentials: true, // Đảm bảo token trong cookie được gửi
          });
        if( response.status === 200) {
            return response.data
        }
    }catch (error) {
        console.error('Error fetching admin overview:', error);
    }
  };
  
  // Lấy danh sách sản phẩm bán chạy
  export const getTopProducts = async () => {
    try {
        const response = await AxiosInstance().get('/api/admin/top-products', {
            withCredentials: true, // Đảm bảo token trong cookie được gửi
          });
        if( response.status === 200) {
            return response.data
        }
    }catch (error) {
        console.error('Error fetching admin overview:', error);
    }
  };
  
  // Lấy danh sách đơn hàng gần đây
  export const getRecentOrders = async () => {
    try {
        const response = await AxiosInstance().get('/api/admin/recent-orders', {
            withCredentials: true, // Đảm bảo token trong cookie được gửi
          });
        if( response.status === 200) {
            return response.data
        }
    }catch (error) {
        console.error('Error fetching admin overview:', error);
    }
  };
export {
    //AUTH
    register,
    login,
    logOut,
    //GET CATEGORY-PRODUCT
    getAllCategories,
    getProductsByCategory,
    getProductDetail,
    getTopSold,
    getAllProduct,
    getProducts,
    getFeaturedProducts,
    getDiscountedProducts,
    //USER
    getUser,
    getProfile,
    getUserAddresses,
    getUserFavorites,
    getCart,
    getOrdersByUser,
    uploadUserAvatar,
    //ADDCART
    addCart,
    //ORDER
    getOrders,
    getOrderDetail,
    //
    getSettings,
    //CRUD PRODUCT
    addProduct,
    updateProduct,
    uploadProductImg,
    deleteProduct,
};
