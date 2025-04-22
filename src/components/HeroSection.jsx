import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-yellow-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-4">Khám phá thế giới đồ chơi kỳ diệu</h1>
            <p className="text-lg text-yellow-800 mb-6">
              Đồ chơi chất lượng cao, an toàn và giáo dục cho trẻ em mọi lứa tuổi. Giúp phát triển trí tưởng tượng và kỹ
              năng của trẻ.
            </p>
            <div className="flex space-x-4">
              <Link to="/products" className="btn-primary">
                Mua ngay
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-yellow-600 text-yellow-900 hover:bg-yellow-600 hover:text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/banner.webp?height=400&width=500"
              alt="Đồ chơi trẻ em"
              className="rounded-lg shadow-lg max-w-full h-auto"
              width={400}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
