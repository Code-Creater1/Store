"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/cart", {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setCart(data))
      .finally(() => setLoading(false));
  }, []);

  async function checkout() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setMessage("Order placed successfully.");
      router.push("/orders");
    } else {
      setMessage("Checkout failed. Please try again.");
    }
  }

  const total = cart.products.reduce((sum, item) => {
    const price = item.productId?.price ?? 0;
    return sum + price * (item.quantity ?? 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        {loading ? (
          <p className="mt-4 text-gray-600">Loading cart...</p>
        ) : !localStorage.getItem("token") ? (
          <p className="mt-4 text-gray-600">
            Please log in to view and manage your cart.
          </p>
        ) : cart.products.length === 0 ? (
          <p className="mt-4 text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {cart.products.map((item) => (
              <div
                key={item.productId?._id || item.productId}
                className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.productId?.title || "Unknown product"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  $
                  {(
                    (item.productId?.price ?? 0) * (item.quantity ?? 0)
                  ).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
              <span className="font-medium text-gray-700">Total</span>
              <span className="text-xl font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={checkout}
              className="w-full rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Checkout
            </button>
            {message ? (
              <p className="text-sm text-green-700">{message}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
