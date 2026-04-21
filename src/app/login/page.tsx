"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setLoading(false);
        if (res.ok) {
            router.push("/dashboard");
        } else {
            setError(data.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative font-sans">
            <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-gray-100 relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">✌️</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Witaj ponownie</h1>
                    <p className="text-gray-500 font-medium">Zaloguj się, aby kontynuować trening.</p>
                </div>

                {error && <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-gray-400 font-medium" placeholder="twoj@email.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Hasło</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-gray-400 font-medium" placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-gray-200 transition-all active:scale-[0.98] disabled:opacity-50 mt-2">
                        {loading ? "Logowanie..." : "Zaloguj się"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500 font-medium">
                    Nie masz konta? <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors">Zarejestruj się</Link>
                </p>
            </div>
        </div>
    );
}
