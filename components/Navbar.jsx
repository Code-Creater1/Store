"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    setUser(token ? { name } : null);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "/";
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="font-extrabold text-2xl tracking-tight text-gray-900"
        >
          Store
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link href="/cart" className="hover:text-gray-900">
            Cart
          </Link>
          <Link href="/orders" className="hover:text-gray-900">
            Orders
          </Link>
          {user ? (
            <>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                {user.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded border border-blue-500 px-3 py-1 text-blue-600 hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
          <Link
            href="/admin"
            className="rounded border border-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-100"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
