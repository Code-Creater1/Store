"use client";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <img
        src={product?.image || "/placeholder.png"}
        alt={product?.title || "/placeholder.png"}
        className="h-40 w-full object-cover mb-2"
      />
      <h3 className="font-semibold">{product?.title}</h3>
      <p className="text-sm text-gray-600">${product?.price}</p>
      <div className="mt-2">
        <Link href={`/products/${product?._id}`} className="text-blue-600">
          View
        </Link>
      </div>
    </div>
  );
}
