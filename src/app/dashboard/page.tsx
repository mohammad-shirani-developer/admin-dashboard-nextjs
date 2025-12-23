"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const users = [
    { id: 1, name: "علی", email: "ali@example.com" },
    { id: 2, name: "زهرا", email: "zahra@example.com" },
    { id: 3, name: "رضا", email: "reza@example.com" },
    { id: 4, name: "سارا", email: "sara@example.com" },
    { id: 5, name: "مهسا", email: "mahsa@example.com" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">داشبورد مدیریت</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition"
        >
          خروج
        </button>
      </div>

      <p className="mb-4">
        این صفحه فقط برای کاربران وارد شده قابل دسترسی است.
      </p>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <table className="min-w-full border border-gray-300 text-right">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">نام</th>
              <th className="py-2 px-4 border-b">ایمیل</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
