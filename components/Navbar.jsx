"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    title: "Digital Content & Devices",
    items: ["Prime Video", "Kindle", "Music"],
  },
  {
    title: "Shop By Category",
    items: ["Electronics", "Fashion", "Home", "Beauty"],
  },
  {
    title: "Programs & Features",
    items: ["Gift Cards", "Deals", "Sell"],
  },
];

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          return;
        }

        const data = await res.json();

        localStorage.setItem("userName", data.name);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("requestedRole", data.requestedRole);
        localStorage.setItem("approved", data.approved);
        localStorage.setItem("isMainAdmin", data.isMainAdmin);

        setUser({
          name: data.name,
          role: data.role,
          requestedRole: data.requestedRole,
          approved: data.approved,
          isMainAdmin: data.isMainAdmin,
        });
      } catch {
        localStorage.removeItem("token");
      }
    }

    loadUser();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("requestedRole");
    localStorage.removeItem("approved");
    localStorage.removeItem("isMainAdmin");

    window.location.href = "/";
  }

  const isAdmin = user?.role === "admin" && user?.approved === true;

  const pendingAdmin =
    user?.requestedRole === "admin" && user?.approved !== true;

  return (
    <>
      {" "}
      <header className="w-full">
        {/* Top Header */}{" "}
        <div className="bg-slate-900 text-white">
          {" "}
          <div className="mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
            {/* Menu */}
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-sm bg-slate-800 px-3 py-2 text-sm font-semibold hover:bg-slate-700"
            >
              {" "}
              <Menu size={18} /> <span>All</span>{" "}
            </button>

            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tight">
              Store
            </Link>

            {/* Location */}
            <div className="hidden md:flex items-center gap-1 rounded-sm border border-transparent bg-slate-800 px-3 py-2 hover:border-white">
              <MapPin size={18} />
              <div className="leading-none">
                <p className="text-[11px] text-gray-300">Deliver to</p>
                <p className="text-sm font-semibold">Karachi</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex flex-1 items-center overflow-hidden rounded-sm bg-white text-black shadow-sm">
              <select className="bg-white px-3 text-sm outline-none">
                <option>All</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
              </select>

              <input
                type="text"
                placeholder="Search products"
                className="flex-1 border-l border-slate-200 px-4 py-2 text-sm outline-none"
              />

              <button className="bg-amber-400 px-4 py-2 text-black hover:bg-amber-500">
                <Search size={20} />
              </button>
            </div>

            {/* Language */}
            <div className="hidden lg:flex items-center gap-1 rounded-sm border border-transparent bg-slate-800 px-3 py-2 hover:border-white">
              <span>EN</span>
              <ChevronDown size={14} />
            </div>

            {/* User */}
            {user ? (
              // <div className="hidden md:block rounded-sm border border-transparent px-3 py-2 hover:border-white">
              //   <p className="text-[11px]">Hello,</p>
              //   <p className="text-sm font-bold">{user.name}</p>
              // </div>
              <Link
                href="/admin"
                className="md:block rounded-sm border border-transparent px-3 py-2 hover:border-white"
              >
                <p className="text-[11px]">Admin</p>
                <p className="text-sm font-bold">Dashboard</p>
              </Link>
            ) : (
              <Link
                href="/orders"
                className="hidden md:block rounded-sm border border-transparent px-3 py-2 hover:border-white"
              >
                <p className="text-[11px]">Returns</p>
                <p className="text-sm font-bold">& Orders</p>
              </Link>
            )}

            {/* Orders */}

            <Link
              href="/login"
              className="hidden md:block rounded-sm border border-transparent px-3 py-2 hover:border-white"
            >
              <p className="text-[11px]">Hello, Sign in</p>
              <p className="text-sm font-bold">Account & Lists</p>
            </Link>

            {/* Admin */}
            {isAdmin && (
              <Link
                href="/admin"
                className="md:block rounded-sm border border-transparent px-3 py-2 hover:border-white"
              >
                <p className="text-[11px]">Admin</p>
                <p className="text-sm font-bold">Dashboard</p>
              </Link>
            )}

            {/* Logout */}
            {user && (
              <button
                onClick={logout}
                className="hidden md:block rounded bg-red-500 px-3 py-2 text-sm hover:bg-red-600"
              >
                Logout
              </button>
            )}

            {/* Login/Register */}
            {!user && (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded border border-blue-400 px-3 py-2 text-sm hover:bg-blue-500 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded bg-blue-600 px-3 py-2 text-sm hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-sm border border-transparent px-3 py-2 hover:border-white"
            >
              <ShoppingCart size={24} />
              <span className="hidden md:block font-bold">Cart</span>

              <span className="absolute left-8 top-1 text-xs font-bold text-amber-400">
                0
              </span>
            </Link>
          </div>
        </div>
        {/* Admin Pending Notice */}
        {pendingAdmin && (
          <div className="bg-yellow-100 py-2 text-center text-sm text-yellow-800">
            Your admin request is pending approval.
          </div>
        )}
        {/* Bottom Navigation */}
        <div className="bg-slate-800 text-white">
          <div className="mx-auto flex h-10 items-center gap-5 overflow-x-auto px-4 text-sm md:px-6">
            <Link href="/" className="hover:text-amber-300">
              Home
            </Link>

            <Link href="/products" className="hover:text-amber-300">
              Products
            </Link>

            <Link href="/orders" className="hover:text-amber-300">
              Orders
            </Link>

            <Link href="/cart" className="hover:text-amber-300">
              Cart
            </Link>

            <Link href="#" className="hover:text-amber-300">
              Customer Service
            </Link>

            <Link href="#" className="hover:text-amber-300">
              Electronics
            </Link>

            <Link href="#" className="hover:text-amber-300">
              Fashion
            </Link>

            <Link href="#" className="hover:text-amber-300">
              Home
            </Link>

            <Link href="#" className="hover:text-amber-300">
              Sports
            </Link>
          </div>
        </div>
      </header>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[90vw] max-w-[420px] bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-slate-900 px-4 py-4 text-white">
          <div>
            <p className="text-sm">
              {user ? `Hello, ${user.name}` : "Hello, Sign in"}
            </p>

            <p className="text-xl font-bold">Store</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        <div className="h-[calc(100%-72px)] overflow-y-auto">
          {categories.map((section) => (
            <div key={section.title} className="border-b border-slate-200">
              <h3 className="px-5 py-4 text-sm font-bold uppercase text-slate-500">
                {section.title}
              </h3>

              {section.items.map((item) => (
                <button
                  key={item}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-between px-5 py-3 text-left text-sm hover:bg-slate-100"
                >
                  <span>{item}</span>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
