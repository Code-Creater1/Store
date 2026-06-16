"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MainAdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const router = useRouter();

  // 🔹 Load current user + check if main admin
  async function loadMe() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const res = await fetch("/api/auth/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      router.push("/login");
      return;
    }

    const data = await res.json();

    if (!data.isMainAdmin) {
      router.push("/admin");
      return;
    }

    setMe(data);
  }

  // 🔹 Load pending admin requests
  async function loadRequests() {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/admin/approvals", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    async function init() {
      await loadMe();
      await loadRequests();
    }

    init();
  }, []);

  // 🔹 Approve user
  async function approveUser(userId) {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/admin/approvals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    }
  }

  if (loading) {
    return <p className="p-6">Loading main admin dashboard...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="bg-white shadow p-6 rounded-2xl">
        <h1 className="text-3xl font-bold">Main Admin Dashboard</h1>
        <p className="text-gray-600">Welcome {me?.name || "Admin"} 👑</p>
      </div>

      {/* REQUESTS */}
      <div className="bg-white shadow p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Pending Admin Requests</h2>

        {users.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between border p-4 rounded-xl"
              >
                {/* USER INFO */}
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => approveUser(user._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                >
                  Approve Admin
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
