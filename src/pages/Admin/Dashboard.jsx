"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, ShoppingBag, DollarSign, Package, ArrowUpRight, ArrowDownRight } from "lucide-react"
import axios  from "~/untils/AxiosInstance"
import { getAdminOverview, getCategoryDistribution, getRecentOrders, getRevenueChart, getTopProducts } from "~/untils/ApiHelper"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const Dashboard = () => {
  const [overview, setOverview] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ov, rev, cat, top, orders] = await Promise.all([
          getAdminOverview(),
          getRevenueChart(),
          getCategoryDistribution(),
          getTopProducts(),
          getRecentOrders(),
        ]);
        setOverview(ov);
        console.log(cat)
        const formattedCategoryDistribution = cat.map(item => ({
          name: item.category,  // Tên danh mục
          value: item.count,    // Số lượng sản phẩm trong danh mục
        }));
        setMonthlyRevenue(rev.map((value, idx) => ({
          month: `Tháng ${idx + 1}`,
          revenue: value
        })));
        setCategoryDistribution(formattedCategoryDistribution);
        setTopProducts(top);
        setRecentOrders(orders);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dashboard:", error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (overview) {
      setStats({
        totalRevenue: overview.totalRevenue || 0,
        totalOrders: overview.totalOrders || 0,
        totalCustomers: overview.totalCustomers || 0,
        totalProducts: overview.totalProducts || 0,
      });
    }
  }, [overview]);

  const statCards = [
    {
      title: "Tổng doanh thu",
      value: `${(stats.totalRevenue / 1000000).toFixed(1)}M đ`,
      icon: <DollarSign className="text-green-500" />,
      change: "+12.5%",
      isPositive: true,
    },
    {
      title: "Tổng đơn hàng",
      value: stats.totalOrders,
      icon: <ShoppingBag className="text-blue-500" />,
      change: "+8.2%",
      isPositive: true,
    },
    {
      title: "Khách hàng",
      value: stats.totalCustomers,
      icon: <Users className="text-purple-500" />,
      change: "+5.7%",
      isPositive: true,
    },
    {
      title: "Sản phẩm",
      value: stats.totalProducts,
      icon: <Package className="text-orange-500" />,
      change: "-2.3%",
      isPositive: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  {stat.isPositive ? (
                    <ArrowUpRight size={16} className="text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight size={16} className="text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                    {stat.change} so với tháng trước
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Doanh thu theo tháng</h3>
            <div className="flex items-center">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-500">+12.5%</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenue}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => new Intl.NumberFormat("vi-VN").format(value) + "đ"} />
                <Legend />
                <Bar dataKey="revenue" name="Doanh thu" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Phân bố danh mục</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Sản phẩm bán chạy</h3>
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
                    Đã bán
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              product.image && product.image[0]
                                ? product.image[0].startsWith('http')
                                  ? product.image[0]
                                  : import.meta.env.VITE_API_URL + 'uploads/product/' + product.image[0]
                                : '/placeholder.svg'
                            }
                            alt={product.ProductName}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[550px]">{product.ProductName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600">{product.ProductPrice.toLocaleString()}đ</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-yellow-600">{product.sold}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Đơn hàng gần đây</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mã đơn
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
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.total.toLocaleString()}đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
