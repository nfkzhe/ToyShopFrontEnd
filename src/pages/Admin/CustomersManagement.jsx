import { useState, useEffect } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, Eye, X, Mail, Phone } from "lucide-react"
import { getUser } from "~/untils/ApiHelper"

// Dữ liệu mẫu cho khách hàng
const customersData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    registeredDate: "15/01/2023",
    totalOrders: 5,
    totalSpent: 2500000,
    status: "active",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    registeredDate: "20/02/2023",
    totalOrders: 3,
    totalSpent: 1800000,
    status: "active",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0978123456",
    address: "789 Đường Lê Duẩn, Quận 3, TP.HCM",
    registeredDate: "05/03/2023",
    totalOrders: 2,
    totalSpent: 950000,
    status: "active",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0965432109",
    address: "101 Đường Nguyễn Trãi, Quận 5, TP.HCM",
    registeredDate: "12/04/2023",
    totalOrders: 1,
    totalSpent: 750000,
    status: "active",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0932109876",
    address: "202 Đường Võ Văn Tần, Quận 3, TP.HCM",
    registeredDate: "25/04/2023",
    totalOrders: 0,
    totalSpent: 0,
    status: "inactive",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    email: "dothif@example.com",
    phone: "0901234567",
    address: "303 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM",
    registeredDate: "08/05/2023",
    totalOrders: 4,
    totalSpent: 2100000,
    status: "active",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Vũ Văn G",
    email: "vuvang@example.com",
    phone: "0912345678",
    address: "404 Đường 3/2, Quận 10, TP.HCM",
    registeredDate: "17/05/2023",
    totalOrders: 2,
    totalSpent: 1200000,
    status: "active",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Ngô Thị H",
    email: "ngothih@example.com",
    phone: "0923456789",
    address: "505 Đường Nguyễn Thị Minh Khai, Quận 3, TP.HCM",
    registeredDate: "30/05/2023",
    totalOrders: 1,
    totalSpent: 520000,
    status: "inactive",
    avatar: "/placeholder.svg?height=200&width=200",
  },
]

// Dữ liệu mẫu cho đơn hàng của khách hàng
const customerOrdersData = {
  1: [
    {
      id: "ORD-2023-001",
      date: "15/04/2023",
      status: "Đã giao hàng",
      total: 850000,
    },
    {
      id: "ORD-2023-006",
      date: "22/05/2023",
      status: "Đã giao hàng",
      total: 420000,
    },
    {
      id: "ORD-2023-010",
      date: "10/06/2023",
      status: "Đã giao hàng",
      total: 650000,
    },
    {
      id: "ORD-2023-015",
      date: "28/06/2023",
      status: "Đang giao hàng",
      total: 380000,
    },
    {
      id: "ORD-2023-020",
      date: "15/07/2023",
      status: "Đang xử lý",
      total: 200000,
    },
  ],
  2: [
    {
      id: "ORD-2023-002",
      date: "28/05/2023",
      status: "Đã giao hàng",
      total: 1170000,
    },
    {
      id: "ORD-2023-008",
      date: "15/06/2023",
      status: "Đã giao hàng",
      total: 350000,
    },
    {
      id: "ORD-2023-016",
      date: "05/07/2023",
      status: "Đã giao hàng",
      total: 280000,
    },
  ],
  3: [
    {
      id: "ORD-2023-003",
      date: "10/06/2023",
      status: "Đã giao hàng",
      total: 520000,
    },
    {
      id: "ORD-2023-012",
      date: "25/06/2023",
      status: "Đã giao hàng",
      total: 430000,
    },
  ],
  4: [
    {
      id: "ORD-2023-004",
      date: "15/06/2023",
      status: "Đã giao hàng",
      total: 750000,
    },
  ],
  6: [
    {
      id: "ORD-2023-005",
      date: "20/06/2023",
      status: "Đã giao hàng",
      total: 650000,
    },
    {
      id: "ORD-2023-009",
      date: "05/07/2023",
      status: "Đã giao hàng",
      total: 520000,
    },
    {
      id: "ORD-2023-014",
      date: "15/07/2023",
      status: "Đã giao hàng",
      total: 480000,
    },
    {
      id: "ORD-2023-018",
      date: "25/07/2023",
      status: "Đang giao hàng",
      total: 450000,
    },
  ],
  7: [
    {
      id: "ORD-2023-007",
      date: "01/07/2023",
      status: "Đã giao hàng",
      total: 720000,
    },
    {
      id: "ORD-2023-013",
      date: "20/07/2023",
      status: "Đã giao hàng",
      total: 480000,
    },
  ],
  8: [
    {
      id: "ORD-2023-011",
      date: "15/07/2023",
      status: "Đã giao hàng",
      total: 520000,
    },
  ],
}

