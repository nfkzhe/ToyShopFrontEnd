import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-yellow-400 text-yellow-900 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ToyShop</h3>
            <p className="mb-4">
              Cửa hàng đồ chơi hàng đầu với các sản phẩm chất lượng cao, an toàn và giáo dục cho trẻ em mọi lứa tuổi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-700 transition-colors">
                <Facebook />
              </a>
              <a href="#" className="hover:text-yellow-700 transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-yellow-700 transition-colors">
                <Twitter />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow-700 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-yellow-700 transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-700 transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-700 transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-700 transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-700 transition-colors">
                  Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="mr-2" size={18} />
                <span>123 Đường Lê Lợi, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2" size={18} />
                <span>+84 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2" size={18} />
                <span>info@toyshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-500 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} ToyShop. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
