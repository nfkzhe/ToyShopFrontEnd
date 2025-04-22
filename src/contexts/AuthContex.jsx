import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logOut, register } from '~/untils/ApiHelper';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);  // Thêm loading để kiểm tra quá trình tải

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);  // Bắt đầu tải dữ liệu
    try {
      const response = await getProfile();
      if (response) {
        setUser(response.data);
        setRole(response.data?.role || 'user');
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('❌ Lỗi khi gọi getProfile', error);
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);  // Xử lý xong thì set loading = false
    }
  };

  const login = () => {
    fetchUserData();
  };

  const logout = async () => {
    try {
      await logOut();
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      navigate('/login');
    } catch (e) {
      console.error("Đăng xuất lỗi:", e);
    }
  };

  const registerUser = async (data) => {
    try {
      const res = await register(data); // gọi API đăng ký
      // Bạn có thể thêm logic sau khi đăng ký thành công nếu cần
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await getProfile();
      if (response) {
        setUser(response.data);
        setRole(response.data?.role || 'user');
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("❌ Lỗi khi làm mới user:", error);
    }
  };

  const updateAvatar = (newAvatarUrl) => {
    const updated = { ...user, avatar: newAvatarUrl };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    return updated;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      isAuthenticated, 
      loading,  // Trả về loading
      login, 
      logout, 
      registerUser, 
      refreshUser, 
      updateAvatar 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