const CustomersManagement = () => {
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerOrders, setCustomerOrders] = useState([])

  const customersPerPage = 10
  const statusOptions = ["Tất cả", "Hoạt động", "Không hoạt động"]

  const fetchUser = async () => {
    const response = await getUser();
    if (response && response.data) {
      setCustomers(response.data)
    }
  }
  useEffect(() => {
    fetchUser();
  }, [])

  // Filter customers based on search term and status
  useEffect(() => {
    let result = [...customers]

    if (searchTerm) {
      result = result.filter(
        (customer) =>
          customer.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm),
      )
    }

    if (selectedStatus) {
      if (selectedStatus === "Hoạt động") {
        result = result.filter((customer) => customer.status === "active")
      } else if (selectedStatus === "Không hoạt động") {
        result = result.filter((customer) => customer.status === "inactive")
      }
    }

    setFilteredCustomers(result)
  }, [customers, searchTerm, selectedStatus])

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage)
  const indexOfLastCustomer = currentPage * customersPerPage
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer)

  // View customer details
  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer)
    // Lấy đơn hàng của khách hàng (nếu có)
    setCustomerOrders(customerOrdersData[customer._id] || [])
    setIsModalOpen(true)
  }

  // Update customer status
  const handleUpdateStatus = (customerId, newStatus) => {
    const updatedCustomers = customers.map((customer) =>
      customer._id === customerId ? { ...customer, status: newStatus } : customer,
    )
    setCustomers(updatedCustomers)

    if (selectedCustomer && selectedCustomer._id === customerId) {
      setSelectedCustomer({ ...selectedCustomer, status: newStatus })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý khách hàng</h2>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
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

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Liên hệ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày đăng ký
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Đơn hàng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tổng chi tiêu
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
              {currentCustomers.map((customer) => (
                <tr key={customer._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={
                            customer?.avatar
                              ? `${import.meta.env.VITE_API_URL}/uploads/avatar/${customer.avatar}`
                              : "/placeholder.svg"
                          }
                          alt={customer.ten}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.ten}</div>
                        <div className="text-sm text-gray-500">{customer._id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.registeredDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.totalOrders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.totalSpent}đ</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleViewCustomer(customer)} className="text-blue-600 hover:text-blue-900">
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
                  Hiển thị <span className="font-medium">{indexOfFirstCustomer + 1}</span> đến{" "}
                  <span className="font-medium">{Math.min(indexOfLastCustomer, filteredCustomers.length)}</span> trong
                  số <span className="font-medium">{filteredCustomers.length}</span> khách hàng
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

      {/* Customer Details Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Thông tin khách hàng</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        selectedCustomer?.avatar
                          ? `${import.meta.env.VITE_API_URL}/uploads/avatar/${selectedCustomer.avatar}`
                          : "/placeholder.svg"
                      }
                      alt={selectedCustomer.ten}
                      className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <h4 className="text-xl font-semibold">{selectedCustomer.ten}</h4>
                    <p className="text-gray-500">Khách hàng #{selectedCustomer._id}</p>
                    <div className="mt-4 flex items-center">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedCustomer.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedCustomer.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </span>
                      <select
                        value={selectedCustomer.status}
                        onChange={(e) => handleUpdateStatus(selectedCustomer.id, e.target.value)}
                        className="ml-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Không hoạt động</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center">
                      <Mail className="text-gray-400 mr-2" size={18} />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-gray-400 mr-2" size={18} />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Địa chỉ</p>
                      <p>{selectedCustomer.address}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Ngày đăng ký</p>
                      <p>{selectedCustomer.registeredDate}</p>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4">Tổng quan</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">Tổng đơn hàng</p>
                        <p className="text-2xl font-bold">{selectedCustomer.totalOrders}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">Tổng chi tiêu</p>
                        <p className="text-2xl font-bold">{selectedCustomer.totalSpent}đ</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">Giá trị trung bình</p>
                        <p className="text-2xl font-bold">
                          {selectedCustomer.totalOrders > 0
                            ? (selectedCustomer.totalSpent / selectedCustomer.totalOrders)
                            : 0}
                          đ
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Lịch sử đơn hàng</h4>
                    {customerOrders.length > 0 ? (
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
                                Ngày đặt
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Trạng thái
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tổng tiền
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {customerOrders.map((order) => (
                              <tr key={order._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-blue-600">{order._id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{order.date}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      order.status === "Đã giao hàng"
                                        ? "bg-green-100 text-green-800"
                                        : order.status === "Đang giao hàng"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {order.total.toLocaleString()}đ
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Khách hàng chưa có đơn hàng nào</p>
                      </div>
                    )}
                  </div>
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

export default CustomersManagement
