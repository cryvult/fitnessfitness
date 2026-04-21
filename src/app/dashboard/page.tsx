import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { calculateBMI, calculateBMR, calculateTDEE, calculateTargetCalories, calculateMacros } from "@/lib/calculator";
import Link from "next/link";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    if (!userId) redirect("/login");

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) redirect("/profile-setup");

    const bmi = calculateBMI(profile.weight, profile.height);
    const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
    const tdee = calculateTDEE(bmr, profile.activity);
    const targetCalories = calculateTargetCalories(tdee, profile.goal);
    const macros = calculateMacros(targetCalories, profile.goal, profile.weight);

    const quotes = ["Dyscipline is choosing between what you want now and what you want most.", "Każdy kolejny dzień to nowa szansa by być lepszym.", "Cel bez planu to tylko życzenie."];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 font-sans pb-24">
            <header className="max-w-5xl mx-auto flex justify-between items-center py-6 mb-8 border-b border-gray-200">
                <h1 className="text-2xl font-black tracking-tight text-gray-900 flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div>FitnessCalc</h1>
                <form action="/api/auth/logout" method="POST">
                    <button type="submit" className="px-5 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-all">Wyloguj</button>
                </form>
            </header>

            <main className="max-w-5xl mx-auto space-y-10">

                <div className="bg-black rounded-3xl p-8 relative overflow-hidden flex items-center shadow-2xl">
                    <div className="w-2/3 relative z-10">
                        <h2 className="text-emerald-400 font-bold mb-2">Dobra robota!</h2>
                        <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">&quot;{randomQuote}&quot;</p>
                    </div>
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <MetricCard title="Kalorie / Dzień" value={`${targetCalories}`} unit="kcal" fill />
                    <MetricCard title="Białko" value={`${macros.protein}`} unit="g" />
                    <MetricCard title="Węglowodany" value={`${macros.carbs}`} unit="g" />
                    <MetricCard title="Tłuszcze" value={`${macros.fats}`} unit="g" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2"><span className="text-gray-400">⚡</span> Szybkie akcje</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                            <Link href="/workout" className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-emerald-500 hover:shadow-[0_8px_30px_rgb(16,185,129,0.12)] transition-all flex flex-col justify-between min-h-[180px]">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">🏋️‍♂️</div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Trening</h3>
                                    <p className="text-sm text-gray-500 mt-1 font-medium">Kliknij, by rozpocząć</p>
                                </div>
                            </Link>
                            <Link href="/diet" className="group bg-emerald-50 border border-emerald-100 rounded-3xl p-8 hover:bg-emerald-100 transition-all flex flex-col justify-between min-h-[180px]">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">🥗</div>
                                <div>
                                    <h3 className="text-lg font-bold text-emerald-900">Jadłospis na dziś</h3>
                                    <p className="text-sm text-emerald-700/70 mt-1 font-medium">Zobacz swoje posiłki</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2"><span className="text-gray-400">📊</span> Twoje Ciało</h2>
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-5 shadow-sm">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                <span className="text-gray-500 font-medium text-sm">Twoje BMI</span>
                                <span className="font-bold text-lg text-gray-900">{bmi}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                <span className="text-gray-500 font-medium text-sm">BMR Spoczynkowe</span>
                                <span className="font-bold text-lg text-gray-900">{bmr} kcal</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium text-sm">Zapotrzebowanie całkowite</span>
                                <span className="font-bold text-lg text-emerald-600">{tdee} kcal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function MetricCard({ title, value, unit, fill }: { title: string, value: string, unit: string, fill?: boolean }) {
    return (
        <div className={`rounded-3xl p-6 border ${fill ? 'bg-emerald-500 border-none text-white shadow-lg shadow-emerald-500/30' : 'bg-white border-gray-200 shadow-sm text-gray-900'} flex flex-col justify-center`}>
            <span className={`text-sm font-bold mb-2 opacity-80 uppercase tracking-wider ${fill ? 'text-emerald-100' : 'text-gray-500'}`}>{title}</span>
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">{value}</span>
                <span className={`text-sm font-bold ${fill ? 'text-emerald-200' : 'text-gray-400'}`}>{unit}</span>
            </div>
        </div>
    );
}
