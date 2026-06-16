"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  async function addToCart() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    setAdding(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
        }),
      });

      if (res.ok) {
        alert(
          `✓ Successfully saved!\n\nProduct: ${product.title}\nPrice: $${product.price}\nQuantity: ${quantity}`,
        );
        router.push("/cart");
      } else {
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <img
        src={product?.image || "/placeholder.png"}
        alt={product?.title || "/placeholder.png"}
        className="h-40 w-full object-cover mb-2"
      />
      <h3 className="font-semibold">{product?.title}</h3>
      <p className="text-sm text-gray-600">${product?.price}</p>

      {/* Quantity Selector */}
      <div className="mt-3 flex items-center gap-2">
        <label className="text-sm text-gray-600">Qty:</label>
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          −
        </button>
        <input
          type="number"
          min="1"
          max="100"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          className="w-12 text-center border border-gray-300 rounded py-1"
        />
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div className="mt-3 space-y-2">
        <button
          onClick={addToCart}
          disabled={adding}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60 text-sm"
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
        <Link
          href={`/products/${product?._id}`}
          className="block text-center text-blue-600 text-sm hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
