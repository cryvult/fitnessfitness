import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { calculateBMI, calculateBMR, calculateTDEE, calculateTargetCalories, calculateMacros } from "@/lib/calculator";
import Link from "next/link";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        redirect("/login");
    }

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
        redirect("/profile-setup");
    }

    const bmi = calculateBMI(profile.weight, profile.height);
    const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
    const tdee = calculateTDEE(bmr, profile.activity);
    const targetCalories = calculateTargetCalories(tdee, profile.goal);
    const macros = calculateMacros(targetCalories, profile.goal, profile.weight);

    const quotes = [
        "Nie poddawaj się. Początki są zawsze najtrudniejsze.",
        "Ból, który czujesz dzisiaj, będzie siłą, którą poczujesz jutro.",
        "Zrób dzisiaj coś, za co twoje przyszłe ja ci podziękuje.",
        "Motywacja pozwala zacząć, nawyk pozwala wytrwać."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 pb-24">
            <header className="max-w-4xl mx-auto flex justify-between items-center py-6 mb-8 border-b border-white/10">
                <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">FitnessCalc</h1>
                <form action="/api/auth/logout" method="POST">
                    <button type="submit" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Wyloguj</button>
                </form>
            </header>

            <main className="max-w-4xl mx-auto space-y-8">

                {/* Quote banner */}
                <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-3xl p-6 border border-white/5 relative overflow-hidden shadow-lg shadow-indigo-500/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <p className="text-xl italic font-medium text-slate-200 relative z-10">&quot;{randomQuote}&quot;</p>
                </div>

                {/* Top metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard title="Cel dnia" value={`${targetCalories}`} unit="kcal" color="from-indigo-500 to-purple-500" />
                    <MetricCard title="Białko" value={`${macros.protein}`} unit="g" />
                    <MetricCard title="Węgle" value={`${macros.carbs}`} unit="g" />
                    <MetricCard title="Tłuszcze" value={`${macros.fats}`} unit="g" />
                </div>

                {/* Dashboard grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">🔥 Twoje Akcje</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link href="/workout" className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all flex flex-col justify-between min-h-[160px]">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">🏋️‍♂️</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Plan Treningowy</h3>
                                    <p className="text-sm text-slate-400 mt-1">Rozpocznij dzisiejszy trening</p>
                                </div>
                            </Link>
                            <Link href="/diet" className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all flex flex-col justify-between min-h-[160px]">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">🍽️</div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Jadłospis</h3>
                                    <p className="text-sm text-slate-400 mt-1">Twoje posiłki na dziś</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">📊 Parametry</h2>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 shadow-lg shadow-black/50">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-slate-400">BMI</span>
                                <span className="font-bold text-lg">{bmi}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-slate-400">BMR (spoczynkowe)</span>
                                <span className="font-bold text-lg">{bmr} kcal</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">TDEE (calkowite)</span>
                                <span className="font-bold text-lg">{tdee} kcal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function MetricCard({ title, value, unit, color }: { title: string, value: string, unit: string, color?: string }) {
    return (
        <div className={`rounded-3xl p-5 border border-white/10 flex flex-col justify-center shadow-lg ${color ? `bg-gradient-to-br ${color} shadow-indigo-500/20` : 'bg-white/5 backdrop-blur-md shadow-black/50'}`}>
            <span className="text-sm text-slate-200 font-medium mb-1">{title}</span>
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">{value}</span>
                <span className="text-sm font-semibold opacity-80 text-white">{unit}</span>
            </div>
        </div>
    );
}
