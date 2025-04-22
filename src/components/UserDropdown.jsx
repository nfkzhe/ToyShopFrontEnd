import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "~/contexts/AuthContex";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({user}) => {
  const { logout , isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();


  if(user === null) {
    return ;
  }
  useEffect(()=> {
    if (!isAuthenticated) {
        // Nếu chưa đăng nhập, điều hướng về trang login
        navigate("/login", { state: { from: location.pathname } });
      }
  },[])
  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGoProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center focus:outline-none"
      >
        <img
          src={
            user?.avatar
              ? `${process.env.VITE_API_URL}/uploads/avatar/${user.avatar}`
              : "/placeholder.svg"
          }
          alt={user.ten}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="ml-2 text-sm font-medium hidden md:block">
          {user.ten}
        </span>
        <ChevronDown size={16} className="ml-1 hidden md:block" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <button
            onClick={handleGoProfile}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Trang Người Dùng
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;