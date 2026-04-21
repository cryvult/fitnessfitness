"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WorkoutPage() {
    const [goal, setGoal] = useState("lose");
    const [loading, setLoading] = useState(true);

    const [timeLeft, setTimeLeft] = useState(60);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => { setLoading(false); }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timeLeft > 0) interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        else if (timeLeft === 0) setTimerActive(false);
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const toggleTimer = () => { if (timeLeft === 0) setTimeLeft(60); setTimerActive(!timerActive); };

    const workouts = {
        lose: [
            { name: "Pajacyki", sets: "3 serie x 45 sek", img: "🤸" },
            { name: "Przysiady z wyskokiem", sets: "4 serie x 15", img: "🦵" },
            { name: "Pompki", sets: "3 serie x 12", img: "💪" },
            { name: "Deska (Plank)", sets: "3 serie x 60 sek", img: "🪵" }
        ],
        gain: [
            { name: "Wyciskanie sztangielek", sets: "4 serie x 10", img: "🏋️‍♂️" },
            { name: "Wiosłowanie w opadzie", sets: "4 serie x 10", img: "🚣" },
            { name: "Przysiady ze sztangą", sets: "4 serie x 8", img: "🦵" },
            { name: "Wyciskanie pionowe", sets: "4 serie x 10", img: "🦍" }
        ],
        maintain: [
            { name: "Długie przysiady", sets: "3 serie x 15", img: "🦵" },
            { name: "Wykroki", sets: "3 serie x 12 na nogę", img: "🚶" },
            { name: "Klasyczne pompki", sets: "3 serie x 15", img: "💪" },
            { name: "Spięcia brzucha", sets: "3 serie x 20", img: "🤸" }
        ]
    };

    const currentWorkout = workouts[goal as keyof typeof workouts] || workouts["maintain"];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 pb-24 font-sans">
            <header className="max-w-3xl mx-auto flex items-center justify-between mb-8">
                <Link href="/dashboard" className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all font-bold shadow-sm">←</Link>
                <h1 className="text-2xl font-black text-gray-900">Twój Trening</h1>
            </header>

            <main className="max-w-3xl mx-auto space-y-6">

                <div className="sticky top-4 bg-black/90 backdrop-blur-xl border border-gray-800 p-6 rounded-3xl z-20 flex items-center justify-between shadow-2xl">
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">Czas odpoczynku</h3>
                        <div className="text-4xl font-black font-mono text-white">
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setTimeLeft(60)} className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all text-white font-bold text-lg">
                            ↺
                        </button>
                        <button onClick={toggleTimer} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all text-black font-black text-xl shadow-lg ${timerActive ? 'bg-white hover:bg-gray-200' : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/50'}`}>
                            {timerActive ? '❚❚' : '▶'}
                        </button>
                    </div>
                </div>

                <div className="grid gap-5 pt-4">
                    {currentWorkout.map((ex, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 flex items-center justify-between hover:border-black hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all group">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl border border-gray-100 shrink-0 group-hover:bg-gray-100 transition-colors">{ex.img}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{ex.name}</h3>
                                    <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                                        {ex.sets}
                                    </div>
                                </div>
                            </div>
                            <label className="cursor-pointer pl-4 shrink-0 flex items-center justify-center">
                                <input type="checkbox" className="w-10 h-10 rounded-full appearance-none bg-gray-50 border-2 border-gray-200 checked:bg-black checked:border-black transition-all cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:left-[11px] checked:after:top-[6px] checked:after:text-xl hover:border-black" />
                            </label>
                        </div>
                    ))}
                </div>

                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] mt-10 text-lg uppercase tracking-wider block text-center">
                    Zakończyłem trening! 🚀
                </button>
            </main>
        </div>
    );
}
