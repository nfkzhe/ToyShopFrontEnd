"use client"

import { useState, useEffect } from "react"
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom"
import { useAuth } from "~/contexts/AuthContex"
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Settings, LogOut, ChevronDown, Menu, X , TicketPercent } from "lucide-react"
import UserDropdown from "~/components/UserDropdown"

const AdminLayout = () => {
  const { user, logout ,loading , isAuthenticated} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


  useEffect(() => {
    if (!loading) {  // Chỉ thực hiện khi loading = false
      if (!isAuthenticated) {
        // Nếu chưa đăng nhập, điều hướng về trang login
        navigate("/login", { state: { from: location.pathname } });
      } else if (isAuthenticated && user?.role !== "admin") {
        // Nếu đã đăng nhập nhưng không phải là admin, điều hướng về trang chủ
        navigate("/");
      }
    }
  }, [user, loading, isAuthenticated, navigate, location.pathname]);
  

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Danh sách menu
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
      exact: true,
    },
    {
      title: "Sản phẩm",
      icon: <Package size={20} />,
      path: "/admin/products",
    },
    {
      title: "Danh mục",
      icon: <Tag size={20} />,
      path: "/admin/categories",
    },
    {
      title: "Đơn hàng",
      icon: <ShoppingBag size={20} />,
      path: "/admin/orders",
    },
    {
      title: "Mã khuyến mãi",
      icon: <TicketPercent size={20} />,
      path: "/admin/promotions",
    },
    {
      title: "Khách hàng",
      icon: <Users size={20} />,
      path: "/admin/customers",
    },
    {
      title: "Cài đặt",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },
  ]

  // Kiểm tra đường dẫn hiện tại để highlight menu item
  const isActiveRoute = (path) => {
    if (path === "/admin" && location.pathname === "/admin") {
      return true
    }
    return location.pathname.startsWith(path) && path !== "/admin"
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <div
        className={`bg-white shadow-lg fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to="/admin" className="flex items-center">
            <span className="text-xl font-bold text-yellow-600">RAPTOYS Admin</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActiveRoute(item.path) ? "bg-yellow-100 text-yellow-800" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 hover:text-gray-700 lg:hidden"
              >
                <Menu size={24} />
              </button>
              <div className="ml-4 lg:ml-0">
                <h1 className="text-xl font-semibold text-gray-800">
                  {menuItems.find((item) => isActiveRoute(item.path))?.title || "Dashboard"}
                </h1>
              </div>
            </div>

            <div className="flex items-center">
            <UserDropdown user={user}/>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default AdminLayout
