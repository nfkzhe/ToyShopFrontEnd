import { Link } from "react-router-dom"
import { CheckCircle } from "lucide-react"

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-800 mb-8 text-center">Về chúng tôi</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <img src="/placeholder.svg?height=400&width=800" alt="ToyShop Store" className="w-full h-64 object-cover" />

          <div className="p-6">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">Câu chuyện của chúng tôi</h2>
            <p className="text-gray-700 mb-4">
              ToyShop được thành lập vào năm 2015 với sứ mệnh mang đến những sản phẩm đồ chơi chất lượng cao, an toàn và
              giáo dục cho trẻ em Việt Nam. Chúng tôi tin rằng đồ chơi không chỉ là niềm vui mà còn là công cụ giúp trẻ
              phát triển kỹ năng, trí tưởng tượng và sáng tạo.
            </p>
            <p className="text-gray-700 mb-4">
              Với hơn 8 năm kinh nghiệm trong ngành, chúng tôi đã trở thành một trong những cửa hàng đồ chơi uy tín hàng
              đầu, được hàng nghìn phụ huynh và trẻ em tin tưởng. Chúng tôi không ngừng tìm kiếm và cập nhật những sản
              phẩm mới nhất, đáp ứng nhu cầu ngày càng cao của khách hàng.
            </p>
            <p className="text-gray-700">
              ToyShop tự hào là đối tác chính thức của nhiều thương hiệu đồ chơi nổi tiếng trên thế giới, đảm bảo mang
              đến cho khách hàng những sản phẩm chính hãng với giá cả hợp lý.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">Tầm nhìn</h2>
            <p className="text-gray-700">
              Trở thành cửa hàng đồ chơi hàng đầu Việt Nam, nơi mọi trẻ em đều có thể tìm thấy niềm vui và sự phát triển
              thông qua đồ chơi chất lượng cao.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">Sứ mệnh</h2>
            <p className="text-gray-700">
              Cung cấp đồ chơi an toàn, giáo dục và sáng tạo, góp phần vào sự phát triển toàn diện của trẻ em Việt Nam.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-yellow-800 mb-6">Giá trị cốt lõi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <CheckCircle className="text-yellow-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Chất lượng</h3>
                <p className="text-gray-700">
                  Chúng tôi cam kết cung cấp sản phẩm chất lượng cao, đạt tiêu chuẩn an toàn quốc tế.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="text-yellow-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Giáo dục</h3>
                <p className="text-gray-700">
                  Chúng tôi ưu tiên những sản phẩm có tính giáo dục, giúp trẻ phát triển kỹ năng.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="text-yellow-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Sáng tạo</h3>
                <p className="text-gray-700">
                  Chúng tôi khuyến khích sự sáng tạo và trí tưởng tượng thông qua đồ chơi.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="text-yellow-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Dịch vụ khách hàng</h3>
                <p className="text-gray-700">
                  Chúng tôi luôn đặt khách hàng lên hàng đầu, cung cấp dịch vụ tận tâm và chuyên nghiệp.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-yellow-800 mb-6">Đội ngũ của chúng tôi</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Nguyễn Văn A"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg mb-1">Nguyễn Văn A</h3>
              <p className="text-yellow-600 mb-2">Giám đốc điều hành</p>
              <p className="text-gray-700 text-sm">Hơn 15 năm kinh nghiệm trong ngành đồ chơi trẻ em</p>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Trần Thị B"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg mb-1">Trần Thị B</h3>
              <p className="text-yellow-600 mb-2">Giám đốc sản phẩm</p>
              <p className="text-gray-700 text-sm">Chuyên gia về đồ chơi giáo dục và phát triển trẻ em</p>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Lê Văn C"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-lg mb-1">Lê Văn C</h3>
              <p className="text-yellow-600 mb-2">Giám đốc dịch vụ khách hàng</p>
              <p className="text-gray-700 text-sm">Tận tâm với khách hàng và luôn mang đến trải nghiệm tốt nhất</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <Link to="/contact" className="btn-primary">
            Liên hệ với chúng tôi
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
