import Link from "next/link";
import { Bot } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Bot className="w-8 h-8 text-accent group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-bold text-white tracking-tight">
            Corre<span className="text-accent">Ai</span>
          </span>
        </Link>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
          <Link href="#" className="hover:text-accent transition-colors">Comprar</Link>
          <Link href="#" className="hover:text-accent transition-colors">Alugar</Link>
          <Link href="#" className="hover:text-accent transition-colors">Simular Financiamento</Link>
        </div>

        {/* CTA */}
        <Link
          href="/corretor"
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-md transition-all"
        >
          Área do Corretor
        </Link>
      </div>
    </nav>
  );
}
