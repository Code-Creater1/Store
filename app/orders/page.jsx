"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to view your orders.");
      setLoading(false);
      return;
    }

    fetch("/api/orders", {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load orders");
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch(() => setMessage("Unable to load orders."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold">Order History</h2>
          <p className="text-sm text-gray-500">
            Review completed checkouts and order totals.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {loading ? (
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : message ? (
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-gray-600">{message}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="text-gray-600">No orders found yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="rounded-3xl bg-white p-6 shadow">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <p className="text-gray-500">Status: {order.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ${order.totalAmount?.toFixed(2) ?? 0}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {order.products?.map((item) => (
                  <div
                    key={item.productId?._id || item.productId}
                    className="rounded-2xl bg-gray-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.productId?.title || "Unknown product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        $
                        {((item.productId?.price ?? 0) * item.quantity).toFixed(
                          2,
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
