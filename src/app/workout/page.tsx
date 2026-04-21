"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WorkoutPage() {
    const [goal, setGoal] = useState("lose");
    const [loading, setLoading] = useState(true);

    // Timer state
    const [timeLeft, setTimeLeft] = useState(60);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        // Mock fetch to simulate taking the goal from API / Cookies
        setLoading(false);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const toggleTimer = () => {
        if (timeLeft === 0) setTimeLeft(60);
        setTimerActive(!timerActive);
    };

    const workouts = {
        lose: [
            { name: "Pajacyki", sets: "3x45s", img: "🤸" },
            { name: "Przysiady z wyskokiem", sets: "3x15", img: "🦵" },
            { name: "Pompki", sets: "3x12", img: "💪" },
            { name: "Plank (Deska)", sets: "3x60s", img: "🪵" }
        ],
        gain: [
            { name: "Wyciskanie hantli (klatka)", sets: "4x8-10", img: "🏋️‍♂️" },
            { name: "Wiosłowanie hantlem", sets: "4x8-10", img: "🚣" },
            { name: "Przysiady z obciążeniem", sets: "4x8", img: "🦵" },
            { name: "Wyciskanie żołnierskie (barki)", sets: "4x10", img: "🦍" }
        ],
        maintain: [
            { name: "Przysiady", sets: "3x15", img: "🦵" },
            { name: "Wykroki", sets: "3x12", img: "🚶" },
            { name: "Pompki opierając o krzesło", sets: "3x15", img: "💪" },
            { name: "Brzuszki / Spięcia", sets: "3x20", img: "🤸" }
        ]
    };

    const currentWorkout = workouts[goal as keyof typeof workouts] || workouts["maintain"];

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 pb-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <header className="max-w-4xl mx-auto flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all font-bold">←</Link>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">Twój Trening</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto space-y-6 relative z-10">

                {/* Sticky Timer */}
                <div className="sticky top-6 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl z-20 flex items-center justify-between shadow-2xl">
                    <div>
                        <h3 className="text-sm text-slate-400 font-bold mb-1">Stoper przerw</h3>
                        <div className="text-3xl font-black font-mono text-rose-400">
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setTimeLeft(60)} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all text-white">
                            ↺
                        </button>
                        <button onClick={toggleTimer} className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all text-white font-bold ${timerActive ? 'bg-rose-500 hover:bg-rose-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}>
                            {timerActive ? '❚❚' : '▶'}
                        </button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {currentWorkout.map((ex, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between hover:bg-white/10 transition-all shadow-lg shadow-black/50">
                            <div className="flex items-center gap-6">
                                <div className="text-5xl">{ex.img}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{ex.name}</h3>
                                    <div className="inline-block bg-white/10 text-rose-400 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                                        {ex.sets}
                                    </div>
                                </div>
                            </div>
                            <label className="cursor-pointer pl-4 flex-shrink-0">
                                <input type="checkbox" className="w-8 h-8 rounded-xl appearance-none bg-black/40 border-2 border-white/20 checked:bg-rose-500 checked:border-rose-500 transition-all shadow-inner relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:left-[7px] checked:after:top-[2px] checked:after:text-lg" />
                            </label>
                        </div>
                    ))}
                </div>

                <button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-rose-500/20 transition-all active:scale-[0.98] mt-8 text-lg">
                    Zakończ Trening 🚀
                </button>
            </main>
        </div>
    );
}
