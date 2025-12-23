"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const users = [
  { id: 1, name: "علی", email: "ali@example.com" },
  { id: 2, name: "زهرا", email: "zahra@example.com" },
  { id: 3, name: "رضا", email: "reza@example.com" },
  { id: 4, name: "سارا", email: "sara@example.com" },
  { id: 5, name: "مهسا", email: "mahsa@example.com" },
  { id: 6, name: "مینا", email: "mina@example.com" },
  { id: 7, name: "حسین", email: "hossein@example.com" },
  { id: 8, name: "نگار", email: "negar@example.com" },
  { id: 9, name: "کامران", email: "kamran@example.com" },
  { id: 10, name: "لیلا", email: "leila@example.com" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const filteredUsers = users.filter(
    (u) => u.name.includes(search) || u.email.includes(search)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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

      <input
        type="text"
        placeholder="جستجو بر اساس نام یا ایمیل"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
      />

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
            {displayedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-lg border ${
              page === i + 1 ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
