import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '~/contexts/CartContext';
import { useAuth } from '~/contexts/AuthContex';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

const Navbar = () => {
    const { cartItems } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Reset dropdown state when user logs in or out
    useEffect(() => {
        setDropdownOpen(false); // Always close the dropdown when user logs in or out
    }, [user]);

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-yellow-50 text-yellow-900 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold flex items-center">
                        <img src="/logo.png" className="h-10" alt="Logo" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="hover:text-yellow-700 font-medium">
                            Trang chủ
                        </Link>
                        <Link to="/products" className="hover:text-yellow-700 font-medium">
                            Sản phẩm
                        </Link>
                        <Link to="/about" className="hover:text-yellow-700 font-medium">
                            Giới thiệu
                        </Link>
                        <Link to="/contact" className="hover:text-yellow-700 font-medium">
                            Liên hệ
                        </Link>

                        {/* User Section */}
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-2 hover:text-yellow-700"
                                >
                                    <User className="w-5 h-5" />
                                    <span>{user.ten}</span>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded p-2 z-10">
                                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded">
                                            Trang cá nhân
                                        </Link>

                                        {user.role === 'admin' && (
                                            <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 rounded">
                                                Quản trị
                                            </Link>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="hover:text-yellow-700 font-medium">
                                Đăng nhập
                            </Link>
                        )}

                        <Link to="/cart" className="relative">
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <Link to="/cart" className="relative mr-4">
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-3 pb-3 flex flex-col space-y-3">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                            Trang chủ
                        </Link>
                        <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                            Sản phẩm
                        </Link>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                            Giới thiệu
                        </Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                            Liên hệ
                        </Link>
                        {user ? (
                            <>
                                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                                    Trang cá nhân
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
