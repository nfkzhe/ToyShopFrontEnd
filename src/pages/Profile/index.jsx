import { useEffect, useState } from 'react';
import { useAuth } from '~/contexts/AuthContex'; // Import useAuth để lấy thông tin user từ context
import { User, Package, MapPin, Heart, Settings, LogOut, Edit, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getOrdersByUser, getUserAddresses, getUserFavorites } from '~/untils/ApiHelper';
import Sidebar from '~/components/Sidebar';
import TabContent from '~/components/TabContent';
import AvatarUploader from '~/components/AvatarUpload';
const BASE_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { user, isAuthenticated } = useAuth(); // Lấy thông tin người dùng từ AuthContext
    const [activeTab, setActiveTab] = useState('profile');
    const [avatar, setAvatar] = useState(user.avatar);
    const [showAvatarUploader, setShowAvatarUploader] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (!isAuthenticated) {
          // Nếu chưa đăng nhập, điều hướng về trang login
          navigate("/login", { state: { from: location.pathname } });
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (activeTab === 'orders') fetchOrderHistory();
        if (activeTab === 'address') fetchAddresses();
        if (activeTab === 'favorites') fetchFavorites();
    }, [activeTab]);

    const fetchOrderHistory = async () => {
        setLoading(true)
        try {
            const res = await getOrdersByUser();
            if (res.data) {
                setOrderHistory(res.data);
            } else {
                setOrderHistory([]);
            }
        } catch (err) {
            console.error('Lỗi khi lấy lịch sử đơn hàng:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAddresses = async () => {
        setLoading(true)
        try {
            const res = await getUserAddresses();
            if (res.data) {
                setShippingAddresses(res.data);
            } else {
                setShippingAddresses([]);
            }
        } catch (err) {
            console.error('Lỗi khi lấy địa chỉ:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchFavorites = async () => {
        setLoading(true)
        try {
            const res = await getUserFavorites();
            if (res.data) {
                setFavoriteProducts(res.data);
            } else {
                setFavoriteProducts([]);
            }
        } catch (err) {
            console.error('Lỗi khi lấy sản phẩm yêu thích:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setAvatar(user.avatar);
    }, [user.avatar]);
    return (
        <div className="container mx-auto px-4 py-8">
            {showAvatarUploader && (
                <AvatarUploader
                    onClose={() => setShowAvatarUploader(false)}
                    onSuccess={() => setShowAvatarUploader(false)}
                />
            )}
            <h1 className="text-3xl font-bold text-yellow-800 mb-8">Tài khoản của tôi</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} avatar={avatar} BASE_URL={BASE_URL}/>

                {/* Main content */}
                <div className="flex-grow">
                    <TabContent
                        activeTab={activeTab}
                        user={user}
                        orderHistory={orderHistory}
                        shippingAddresses={shippingAddresses}
                        favoriteProducts={favoriteProducts}
                        setShowAvatarUploader={setShowAvatarUploader}
                        BASE_URL={BASE_URL}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
