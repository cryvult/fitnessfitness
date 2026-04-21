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

    const meals = {
        lose: [
            { name: "Szejk białkowy i orzechy", cals: 350, prot: 30, type: "Śniadanie", img: "🥤" },
            { name: "Kurczak z zielonymi warzywami", cals: 450, prot: 45, type: "Obiad", img: "🍗" },
            { name: "Jabłko i masło orzechowe", cals: 200, prot: 8, type: "Przekąska", img: "🍏" },
            { name: "Lekka sałatka wege", cals: 300, prot: 20, type: "Kolacja", img: "🥗" }
        ],
        gain: [
            { name: "Owsianka na mleku, banan", cals: 600, prot: 25, type: "Śniadanie", img: "🥣" },
            { name: "Gulasz z indyka, warzywa, ryż", cals: 800, prot: 45, type: "Obiad", img: "🥘" },
            { name: "Batony proteinowe domowo", cals: 400, prot: 20, type: "Przekąska", img: "🍫" },
            { name: "Makaron z sosem", cals: 700, prot: 40, type: "Kolacja", img: "🍝" }
        ],
        maintain: [
            { name: "Kanapki z chleba żytniego", cals: 450, prot: 20, type: "Śniadanie", img: "🥪" },
            { name: "Pieczony łosoś z kaszą", cals: 650, prot: 35, type: "Obiad", img: "🐟" },
            { name: "Grecki jogurt z owocami", cals: 250, prot: 15, type: "Przekąska", img: "🍓" },
            { name: "Krem z pomidorów", cals: 400, prot: 12, type: "Kolacja", img: "🍅" }
        ]
    };

    const selectedMeals = meals[profile.goal as keyof typeof meals] || meals["maintain"];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 pb-24 font-sans">
            <header className="max-w-3xl mx-auto flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all font-bold shadow-sm">←</Link>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Jadłospis</p>
                    <p className="text-2xl font-black text-emerald-600">{targetCalories} kcal</p>
                </div>
            </header>

            <main className="max-w-3xl mx-auto space-y-8">
                <div className="grid gap-5">
                    {selectedMeals.map((meal, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:border-emerald-500 hover:shadow-[0_8px_30px_rgb(16,185,129,0.12)] transition-all cursor-pointer shadow-sm relative overflow-hidden group">
                            <div className="flex items-center gap-6 mb-4 sm:mb-0">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex shrink-0 items-center justify-center text-4xl border border-gray-100">{meal.img}</div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{meal.type}</h3>
                                    <p className="text-lg font-bold text-gray-900 mb-2">{meal.name}</p>
                                    <div className="flex gap-4 text-sm">
                                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold">{meal.cals} kcal</span>
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-bold">{meal.prot}g Białka</span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-12 h-12 rounded-full border-2 border-gray-200 shrink-0 flex items-center justify-center transition-all group-hover:border-emerald-500 group-hover:bg-emerald-500 text-transparent group-hover:text-white font-bold self-end sm:self-auto">
                                ✓
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-black text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-gray-800 rounded-full blur-2xl opacity-50"></div>
                    <h3 className="text-xl font-bold mb-2 relative z-10 flex items-center gap-2">Pamiętaj o wodzie 💧</h3>
                    <p className="text-gray-400 font-medium relative z-10">Minimum 2-3 litry wody dziennie pomaga wypłukać toksyny i wspiera regenerację!</p>
                </div>
            </main>
        </div>
    );
}
