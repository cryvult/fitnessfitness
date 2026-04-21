import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center relative">
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Przekształć swoje ciało z <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">FitnessCalc</span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Twój osobisty asystent treningowy. Zbuduj masę lub zrzuć wagę dzięki automatycznie dopasowanym planom odżywiania i treningom.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-all active:scale-[0.98]">
            Zacznij za darmo
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/10 transition-all active:scale-[0.98]">
            Mam już konto
          </Link>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
    </div>
  );
}
