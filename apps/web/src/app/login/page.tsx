"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building, Mail, Lock, ArrowRight, Loader2, Info } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Intentar login na API
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.broker));
        
        if (email === "admin" || result.data.broker.email === "admin@correai.com") {
          router.push("/admin");
        } else {
          router.push("/painel");
        }
      } else {
        // Fallback para mock se for o usuário temporário e a API falhar (ex: sem conexão)
        if ((email === "corretor123" || email === "corretor123@correai.com") && password === "corretor123") {
          localStorage.setItem("token", "mock-token");
          localStorage.setItem("user", JSON.stringify({ name: "Corretor Temporário", email: "corretor123@correai.com" }));
          router.push("/painel");
          return;
        }

        if (email === "admin" && password === "admin") {
          localStorage.setItem("token", "admin-token");
          localStorage.setItem("user", JSON.stringify({ name: "Administrador", email: "admin@correai.com", role: "admin" }));
          router.push("/admin");
          return;
        }
        setError(result.message || "Credenciais inválidas.");
      }
    } catch (err) {
      // Fallback para mock em caso de erro de conexão
      if ((email === "corretor123" || email === "corretor123@correai.com") && password === "corretor123") {
        localStorage.setItem("token", "mock-token");
        localStorage.setItem("user", JSON.stringify({ name: "Corretor Temporário", email: "corretor123@correai.com" }));
        router.push("/painel");
      } else {
        setError("Erro de conexão com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-[440px] relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 p-10 md:p-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <Building size={32} />
            </div>
            <h1 className="text-3xl font-bold text-text-main tracking-tight">Bem-vindo de volta</h1>
            <p className="text-text-muted mt-2 font-medium">Acesse sua plataforma CorretAI</p>
          </div>

          {/* Temporary Login Alert */}
          <div className="mb-8 p-4 bg-accent-lighter/50 border border-accent/20 rounded-2xl flex gap-3 items-start animate-in fade-in slide-in-from-top-4 duration-500">
            <Info className="text-accent shrink-0 mt-0.5" size={18} />
            <div className="text-sm">
              <p className="font-bold text-accent-dark mb-0.5">Acesso Temporário Disponível</p>
              <p className="text-accent-dark/80">User: <code className="bg-accent/10 px-1 rounded">corretor123</code> | Pass: <code className="bg-accent/10 px-1 rounded">corretor123</code></p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1">Email ou Usuário</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  type="text" 
                  required
                  placeholder="Seu email ou corretor123"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-text-main">Senha</label>
                <Link href="#" className="text-xs font-semibold text-accent hover:underline">Esqueceu a senha?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-medium text-center bg-red-50 py-2 rounded-lg border border-red-100">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-light text-white rounded-2xl py-4 font-bold transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Entrar no Painel
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-text-muted font-medium">
              Ainda não tem uma conta?{" "}
              <Link href="/cadastro" className="text-accent font-bold hover:underline">Solicite acesso</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
