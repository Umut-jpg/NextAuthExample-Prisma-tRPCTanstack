import { requireAdmin } from "@/utils/auth-utils";
import React from "react";

const AdminPage = async () => {
  const session = await requireAdmin();

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-blue-50 p-4 rounded-md">
        <p className="font-medium">Kullanıcı Bilgileri:</p>
        <p className="mt-2">E-posta: {session.user.email}</p>
        <p>İsim: {session.user.name}</p>
        <p>Rol: {session.user.role}</p>
      </div>
    </div>
  );
};

export default AdminPage;
