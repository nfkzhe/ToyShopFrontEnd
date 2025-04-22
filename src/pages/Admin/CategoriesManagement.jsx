"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, X } from "lucide-react"
import { getAllCategories } from "~/untils/ApiHelper"

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getAllCategories();
            if (response && response.data) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, []);

  // Load categories from localStorage or use default data
  useEffect(() => {
    const storedCategories = localStorage.getItem("admin-categories")
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories))
    }
  }, [])

  // Save categories to localStorage when they change
  useEffect(() => {
    localStorage.setItem("admin-categories", JSON.stringify(categories))
  }, [categories])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Open modal for adding new category
  const handleAddCategory = () => {
    setSelectedCategory(null)
    setFormData({
      name: "",
      description: "",
    })
    setIsModalOpen(true)
  }

  // Open modal for editing category
  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setFormData({
      name: category.CateName,
      description: category.description,
    })
    setIsModalOpen(true)
  }

  // Open delete confirmation modal
  const handleDeleteClick = (category) => {
    setSelectedCategory(category)
    setIsDeleteModalOpen(true)
  }

  // Delete category
  const handleDeleteCategory = () => {
    if (selectedCategory) {
      setCategories(categories.filter((c) => c.id !== selectedCategory.id))
      setIsDeleteModalOpen(false)
    }
  }

  // Save category (add or update)
  const handleSaveCategory = (e) => {
    e.preventDefault()

    const categoryData = {
      name: formData.name,
      description: formData.description,
    }

    if (selectedCategory) {
      // Update existing category
      setCategories(categories.map((c) => (c.id === selectedCategory.id ? { ...c, ...categoryData } : c)))
    } else {
      // Add new category
      const newCategory = {
        ...categoryData,
        id: Math.max(...categories.map((c) => c.id)) + 1,
      }
      setCategories([...categories, newCategory])
    }

    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý danh mục</h2>
        <button
          onClick={handleAddCategory}
          className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Thêm danh mục
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tên danh mục
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mô tả
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
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{category._id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.CateName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteClick(category)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">{selectedCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
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

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md">
                  {selectedCategory ? "Cập nhật" : "Thêm danh mục"}
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
                Bạn có chắc chắn muốn xóa danh mục "{selectedCategory?.name}"? Hành động này không thể hoàn tác và có
                thể ảnh hưởng đến các sản phẩm thuộc danh mục này.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteCategory}
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

export default CategoriesManagement
