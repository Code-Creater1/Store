"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      router.push("/");
    } else {
      const message = await res.text();
      setError(message || "Register failed. Please try again.");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Create your account</h2>
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      <input
        className="w-full mb-3 rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        className="w-full rounded bg-green-600 px-4 py-3 text-white hover:bg-green-700 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Register"}
      </button>
    </form>
  );
}
