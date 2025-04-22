import { useState, useEffect } from "react"
import { Save, Mail, Phone, MapPin, Globe, Facebook, Instagram, Twitter } from "lucide-react"

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    // Thông tin cửa hàng
    storeName: "ToyShop",
    storeDescription:
      "Cửa hàng đồ chơi hàng đầu với các sản phẩm chất lượng cao, an toàn và giáo dục cho trẻ em mọi lứa tuổi.",
    logo: "/placeholder.svg?height=200&width=200",
    favicon: "/placeholder.svg?height=32&width=32",

    // Thông tin liên hệ
    email: "info@toyshop.com",
    phone: "+84 123 456 789",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    website: "www.toyshop.com",

    // Mạng xã hội
    facebook: "https://facebook.com/toyshop",
    instagram: "https://instagram.com/toyshop",
    twitter: "https://twitter.com/toyshop",

    // Cài đặt thanh toán
    currency: "VND",
    currencySymbol: "đ",
    paymentMethods: ["COD", "BankTransfer", "Momo"],

    // Cài đặt vận chuyển
    shippingMethods: [
      { name: "Giao hàng tiêu chuẩn", price: 30000, freeShippingThreshold: 500000 },
      { name: "Giao hàng nhanh", price: 50000, freeShippingThreshold: 1000000 },
    ],

    // Cài đặt email
    emailNotifications: true,
    orderConfirmationEmail: true,
    shippingConfirmationEmail: true,

    // Cài đặt khác
    taxRate: 10,
    defaultPageSize: 12,
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    const storedSettings = localStorage.getItem("admin-settings")
    if (storedSettings) {
      setFormData(JSON.parse(storedSettings))
    }
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle shipping method changes
  const handleShippingMethodChange = (index, field, value) => {
    const updatedShippingMethods = [...formData.shippingMethods]
    updatedShippingMethods[index] = {
      ...updatedShippingMethods[index],
      [field]: field === "name" ? value : Number(value),
    }
    setFormData({
      ...formData,
      shippingMethods: updatedShippingMethods,
    })
  }

  // Handle payment method changes
  const handlePaymentMethodChange = (method, checked) => {
    const updatedPaymentMethods = checked
      ? [...formData.paymentMethods, method]
      : formData.paymentMethods.filter((m) => m !== method)

    setFormData({
      ...formData,
      paymentMethods: updatedPaymentMethods,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem("admin-settings", JSON.stringify(formData))
      setIsSaving(false)
      setSaveSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }

  // Handle logo upload (simulated)
  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // Here we're just using a placeholder
      const reader = new FileReader()
      reader.onload = () => {
        setFormData({
          ...formData,
          logo: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Cài đặt cửa hàng</h2>
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={20} className="mr-2" />
          {isSaving ? "Đang lưu..." : "Lưu cài đặt"}
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-medium">Lưu cài đặt thành công!</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Thông tin cửa hàng */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Thông tin cửa hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên cửa hàng</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả cửa hàng</label>
                <textarea
                  name="storeDescription"
                  value={formData.storeDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                <div className="flex items-center space-x-4">
                  <img src={formData.logo || "/placeholder.svg"} alt="Logo" className="w-16 h-16 object-contain" />
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
                    <span>Thay đổi</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <Mail className="text-gray-400 mr-2" size={20} />
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="text-gray-400 mr-2" size={20} />
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="flex items-center md:col-span-2">
                <MapPin className="text-gray-400 mr-2" size={20} />
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Globe className="text-gray-400 mr-2" size={20} />
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mạng xã hội */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Mạng xã hội</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <Facebook className="text-blue-600 mr-2" size={20} />
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Instagram className="text-pink-600 mr-2" size={20} />
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Twitter className="text-blue-400 mr-2" size={20} />
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cài đặt thanh toán */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Cài đặt thanh toán</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị tiền tệ</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="VND">Việt Nam Đồng (VND)</option>
                  <option value="USD">US Dollar (USD)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ký hiệu tiền tệ</label>
                <input
                  type="text"
                  name="currencySymbol"
                  value={formData.currencySymbol}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phương thức thanh toán</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="payment-cod"
                      checked={formData.paymentMethods.includes("COD")}
                      onChange={(e) => handlePaymentMethodChange("COD", e.target.checked)}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="payment-cod" className="ml-2 block text-sm text-gray-900">
                      Thanh toán khi nhận hàng (COD)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="payment-bank"
                      checked={formData.paymentMethods.includes("BankTransfer")}
                      onChange={(e) => handlePaymentMethodChange("BankTransfer", e.target.checked)}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="payment-bank" className="ml-2 block text-sm text-gray-900">
                      Chuyển khoản ngân hàng
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="payment-momo"
                      checked={formData.paymentMethods.includes("Momo")}
                      onChange={(e) => handlePaymentMethodChange("Momo", e.target.checked)}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="payment-momo" className="ml-2 block text-sm text-gray-900">
                      Ví điện tử Momo
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cài đặt vận chuyển */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Cài đặt vận chuyển</h3>

            {formData.shippingMethods.map((method, index) => (
              <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên phương thức</label>
                    <input
                      type="text"
                      value={method.name}
                      onChange={(e) => handleShippingMethodChange(index, "name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phí vận chuyển (đ)</label>
                    <input
                      type="number"
                      value={method.price}
                      onChange={(e) => handleShippingMethodChange(index, "price", e.target.value)}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Miễn phí vận chuyển từ (đ)</label>
                    <input
                      type="number"
                      value={method.freeShippingThreshold}
                      onChange={(e) => handleShippingMethodChange(index, "freeShippingThreshold", e.target.value)}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cài đặt khác */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Cài đặt khác</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thuế suất (%)</label>
                <input
                  type="number"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số sản phẩm mỗi trang</label>
                <input
                  type="number"
                  name="defaultPageSize"
                  value={formData.defaultPageSize}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Thông báo email</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                      Bật thông báo email
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="order-confirmation"
                      name="orderConfirmationEmail"
                      checked={formData.orderConfirmationEmail}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="order-confirmation" className="ml-2 block text-sm text-gray-900">
                      Gửi email xác nhận đơn hàng
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="shipping-confirmation"
                      name="shippingConfirmationEmail"
                      checked={formData.shippingConfirmationEmail}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label htmlFor="shipping-confirmation" className="ml-2 block text-sm text-gray-900">
                      Gửi email xác nhận vận chuyển
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SettingsPage
