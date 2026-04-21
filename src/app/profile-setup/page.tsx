"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ age: "", gender: "male", height: "", weight: "", activity: "1.2", goal: "lose" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/profile", { method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } });
        if (res.ok) router.push("/dashboard");
        setLoading(false);
    };

    const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium";
    const labelClass = "block text-sm font-bold text-gray-700 mb-2";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans py-12">
            <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Zbudujmy Twój plan</h1>
                    <p className="text-gray-500 font-medium">Potrzebujemy dosłownie kilku informacji.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className={labelClass}>Wiek</label><input type="number" required min="10" max="100" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className={inputClass} placeholder="np. 25" /></div>
                        <div>
                            <label className={labelClass}>Płeć</label>
                            <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className={inputClass}>
                                <option value="male">Mężczyzna</option><option value="female">Kobieta</option>
                            </select>
                        </div>
                        <div><label className={labelClass}>Wzrost (cm)</label><input type="number" required min="100" max="250" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} className={inputClass} placeholder="np. 180" /></div>
                        <div><label className={labelClass}>Waga (kg)</label><input type="number" required min="30" max="300" step="0.1" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} className={inputClass} placeholder="np. 80" /></div>
                    </div>

                    <div>
                        <label className={labelClass}>Aktywność fizyczna</label>
                        <select value={formData.activity} onChange={e => setFormData({ ...formData, activity: e.target.value })} className={inputClass}>
                            <option value="1.2">Niska (brak treningów, pozycja siedząca)</option>
                            <option value="1.5">Średnia (1-3 treningi/tydz)</option>
                            <option value="1.9">Wysoka (4-6 treningów/tydz, praca fiz.)</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>Twój główny cel</label>
                        <div className="grid grid-cols-3 gap-4">
                            {[{ id: 'lose', icon: '🔻', title: 'Redukcja' }, { id: 'maintain', icon: '⚖️', title: 'Utrzymanie' }, { id: 'gain', icon: '🔺', title: 'Masa' }].map(goal => (
                                <div key={goal.id} onClick={() => setFormData({ ...formData, goal: goal.id })}
                                    className={`cursor-pointer rounded-2xl p-4 md:p-6 text-center transition-all border-2 ${formData.goal === goal.id ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                                >
                                    <div className="text-3xl mb-3">{goal.icon}</div>
                                    <div className="text-xs md:text-sm font-bold">{goal.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-5 rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 mt-4 text-lg">
                        {loading ? "Przetwarzanie..." : "Stwórz profil"}
                    </button>
                </form>
            </div>
        </div>
    );
}
