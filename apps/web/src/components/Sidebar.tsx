"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsAdmin(user.email === "admin@correai.com" || user.role === "admin" || pathname.startsWith("/admin"));
  }, [pathname]);

  const navItems = isAdmin ? [
    { name: "Admin Home", href: "/admin", icon: LayoutDashboard },
    { name: "Corretores", href: "/admin/corretores", icon: Users },
    { name: "Todos Leads", href: "/admin/leads", icon: MessageSquare },
    { name: "Todos Imóveis", href: "/admin/imoveis", icon: Home },
    { name: "Relatórios", href: "/admin/relatorios", icon: BarChart2 },
  ] : [
    { name: "Painel", href: "/painel", icon: LayoutDashboard },
    { name: "Conversas", href: "/conversas", icon: MessageSquare },
    { name: "Imóveis", href: "/imoveis", icon: Home },
    { name: "Leads", href: "/leads", icon: Users },
    { name: "Análises", href: "/analises", icon: BarChart2 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside className={`w-64 ${isAdmin ? 'bg-primary text-white border-primary' : 'bg-surface border-gray-100'} border-r flex flex-col justify-between h-full py-6 shrink-0 transition-all duration-500`}>
      <div>
        {/* Logo */}
        <div className="px-6 mb-10 flex items-center gap-3">
          <div className={`${isAdmin ? 'bg-accent text-white' : 'bg-primary text-white'} p-2 rounded-lg transition-colors`}>
            <Building size={20} />
          </div>
          <div>
            <h1 className="font-bold text-xl leading-tight">CorretAI</h1>
            <p className={`text-xs ${isAdmin ? 'text-white/50' : 'text-text-muted'} font-medium tracking-wide`}>
              {isAdmin ? 'ADMIN CONSOLE' : 'ADMIN PANEL'}
            </p>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? isAdmin ? "bg-white/10 text-white font-bold" : "bg-accent-lighter text-accent font-medium"
                    : isAdmin ? "text-white/60 hover:bg-white/5 hover:text-white" : "text-text-muted hover:bg-gray-50 hover:text-text-main"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? isAdmin ? "text-white" : "text-accent" : ""} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 space-y-4">
        {/* New Campaign Button (Only for Brokers) */}
        {!isAdmin && (
          <Link href="/campanhas/nova" className="w-full bg-primary hover:bg-primary-light text-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium transition-colors shadow-sm">
            <Plus size={18} />
            Nova Campanha
          </Link>
        )}

        {/* Footer Links */}
        <div className="pt-4 space-y-1">
          <Link href="/ajuda" className={`flex items-center gap-3 px-4 py-2 text-sm ${isAdmin ? 'text-white/60 hover:text-white' : 'text-text-muted hover:text-text-main'} transition-colors`}>
            <HelpCircle size={18} />
            Central de Ajuda
          </Link>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${isAdmin ? 'text-white/60 hover:text-red-400' : 'text-text-muted hover:text-red-600'} transition-colors text-left`}
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </aside>
  );
}
