import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Đồ chơi chất lượng cao, con tôi rất thích. Giao hàng nhanh và dịch vụ khách hàng tuyệt vời!",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Tôi đã mua nhiều đồ chơi giáo dục cho con và rất hài lòng với chất lượng. Sẽ tiếp tục ủng hộ shop!",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
    text: "Sản phẩm đúng như mô tả, giá cả hợp lý. Con tôi rất thích những món đồ chơi từ cửa hàng này.",
  },
]

const Testimonials = () => {
  return (
    <section className="py-12 bg-yellow-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Khách hàng nói gì về chúng tôi</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-yellow-800">{testimonial.name}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                        className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
