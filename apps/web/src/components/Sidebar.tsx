"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Home, 
  Users, 
  BarChart2, 
  Plus, 
  HelpCircle, 
  LogOut,
  Building
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Painel", href: "/", icon: LayoutDashboard },
    { name: "Conversas", href: "/conversas", icon: MessageSquare },
    { name: "Imóveis", href: "/imoveis", icon: Home },
    { name: "Leads", href: "/leads", icon: Users },
    { name: "Análises", href: "/analises", icon: BarChart2 },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-gray-100 flex flex-col justify-between h-full py-6">
      <div>
        {/* Logo */}
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-lg">
            <Building size={20} />
          </div>
          <div>
            <h1 className="font-bold text-xl leading-tight">CorretAI</h1>
            <p className="text-xs text-text-muted font-medium tracking-wide">ADMIN PANEL</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-accent-lighter text-accent font-medium"
                    : "text-text-muted hover:bg-gray-50 hover:text-text-main"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-accent" : ""} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 space-y-4">
        {/* New Campaign Button */}
        <button className="w-full bg-primary hover:bg-primary-light text-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium transition-colors shadow-sm">
          <Plus size={18} />
          Nova Campanha
        </button>

        {/* Footer Links */}
        <div className="pt-4 space-y-1">
          <Link href="/ajuda" className="flex items-center gap-3 px-4 py-2 text-sm text-text-muted hover:text-text-main transition-colors">
            <HelpCircle size={18} />
            Central de Ajuda
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-muted hover:text-text-main transition-colors text-left">
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </aside>
  );
}
