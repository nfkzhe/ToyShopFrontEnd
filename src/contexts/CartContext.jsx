import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from "./AuthContex"; // Giả sử đã có AuthContext
import { addCart, getCart } from '~/untils/ApiHelper'; // API lấy giỏ hàng từ server

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const isInitialized = useRef(false); // 👈 Cờ để tránh đồng bộ sớm

  // Lấy giỏ hàng từ server khi đã đăng nhập
  useEffect(() => {
    const syncCartFromServer = async () => {
      if (user) {
        try {
          const response = await getCart(); // API lấy từ DB
          const serverCart = response.cart || [];
          setCartItems(serverCart); // ✅ KHÔNG gọi addCart ở đây
          localStorage.setItem("toyshop-cart", JSON.stringify(serverCart));
          isInitialized.current = true; // ✅ Đánh dấu đã khởi tạo xong
        } catch (error) {
          console.error("Lỗi khi đồng bộ giỏ hàng từ server:", error);
        }
      }
    };

    syncCartFromServer();
  }, [user]);

  // Sync giỏ hàng lên server mỗi khi thay đổi (sau khi đã load lần đầu)
  useEffect(() => {
    const syncToServer = async () => {
      if (user && isInitialized.current) {
        try {
          await addCart(cartItems);
        } catch (error) {
          console.error("Lỗi khi đồng bộ giỏ hàng lên server:", error);
        }
      }
    };
    syncToServer();
  }, [cartItems, user]);

  // Giữ localStorage đồng bộ
  useEffect(() => {
    localStorage.setItem("toyshop-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Các hàm xử lý cart giữ nguyên
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item._id === product._id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount > 0 ? item.ProductPrice * (1 - item.discount / 100) : item.ProductPrice;
      return total + price * item.quantity;
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
