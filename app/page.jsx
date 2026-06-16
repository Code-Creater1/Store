import ProductCard from "../components/ProductCard";
import {
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  Package,
  Star,
} from "lucide-react";

async function getProducts() {
  try {
    const res = await fetch("http://localhost:3000/api/products");
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const products = (await getProducts()) || [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <section className="relative overflow-hidden bg-slate-900 px-6 py-24 sm:px-12 lg:px-24 lg:py-32">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-300 ring-1 ring-inset ring-blue-500/20 backdrop-blur-sm">
            <Star className="h-4 w-4 fill-blue-300" />
            <span>Trusted by 10,000+ customers in 2026</span>
          </span>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Shop fast, pay easy, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              keep your orders on track.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Browse premium products, add items to your cart, and manage your
            orders seamlessly. Experience a beautiful online store built for
            speed and reliability.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25">
              <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
              Shop Collection
            </button>
            <button className="group flex items-center gap-2 rounded-xl bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              Learn More
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-12 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-gray-900/5 sm:grid-cols-3">
          <div className="flex items-center gap-4 border-r-0 border-gray-100 sm:border-r">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">50k+</p>
              <p className="text-sm text-slate-500">Orders Delivered</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r-0 border-gray-100 sm:border-r">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">100%</p>
              <p className="text-sm text-slate-500">Secure Payments</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">24/7</p>
              <p className="text-sm text-slate-500">Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-8xl px-6 py-24 sm:px-12 lg:px-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-0 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-center text-slate-900">
              Featured Products
            </h2>
            <p className="mt-2 text-slate-500">
              Handpicked items just for you. View the details and add to cart.
            </p>
          </div>
          
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {products?.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="transition-all duration-300 hover:-translate-y-1"
              >

                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-16 text-center">
              <Package className="mb-4 h-12 w-12 text-gray-300" />
              <p className="text-lg font-medium text-gray-900">
                No products available yet.
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Check back soon for new arrivals!
              </p>
            </div>
          )}
        </div>
        <a
          href="/products"
          className="group flex text-center items-center gap-1 text-sm font-semibold text-blue-600 border border-red-100 hover:text-blue-700"
        >
          View all products
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </section>

      <section className="border-t border-gray-100 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Free Express Shipping
              </h3>
              <p className="mt-3 text-slate-500">
                Get your orders delivered to your doorstep within 2-3 business
                days, completely free of charge.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Secure Checkout
              </h3>
              <p className="mt-3 text-slate-500">
                Your data is protected with enterprise-grade encryption. Shop
                with absolute peace of mind.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Headphones className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Dedicated Support
              </h3>
              <p className="mt-3 text-slate-500">
                Our friendly support team is available around the clock to help
                you with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
