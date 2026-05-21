"use client";

import { ArrowLeft, Save, X, User, Mail, Phone, FileText, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoCorretor() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    license: "",
    password: "corretor123", // Default password
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call the API
    alert("Corretor cadastrado com sucesso!");
    router.push("/admin/corretores");
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/admin/corretores" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-text-main hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Cadastrar Novo Corretor</h1>
          <p className="text-text-muted text-sm mt-1">Insira as informações profissionais do novo integrante da equipe.</p>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-4 md:col-span-2">
               <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                 <User size={14} /> Informações Básicas
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block ml-1">Nome Completo *</label>
                   <input 
                     required
                     type="text" 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                     value={formData.name}
                     onChange={e => setFormData({...formData, name: e.target.value})}
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block ml-1">Email Profissional *</label>
                   <input 
                     required
                     type="email" 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                     value={formData.email}
                     onChange={e => setFormData({...formData, email: e.target.value})}
                   />
                 </div>
               </div>
            </div>

            {/* Documentation */}
            <div className="space-y-4 md:col-span-2 pt-4 border-t border-gray-50">
               <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                 <Shield size={14} /> Documentação e Contato
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block ml-1">Telefone</label>
                   <input 
                     type="tel" 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                     value={formData.phone}
                     onChange={e => setFormData({...formData, phone: e.target.value})}
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block ml-1">CPF *</label>
                   <input 
                     required
                     type="text" 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                     value={formData.document}
                     onChange={e => setFormData({...formData, document: e.target.value})}
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-text-main block ml-1">CRECI</label>
                   <input 
                     type="text" 
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                     value={formData.license}
                     onChange={e => setFormData({...formData, license: e.target.value})}
                   />
                 </div>
               </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-50 flex items-center justify-end gap-4">
            <Link href="/admin/corretores" className="px-6 py-3 text-sm font-bold text-text-main bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <X size={18} /> Cancelar
            </Link>
            <button type="submit" className="px-8 py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-light transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
              <Save size={18} /> Salvar Corretor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
