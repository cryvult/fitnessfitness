import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { calculateBMR, calculateTDEE, calculateTargetCalories } from "@/lib/calculator";

export default async function DietPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) redirect("/login");

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) redirect("/profile-setup");

    const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
    const tdee = calculateTDEE(bmr, profile.activity);
    const targetCalories = calculateTargetCalories(tdee, profile.goal);

    // Predefined diets
    const meals = {
        lose: [
            { name: "Omlet warzywny", cals: 350, prot: 25, type: "Śniadanie", img: "🍳" },
            { name: "Kurczak z ryżem i brokułami", cals: 500, prot: 45, type: "Obiad", img: "🍗" },
            { name: "Skyr z owocami", cals: 200, prot: 15, type: "Przekąska", img: "🍓" },
            { name: "Sałatka z tuńczykiem", cals: 300, prot: 30, type: "Kolacja", img: "🥗" }
        ],
        gain: [
            { name: "Owsianka z masłem", cals: 600, prot: 20, type: "Śniadanie", img: "🥣" },
            { name: "Stek wołowy, bataty", cals: 800, prot: 55, type: "Obiad", img: "🥩" },
            { name: "Shake białkowy", cals: 400, prot: 30, type: "Przekąska", img: "🥤" },
            { name: "Makaron z mięsem", cals: 700, prot: 40, type: "Kolacja", img: "🍝" }
        ],
        maintain: [
            { name: "Kanapki z jajkiem", cals: 450, prot: 20, type: "Śniadanie", img: "🥪" },
            { name: "Łosoś z kaszą", cals: 650, prot: 35, type: "Obiad", img: "🐟" },
            { name: "Garść orzechów", cals: 250, prot: 8, type: "Przekąska", img: "🥜" },
            { name: "Zupa krem", cals: 400, prot: 15, type: "Kolacja", img: "🥣" }
        ]
    };

    const selectedMeals = meals[profile.goal as keyof typeof meals] || meals["maintain"];

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 pb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <header className="max-w-4xl mx-auto flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all font-bold">←</Link>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Jadłospis</h1>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-400">Cel na dziś</p>
                    <p className="text-xl font-bold text-emerald-400">{targetCalories} kcal</p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto space-y-6 relative z-10">
                <div className="grid gap-4">
                    {selectedMeals.map((meal, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                            <div className="flex items-center gap-6">
                                <div className="text-5xl">{meal.img}</div>
                                <div>
                                    <h3 className="text-sm text-slate-400 font-semibold mb-1">{meal.type}</h3>
                                    <p className="text-lg font-bold text-white mb-2">{meal.name}</p>
                                    <div className="flex gap-4 text-sm">
                                        <span className="text-emerald-400 font-semibold">{meal.cals} kcal</span>
                                        <span className="text-slate-300">{meal.prot}g Białka</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-emerald-500 hover:bg-emerald-500/20 flex items-center justify-center transition-all bg-black/20 text-slate-500 hover:text-emerald-400 font-bold">
                                    ✓
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 rounded-3xl p-6 shadow-xl shadow-emerald-500/10">
                    <h3 className="text-xl font-bold mb-2">Pamiętaj o wodzie 💧</h3>
                    <p className="text-slate-300">Minimum 2-3 litry wody dziennie pomaga wypłukać toksyny i wspiera metabolizm!</p>
                </div>
            </main>
        </div>
    );
}
