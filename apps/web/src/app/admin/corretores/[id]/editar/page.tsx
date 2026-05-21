"use client";

import { ArrowLeft, Save, X, User, Mail, Phone, FileText, Shield } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarCorretor() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
    license: "",
    status: "Ativo"
  });

  // Mock loading data
  useEffect(() => {
    // In a real app, this would be: const res = await fetch(`/api/brokers/${id}`);
    const mockBrokers: any = {
      "1": { name: "Ricardo Mendes", email: "ricardo@correai.com", phone: "(11) 98888-7777", document: "123.456.789-00", license: "CRECI 12345", status: "Ativo" },
      "2": { name: "Ana Paula", email: "ana.paula@correai.com", phone: "(11) 97777-6666", document: "987.654.321-11", license: "CRECI 54321", status: "Ativo" },
      "3": { name: "Juliano Santos", email: "juliano@correai.com", phone: "(11) 96666-5555", document: "456.789.123-22", license: "CRECI 67890", status: "Inativo" },
      "4": { name: "Fernanda Costa", email: "fernanda@correai.com", phone: "(11) 95555-4444", document: "321.654.987-33", license: "CRECI 09876", status: "Ativo" },
    };

    const data = mockBrokers[id as string];
    if (data) {
      setFormData(data);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call the API: await fetch(`/api/brokers/${id}`, { method: 'PUT', ... })
    alert("Alterações salvas com sucesso!");
    router.push("/admin/corretores");
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/admin/corretores" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-text-main hover:bg-gray-50 transition-colors shadow-sm">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Editar Corretor</h1>
          <p className="text-text-muted text-sm mt-1">Atualize as informações do corretor #{id}.</p>
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
                 <Shield size={14} /> Documentação e Status
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
                    <label className="text-sm font-bold text-text-main block ml-1">Status</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-text-main"
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                    >
                      <option>Ativo</option>
                      <option>Inativo</option>
                    </select>
                 </div>
               </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-50 flex items-center justify-end gap-4">
            <Link href="/admin/corretores" className="px-6 py-3 text-sm font-bold text-text-main bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <X size={18} /> Cancelar
            </Link>
            <button type="submit" className="px-8 py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-light transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
              <Save size={18} /> Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
