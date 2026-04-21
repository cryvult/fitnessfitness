import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden flex flex-col items-center justify-center relative font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>

      <div className="z-10 text-center px-6 max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm font-semibold text-gray-800">
          <span className="flex w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Nowa Era Fitnessu
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-gray-900 leading-tight">
          Przekształć ciało z <span className="text-emerald-500">FitnessCalc</span>
        </h1>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium">
          Twój osobisty asystent treningowy. Zbuduj masę lub zrzuć wagę dzięki nowatorskiemu podejściu do diety i treningu.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-[0.98]">
            Zacznij za darmo
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-black font-bold rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98]">
            Mam już konto
          </Link>
        </div>
      </div>

      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-70"></div>
    </div>
  );
}
