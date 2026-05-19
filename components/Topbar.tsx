import { Search, Bell, Zap } from "lucide-react";

export default function Topbar() {
  return (
    <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Search Input */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Busque por imóveis, leads ou endereços..."
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
        />
      </div>

      {/* Profile & Notifications */}
      <div className="flex items-center gap-6">
        {/* AI Badge */}
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold">
          <Zap className="w-4 h-4 fill-emerald-600" />
          IA Ativa: 3 leads em atendimento
        </div>

        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-slate-800">João Corretor</div>
            <div className="text-xs text-slate-500">CRECI 12345</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold border border-accent/20">
            JC
          </div>
        </div>
      </div>
    </header>
  );
}
