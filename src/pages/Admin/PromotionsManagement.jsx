import { useState, useEffect } from "react"
import { Search, Plus, Edit, Trash2, X } from "lucide-react"

// Dữ liệu mẫu cho khuyến mãi
const promotionsData = [
  {
    id: 1,
    name: "Khuyến mãi mùa hè",
    code: "SUMMER2023",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 300000,
    maxDiscount: 200000,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "active",
    usageLimit: 100,
    usageCount: 45,
    description: "Giảm 15% cho tất cả sản phẩm trong mùa hè, áp dụng cho đơn hàng từ 300.000đ",
  },
  {
    id: 2,
    name: "Chào mừng khách hàng mới",
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 0,
    maxDiscount: 100000,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "active",
    usageLimit: 0,
    usageCount: 120,
    description: "Giảm 10% cho đơn hàng đầu tiên của khách hàng mới",
  },
  {
    id: 3,
    name: "Giảm giá trực tiếp",
    code: "SAVE50K",
    discountType: "fixed",
    discountValue: 50000,
    minOrderValue: 500000,
    maxDiscount: 50000,
    startDate: "2023-07-01",
    endDate: "2023-07-31",
    status: "expired",
    usageLimit: 50,
    usageCount: 50,
    description: "Giảm trực tiếp 50.000đ cho đơn hàng từ 500.000đ",
  },
  {
    id: 4,
    name: "Khuyến mãi sinh nhật",
    code: "BIRTHDAY20",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 200000,
    maxDiscount: 150000,
    startDate: "2023-08-01",
    endDate: "2023-12-31",
    status: "active",
    usageLimit: 0,
    usageCount: 15,
    description: "Giảm 20% cho khách hàng trong tháng sinh nhật",
  },
  {
    id: 5,
    name: "Khuyến mãi Black Friday",
    code: "BLACK30",
    discountType: "percentage",
    discountValue: 30,
    minOrderValue: 1000000,
    maxDiscount: 500000,
    startDate: "2023-11-24",
    endDate: "2023-11-26",
    status: "scheduled",
    usageLimit: 200,
    usageCount: 0,
    description: "Giảm 30% cho tất cả sản phẩm trong dịp Black Friday",
  },
]

