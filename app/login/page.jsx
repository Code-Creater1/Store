"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("requestedRole", data.user.requestedRole);
      localStorage.setItem("approved", data.user.approved);
      localStorage.setItem("isMainAdmin", data.user.isMainAdmin);
      if (data.user.isMainAdmin) {
        router.push("/admin/main-admin");
      } else if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/products");
      }
    } else {
      setError("Login failed. Check your credentials.");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Login to your account</h2>
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      <input
        className="w-full mb-3 rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full mb-3 rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
