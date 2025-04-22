import React from "react";
import { useAuth } from "~/contexts/AuthContex";

function AdminPage() {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <h2>Xin chào Admin {user?.ten}</h2>
      {/* Chỗ này bạn có thể thêm bảng, thống kê, CRUD user, đơn hàng... */}
    </div>
  );
}

export default AdminPage;