const PromotionsManagement = () => {
  const [promotions, setPromotions] = useState([])
  const [filteredPromotions, setFilteredPromotions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: "0",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    usageLimit: "0",
    description: "",
  })

  const statusOptions = ["Tất cả", "Đang hoạt động", "Đã hết hạn", "Lên lịch"]

  // Load promotions from localStorage or use default data
  useEffect(() => {
    const storedPromotions = localStorage.getItem("admin-promotions")
    if (storedPromotions) {
      setPromotions(JSON.parse(storedPromotions))
    } else {
      setPromotions(promotionsData)
    }
  }, [])

  // Filter promotions based on search term and status
  useEffect(() => {
    let result = [...promotions]

    if (searchTerm) {
      result = result.filter(
        (promotion) =>
          promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          promotion.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          promotion.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedStatus) {
      if (selectedStatus === "Đang hoạt động") {
        result = result.filter((promotion) => promotion.status === "active")
      } else if (selectedStatus === "Đã hết hạn") {
        result = result.filter((promotion) => promotion.status === "expired")
      } else if (selectedStatus === "Lên lịch") {
        result = result.filter((promotion) => promotion.status === "scheduled")
      }
    }

    setFilteredPromotions(result)
  }, [promotions, searchTerm, selectedStatus])

  // Save promotions to localStorage when they change
  useEffect(() => {
    localStorage.setItem("admin-promotions", JSON.stringify(promotions))
  }, [promotions])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    })
  }

  // Open modal for adding new promotion
  const handleAddPromotion = () => {
    setSelectedPromotion(null)
    const today = new Date().toISOString().split("T")[0]
    setFormData({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: "",
      minOrderValue: "0",
      maxDiscount: "",
      startDate: today,
      endDate: "",
      usageLimit: "0",
      description: "",
    })
    setIsModalOpen(true)
  }

  // Open modal for editing promotion
  const handleEditPromotion = (promotion) => {
    setSelectedPromotion(promotion)
    setFormData({
      name: promotion.name,
      code: promotion.code,
      discountType: promotion.discountType,
      discountValue: promotion.discountValue.toString(),
      minOrderValue: promotion.minOrderValue.toString(),
      maxDiscount: promotion.maxDiscount.toString(),
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      usageLimit: promotion.usageLimit.toString(),
      description: promotion.description,
    })
    setIsModalOpen(true)
  }

  // Open delete confirmation modal
  const handleDeleteClick = (promotion) => {
    setSelectedPromotion(promotion)
    setIsDeleteModalOpen(true)
  }

  // Delete promotion
  const handleDeletePromotion = () => {
    if (selectedPromotion) {
      setPromotions(promotions.filter((p) => p.id !== selectedPromotion.id))
      setIsDeleteModalOpen(false)
    }
  }

  // Save promotion (add or update)
  const handleSavePromotion = (e) => {
    e.preventDefault()

    // Determine status based on dates
    const today = new Date()
    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    let status = "active"

    if (startDate > today) {
      status = "scheduled"
    } else if (endDate < today) {
      status = "expired"
    }

    const promotionData = {
      name: formData.name,
      code: formData.code,
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      minOrderValue: Number(formData.minOrderValue),
      maxDiscount: Number(formData.maxDiscount),
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: status,
      usageLimit: Number(formData.usageLimit),
      usageCount: selectedPromotion ? selectedPromotion.usageCount : 0,
      description: formData.description,
    }

    if (selectedPromotion) {
      // Update existing promotion
      setPromotions(promotions.map((p) => (p.id === selectedPromotion.id ? { ...p, ...promotionData } : p)))
    } else {
      // Add new promotion
      const newPromotion = {
        ...promotionData,
        id: Math.max(...promotions.map((p) => p.id)) + 1,
      }
      setPromotions([...promotions, newPromotion])
    }

    setIsModalOpen(false)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" }
    return new Date(dateString).toLocaleDateString("vi-VN", options)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý khuyến mãi</h2>
        <button
          onClick={handleAddPromotion}
          className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Thêm khuyến mãi
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã khuyến mãi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="md:w-64">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Tất cả trạng thái</option>
              {statusOptions.map(
                (status, index) =>
                  status !== "Tất cả" && (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ),
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tên khuyến mãi
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mã
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Giảm giá
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thời gian
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sử dụng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Trạng thái
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPromotions.map((promotion) => (
                <tr key={promotion.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{promotion.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{promotion.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{promotion.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {promotion.discountType === "percentage"
                        ? `${promotion.discountValue}%`
                        : `${promotion.discountValue.toLocaleString()}đ`}
                    </div>
                    {promotion.minOrderValue > 0 && (
                      <div className="text-xs text-gray-500">
                        Đơn tối thiểu: {promotion.minOrderValue.toLocaleString()}đ
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {promotion.usageCount}/{promotion.usageLimit > 0 ? promotion.usageLimit : "∞"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        promotion.status === "active"
                          ? "bg-green-100 text-green-800"
                          : promotion.status === "expired"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {promotion.status === "active"
                        ? "Đang hoạt động"
                        : promotion.status === "expired"
                          ? "Đã hết hạn"
                          : "Lên lịch"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditPromotion(promotion)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteClick(promotion)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Promotion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">
                {selectedPromotion ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi mới"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePromotion} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên khuyến mãi</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã khuyến mãi</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại giảm giá</label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (đ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.discountType === "percentage" ? "Phần trăm giảm giá (%)" : "Số tiền giảm giá (đ)"}
                  </label>
                  <input
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị đơn hàng tối thiểu (đ)</label>
                  <input
                    type="number"
                    name="minOrderValue"
                    value={formData.minOrderValue}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giảm giá tối đa (đ)</label>
                  <input
                    type="number"
                    name="maxDiscount"
                    value={formData.maxDiscount}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giới hạn sử dụng</label>
                  <input
                    type="number"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Nhập 0 nếu không giới hạn</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md">
                  {selectedPromotion ? "Cập nhật" : "Thêm khuyến mãi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Xác nhận xóa</h3>
              <p className="text-gray-700 mb-6">
                Bạn có chắc chắn muốn xóa khuyến mãi "{selectedPromotion?.name}"? Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeletePromotion}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromotionsManagement
