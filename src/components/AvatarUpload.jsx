"use client"

import { useState, useRef } from "react"
import { useAuth } from "~/contexts/AuthContex"
import { X, Upload, Camera } from "lucide-react"
import { uploadUserAvatar } from '~/untils/ApiHelper'

const AvatarUploader = ({ onClose, onSuccess }) => {
  const [previewImage, setPreviewImage] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const { updateAvatar, user, refreshUser } = useAuth()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setError("")

    if (!file) return

    // Kiểm tra loại file
    if (!file.type.match("image.*")) {
      setError("Vui lòng chọn file hình ảnh")
      return
    }

    // Kiểm tra kích thước file (tối đa 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Kích thước file không được vượt quá 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!fileInputRef.current.files[0]) {
      setError("Vui lòng chọn hình ảnh");
      return;
    }

    const file = fileInputRef.current.files[0];

    try {
      setLoading(true);

      const res = await uploadUserAvatar(file);
      console.log('Upload response:', res.data);
      const newAvatar = res.data.avatar;

      await updateAvatar(`${newAvatar}`);
      await refreshUser(); // Cập nhật lại thông tin người dùng từ backend

      if (onSuccess) {
        onSuccess(user);
      }
      onClose(); // Đóng modal sau khi thành công
    } catch (error) {
      console.error("Lỗi khi upload avatar:", error);
      setError("Có lỗi xảy ra khi cập nhật avatar");
    } finally {
      setLoading(false);
    }
};

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Cập nhật ảnh đại diện</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
          )}

          <div className="flex flex-col items-center mb-6">
            <div
              className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden flex items-center justify-center relative"
              onClick={() => fileInputRef.current.click()}
            >
              {previewImage ? (
                <img src={previewImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              ) : user?.avatar ? (
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt="Current avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera size={40} className="text-gray-400" />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 flex items-center justify-center transition-all cursor-pointer">
                <Upload size={24} className="text-white opacity-0 hover:opacity-100" />
              </div>
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
            >
              Chọn ảnh
            </button>
          </div>

          <div className="text-sm text-gray-600 mb-6">
            <p>Hỗ trợ định dạng: JPG, PNG, GIF</p>
            <p>Kích thước tối đa: 5MB</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleUpload}
              disabled={!previewImage || loading}
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang xử lý..." : "Cập nhật"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarUploader
