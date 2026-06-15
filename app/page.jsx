import ProductCard from "../components/ProductCard";
// import ProductPage from "./products/[id]/page";

async function getProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/products");
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts() || [];
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-white shadow-lg">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">
            Modern E-Commerce Store
          </p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Shop fast, pay easy, and keep your orders on track.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-cyan-100/90">
            Browse products, add items to your cart, login to manage your
            orders, and build a beautiful online store with a friendly user
            experience.
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-sm text-gray-600">
              Select your favorite items and view the details.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products?.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="rounded-xl bg-white p-8 shadow">
              <p className="text-gray-600">No products available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
