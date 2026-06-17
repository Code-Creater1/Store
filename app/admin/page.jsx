"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category: "",
  });
  const [isMainAdmin, setIsMainAdmin] = useState(false);
  const [approved, setApproved] = useState(false);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const res = await fetch("/api/products");
    if (res.ok) {
      setProducts(await res.json());
    }
  }

  async function loadPendingUsers() {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("/api/admin/approvals", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setPendingUsers(await res.json());
    }
  }

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await fetch("/api/auth/me", {
        headers: { authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;

      const data = await res.json();

      const mainAdmin = data.isMainAdmin === true;
      const approvedUser = data.approved === true;

      setIsMainAdmin(mainAdmin);
      setApproved(approvedUser);
      setRole(data.role);

      setLoading(false);

      // 🔥 IMPORTANT REDIRECTION LOGIC
      if (mainAdmin) {
        router.push("/admin/main-admin"); // 👈 send main admin away
        return;
      }

      if (data.role !== "admin") {
        router.push("/login"); // or user page
        return;
      }

      if (approvedUser) {
        await loadPendingUsers();
      }
    }

    init();
  }, []);

  async function approveUser(userId) {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("/api/admin/approvals", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });
    if (res.ok) {
      loadPendingUsers();
    }
  }

  async function createProduct(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("Please login as admin to create products.");
      return;
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });
    if (res.ok) {
      setStatus("Product added successfully.");
      setForm({
        title: "",
        description: "",
        price: "",
        image: "",
        stock: "",
        category: "",
      });
      loadProducts();
    } else {
      const text = await res.text();
      setStatus(text || "Unable to add product.");
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="mt-2 text-slate-600">
          Manage products and approve requested admin accounts.
        </p>
        {role !== "admin" ? (
          <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            Only approved admin accounts can manage products. Register as a user
            to use store features or request admin access from the main admin.
          </p>
        ) : approved === "pending" ? (
          <p className="mt-3 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-900">
            Your admin request is pending approval from the main admin.
          </p>
        ) : null}
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-3xl bg-white p-6 shadow">
          <h3 className="text-2xl font-semibold mb-4">Add a new product</h3>
          <form className="space-y-4" onSubmit={createProduct}>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
              className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              rows="4"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Price"
                type="number"
                className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
              <input
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="Stock"
                type="number"
                className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Category"
              className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Image URL"
              className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
            >
              Add Product
            </button>
          </form>
          {status ? (
            <p className="mt-4 text-sm text-gray-700">{status}</p>
          ) : null}
        </section>
        <section className="rounded-3xl bg-white p-6 shadow">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-semibold">Existing products</h3>
            {isMainAdmin ? (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 text-sm">
                Main admin
              </span>
            ) : null}
          </div>
          <div className="space-y-4">
            {isMainAdmin && pendingUsers.length > 0 ? (
              <div className="rounded-3xl border border-blue-200 p-4 bg-blue-50">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">
                  Pending admin approvals
                </h4>
                <div className="space-y-3">
                  {pendingUsers.map((user) => (
                    <div
                      key={user._id}
                      className="flex flex-col gap-3 rounded-2xl border border-blue-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium text-slate-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-slate-600">{user.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => approveUser(user._id)}
                        className="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        Approve admin
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="rounded-3xl border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {product.title}
                      </h4>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      {product.category || "General"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No products yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
