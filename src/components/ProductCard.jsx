"use client"

import { Link } from "react-router-dom"
import { useCart } from "~/contexts/CartContext"
import { ShoppingCart } from "lucide-react"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
<div className="card group rounded-xl overflow-hidden shadow-md">
  <Link to={`/products/${product._id}`} state={{ products: product }} className="block">
    <div className="relative">
      <img
        src={
          product.image && product.image[0]
            ? product.image[0].startsWith('http')
              ? product.image[0]
              : import.meta.env.VITE_API_URL + '/uploads/product/' + product.image[0]
            : '/placeholder.svg'
        }
        alt={product.ProductName}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {product.discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{product.discount}%
        </div>
      )}
    </div>

    <div className="p-4 bg-white">
      <h3 className="text-lg font-semibold mb-1 text-yellow-800 truncate">{product.ProductName}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.ProductDes}</p>

      <div className="flex justify-between items-center">
        <div>
          {product.discount > 0 ? (
            <div className="flex items-center">
              <span className="text-lg font-bold text-yellow-700">
                {(product.ProductPrice * (1 - product.discount / 100)).toLocaleString()}đ
              </span>
              <span className="text-sm text-gray-500 line-through ml-2">
                {product.ProductPrice.toLocaleString()}đ
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-yellow-700">
              {product.ProductPrice.toLocaleString()}đ
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 p-2 rounded-full transition-colors"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  </Link>
</div>

  )
}

export default ProductCard
