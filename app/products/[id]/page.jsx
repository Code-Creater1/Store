"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [id, setId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Unwrap params properly
    Promise.resolve(params).then((p) => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setProduct(null);
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title || "product"}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.title || "No title"}</h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description || "No description available."}
          </p>

          <p className="mt-6 text-2xl font-bold text-green-600">
            ${product.price || 0}
          </p>

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center gap-3">
            <label className="text-gray-700 font-medium">Quantity:</label>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-lg"
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
              className="w-16 text-center border border-gray-300 rounded py-2"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-lg"
            >
              +
            </button>
          </div>

          <button
            onClick={addToCart}
            disabled={adding}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
