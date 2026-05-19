import Link from "next/link";
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Sparkles, 
  Settings,
  Bot
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary text-slate-300 flex flex-col h-screen sticky top-0 left-0 border-r border-slate-800">
      {/* Logo */}
      <div className="p-6">
        <Link href="/corretor" className="flex items-center gap-2 group">
          <Bot className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-bold text-white tracking-tight">
            Corre<span className="text-accent">Ai</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Visão Geral</div>
        <Link href="/corretor" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent/10 text-accent font-medium transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>

        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-2">Módulo Imóveis</div>
        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Home className="w-5 h-5" />
          Meus Imóveis
        </Link>

        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-2">CRM & Vendas</div>
        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Users className="w-5 h-5" />
          Leads e Clientes
        </Link>

        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-2">Inteligência Artificial</div>
        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Assistente de IA
        </Link>
      </nav>

      {/* Bottom Settings */}
      <div className="p-4 mt-auto">
        <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          Configurações
        </Link>
      </div>
    </aside>
  );
}
