"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, Eye, X } from "lucide-react"

// Dữ liệu mẫu cho đơn hàng
const ordersData = [
  {
    id: "ORD-2023-001",
    customer: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    date: "15/04/2023",
    status: "Đã giao hàng",
    total: 850000,
    items: [
      { id: 1, name: "Gấu bông Teddy", quantity: 1, price: 250000, discount: 10 },
      { id: 3, name: "Đồ chơi nhà bếp mini", quantity: 1, price: 420000, discount: 15 },
      { id: 10, name: "Bộ đồ chơi học chữ", quantity: 1, price: 280000, discount: 0 },
    ],
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    paymentMethod: "COD",
  },
  {
    id: "ORD-2023-002",
    customer: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    date: "28/05/2023",
    status: "Đã giao hàng",
    total: 1170000,
    items: [
      { id: 2, name: "Bộ xếp hình thông minh", quantity: 1, price: 350000, discount: 0 },
      { id: 8, name: "Xe điều khiển từ xa", quantity: 1, price: 650000, discount: 0 },
      { id: 11, name: "Thú bông Unicorn", quantity: 1, price: 320000, discount: 10 },
    ],
    address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    paymentMethod: "Chuyển khoản",
  },
  {
    id: "ORD-2023-003",
    customer: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0978123456",
    date: "10/06/2023",
    status: "Đang giao hàng",
    total: 520000,
    items: [{ id: 4, name: "Xe đẩy đồ chơi", quantity: 1, price: 520000, discount: 0 }],
    address: "789 Đường Lê Duẩn, Quận 3, TP.HCM",
    paymentMethod: "COD",
  },
  {
    id: "ORD-2023-004",
    customer: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0965432109",
    date: "15/06/2023",
    status: "Đang xử lý",
    total: 750000,
    items: [
      { id: 5, name: "Robot biến hình", quantity: 1, price: 380000, discount: 5 },
      { id: 12, name: "Bộ đồ chơi câu cá", quantity: 1, price: 220000, discount: 0 },
      { id: 15, name: "Gấu bông Panda", quantity: 1, price: 280000, discount: 0 },
    ],
    address: "101 Đường Nguyễn Trãi, Quận 5, TP.HCM",
    paymentMethod: "Chuyển khoản",
  },
  {
    id: "ORD-2023-005",
    customer: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0932109876",
    date: "20/06/2023",
    status: "Đã hủy",
    total: 650000,
    items: [{ id: 8, name: "Xe điều khiển từ xa", quantity: 1, price: 650000, discount: 0 }],
    address: "202 Đường Võ Văn Tần, Quận 3, TP.HCM",
    paymentMethod: "COD",
  },
]

const OrdersManagement = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const ordersPerPage = 10
  const statusOptions = ["Tất cả", "Đang xử lý", "Đang giao hàng", "Đã giao hàng", "Đã hủy"]

  // Load orders from localStorage or use default data
  useEffect(() => {
    const storedOrders = localStorage.getItem("admin-orders")
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    } else {
      setOrders(ordersData)
    }
  }, [])

  // Filter orders based on search term and status
  useEffect(() => {
    let result = [...orders]

    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedStatus && selectedStatus !== "Tất cả") {
      result = result.filter((order) => order.status === selectedStatus)
    }

    setFilteredOrders(result)
  }, [orders, searchTerm, selectedStatus])

  // Save orders to localStorage when they change
  useEffect(() => {
    localStorage.setItem("admin-orders", JSON.stringify(orders))
  }, [orders])

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  // View order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  // Update order status
  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    setOrders(updatedOrders)

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  // Calculate total after discount
  const calculateDiscountedPrice = (price, discount) => {
    return discount > 0 ? price * (1 - discount / 100) : price
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="md:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mã đơn hàng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Khách hàng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày đặt
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tổng tiền
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
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.total.toLocaleString()}đ</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "Đã giao hàng"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Đang giao hàng"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Đang xử lý"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleViewOrder(order)} className="text-blue-600 hover:text-blue-900">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Hiển thị <span className="font-medium">{indexOfFirstOrder + 1}</span> đến{" "}
                  <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> trong số{" "}
                  <span className="font-medium">{filteredOrders.length}</span> đơn hàng
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === i + 1
                          ? "z-10 bg-yellow-50 border-yellow-500 text-yellow-600"
                          : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                      } text-sm font-medium`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Chi tiết đơn hàng #{selectedOrder.id}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Thông tin khách hàng</h4>
                  <p className="font-medium">{selectedOrder.customer}</p>
                  <p>{selectedOrder.email}</p>
                  <p>{selectedOrder.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Thông tin đơn hàng</h4>
                  <p>
                    <span className="font-medium">Ngày đặt:</span> {selectedOrder.date}
                  </p>
                  <p>
                    <span className="font-medium">Phương thức thanh toán:</span> {selectedOrder.paymentMethod}
                  </p>
                  <p>
                    <span className="font-medium">Địa chỉ giao hàng:</span> {selectedOrder.address}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Trạng thái đơn hàng</h4>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedOrder.status === "Đã giao hàng"
                        ? "bg-green-100 text-green-800"
                        : selectedOrder.status === "Đang giao hàng"
                          ? "bg-blue-100 text-blue-800"
                          : selectedOrder.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                    className="ml-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
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

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Sản phẩm</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Sản phẩm
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Giá
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Số lượng
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item) => {
                        const discountedPrice = calculateDiscountedPrice(item.price, item.discount)
                        const itemTotal = discountedPrice * item.quantity

                        return (
                          <tr key={item.id}>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              {item.discount > 0 && (
                                <div className="text-xs text-red-600">Giảm giá {item.discount}%</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {discountedPrice.toLocaleString()}đ
                                {item.discount > 0 && (
                                  <span className="line-through text-gray-500 ml-2">
                                    {item.price.toLocaleString()}đ
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.quantity}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{itemTotal.toLocaleString()}đ</div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tổng thanh toán:</span>
                  <span className="text-xl font-bold text-yellow-600">{selectedOrder.total.toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersManagement
