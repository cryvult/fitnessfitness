"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        age: "",
        gender: "male",
        height: "",
        weight: "",
        activity: "1.2",
        goal: "lose",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/profile", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        });
        setLoading(false);
        if (res.ok) {
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4">
            <div className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">Uzupełnij swój profil</h1>
                    <p className="text-slate-400">Te dane posłużą nam do wygenerowania Twojego osobistego planu treningowego i dietetycznego.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Wiek (lata)</label>
                            <input type="number" required min="10" max="100" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="np. 25" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Płeć</label>
                            <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option value="male">Mężczyzna</option>
                                <option value="female">Kobieta</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Wzrost (cm)</label>
                            <input type="number" required min="100" max="250" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="np. 180" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Waga (kg)</label>
                            <input type="number" required min="30" max="300" step="0.1" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="np. 80" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Poziom aktywności fizycznej</label>
                        <select value={formData.activity} onChange={e => setFormData({ ...formData, activity: e.target.value })} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                            <option value="1.2">Niska (brak treningów, praca siedząca)</option>
                            <option value="1.5">Średnia (1-3 treningi/tydzień, praca lekka)</option>
                            <option value="1.9">Wysoka (4-6 treningów/tydzień, praca fizyczna)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-4">Twój Cel Główny</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'lose', icon: '🔻', title: 'Redukcja' },
                                { id: 'maintain', icon: '⚖️', title: 'Utrzymanie' },
                                { id: 'gain', icon: '🔺', title: 'Masa' },
                            ].map(goal => (
                                <div
                                    key={goal.id}
                                    onClick={() => setFormData({ ...formData, goal: goal.id })}
                                    className={`cursor-pointer border rounded-xl p-4 text-center transition-all ${formData.goal === goal.id ? 'bg-indigo-500/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-black/20 border-white/10 hover:bg-white/5'}`}
                                >
                                    <div className="text-2xl mb-1">{goal.icon}</div>
                                    <div className="text-xs sm:text-sm font-bold text-slate-200">{goal.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] disabled:opacity-50 mt-4 text-lg">
                        {loading ? "Zapisywanie..." : "Stwórz mój plan 🚀"}
                    </button>
                </form>
            </div>
        </div>
    );
}
