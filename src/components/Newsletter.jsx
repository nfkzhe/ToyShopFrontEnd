"use client"

import { useState } from "react"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Xử lý đăng ký nhận tin
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section className="py-12 bg-yellow-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-yellow-900 mb-4">Đăng ký nhận thông tin</h2>
        <p className="text-yellow-800 mb-6 max-w-2xl mx-auto">
          Đăng ký để nhận thông tin về sản phẩm mới, khuyến mãi đặc biệt và các mẹo hay về đồ chơi cho trẻ em.
        </p>

        {isSubmitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg max-w-md mx-auto">
            Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin đến email của bạn.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email của bạn"
                required
                className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-r-lg transition-colors"
              >
                Đăng ký
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

export default Newsletter
