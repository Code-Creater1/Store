// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ProductPage({ params }) {
//   const [product, setProduct] = useState(null);
//   useEffect(() => {
//     fetch(`http://localhost:3000/api/products/${params.id}`)
//       .then((r) => r.json())
//       .then(setProduct);
//   }, [params.id]);
//   if (!product) return <div>Loading...</div>;
//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h2 className="text-xl font-bold">{product.title}</h2>
//       <p className="mt-2">{product.description}</p>
//       <p className="mt-2 font-semibold">${product.price}</p>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";

// export default function ProductPage({ params }) {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/products/${params.id}`,
//         );
//         const data = await res.json();

//         setProduct(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProduct();
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500 text-lg">Loading product...</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500 text-lg">Product not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
//         {/* Image */}
//         <div className="flex items-center justify-center">
//           <img
//             src={product.image || "/placeholder.png"}
//             alt={product.title}
//             className="w-full h-96 object-cover rounded-xl"
//           />
//         </div>

//         {/* Details */}
//         <div>
//           <h1 className="text-3xl font-bold">{product.title}</h1>

//           <p className="mt-4 text-gray-600 leading-relaxed">
//             {product.description || "No description available."}
//           </p>

//           <p className="mt-6 text-2xl font-bold text-green-600">
//             ${product.price}
//           </p>

//           <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ProductPage({ params }) {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
// const res = await fetch(`/api/products/${params.id}`);
//         const data = await res.json();

//         if (!res.ok) {
//           setError(data?.message || "Product not found.");
//           setProduct(null);
//           return;
//         }

//         setProduct(data);
//       } catch (error) {
//         console.log("Fetch error:", error);
//         setError("Unable to load product. Please try again.");
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (params?.id) {
//       fetchProduct();
//     }
//   }, [params?.id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-500 text-lg">Loading product...</p>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
//         <p className="mb-4 text-center text-red-600 text-lg font-semibold">
//           {error || "Product not found."}
//         </p>
//         <Link
//           href="/"
//           className="rounded-full bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
//         >
//           Back to products
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
//         <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
//         <div className="rounded-3xl bg-white p-6 shadow">
//           <img
//             src={product.image || "/placeholder.png"}
//             alt={product.title || "product"}
//             className="h-[420px] w-full rounded-3xl object-cover"
//           />
//           <div className="mt-6 space-y-5">
//             <div className="rounded-3xl bg-gray-50 p-5">
//               <h2 className="text-xl font-semibold text-gray-900">Description</h2>
//               <p className="mt-3 text-gray-600 leading-relaxed">
//                 {product.description || "No description available."}
//               </p>
//             </div>
//             <div className="grid gap-4 sm:grid-cols-3">
//               <div className="rounded-3xl bg-gray-50 p-5">
//                 <p className="text-sm text-gray-500">Category</p>
//                 <p className="mt-2 font-medium text-gray-900">{product.category || "General"}</p>
//               </div>
//               <div className="rounded-3xl bg-gray-50 p-5">
//                 <p className="text-sm text-gray-500">Stock</p>
//                 <p className="mt-2 font-medium text-gray-900">{product.stock ?? 0}</p>
//               </div>
//               <div className="rounded-3xl bg-gray-50 p-5">
//                 <p className="text-sm text-gray-500">Added</p>
//                 <p className="mt-2 font-medium text-gray-900">
//                   {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <aside className="space-y-6 rounded-3xl bg-white p-6 shadow">
//           <div className="space-y-3">
//             <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Buy now</p>
//             <p className="text-3xl font-bold text-gray-900">${product.price}</p>
//           </div>
//           <button className="w-full rounded-3xl bg-blue-600 px-5 py-4 text-white hover:bg-blue-700 transition">
//             Add to Cart
//           </button>
//           <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
//             <p className="text-sm text-gray-500">Product ID</p>
//             <p className="mt-2 font-mono text-sm text-gray-900">{product._id}</p>
//           </div>
//         </aside>
//       </div>

//           <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//   );
// }

























import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(
      `http://localhost:3000/api/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return notFound();
    }

    const product = await res.json();

    if (!product) {
      return notFound();
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
            <h1 className="text-3xl font-bold">
              {product.title || "No title"}
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>

            <p className="mt-6 text-2xl font-bold text-green-600">
              ${product.price || 0}
            </p>

            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    );
  } catch (error) {
    console.error("Server error:", error);

    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          Something went wrong
        </p>
      </div>
    );
  }
}