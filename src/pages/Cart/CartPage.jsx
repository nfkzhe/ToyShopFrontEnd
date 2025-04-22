"use client"

import { Link } from "react-router-dom"
import { useCart } from "~/contexts/CartContext"
import CartItem from "~/components/CartItem"
import { ShoppingBag } from "lucide-react"

const CartPage = () => {
  const { cartItems, clearCart, getCartTotal } = useCart()

  // Tính tổng tiền
  const cartTotal = getCartTotal()

  // Phí vận chuyển
  const shippingFee = cartTotal > 500000 ? 0 : 30000

  // Tổng thanh toán
  const totalPayment = cartTotal + shippingFee

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-yellow-800 mb-8">Giỏ hàng của bạn</h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Danh sách sản phẩm */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Sản phẩm ({cartItems.length})</h2>
              </div>

              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}

              <div className="mt-6 flex justify-between">
                <button onClick={clearCart} className="text-red-500 hover:text-red-700 font-medium">
                  Xóa tất cả
                </button>
                <Link to="/products" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>

          {/* Thông tin thanh toán */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Tóm tắt đơn hàng</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span>{cartTotal.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span>{shippingFee > 0 ? `${shippingFee.toLocaleString()}đ` : "Miễn phí"}</span>
                </div>
                {shippingFee > 0 && (
                  <div className="text-sm text-gray-500">Miễn phí vận chuyển cho đơn hàng trên 500.000đ</div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-yellow-700">{totalPayment.toLocaleString()}đ</span>
                </div>
              </div>

              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded transition-colors">
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-600 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiến hành mua sắm.</p>
          <Link to="/products" className="btn-primary">
            Tiếp tục mua sắm
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartPage
